import { Student, Term, Vote, Group } from "../types/types";
import { InputTerm } from "../components/teacher-form/InputDateForm";
import { AuthManagerService } from "../services/AuthManagerService";


export const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
export const clientBaseUrl = process.env.REACT_APP_CLIENT_BASE_URL;

export const fetchSurvey = async (guid: string) => {
    return await fetch(`${apiBaseUrl}/survey/${guid}`);
}

export const fetchTerms = async (): Promise<Term[]> => {
    const response = await fetch(`${apiBaseUrl}/terms`);
    return response.json();
}

export const sendStudentData = async (student: Student): Promise<number> => {
    const endpoint = apiBaseUrl + '/student';
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

export const fetchStudents = async (): Promise<Student[]> => {
    const response = await fetch(`${apiBaseUrl}/student`);
    return response.json();
}

export const sendLoginRequest = async (username: string, password: string) => {
    const endpoint = apiBaseUrl + '/login';
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
            "Content-Type": "application/json",
        }
    };

    const response = await fetch(`${apiBaseUrl}/votes`, options);

    return response;
};

export const fetchVotes = async (): Promise<Vote[]> => {
    const response = await fetch(`${apiBaseUrl}/votes`);
    return response.json();
}

export const sendRegisterRequest = async (username: string, password: string, repeatPassword: string) => {
    const endpoint = apiBaseUrl + '/register';
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
    // 'Authorization': `Bearer ${AuthManagerService.getToken()}`,, // Dodaj token do nagłówka 'Authorization'

    const response = await fetch(`${apiBaseUrl}/groups/${numberOfGroups}`);
    return response.json();
}


export const createNewTerms = async (availableDates: InputTerm[]): Promise<string> => {
    try {
        const termsUrl = `${apiBaseUrl}/terms`;
        const response = await fetch(termsUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AuthManagerService.getToken()}`,
            },
            body: JSON.stringify(availableDates)
        });
        if (response.ok) {
            return response.text();
        }
        throw new Error('Failed to create new terms');
    } catch (error) {
        console.log(error);
        throw new Error('Failed to connect with api');
    }
}

export const getUserRole = async (username: string): Promise<string> => {
    const endpoint = `${apiBaseUrl}/user-role/${username}`;
    const response = await fetch(endpoint);

    if (response.ok) {
        const userRole = await response.json();
        return userRole as string;
    } else {
        throw new Error('Failed to fetch user role');
    }
};
