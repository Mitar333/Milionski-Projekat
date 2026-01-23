import { createContext, useContext } from "react";
export const CalendarContext = createContext();
export function useCalendar() {
  const context = useContext(CalendarContext);
  if (context === undefined)
    throw new Error("koristio si izvan opsega useCalendar");
  return context;
}
