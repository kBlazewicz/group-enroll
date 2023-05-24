import { GroupsNumberForm } from "./GroupsNumberForm";
import { GroupsExport } from "./GroupsExport";
import { GroupsList } from "./GroupsList";
import { useState, useEffect } from "react";
import { Group, Vote } from "../../types/types";
import { fetchVotes } from "../../api/api-utils";

export function GroupsView() {
    const [groups, setGroups] = useState<Group[]>([]);
    const [votes, setVotes] = useState<Vote[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchVotes();
            setVotes(data);
        }
        loadData();
    }, [])

    function renderGroups(groups: Group[]) {
        setGroups(groups);
    }

    return (
        <div style={{textAlign: "center", fontFamily:"system-ui"}}>
            <GroupsNumberForm onSubmit={renderGroups}></GroupsNumberForm>
            <h2>Generated groups</h2>
            <GroupsList groups={groups}></GroupsList>
            {<GroupsExport groups={groups} votes={votes}></GroupsExport>}
        </div>
    )
}