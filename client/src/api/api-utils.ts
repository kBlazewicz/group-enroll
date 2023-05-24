import { Student, Term, Vote, Group } from "../types/types";
import { InputTerm } from "../components/teacher-form/InputDateForm";


export const baseUrl = "http://localhost:8081"


export const fetchTerms = async (): Promise<Term[]> => {
    const response = await fetch(`${baseUrl}/terms`);
    return response.json();
}

export const fetchFormLink = async (): Promise<string> => {
    return "https://forms.gle/9x6U1k6U1zY2ZK6J8";
}

export const sendStudentData = async (student: Student): Promise<number> => {
    const endpoint = baseUrl + '/student';
    const requestBody = JSON.stringify(student);
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: requestBody,
    });

    if (response.ok) {
        const studentId = await response.json();
        return studentId as number;
    } else {
        throw new Error('Failed to send student data');
    }
};

export const sendLoginRequest = async (username: string, password: string) => {
    const endpoint = baseUrl + '/login';
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
};

export const fetchVotes = async (): Promise<Vote[]> => {
    const response = await fetch(`${baseUrl}/votes`);
    return response.json();
}

export const sendRegisterRequest = async (username: string, password: string, repeatPassword: string) => {
    const endpoint = baseUrl + '/register';
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

export const generateGroups = async (numberOfGroups: number): Promise<Group[]> => {
    console.log(numberOfGroups);

    const response = await fetch(`${baseUrl}/groups/${numberOfGroups}`);
    return response.json();
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
        if (response.ok) {
            return response.text();
        }
    } catch (error) {
        console.error(error);
    }
}

