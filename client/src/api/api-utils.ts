import { Day, DayOptions } from "../types/types";

const days: DayOptions[] = [
    { options: [{ id: 1, from: "15:00", to: "16:30" }, { id: 2, from: "12:30", to: "14:00" }, { id: 3, from: "13:00", to: "14:30" }], day: Day.Monday },
    { options: [{ id: 1, from: "15:00", to: "16:30" }, { id: 2, from: "12:30", to: "14:00" }, { id: 3, from: "13:00", to: "14:30" }], day: Day.Tuesday },
    { options: [{ id: 1, from: "15:00", to: "16:30" }, { id: 2, from: "12:30", to: "14:00" }, { id: 3, from: "13:00", to: "14:30" }], day: Day.Wednesday },
    { options: [{ id: 1, from: "15:00", to: "16:30" }, { id: 2, from: "12:30", to: "14:00" }, { id: 3, from: "13:00", to: "14:30" }], day: Day.Thursday },
    { options: [{ id: 1, from: "15:00", to: "16:30" }, { id: 2, from: "12:30", to: "14:00" }, { id: 3, from: "13:00", to: "14:30" }], day: Day.Friday },
];

export const fetchDayOptions = async (): Promise<DayOptions[]> => {
    return days;
}