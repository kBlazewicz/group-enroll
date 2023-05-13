import Paper from '@mui/material/Paper';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardContent';
import { useEffect, useState } from 'react';
import { fetchTerms } from '../../api/api-utils';
import React from 'react';
import { Day, Term, getDays } from '../../types/types';
import { SubmitStudentsFormButton } from './SubmitStudentsFormButton';

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

export const StudentsForm = () => {
    const [terms, setTerms] = useState<Term[]>([]);
    const [checkedTerms, setCheckedTerms] = useState<Term[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchTerms();
            setTerms(data);            
        }
        loadData();
    }, [])

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
        <Card component={Paper} sx={{ maxWidth: 500 }}>
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
                <SubmitStudentsFormButton termsToSend={checkedTerms}/>
            </CardActions>
        </Card>
    )
}
