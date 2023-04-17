import ResponsiveAppBar from "./components/layout/Nav";
import { StudentsForm } from "./components/students-form/StudentsForm";
import { Routes, Route } from "react-router-dom";
import Home from "./components/layout/Home";

export const App = () => {
  return (
    <div>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form creator" element={<StudentsForm />} />
      </Routes>
    </div>
  );
}


