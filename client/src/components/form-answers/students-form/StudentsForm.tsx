import Paper from '@mui/material/Paper';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardContent';
import { useState } from 'react';
import React from 'react';
import { SubmitStudentsFormButton } from './SubmitStudentsFormButton';
import { Term, Day, getDays } from '../../../types/types';

const compareTerms = (x: Term, term: Term) => {
    return x.dayOfWeek === term.dayOfWeek &&
        x.startTime === term.startTime &&
        x.endTime === term.endTime;
}

interface TermsByDayGroup {
    dayOfWeek: Day,
    terms: Term[]
}

const groupTermsByDay = (terms: Term[]): TermsByDayGroup[] => {
    const termsByDayGroups: TermsByDayGroup[] = getDays().map(day => ({
        dayOfWeek: day,
        terms: []
    }));

    termsByDayGroups.forEach(group => {
        terms.forEach(term => {
            if (group.dayOfWeek === term.dayOfWeek) {
                group.terms.push(term)
            }
        });
    });

    return termsByDayGroups;
}

export const StudentsForm = ({studentId, terms, lastSavedStudentId, saveLastSavedStudentId}
    : {studentId: number, terms: Term[], lastSavedStudentId: number, saveLastSavedStudentId: (id: number) => void}) => {
    const [checkedTerms, setCheckedTerms] = useState<Term[]>([]);

    const handleToggle = (term: Term) => {
        const currentIndex = checkedTerms.findIndex((x) => compareTerms(x, term));
        const newChecked = [...checkedTerms];

        if (currentIndex === -1) {
            newChecked.push(term);
        }
        else {
            newChecked.splice(currentIndex, 1);
        }

        setCheckedTerms(newChecked);
    }


    return (
        <Card component={Paper} sx={{ minWidth: 500 }}>
            <CardContent>
                <List
                    sx={{ maxWidth: 500, maxHeight: 500, overflow: 'auto' }}
                >
                    {groupTermsByDay(terms).map(group => {
                        return <React.Fragment key={group.dayOfWeek}>
                            <ListSubheader>{group.dayOfWeek}</ListSubheader>
                            {group.terms.map(term =>
                                <ListItemButton
                                    key={term.id}
                                    onClick={() => handleToggle(term)}
                                >
                                    <Checkbox edge="start" checked={checkedTerms.findIndex((x) =>
                                        compareTerms(x, term)) !== -1} />
                                    <ListItemText>
                                        {term.startTime + " - " + term.endTime}
                                    </ListItemText>
                                </ListItemButton>
                            )}
                        </React.Fragment>
                    }
                    )}
                </List >
            </CardContent>
            <CardActions>
                <SubmitStudentsFormButton termsToSend={checkedTerms} studentId={studentId} lastSavedStudentId={lastSavedStudentId} saveLastSavedStudentId={saveLastSavedStudentId}/>
            </CardActions>
        </Card>
    )
}
