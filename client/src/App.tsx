import ShareFormCard from "./components/share-form/ShareFormCard";
import { StudentsForm } from "./components/students-form/StudentsForm";
import { InputDateForm } from "./components/teacher-form/InputDateForm";

export const App = () => {
  return (
    <div>
      <InputDateForm></InputDateForm>
      <br />
      <StudentsForm></StudentsForm>
      <br />
      <div style={{ width: '40%' }}>
        <ShareFormCard></ShareFormCard>
      </div>
    </div>
  );
}

