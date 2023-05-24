import { GroupsNumberForm } from "./GroupsNumberForm";
import { GroupsExport } from "./GroupsExport";
import { GroupsList } from "./GroupsList";
import { useState, useEffect } from "react";
import { Group, Vote, Term, Student } from "../../types/types";
import { fetchVotes, fetchTerms, fetchStudents } from "../../api/api-utils";
import { VotesSummary } from "./VotesSummary";

export function GroupsView() {
    const [groups, setGroups] = useState<Group[]>([]);
    const [votes, setVotes] = useState<Vote[]>([]);
    const [terms, setTerms] = useState<Term[]>([]);
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
            Promise.all([
                fetchVotes(),
                fetchTerms(),
                fetchStudents(),
            ]).then(([votes, terms, students]) => {
                setVotes(votes);
                setTerms(terms);
                setStudents(students);
            })
        }, [])

    function renderGroups(groups: Group[]) {
        setGroups(groups);
    }

    return (
        <div style={{textAlign: "center", fontFamily:"system-ui"}}>
            <VotesSummary votes={votes} terms={terms} students={students}></VotesSummary>
            <GroupsNumberForm onSubmit={renderGroups}></GroupsNumberForm>
            <GroupsList groups={groups} votes={votes}></GroupsList>
            <GroupsExport groups={groups} votes={votes}></GroupsExport>
        </div>
    )
}