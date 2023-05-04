import StudentDataForm from "./components/student-data-form/StudentDataForm";
import { StudentsForm } from "./components/students-form/StudentsForm";
import { InputDateForm } from "./components/teacher-form/InputDateForm";

export const App = () => {
  return (
    <div>
      <InputDateForm></InputDateForm>
      <br />
      <StudentsForm></StudentsForm>
      <br />
      <StudentDataForm></StudentDataForm>
    </div>
  );
}

