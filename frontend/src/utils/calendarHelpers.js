import { getDate, getDay } from "date-fns";
import { months } from "./constants";

export function prvaSedmicaa(y, m) {
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
export function zadnjaSedmicaa(y, m) {
  let prviUMjesecu = getDay(new Date(y, m, 1));
  if (prviUMjesecu === 0) prviUMjesecu = 7;
  const pozicijaZadnjegUMjesecu = prviUMjesecu === 1 ? 7 : prviUMjesecu - 1;
  if (pozicijaZadnjegUMjesecu === 7) return []; //prvi pada u ponedjeljak 1
  let zadnjiUMjesecu = getDate(
    new Date(
      m === 0 ? y - 1 : y,
      m === 0 ? 11 : m - 1,
      months[m === 0 ? 11 : m - 1].at(0),
    ),
  );
  return [...Array(zadnjiUMjesecu + 1).keys()].slice(
    zadnjiUMjesecu - pozicijaZadnjegUMjesecu + 1,
  );
}
export function getMax(month, year) {
  let max = months[month].at(0) + 1;

  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  if (max === 29 && isLeap) {
    max++;
  }
  return max;
}
export function getPrviUMjesecu(month, year) {
  let prviUMjesecu = getDay(new Date(year, month, 1));
  if (prviUMjesecu === 0) prviUMjesecu = 7;
  return prviUMjesecu;
}
export function getNastavak(day) {
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
  return nastavak;
}
