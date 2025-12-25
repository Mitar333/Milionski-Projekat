import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { AppointmentRow } from "./UserDashboard";
const termini = [
  {
    employeeId: 1,
    serviceId: 1,
    startTime: "12:20",
    endTime: "12:40",
    status: "confirmed",
  },
  {
    employeeId: 1,
    serviceId: 1,
    startTime: "12:20",
    endTime: "12:40",
    status: "confirmed",
  },
  {
    employeeId: 1,
    serviceId: 1,
    startTime: "12:20",
    endTime: "12:40",
    status: "confirmed",
  },
  {
    employeeId: 1,
    serviceId: 1,
    startTime: "12:20",
    endTime: "12:40",
    status: "confirmed",
  },
];
const stariTermini = [
  {
    employeeId: 1,
    serviceId: 1,
    startTime: "12:20",
    endTime: "12:40",
    status: "ended",
  },
  {
    employeeId: 1,
    serviceId: 1,
    startTime: "12:20",
    endTime: "12:40",
    status: "ended",
  },
  {
    employeeId: 1,
    serviceId: 1,
    startTime: "12:20",
    endTime: "12:40",
    status: "ended",
  },
  {
    employeeId: 1,
    serviceId: 1,
    startTime: "12:20",
    endTime: "12:40",
    status: "ended",
  },
  {
    employeeId: 1,
    serviceId: 1,
    startTime: "12:20",
    endTime: "12:40",
    status: "ended",
  },
  {
    employeeId: 1,
    serviceId: 1,
    startTime: "12:20",
    endTime: "12:40",
    status: "ended",
  },
  {
    employeeId: 1,
    serviceId: 1,
    startTime: "12:20",
    endTime: "12:40",
    status: "ended",
  },
];

// ... (tvoji podaci termini i stariTermini ostaju isti)

function UserAppointments() {
  const [loadAmmount, setLoadAmmount] = useState(2);
  const [loadAmmount2, setLoadAmmount2] = useState(2);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {" "}
      {/* Povećan padding na dnu zbog footera */}
      <Header label="Moji Termini" />
      <div className="max-w-md mx-auto px-4 pt-4">
        {/* SEKCIJA: AKTIVNI TERMINI */}
        <section className="mt-6">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
              Aktivni termini
            </h2>
            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {termini.length} UKUPNO
            </span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <ul className="divide-y divide-gray-50">
              {termini.slice(0, loadAmmount2).map((termin, index) => (
                <AppointmentRow termin={termin} index={index} key={index} />
              ))}
            </ul>
          </div>

          {/* Gumbi za Aktivne */}
          <div className="mt-3">
            {loadAmmount2 < termini.length ? (
              <button
                onClick={() => setLoadAmmount2((s) => s + 3)}
                className="w-full py-3 text-sm font-semibold text-blue-600 bg-white border border-blue-100 rounded-xl hover:bg-blue-50 active:scale-[0.98] transition-all shadow-sm"
              >
                Učitaj više aktivnih
              </button>
            ) : (
              loadAmmount2 > 2 && (
                <button
                  onClick={() => setLoadAmmount2(2)}
                  className="w-full py-2 text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Prikaži manje ↑
                </button>
              )
            )}
          </div>
        </section>

        {/* SEKCIJA: STARI TERMINI */}
        <section className="mt-12">
          <div className="flex items-center mb-4 px-1">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
              Istorija termina
            </h2>
          </div>

          <div className="bg-white/60 rounded-2xl border border-dashed border-gray-200 overflow-hidden">
            <ul className="divide-y divide-gray-100 opacity-80">
              {stariTermini.slice(0, loadAmmount).map((termin, index) => (
                <AppointmentRow termin={termin} key={index} index={index} />
              ))}
            </ul>
          </div>

          {/* Gumbi za Stare */}
          <div className="mt-3">
            {loadAmmount < stariTermini.length ? (
              <button
                onClick={() => setLoadAmmount((s) => s + 3)}
                className="w-full py-3 text-sm font-semibold text-gray-600 bg-gray-200/50 rounded-xl hover:bg-gray-200 active:scale-[0.98] transition-all"
              >
                Vidi starije termine
              </button>
            ) : (
              loadAmmount > 3 && (
                <button
                  onClick={() => setLoadAmmount(3)}
                  className="w-full py-2 text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Prikaži manje ↑
                </button>
              )
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default UserAppointments;
