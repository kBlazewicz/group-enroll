import { Group, Vote } from "../../types/types";
import { Paper, Card, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

interface GroupsListProps {
    groups: Group[];
    votes: Vote[];
}

export const GroupsList: React.FC<GroupsListProps> = ({ groups, votes }) => {

    return (
        <>
            <Card component={Paper} sx={{ minWidth: 500 }}>
                <Typography variant="h4">Wygenerowane grupy</Typography>
                <List sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                    {groups.map(group => {
                        return (
                            <ListItem key={group.term.id}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}> {group.term.dayOfWeek}
                                    <Typography variant="h6" sx={{ color: 'grey' }}>{group.term.startTime} {group.term.endTime}</Typography>
                                    <Divider />

                                    <Typography variant="h6">Mogą</Typography>
                                    <List>
                                        {group.students.filter(student => {
                                            return votes.some(vote => vote.termId === group.term.id && vote.studentId === student.id && vote.possibility)
                                        }).sort((studentA, studentB) => {
                                            return studentA.surname.localeCompare(studentB.surname)
                                        }).map(student => {
                                            return (
                                                <ListItem key={student.id}>
                                                    <ListItemText primary={`${student.surname} ${student.name}`} />
                                                </ListItem>
                                            )
                                        })
                                        }
                                    </List>
                                    <Divider />

                                    <Typography variant="h6">Nie mogą</Typography>
                                    <List>
                                        {group.students.filter(student => {
                                            return votes.some(vote => vote.termId === group.term.id && vote.studentId === student.id && !vote.possibility)
                                        }).sort((studentA, studentB) => {
                                            return studentA.surname.localeCompare(studentB.surname)
                                        }).map(student => {
                                            return (
                                                <ListItem key={student.id}>
                                                    <ListItemText primary={`${student.surname} ${student.name}`} />
                                                </ListItem>
                                            )
                                        })
                                        }
                                    </List>
                                </Typography>
                            </ListItem>
                        )
                    }
                    )}
                </List>
            </Card>
        </>
    )

}
