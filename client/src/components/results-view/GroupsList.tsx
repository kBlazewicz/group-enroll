import { Group } from "../../types/types";

interface GroupsListProps {
    groups: Group[];
}

export const GroupsList: React.FC<GroupsListProps> = ({ groups }) => {
    
    return (
        <ul>
            {groups.length === 0 && "No groups generated"}
            {groups.map(group => {
                return (
                    <li key={group.term.id}>
                        <h2>Group {group.term.id}</h2>
                        <ul>
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
