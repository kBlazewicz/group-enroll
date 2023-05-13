import { Button, TextField, InputLabel, Typography } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { gerateGroups } from '../../api/api-utils'

export const GroupsNumberForm = () => {
    const [groupsNumber, setGroupsNumber] = useState<number>(10);

    const handleGroupsNumberChange =(e : React.ChangeEvent<HTMLInputElement>) =>{
        if(e.target.value != null){
            setGroupsNumber(parseInt(e.target.value))
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        gerateGroups(groupsNumber)
      }

      return (   
        <div style={{ textAlign: "center", 
                      fontFamily: "system-ui",  
                      margin: "12px"}}>

            <form onSubmit={handleSubmit}>
                <InputLabel>
                    <Typography variant="h5">
                    Liczba grup
                    </Typography>
                </InputLabel>
                
                <TextField
                required
                name="groupsNum"
                type="number"
                inputProps={{ min: "2", max: "20" }}
                value={groupsNumber.toString()}
                onChange={handleGroupsNumberChange}
                style={{ margin: "10px", padding: "6px 12px" }}/>

                <br/>

                <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ padding: "6px 12px" }}>
                Wygeneruj
                </Button>
            </form>
        </div>
        )
}