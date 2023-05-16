import ResponsiveAppBar from "./components/layout/Nav";
import { StudentsForm } from "./components/students-form/StudentsForm";
import { Routes, Route } from "react-router-dom";
import { Stack } from "@mui/material";
import { InputDateForm } from "./components/teacher-form/InputDateForm";
import { LayoutGrid } from "./components/layout/LayoutGrid";
import { ShareFormCard } from "./components/share-form/ShareFormCard";
import { StudentDataForm } from "./components/student-data-form/StudentDataForm";
import LoginForm from "./components/authorization/Login";
import RegisterForm from "./components/authorization/Register";

export const App = () => {
  return (
    <Stack style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
      gap: '10rem',
    }}>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Routes>
        <Route path="/" element={
          <LayoutGrid>
            {/* tutaj dodajemy kompoenenty dla strony wejściowej, nie wiem jeszcze co tu ma być */}
            <ShareFormCard></ShareFormCard>
          </LayoutGrid>} />
        <Route path="/form creator" element={
          <LayoutGrid>
            {/* tutaj dodajemy kompoenenty dla formularza prowadzącego */}
            <InputDateForm></InputDateForm>
            <ShareFormCard></ShareFormCard>
          </LayoutGrid>} />
        <Route path="/form answers" element={
          <LayoutGrid>
            {/* tutaj dodajemy kompoenenty dla formularza studenta */}
            <StudentDataForm></StudentDataForm>
            <StudentsForm></StudentsForm>
          </LayoutGrid>} />
        <Route path="/results" element={
          <LayoutGrid>
            {/* tutaj dodajemy kompoenenty dla wynikow */}
            <StudentsForm></StudentsForm>
          </LayoutGrid>} />
        <Route path="/login" element={
          <LayoutGrid>
            <LoginForm></LoginForm>
          </LayoutGrid>} />
        <Route path="/register" element={
          <LayoutGrid>
            <RegisterForm></RegisterForm>
          </LayoutGrid>} />
      </Routes>
    </Stack >
  );
}

