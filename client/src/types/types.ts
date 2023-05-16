export enum Day {
    Monday = "MONDAY",
    Tuesday = "TUESDAY",
    Wednesday = "WEDNESDAY",
    Thursday = "THURSDAY",
    Friday = "FRIDAY",
    Saturday = "SATURDAY",
    Sunday = "SUNDAY"
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
    id?: number;
    name: string;
    surname: string;
    album: number;
    mail: string;
    fieldOfStudy: string;
    faculty: string;
    generalComment?: string;
}
