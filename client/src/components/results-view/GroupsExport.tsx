import { Group, Vote } from "../../types/types";
import { CSVLink } from "react-csv";
import { Button } from '@material-ui/core';

interface GroupExportProps {
    groups: Group[];
    votes: Vote[];
}

export const GroupsExport: React.FC<GroupExportProps> = ({ groups, votes }) => {

    if (groups.length === 0) {
        return null;
    }

    function isHappy(studentId: number | undefined, termId: number) {
        if (!studentId) {
            return "unknown";
        }
        return votes.some(
            vote => vote.studentId === studentId &&
                vote.termId === termId &&
                vote.possibility
        ) ? "happy" : "unhappy";
    }

    const csvData: string[][] = [[...groups.map(group => group.term.dayOfWeek + " " + group.term.startTime + " - " + group.term.endTime)]];
    for (let i = 0; i < groups[0].students.length; i++) {
        csvData.push([]);
        for (let j = 0; j < groups.length; j++) {
            if (groups[j].students.length > i) {
                var student = groups[j].students[i];
                csvData[i + 1][j] = student.name + " " + student.surname + " - " + isHappy(student.id, groups[j].term.id);
            }
        }
    }

    return (
        <form style={{ textAlign: "center", fontFamily: "system-ui" }}>
            <br/>
            <CSVLink data={csvData}>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ padding: "6px 12px" }}>
                    Pobierz grupy
                </Button>
            </CSVLink>
        </form>
    )
}