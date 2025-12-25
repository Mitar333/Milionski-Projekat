import {
  useAppointment,
  useEmployee,
  // useSalon,
  useService,
} from "../../../store";

import DateTable from "../../../components/DateTable";
import AppointmentList from "../../../components/AppointmentList";

function AppointmentTable() {
  const employee = useEmployee((state) => state.employee).newEmployee || {
    name: "Marko Markovic",
  };
  // const salon = useSalon((state) => state.salon);
  const service = useService((state) => state.service).newService || {
    name: "sisanje",
    price: 10,
  };
  const selectedAppointment = useAppointment((state) => state.termin);

  function handleClick() {
    console.log("a");
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-sm">
      <DateTable />
      {/* Horizontalna lista termina*/}
      <AppointmentList />
      {/* Detalji termina - Spakovano u Grid */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider">
              Usluga
            </p>
            <p className="font-semibold text-gray-800">{service.name}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-xs uppercase tracking-wider">
              Cijena
            </p>
            <p className="font-semibold text-indigo-600">{service.price} KM</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider">
              Radnik
            </p>
            <p className="font-semibold text-gray-800">{employee.name}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-xs uppercase tracking-wider">
              Termin
            </p>
            <p className="font-semibold italic text-indigo-600">
              {`${selectedAppointment.start || "..."}-${selectedAppointment.end || "..."}`}
            </p>
          </div>
        </div>

        {/* Input polje - Modernije i kompaktnije */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Dodajte bilješke radniku..."
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Dugme - Smanjena margina sa my-48 na mt-6 */}
      <div className="mt-auto mb-2 flex px-1">
        <button
          onClick={handleClick}
          // Dugme je isključeno ako nemamo termin (koristimo !! da pretvorimo u boolean)
          disabled={!selectedAppointment?.start}
          className={`
      w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300
      ${
        !selectedAppointment?.start
          ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-60 shadow-none scale-[0.98]"
          : "bg-indigo-600 text-white shadow-xl shadow-indigo-200 active:scale-95 cursor-pointer"
      }
    `}
        >
          {selectedAppointment ? "Potvrdi termin" : "Izaberite termin"}
        </button>
      </div>
    </div>
  );
}

export default AppointmentTable;

/*
      setActive(`prva-${i}`);
    } else {
      setActive(`sedmica-${i}-dan-${k}`);
import { useState } from "react";
import Header from "../components/Header";
import { getDay } from "date-fns";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
function AppointmentTable() {
  //setMonth
  const pet = ["", "", "", "", ""];
  const sedam = ["", "", "", "", "", "", ""];
  const today = new Date();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  let prviUMjesecu = getDay(new Date(year, month, 1));
  if (prviUMjesecu === 0) prviUMjesecu = 7;
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

  //setYear
  // const [day, setDay] = useState();
  // const [dayOfWeek, setDayOfWeek] = useState();
  function handleNextMonth() {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
  }
  function handlePrevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  }
  return (
    <div className="pt-4">
      <Header label="To be implemented" to="/admin" />
      {/* Naslov meseca ide VAN tabele ili u <caption> }
      <div className="flex items-center justify-center gap-4">
        {month !== today.getMonth() && (
          <button className="cursor-pointer" onClick={handlePrevMonth}>
            <GoArrowLeft size={24} />
          </button>
        )}

        <h1 className="text-xl font-bold">
          {months[month].at(1)}, {year}
        </h1>

        <button className="cursor-pointer" onClick={handleNextMonth}>
          <GoArrowRight size={24} />
        </button>
      </div>

      <table className="min-w-full border border-black mt-4">
        <thead>
          <tr>
            {/* Koristimo <th> jer su to naslovi kolona, text-center ih centrira }
            <th className="border border-black text-center">Pon</th>
            <th className="border border-black text-center">Uto</th>
            <th className="border border-black text-center">Sri</th>
            <th className="border border-black text-center">Čet</th>
            <th className="border border-black text-center">Pet</th>
            <th className="border border-black text-center">Sub</th>
            <th className="border border-black text-center">Ned</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {prvaSedmica.map((dan, i) => (
              <td className="border border-black text-center" key={i}>
                {dan}
              </td>
            ))}
          </tr>
          {pet.map((c, i) => (
            <tr key={i}>
              {sedam.map((s, k) => {
                const dan = i * 7 + (k + 1 + nedelja);
                return (
                  <td key={k} className="border border-black text-center">
                    {dan < max ? dan : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentTable;
*/
/*      // let pase = radnoVrijeme.pauses.map((pauza) => {
      //   let [pauzaSati, pauzaMinuta] = pauza.start.split(":");
      //   let [pauzaEndSati, pauzaEndMinuta] = pauza.end.split(":");
      //   pauzaSati = Number(pauzaSati);
      //   pauzaMinuta = Number(pauzaMinuta);
      //   pauzaEndSati = Number(pauzaEndSati);
      //   pauzaEndMinuta = Number(pauzaEndMinuta);
      //   if (60 > zasadMinuta + trajanjeTermina) {
      //     //7:00-7:10
      //     if (zasadSati < pauzaSati) {
      //       return true;
      //     } else if (zasadSati > pauzaEndSati) {
      //       return true;
      //     } else if (
      //       zasadSati === pauzaSati &&
      //       pauzaMinuta >= zasadMinuta + trajanjeTermina
      //     ) {
      //       return true;
      //     } else if (
      //       zasadSati === pauzaEndSati &&
      //       pauzaEndMinuta <= zasadMinuta
      //     ) {
      //       return true;
      //     } else {
      //       return false;
      //     }
      //   } else {
      //     //7:50-8:00
      //     if (zasadSati + 1 < pauzaSati) {
      //       return true;
      //     } else if (
      //       zasadSati < pauzaSati &&
      //       pauzaMinuta >= zasadMinuta + trajanjeTermina - 60
      //     ) {
      //       return true;
      //     } else if (zasadSati + 1 > pauzaEndSati) {
      //       return true;
      //     } else if (
      //       zasadSati > pauzaEndSati &&
      //       pauzaEndMinuta <= zasadMinuta + trajanjeTermina - 60
      //     ) {
      //       return true;
      //     } else {
      //       return false;
      //     }
      //   }
      // });
      // pase = pase.reduce((acc, bool) => acc && bool, true);
      // console.log(pase);*/
