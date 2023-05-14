import { Day, Student, StudentData, Term } from "../types/types";
import { InputTerm } from "../components/teacher-form/InputDateForm";

const days: Term[] = [
    { id: 0, startTime: "15:00", endTime: "16:30", dayOfWeek: Day.Monday, voteList: [] },
    { id: 1, startTime: "14:00", endTime: "15:30", dayOfWeek: Day.Monday, voteList: [] },
    { id: 2, startTime: "15:00", endTime: "16:30", dayOfWeek: Day.Friday, voteList: [] },
    { id: 3, startTime: "15:00", endTime: "16:30", dayOfWeek: Day.Thursday, voteList: [] },
    { id: 4, startTime: "15:00", endTime: "16:30", dayOfWeek: Day.Tuesday, voteList: [] }
];

const baseUrl = 'http://localhost:8081'

export const fetchTerms = async (): Promise<Term[]> => {
    return days;
}

export const fetchFormLink = async (): Promise<string> => {
    return "https://forms.gle/9x6U1k6U1zY2ZK6J8";
}

export const sendStudentData = async (studentData: StudentData) => {
    const student: Student = {
        name: studentData.name,
        surname: studentData.surname,
        album: parseInt(studentData.album),
        mail: studentData.email,
        fieldOfStudy: studentData.fieldOfStudy,
        faculty: studentData.faculty,
    };

    console.log("Received data: ", student);

    return Math.floor(Math.random() * 1000);
};


export async function createNewTerms(availableDates: InputTerm[]) {
    try {
      const termsUrl = `${baseUrl}/terms`;
      const response = await fetch(termsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(availableDates)
      });      
      return response.json
    } catch (error) {
      console.error(error);
    }
  }
