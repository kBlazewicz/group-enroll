import { Group } from "../../types/types";

interface GroupsListProps {
    groups: Group[];
}

export const GroupsList: React.FC<GroupsListProps> = ({ groups }) => {
    
    return (
        // Make a list with no bullets
        <ul style={{listStyleType: "none", paddingLeft: 0, marginLeft: 0}}>
            {groups.length === 0 && "No groups generated"}
            {groups.map(group => {
                return (
                    <li key={group.term.id}>
                        <h2>Group {group.term.id}</h2>
                        <ul style={{listStyleType: "none", paddingLeft: 0, marginLeft: 0}}>
                            {group.students.map(student => {
                                return (
                                    <li key={student.id}>
                                        {student.name} {student.surname} 
                                    </li>
                                )
                            })}
                        </ul>
                    </li>
                )
            })}
        </ul>
    )

}
