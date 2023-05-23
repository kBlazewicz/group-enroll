import { GroupsNumberForm } from "./GroupsNumberForm";
import { GroupsList } from "./GroupsList";
import { useState } from "react";
import { Group } from "../../types/types";

export function GroupsView() {
    const [groups, setGroups] = useState<Group[]>([]);

    function renderGroups(groups: Group[]) {
        setGroups(groups);
    }

    return (
        <div style={{textAlign: "center", fontFamily:"system-ui"}}>
            <GroupsNumberForm onSubmit={renderGroups}></GroupsNumberForm>
            <h2>Generated groups</h2>
            <GroupsList groups={groups}></GroupsList>
        </div>
    )
}