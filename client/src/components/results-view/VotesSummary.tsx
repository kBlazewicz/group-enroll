import { Term, Student, Vote } from "../../types/types";

interface VotesSummaryProps {
    terms: Term[];
    students: Student[];
    votes: Vote[];
}

export const VotesSummary: React.FC<VotesSummaryProps> = ({ terms, students, votes }) => {
    return (
        <>
            <h2>Podsumowanie ankiety</h2>
            {votes.length === 0 && "No votes generated"}
            <ul style={{
                listStyleType: "none",
                display: "flex",
                flexDirection: "row",
            }}>
                <li style={{ margin: 5, padding: 5, backgroundColor: "#49c46a50", borderRadius: 3, paddingLeft: 0 }}>
                    <ul style={{ listStyleType: "none" }}>
<<<<<<< HEAD
                        <li style={{ marginBottom: 15 }}><b>{votes.length !== 0 && "Imię i nazwisko"}</b></li>
=======
                        <li style={{ marginBottom: 15 }}><b>Imię i nazwisko</b></li>
>>>>>>> a15c9b0 (Added votes summary in the results view)
                        {students.map(student => {
                            return (
                                <li key={student.id}>
                                    {student.name} {student.surname}
                                </li>
                            )
                        })}
                    </ul>
                </li>
                {terms.map(term => {
                    return (
                        <li key={term.id} style={{ margin: 5, padding: 5, backgroundColor: "#4287f550", borderRadius: 3 }}>
                            <b>{term.dayOfWeek}</b>
                            <p style={{ padding: 0, margin: 0 }}>{term.startTime} - {term.endTime}</p>
                            <ul style={{ listStyleType: "none" }}>
                                {students.map(student => {
                                    return (
                                        <li key={student.id}>
                                            {votes.some(vote => vote.termId === term.id && vote.studentId === student.id && vote.possibility) ? "Tak" : "Nie"}
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })
                }
            </ul>
        </>
    )
}