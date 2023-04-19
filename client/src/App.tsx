import ResponsiveAppBar from './components/layout/Nav';
import { StudentsForm } from './components/students-form/StudentsForm';
import { Routes, Route } from 'react-router-dom';
import Home from './components/layout/Home';
import FormCreator from './components/layout/FormCreator';
import FormAnswer from './components/layout/FormAnswer';
import Result from './components/layout/Result';
import { Stack } from '@mui/material';

export const App = () => {
  return (
    <Stack
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        margin: 0,
      }}
    >
      <ResponsiveAppBar></ResponsiveAppBar>
      <Routes>
        <Route
          path="/"
          element={
            <Home>
              {/* tutaj dodajemy kompoenenty dla strony wejściowej, nie wiem jeszcze co tu ma być */}
              <div>HEllo</div>
              <div>Home page</div>
            </Home>
          }
        />
        <Route
          path="/form creator"
          element={
            <FormCreator>
              {/* tutaj dodajemy kompoenenty dla formularza prowadzącego */}
              <div>HEllo</div>
              <div>Form creator</div>
            </FormCreator>
          }
        />
        <Route
          path="/form answers"
          element={
            <FormAnswer>
              {/* tutaj dodajemy kompoenenty dla formularza studenta */}
              <div>HEllo</div>
              <div>Form answe</div>
            </FormAnswer>
          }
        />
        <Route
          path="/results"
          element={
            <Result>
              {/* tutaj dodajemy kompoenenty dla wynikow */}
              <div>HEllo</div>
              <div>Results</div>
              <StudentsForm></StudentsForm>
            </Result>
          }
        />
      </Routes>
    </Stack>
  );
};
