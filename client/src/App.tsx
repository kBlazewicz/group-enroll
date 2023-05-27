import { StudentsForm } from "./components/students-form/StudentsForm";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import { LayoutGrid } from "./components/layout/LayoutGrid";
import { StudentDataForm } from "./components/student-data-form/StudentDataForm";
import { GroupsNumberForm } from "./components/results-view/GroupsNumberForm";
import { LoginForm } from "./components/authorization/Login";
import { RegisterForm } from "./components/authorization/Register";
import { FormCreator } from "./components/layout/FormCreator";
import ResponsiveAppBar from "./components/layout/Nav";

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
            <div>Home page</div>
          </LayoutGrid>} />
        <Route path="/form-creator" element={
          <FormCreator />} />
        <Route path="/form-answers" element={
          <LayoutGrid>
            <StudentDataForm></StudentDataForm>
            <StudentsForm></StudentsForm>
          </LayoutGrid>} />
        <Route path="/results" element={
          <LayoutGrid>
            <GroupsNumberForm></GroupsNumberForm>
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
