import Paper from '@mui/material/Paper';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardContent';
import { SubmitStudentsFormButton } from './SubmitStudentsFormButton';

interface Days {
    options: Option[];
    name: string
}


interface Option {
    id: number;
    from: any;
    to: any;
}

const days: Days[] = [
    { options: [{ id: 1, from: "15:00", to: "16:30" }, { id: 2, from: "12:30", to: "14:00" }, { id: 3, from: "13:00", to: "14:30" }], name: "Monday" },
    { options: [{ id: 1, from: "15:00", to: "16:30" }, { id: 2, from: "12:30", to: "14:00" }, { id: 3, from: "13:00", to: "14:30" }], name: "Tuesday" },
    { options: [{ id: 1, from: "15:00", to: "16:30" }, { id: 2, from: "12:30", to: "14:00" }, { id: 3, from: "13:00", to: "14:30" }], name: "Wednesday" },
    { options: [{ id: 1, from: "15:00", to: "16:30" }, { id: 2, from: "12:30", to: "14:00" }, { id: 3, from: "13:00", to: "14:30" }], name: "Thursday" },
    { options: [{ id: 1, from: "15:00", to: "16:30" }, { id: 2, from: "12:30", to: "14:00" }, { id: 3, from: "13:00", to: "14:30" }], name: "Friday" },
];


export const StudentsForm = () => {
    return (
        <>
            <Card component={Paper} sx={{ maxWidth: 500 }}>
                <CardContent>

                    <List
                        sx={{ maxWidth: 500, maxHeight: 500, overflow: 'auto' }}
                    >
                        {days.map(day => {
                            return <>
                                <ListSubheader>{day.name}</ListSubheader>
                                {day.options.map(option =>
                                    <ListItem
                                        key={option.id}
                                    >
                                        <Checkbox edge="start" />
                                        <ListItemText>
                                            {option.from + " - " + option.to}
                                        </ListItemText>
                                    </ListItem>
                                )}
                            </>
                        }
                        )}
                    </List >
                </CardContent>
                <CardActions>
                    <SubmitStudentsFormButton />
                </CardActions>
            </Card>
        </>
    )
}
