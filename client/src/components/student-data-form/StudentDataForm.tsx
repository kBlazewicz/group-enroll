import React, { useState } from "react";
import { TextField, Button, Card, CardContent } from "@material-ui/core";
import { Student } from "../../types/types";
import { sendStudentData } from "../../api/api-utils";
import { Typography } from "@mui/material";
import { StudentsForm } from "../students-form/StudentsForm";


export const StudentDataForm = () => {
    const [studentData, setStudentData] = useState<Student>({
        name: "",
        surname: "",
        album: 0,
        mail: "",
        faculty: "",
        fieldOfStudy: "",
    });

    const [savedStudentId, setSavedStudentId] = useState<number>(-1);

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (isValidEmail(studentData.mail) && isValidAlbum(studentData.album)) {
            try {
                const id = await sendStudentData(studentData);
                console.log("Received ID:", id);
                setSavedStudentId(id);

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

    const isValidAlbum = (index: number) => {
        return (index >= 0 && index < 1000000)
    }

    
    return (
        <div>
            <Card style={{ minWidth: 500 }}>
                <CardContent style={{ display: "flex", flexDirection: "column"}}>
                    <Typography variant="h5" component="h2">
                        Podaj swoje dane
                    </Typography>
                    <form autoComplete="off" onSubmit={handleSubmit} style={{ textAlign: "center"}}>
                        <TextField
                            label="Imię"
                            name="name"
                            value={studentData.name}
                            onChange={handleInputChange}
                            required
                        />
                        <br/><br/>
                        <TextField
                            label="Naziwsko"
                            name="surname"
                            value={studentData.surname}
                            onChange={handleInputChange}
                            required
                        />
                        <br/><br/>
                        <TextField
                            label="Numer albumu"
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
                            error={!isValidAlbum(studentData.album)}
                            helperText={isValidAlbum(studentData.album) ? '' : 'Invalid album number'}
                        />
                        <br/><br/>
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
                        <br/><br/>
                        <TextField
                            label="Wydział"
                            name="faculty"
                            value={studentData.faculty}
                            onChange={handleInputChange}
                            required
                        />
                        <br/><br/>
                        <TextField
                            label="Kierunek"
                            name="fieldOfStudy"
                            value={studentData.fieldOfStudy}
                            onChange={handleInputChange}
                            required
                        />
                        <br/><br/>
                        <Button
                            style={{ marginTop: 20, width: 100 }}
                            variant="contained"
                            color="primary"
                            size="medium"
                            type="submit"
                        >
                            Submit
                        </Button>

                    </form>
                </CardContent>
            </Card>
            
            <br/><br/>

            <StudentsForm studentId={savedStudentId}/>
        </div>
    );
};
