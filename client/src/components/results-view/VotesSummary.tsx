import { Term, Student, Vote } from "../../types/types";
import { Paper, Card, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

interface VotesSummaryProps {
    terms: Term[];
    students: Student[];
    votes: Vote[];
}

export const VotesSummary: React.FC<VotesSummaryProps> = ({ terms, students, votes }) => {
    return (
        <>
            <Card component={Paper} sx={{ minWidth: 500 }}>
                <Typography variant="h4">Podsumowanie ankiety</Typography>
                <List sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                    {terms.map(term => {
                        return (
                            <ListItem key={term.id}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}> {term.dayOfWeek}
                                    <Typography variant="h6" sx={{ color: 'grey' }}>{term.startTime} {term.endTime}</Typography>
                                    <Divider />

                                    <Typography variant="h6">Mogą</Typography>
                                    <List>
                                        {students.filter(student => {
                                            return votes.some(vote => vote.termId === term.id && vote.studentId === student.id && vote.possibility)
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
                                        {students.filter(student => {
                                            return votes.some(vote => vote.termId === term.id && vote.studentId === student.id && !vote.possibility)
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
                    })}
                </List>
            </Card>
        </>
    )
}