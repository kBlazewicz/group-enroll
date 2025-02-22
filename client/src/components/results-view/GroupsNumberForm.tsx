import { Button, TextField, InputLabel, Typography } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { generateGroups } from '../../api/api-utils'
import { Group, Student, Term } from "../../types/types";


interface GroupsNumberFormProps {
    onSubmit: (groups: Group[]) => void;
    students: Student[];
    terms: Term[];
}

export const GroupsNumberForm: React.FC<GroupsNumberFormProps> = ({ onSubmit, students, terms }) => {
    const [groupsNumber, setGroupsNumber] = useState<number>(2);

    const handleGroupsNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setGroupsNumber(parseInt(e.target.value))
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        generateGroups(groupsNumber).then((groups) => onSubmit(groups))
    }

    return (
        <div style={{
            textAlign: "center",
            fontFamily: "system-ui",
            margin: "12px"
        }}>
            <form onSubmit={e => handleSubmit(e)}>
                <InputLabel>
                    <Typography variant="h5">
                        Liczba grup
                    </Typography>
                </InputLabel>

                <TextField
                    required
                    name="groupsNum"
                    type="number"
                    inputProps={{ min: "2", max: Math.min(students.length / 2, terms.length) }}
                    value={groupsNumber.toString()}
                    onChange={handleGroupsNumberChange}
                    style={{ margin: "10px", padding: "6px 12px" }} />

                <br />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ padding: "6px 12px" }}>
                    Wygeneruj
                </Button>
                
            </form>
            <br/>
        </div>
    )
}