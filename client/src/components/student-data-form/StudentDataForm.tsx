import React, { useState } from "react";
import { TextField, Button, Card, CardContent } from "@material-ui/core";
import { StudentData } from "../../types/types";
import { sendStudentData } from "../../api/api-utils";
import { Typography } from "@mui/material";

const StudentDataForm: React.FC = () => {
    const [studentData, setStudentData] = useState<StudentData>({
        name: "",
        surname: "",
        album: "",
        email: "",
        faculty: "",
        fieldOfStudy: "",
    });

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        try {
            const id = await sendStudentData(studentData);
            console.log("Received ID:", id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStudentData({
            ...studentData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Card style={{minWidth: 500}}>
            <CardContent style={{display: "flex", flexDirection: "column"}}>
                <Typography variant="h5" component="h2">
                    Podaj swoje dane
                </Typography>
                <TextField
                    label="Name"
                    name="name"
                    value={studentData.name}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    label="Surname"
                    name="surname"
                    value={studentData.surname}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    label="Album Number"
                    name="album"
                    value={studentData.album}
                    onChange={handleInputChange}
                    required
                    inputMode="numeric"
                    onKeyPress={(event) => {
                        const keyCode = event.keyCode || event.which;
                        const keyValue = String.fromCharCode(keyCode);
                        const isNumber = /^\d+$/.test(keyValue);
                        const isLengthValid = studentData.album.length < 8;
                        if (!isNumber || !isLengthValid) {
                            event.preventDefault();
                        }
                    }}
                />
                <TextField
                    label="Email"
                    name="email"
                    value={studentData.email}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    label="Faculty"
                    name="faculty"
                    value={studentData.faculty}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    label="Field of Study"
                    name="fieldOfStudy"
                    value={studentData.fieldOfStudy}
                    onChange={handleInputChange}
                    required
                />
                <Button
                    style={{ marginTop: 20, width: 100 }}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    size="medium"
                >
                    Submit
                </Button>
            </CardContent>
        </Card>
    );
};

export default StudentDataForm;
