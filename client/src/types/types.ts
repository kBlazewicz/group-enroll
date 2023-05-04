export enum Day {
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
    Sunday = "Sunday"
};

export const getDays = (): Day[] => Object.values(Day).filter(day => typeof day === 'string');

export interface Vote {
    id: number;
    studentId: number;
    possibility: boolean;
}

export interface Term {
    id: number;
    startTime: any;
    endTime: any;
    dayOfWeek: Day
    voteList: Vote[]
}

export interface Student {
    id: number;
    name: string;
    surname: string;
    album: number;
    mail: string;
    generalComment: string;
}