export enum Day {
    Monday = "Poniedziałek",
    Tuesday = "Wtorek",
    Wednesday = "Środa",
    Thursday = "Czwartek",
    Friday = "Piątek",
    Saturday = "Sobota",
    Sunday = "Niedziela"
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