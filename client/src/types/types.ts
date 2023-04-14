export enum Day {
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday"
};

export interface Vote {
    id: number;
    possibility: boolean;
}

export interface Term {
    id: number;
    startTime: any;
    endTime: any;
    dayOfWeek: Day
    voteList: Vote[]
}