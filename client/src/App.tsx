import { Routes, Route } from "react-router-dom";
import { Stack } from "@mui/material";
import { LayoutGrid } from "./components/layout/LayoutGrid";
import { LoginForm } from "./components/authorization/Login";
import { RegisterForm } from "./components/authorization/Register";
import { FormCreator } from "./components/layout/FormCreator";
import { NavBar } from "./components/layout/Nav";
import { GroupsView } from "./components/results-view/GroupsView";
import { FormAnswers } from "./components/form-answers/FormAnswers";
import { NotFoundPage } from "./components/layout/NotFoundPage";

export const App = () => {
  return (
    <Stack style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      gap: '1rem'
    }}>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={
          <LayoutGrid>
            <div>Home page</div> 
          </LayoutGrid>} />
        <Route path="/form-creator" element={<FormCreator />} />
        <Route path="/survey/:guid" element={<FormAnswers />} />
        <Route path="/results" element={
          <LayoutGrid>
            <GroupsView></GroupsView>
          </LayoutGrid>} />
        <Route path="/login" element={
          <LayoutGrid>
            <LoginForm></LoginForm>
          </LayoutGrid>} />
        <Route path="/register" element={
          <LayoutGrid>
            <RegisterForm></RegisterForm>
          </LayoutGrid>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Stack >
  );
}
