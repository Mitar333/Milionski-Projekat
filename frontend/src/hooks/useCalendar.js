import { getDay } from "date-fns";
import { useState } from "react";
export const pet = ["", "", "", "", ""];
export const sedam = ["", "", "", "", "", "", ""];
export const daysOfWeek = {
  1: "Ponedjeljak",
  2: "Utorak",
  3: "Srijeda",
  4: "Četvrtak",
  5: "Petak",
  6: "Subota",
  0: "Nedjelja",
};
export const daysOfWeek2 = {
  0: "Ponedjeljak",
  1: "Utorak",
  2: "Srijeda",
  3: "Četvrtak",
  4: "Petak",
  5: "Subota",
  6: "Nedjelja",
};
export function useCalendar() {
  const months = {
    0: [31, "Januar"],
    1: [28, "Februar"],
    2: [31, "Mart"],
    3: [30, "April"],
    4: [31, "Maj"],
    5: [30, "Jun"],
    6: [31, "Jul"],
    7: [31, "Avgust"],
    8: [30, "Septembar"],
    9: [31, "Oktobar"],
    10: [30, "Novembar"],
    11: [31, "Decembar"],
  };

  const [year, setYear] = useState(new Date().getFullYear());
  const [day, setDay] = useState(new Date().getDate());
  const [month, setMonth] = useState(new Date().getMonth());

  const [dayOfWeek, setDayOfWeek] = useState(new Date().getDay());
  const [active, setActive] = useState(day);
  // const [selectedAppointment, setSelectedAppointment] = useState("");

  let prviUMjesecu = getDay(new Date(year, month, 1));
  if (prviUMjesecu === 0) prviUMjesecu = 7;

  let max = months[month].at(0) + 1;

  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  if (max === 29 && isLeap) {
    max++;
  }
  const prvaSedmica = [];

  let datum = 1;
  for (let i = 1; i < 8; i++) {
    if (i < prviUMjesecu) {
      prvaSedmica.push("");
    } else {
      prvaSedmica.push(datum);
      datum += 1;
    }
  }
  const nedelja = prvaSedmica.at(6);

  function handleNextMonth() {
    setActive("");
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
  }
  function handlePrevMonth() {
    setActive("");
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  }

  function handleSelectDay(dan, k) {
    let k2 = k;
    if (k === 7) {
      k2 = 0;
    }

    if (dan && dan < max) {
      setActive(dan);

      setDay(dan);
      setDayOfWeek(k2);
    }
  }

  return {
    day,
    pet,
    sedam,
    dayOfWeek,
    daysOfWeek,
    daysOfWeek2,
    month,
    year,
    active,
    max,
    nedelja,
    months,
    prvaSedmica,
    handleNextMonth,
    handleSelectDay,
    handlePrevMonth,
  };
}
