import { Day, Student, StudentData, Term } from "../types/types";
import { InputTerm } from "../components/teacher-form/InputDateForm";

const baseURL = "http://localhost:8081"

const days: Term[] = [
    { id: 0, startTime: "15:00", endTime: "16:30", dayOfWeek: Day.Monday, voteList: [] },
    { id: 1, startTime: "14:00", endTime: "15:30", dayOfWeek: Day.Monday, voteList: [] },
    { id: 2, startTime: "15:00", endTime: "16:30", dayOfWeek: Day.Friday, voteList: [] },
    { id: 3, startTime: "15:00", endTime: "16:30", dayOfWeek: Day.Thursday, voteList: [] },
    { id: 4, startTime: "15:00", endTime: "16:30", dayOfWeek: Day.Tuesday, voteList: [] }
];

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

export const sendLoginRequest = async (username: string, password: string) => {
    const endpoint = baseURL + '/login';
    const requestBody = JSON.stringify({ username, password });

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: requestBody,
    });

    return response;
};


export const sendRegisterRequest = async (username: string, password: string, repeatPassword: string) => {
    const endpoint = baseURL + '/register';
    const requestBody = JSON.stringify({ username, password, repeatPassword });

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: requestBody,
    });

    return response;
};

export const generateGroups =async (numberOfGroups:number) => {
    console.log(numberOfGroups);

    // API interaction

}


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

