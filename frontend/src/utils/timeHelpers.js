export function isNow(termin) {
  if (termin.start) {
    const sati = new Date().getHours();
    const minuta = new Date().getMinutes() + sati * 60;

    const startH = Number(termin.start.split(":").at(0));
    const startM = Number(termin.start.split(":").at(1)) + startH * 60;

    const endH = Number(termin.end.split(":").at(0));
    const endM = Number(termin.end.split(":").at(1)) + endH * 60;

    if (minuta >= startM && minuta <= endM) {
      return { ...termin };
    } else {
      return null;
    }
  }
}
export function izracunajMinute(vrijeme) {
  if (vrijeme) {
    let [sati, minuta] = vrijeme.split(":");
    sati = Number(sati);
    return Number(minuta) + sati * 60;
  }
}
export function getCurrentAppointment(listaMogucih) {
  const sati = new Date().getHours();
  const minuta = new Date().getMinutes() + sati * 60;

  const lista = listaMogucih
    .map((termin) => {
      if (termin.start) {
        let [startSati, startMinuta] = termin.start.split(":");
        let [endSati, endMinuta] = termin.end.split(":");
        startSati = Number(startSati);
        startMinuta = Number(startMinuta) + startSati * 60;
        endSati = Number(endSati);
        endMinuta = Number(endMinuta) + endSati * 60;

        if (minuta <= endMinuta && minuta >= startMinuta) return termin;
      }
    })
    .filter((termin) => {
      return termin;
    })
    .at(0);

  return lista;
}
export const getCurrentAppointmentForEachEmployee = (employees, listaMogucih) =>
  employees.map((employee) => {
    return {
      ...getCurrentAppointment(listaMogucih),
      name: employee.name,
      title: employee.title,
    };
  });
export const getPauze = (rasporedPoRadnicima, radnoVrijeme) =>
  rasporedPoRadnicima.map((radnik) => {
    return radnik.map((termin, i) => {
      if (radnik[i + 1]) {
        return radnik[i + 1].start;
      } else {
        return radnoVrijeme.end;
      }
    });
  });
export const getTrenutniTermini = (rasporedPoRadnicima, pauze) =>
  rasporedPoRadnicima
    .map((radnik, i) => {
      return radnik.map((termin, k) => isNow(termin, pauze[i][k]));
    }) //ovo dole ukida null-ove
    .map((radnik) => {
      return radnik.filter((termin) => {
        return !!termin;
      });
    });
export function getProgressBarPercentage(trenutni) {
  return Math.min(
    Math.max(
      ((izracunajMinute(new Date().getHours() + ":" + new Date().getMinutes()) -
        izracunajMinute(trenutni.start)) /
        (izracunajMinute(trenutni.end) - izracunajMinute(trenutni.start))) *
        100,
      0,
    ),
    100,
  );
}
