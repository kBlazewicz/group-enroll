import { Group, Vote } from "../../types/types";

interface GroupsListProps {
    groups: Group[];
    votes: Vote[];
}

export const GroupsList: React.FC<GroupsListProps> = ({ groups, votes }) => {
    
    return (
        <>
            <h2>Wygenerowane grupy</h2>
            <ul style={{
                listStyleType: "none",
                paddingLeft: 0,
                marginLeft: 0,
                display: "flex",
                flexDirection: "row",
                }}>
                {groups.length === 0 && "No groups generated"}
                {groups.map(group => {
                    return (
                            <li key={group.term.id} style={{ margin: 5, padding: 5, paddingTop: 0, backgroundColor: "#d45bafa0", borderRadius: 3}}>
                                <h3>{group.term.dayOfWeek} {group.term.startTime} - {group.term.endTime}</h3>
                                <ul style={{listStyleType: "none", paddingLeft: 0, marginLeft: 0}}>
                                    {group.students.map(student => {
                                        return (
                                            <li key={student.id}>
                                                {student.name} {student.surname}: {votes.some(vote => vote.termId === group.term.id && vote.studentId === student.id && vote.possibility) ? "Tak" : "Nie"}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                    )
                })}
            </ul>
        </>
    )

}
