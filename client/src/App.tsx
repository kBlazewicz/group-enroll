import ResponsiveAppBar from "./components/layout/Nav";
import { StudentsForm } from "./components/students-form/StudentsForm";
import { Routes, Route } from "react-router-dom";
import { Stack } from "@mui/material";
import { InputDateForm } from "./components/teacher-form/InputDateForm";
import { Home } from "./components/layout/Home";
import { FormAnswer } from "./components/layout/FormAnswer";
import { FormCreator } from "./components/layout/FormCreator";
import { Result } from "./components/layout/Result";
import { ShareFormCard } from "./components/share-form/ShareFormCard";
import { StudentDataForm } from "./components/student-data-form/StudentDataForm";


export const App = () => {
  return (
    <Stack style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%'
    }}>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Routes>
        <Route path="/" element={
          <Home>
            {/* tutaj dodajemy kompoenenty dla strony wejściowej, nie wiem jeszcze co tu ma być */}
            <ShareFormCard></ShareFormCard>
          </Home>} />
        <Route path="/form creator" element={
          <FormCreator>
            {/* tutaj dodajemy kompoenenty dla formularza prowadzącego */}
            <InputDateForm></InputDateForm>
            <ShareFormCard></ShareFormCard>
          </FormCreator>} />
        <Route path="/form answers" element={
          <FormAnswer>
            {/* tutaj dodajemy kompoenenty dla formularza studenta */}
            <StudentDataForm></StudentDataForm>
            <StudentsForm></StudentsForm>
          </FormAnswer>} />
        <Route path="/results" element={
          <Result>
            {/* tutaj dodajemy kompoenenty dla wynikow */}
            <StudentsForm></StudentsForm>
          </Result>} />
      </Routes>
    </Stack>
  );
}

