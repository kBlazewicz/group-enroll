import {Stack} from "@mui/material";
import ShareFormCard from "./components/share-form/ShareFormCard";
import StudentDataForm from "./components/student-data-form/StudentDataForm";
import {StudentsForm} from "./components/students-form/StudentsForm";
import {InputDateForm} from "./components/teacher-form/InputDateForm";

export const App = () => {
    return (
        <Stack style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40%',
        }}>
            <InputDateForm></InputDateForm>
            <br/>
            <StudentsForm></StudentsForm>
            <br/>
            <ShareFormCard></ShareFormCard>
            <br/>
            <StudentDataForm></StudentDataForm>
        </Stack>

    );
}

