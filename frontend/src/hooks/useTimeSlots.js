export const radnoVrijeme = {
  start: "7:00",
  end: "20:00",
  pauses: [{ start: "7:00", end: "9:00" }],
  isOpen: true,
}; //treba api endpoint gdje saljem new Date() i on daje radno vrijeme za danas ili za drugi datum radno vrijeme tog dana
// const radnoVrijeme = {
//   start: "7:00",
//   end: "15:00",
//   pauses: [{ start: "7:00", end: "9:00" }],
//   appointments:[{start:"9:00",end:"9:20"}] isti format kao i u pauses, da li pamriti 2 polja u db a moram malo korigovati logiku, ne puno korigovati malo al dovoljno
//   isOpen: true,
// };
function useListaMogucih(trajanjeTermina) {
  let [sati, minuta] = radnoVrijeme.start.split(":");
  let [endSati, endMinuta] = radnoVrijeme.end.split(":");
  sati = Number(sati);
  minuta = Number(minuta) + sati * 60;
  endSati = Number(endSati);
  endMinuta = Number(endMinuta) + endSati * 60;
  //let zasadSati = sati;
  const listaMogucih = [];
  for (
    let zasadMinuta = minuta;
    zasadMinuta < endMinuta;
    zasadMinuta += trajanjeTermina
  ) {
    if (radnoVrijeme.isOpen) {
      let h = Math.floor(zasadMinuta / 60);
      let m = zasadMinuta;
      let h2 = h;
      let m2 = m + trajanjeTermina;
      let min = zasadMinuta - 60 * h;
      let min2 = min + 10;

      let pase = radnoVrijeme.pauses.map((pauza) => {
        let [pauzaSati, pauzaMinuta] = pauza.start.split(":");
        let [pauzaEndSati, pauzaEndMinuta] = pauza.end.split(":");
        pauzaMinuta = Number(pauzaMinuta) + Number(pauzaSati) * 60;
        pauzaEndMinuta = Number(pauzaEndMinuta) + Number(pauzaEndSati) * 60;

        if (m2 <= pauzaMinuta) {
          return true;
        } else if (m >= pauzaEndMinuta) {
          return true;
        } else {
          return false;
        }
      });
      pase = pase.reduce((acc, bool) => acc && bool, true);

      if (min2 >= 60) {
        min2 = min2 - 60;
        h2++;
      }
      if (pase) {
        listaMogucih.push({
          start: `${h}:${min === 0 ? "00" : min}`,
          end: `${h2}:${min2 === 0 ? "00" : min2}`,
          possible: true,
        });
      } else {
        listaMogucih.push({
          start: `${h}:${min === 0 ? "00" : min}`,
          end: `${h2}:${min2 === 0 ? "00" : min2}`,
          possible: false,
        }); //oznacava prvi poslije pauze, mozda kada bude trebalo u drugom fajlu da pokazuje prvi poslije nekog drugog termina
      }
    }
  }
  return listaMogucih;
}
export default useListaMogucih;
