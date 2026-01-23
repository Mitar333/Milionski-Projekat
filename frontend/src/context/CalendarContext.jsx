import toast from "react-hot-toast";
import { useState } from "react";
import { months } from "../utils/constants";
import {
  getMax,
  getNastavak,
  getPrviUMjesecu,
  prvaSedmicaa,
} from "../utils/calendarHelpers";
import { CalendarContext } from "../hooks/useCalendar";

export function CalendarProvider({ children }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [day, setDay] = useState(new Date().getDate());
  const [month, setMonth] = useState(new Date().getMonth());
  const [dayOfWeek, setDayOfWeek] = useState(new Date().getDay());
  const [active, setActive] = useState(day);

  let prviUMjesecu = getPrviUMjesecu(month, year);

  const max = getMax(month, year);
  const prvaSedmica = prvaSedmicaa(year, month);
  const prvaSedmicaSledecegMjeseca = prvaSedmicaa(
    month === 11 ? year + 1 : year,
    month === 11 ? 0 : month + 1,
  );
  const nedelja = prvaSedmica.at(6);
  const nastavak = getNastavak(day);

  function handleNextMonth() {
    setActive("");
    setDay("");
    setDayOfWeek("");
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
  }
  function handlePrevMonth() {
    setDay("");
    setDayOfWeek("");
    setActive("");
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  }

  function handleSelectDay(dan, k, sledeci, prosli) {
    let k2 = k === 7 ? 0 : k;
    let dan2 = dan + 1 > max ? dan - max + 1 : dan;
    if (prosli) dan2 = dan;

    let targetMonth = month;
    let targetYear = year;

    if (prosli) {
      targetMonth = month === 0 ? 11 : month - 1;
      targetYear = month === 0 ? year - 1 : year;
    } else if (sledeci) {
      targetMonth = month === 11 ? 0 : month + 1;
      targetYear = month === 11 ? year + 1 : year;
    }

    const selectedDate = new Date(targetYear, targetMonth, dan2);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      toast.error("Ne možete mijenjati radno vrijeme za datume u prošlosti");
      return 5; //bilo sta da returnujem da mogu prepoznati da nisu usojesno promjenjeni d m g a dw
    }

    if (prosli || sledeci) {
      setMonth(targetMonth);
      setYear(targetYear);
    }
    setActive(dan2);
    setDay(dan2);
    setDayOfWeek(k2);
  }

  return (
    <CalendarContext.Provider
      value={{
        day,
        dayOfWeek,
        nastavak,
        month,
        year,
        active,
        prviUMjesecu,
        max,
        nedelja,
        months,
        prvaSedmica,
        prvaSedmicaSledecegMjeseca,
        handleNextMonth,
        handleSelectDay,
        handlePrevMonth,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
