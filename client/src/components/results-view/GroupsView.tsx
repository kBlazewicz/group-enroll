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
        <>
            <GroupsNumberForm onSubmit={renderGroups}></GroupsNumberForm>
            <h1>Generated groups</h1>
            <GroupsList groups={groups}></GroupsList>
        </>
    )
}