import { getDate, getDay } from "date-fns";
import toast from "react-hot-toast";
import { useState } from "react";
export const pet = ["", "", "", "", ""];
export const sedam = ["", "", "", "", "", "", ""];
export const daysOfWeek = {
  0: "Nedjelja",
  1: "Ponedjeljak",
  2: "Utorak",
  3: "Srijeda",
  4: "Četvrtak",
  5: "Petak",
  6: "Subota",
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
export const months = {
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
export function useCalendar() {
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

  const prvaSedmica = prvaSedmicaa(year, month);
  const prvaSedmicaSledecegMjeseca = prvaSedmicaa(
    month === 11 ? year + 1 : year,
    month === 11 ? 0 : month + 1
  );
  const nedelja = prvaSedmica.at(6);
  const nastavak =
    day === 1 || day === 21 || day === 31
      ? "vi"
      : day === 2 || day === 22
        ? "gi"
        : day === 3 || day === 23
          ? "ci"
          : day === 8 || day === 28 || day === 7 || day === 27
            ? "mi"
            : "ti";

  function prvaSedmicaa(y, m) {
    let prviUMjesecu = getDay(new Date(y, m, 1));
    if (prviUMjesecu === 0) prviUMjesecu = 7;
    const prvaSedmica = zadnjaSedmicaa(y, m);
    let datum = 1;
    for (let i = 1; i < 8; i++) {
      if (i >= prviUMjesecu) {
        prvaSedmica.push(datum);
        datum += 1;
      }
    }
    return prvaSedmica;
  }
  function zadnjaSedmicaa(y, m) {
    let prviUMjesecu = getDay(new Date(y, m, 1));
    if (prviUMjesecu === 0) prviUMjesecu = 7;
    const pozicijaZadnjegUMjesecu = prviUMjesecu === 1 ? 7 : prviUMjesecu - 1;
    if (pozicijaZadnjegUMjesecu === 7) return []; //prvi pada u ponedjeljak 1
    let zadnjiUMjesecu = getDate(
      new Date(
        m === 0 ? y - 1 : y,
        m === 0 ? 11 : m - 1,
        months[m === 0 ? 11 : m - 1].at(0)
      )
    );
    return [...Array(zadnjiUMjesecu + 1).keys()].slice(
      zadnjiUMjesecu - pozicijaZadnjegUMjesecu + 1
    );
  }
  zadnjaSedmicaa(year, month);
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
    // 1. Priprema podataka
    let k2 = k === 7 ? 0 : k;
    let dan2 = dan + 1 >= max ? dan - max + 1 : dan;
    if (prosli) dan2 = dan;

    let targetMonth = month;
    let targetYear = year;

    if (prosli) {
      targetMonth = month === 0 ? 11 : month - 1;
      targetYear = month === 0 ? year - 1 : year;
    } else if (sledeci) {
      targetMonth = month === 11 ? 0 : month + 1;
      targetYear = month === 11 ? year + 1 : year;
    } else {
      if (dan2 < new Date().getDate()) {
        toast.error("Ne mozete mijenjati radno vrijeme za datume u proslosti");
        return 5; //bilo sta samo da je vrijednost da bi je detektovao u handleClickk
      }
    }

    if (targetYear === year && prosli) {
      //nije bilo promjene u godini
      if (targetMonth < new Date().getMonth()) {
        toast.error("Ne mozete mijenjati radno vrijeme za datume u proslosti");
        return 5; //bilo sta samo da je vrijednost da bi je detektovao u handleClickk
      }
    } else {
      //bilo je promjene u godini
      if (targetYear < new Date().getFullYear()) {
        toast.error("Ne mozete mijenjati radno vrijeme za datume u proslosti");
        return 5; //bilo sta samo da je vrijednost da bi je detektovao u handleClickk
      }
    }

    if (prosli || sledeci) {
      setMonth(targetMonth);
      setYear(targetYear);
    }

    setActive(dan2);
    setDay(dan2);
    setDayOfWeek(k2);
  }

  return {
    day,
    pet,
    sedam,
    dayOfWeek,
    daysOfWeek,
    daysOfWeek2,
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
  };
}
