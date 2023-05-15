import ResponsiveAppBar from "./components/layout/Nav";
import { StudentsForm } from "./components/students-form/StudentsForm";
import { Routes, Route } from "react-router-dom";
import Home from "./components/layout/Home";
import FormCreator from "./components/layout/FormCreator";
import FormAnswer from "./components/layout/FormAnswer";
import Result from "./components/layout/Result";
import { Stack } from "@mui/material";
import { InputDateForm } from "./components/teacher-form/InputDateForm";
import StudentDataForm from "./components/student-data-form/StudentDataForm";
import ShareFormCard from "./components/share-form/ShareFormCard";
import {GroupsNumberForm} from './components/results-view/GroupsNumberForm'

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
            <div>Home page</div><ShareFormCard></ShareFormCard>
          </Home>} />
        <Route path="/form-creator" element={
          <FormCreator>
            {/* tutaj dodajemy kompoenenty dla formularza prowadzącego */}
            <div></div>
            <InputDateForm></InputDateForm>
            <ShareFormCard></ShareFormCard>
          </FormCreator>} />
        <Route path="/form-answers" element={
          <FormAnswer>
            {/* tutaj dodajemy kompoenenty dla formularza studenta */}
            <div></div>
            <StudentDataForm></StudentDataForm>
            <StudentsForm></StudentsForm>
          </FormAnswer>} />
        <Route path="/results" element={
          <Result>
            {/* tutaj dodajemy kompoenenty dla wynikow */}
            <div></div><GroupsNumberForm></GroupsNumberForm>
          </Result>} />
      </Routes>
    </Stack>
  );
}

