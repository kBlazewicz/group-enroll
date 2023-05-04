import { Day, Term } from "../types/types";

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