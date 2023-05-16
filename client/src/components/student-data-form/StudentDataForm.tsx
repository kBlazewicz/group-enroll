import React, { useState } from "react";
import { TextField, Button, Card, CardContent } from "@material-ui/core";
import { Student } from "../../types/types";
import { sendStudentData } from "../../api/api-utils";
import "./StudentDataForm.css";
import { Typography } from "@mui/material";

export const StudentDataForm: React.FC = () => {
    const [studentData, setStudentData] = useState<Student>({
        name: "",
        surname: "",
        album: 0,
        mail: "",
        faculty: "",
        fieldOfStudy: "",
    });
    const [id, setId] = useState<number | null>(null);

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        try {
            const id = await sendStudentData(studentData);
            setId(id);
            console.log("Received ID:", id);
            setStudentData({
                name: "",
                surname: "",
                album: 0,
                mail: "",
                faculty: "",
                fieldOfStudy: "",
            });
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

    const isValidEmail = (mail: string) => {
        if (mail.length === 0) return true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(mail);
    };

    return (
        <Card className="form-card">
            <CardContent className="fields-container">
                <Typography variant="h5" component="h2">
                    Podaj swoje dane
                </Typography>
                <TextField
                    label="Name"
                    name="name"
                    value={studentData.name}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                />
                <TextField
                    label="Surname"
                    name="surname"
                    value={studentData.surname}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                />
                <TextField
                    label="Album Number"
                    name="album"
                    value={studentData.album}
                    onChange={(event) => {
                        const value = parseInt(event.target.value, 10);
                        if (!isNaN(value)) {
                            setStudentData((prevData) => ({
                                ...prevData,
                                album: value,
                            }));
                        }
                    }}
                    required
                    inputMode="numeric"
                    onKeyPress={(event) => {
                        const keyCode = event.keyCode || event.which;
                        const keyValue = String.fromCharCode(keyCode);
                        const isNumber = /^\d+$/.test(keyValue);
                        if (!isNumber) {
                            event.preventDefault();
                        }
                    }}
                    className="input-field"
                />
                <TextField
                    label="Mail"
                    name="mail"
                    value={studentData.mail}
                    onChange={handleInputChange}
                    required
                    error={!isValidEmail(studentData.mail)}
                    helperText={isValidEmail(studentData.mail) ? '' : 'Invalid email address'}
                    className="input-field"
                />
                <TextField
                    label="Faculty"
                    name="faculty"
                    value={studentData.faculty}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                />
                <TextField
                    label="Field of Study"
                    name="fieldOfStudy"
                    value={studentData.fieldOfStudy}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                />
                <Button
                    style={{ margin: "10px" }}
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
