export enum Day {
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday"
};

export interface DayOptions {
    options: Option[];
    day: Day
}

export interface Option {
    id: number;
    from: any;
    to: any;
}