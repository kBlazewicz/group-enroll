import { Student, StudentData, Term, Vote } from "../types/types";
import { InputTerm } from "../components/teacher-form/InputDateForm";


const baseUrl = "http://localhost:8080";

export const fetchTerms = async (): Promise<Term[]> => {
    const response = await fetch(`${baseUrl}/terms`);
    return response.json();
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

export const sendVotes = async (votes: Vote[]) => {
    const options = {
        method: "POST", 
        body: JSON.stringify(votes),
        headers: {
            "Content-Type": "application/json"
        }
    };    

    const response = await fetch(`${baseUrl}/votes`, options);
    
    return response;
}

export const generateGroups = async (numberOfGroups:number) => {
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

