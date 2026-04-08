import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
} from "date-fns";

export const generateCalendar = (currentDate: Date): Date[] => {
  const startMonth = startOfMonth(currentDate);
  const endMonth = endOfMonth(currentDate);

  const startDate = startOfWeek(startMonth);
  const endDate = endOfWeek(endMonth);

  const days: Date[] = [];
  let day = startDate;

  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  return days;
};

export const isSameDay = (d1: Date, d2: Date) =>
  format(d1, "yyyy-MM-dd") === format(d2, "yyyy-MM-dd");