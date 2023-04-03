import Paper from '@mui/material/Paper';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardContent';
import { SubmitStudentsFormButton } from './SubmitStudentsFormButton';
import { useEffect, useState } from 'react';
import { fetchDayOptions } from '../../api/api-utils';
import React from 'react';
import { Day, DayOptions, Option } from '../../types/types';

export interface OptionDay {
    option: Option,
    day: Day
}
const compareOptionDay = (x: OptionDay, day: Day, option: Option) => {
    return x.day === day && x.option === option;
}

export const StudentsForm = () => {
    const [days, setDays] = useState<DayOptions[]>([]);
    const [checkedOptions, setCheckedOptions] = useState<OptionDay[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchDayOptions();
            setDays(data);
        }
        loadData();
    }, [])

    const handleToggle = (option: Option, day: Day) => {
        const currentIndex = checkedOptions.findIndex((x) => compareOptionDay(x, day, option));
        const newChecked = [...checkedOptions];

        if (currentIndex === -1) {
            newChecked.push({ option, day });
        }
        else {
            newChecked.splice(currentIndex, 1);
        }

        setCheckedOptions(newChecked);
    }

    return (
        <>
            <Card component={Paper} sx={{ maxWidth: 500 }}>
                <CardContent>
                    <List
                        sx={{ maxWidth: 500, maxHeight: 500, overflow: 'auto' }}
                    >
                        {days.map(dayOptions => {
                            return <React.Fragment key={dayOptions.day}>
                                <ListSubheader>{dayOptions.day}</ListSubheader>
                                {dayOptions.options.map(option =>
                                    <ListItemButton
                                        key={option.id}
                                        onClick={() => handleToggle(option, dayOptions.day)}
                                    >
                                        <Checkbox edge="start" checked={checkedOptions.findIndex((x) => compareOptionDay(x, dayOptions.day, option)) !== -1} />
                                        <ListItemText>
                                            {option.from + " - " + option.to}
                                        </ListItemText>
                                    </ListItemButton>
                                )}
                            </React.Fragment>
                        }
                        )}
                    </List >
                </CardContent>
                <CardActions>
                    <SubmitStudentsFormButton checkedOptions={checkedOptions} />
                </CardActions>
            </Card>
        </>
    )
}
