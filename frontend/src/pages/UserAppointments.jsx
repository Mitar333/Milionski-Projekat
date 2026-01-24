import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { AppointmentRow } from "../components/AppointmentRow";
import { mockTermini, stariTermini } from "../data";

function UserAppointments() {
  return (
    <Modal>
      <div className="min-h-screen bg-gray-50 pb-16">
        <Header label="Moji termini" />
        <div className="max-w-md mx-auto px-4 pt-4">
          <PrikazTermina termini={mockTermini} />
          <PrikazTermina termini={stariTermini} />
          {/* SEKCIJA: STARI mockTermini */}
        </div>
        <Footer />
      </div>
    </Modal>
  );
}
export function PrikazTermina({ ist, termini }) {
  const [loadAmmount, setLoadAmmount] = useState(2);
  return (
    <section className="mt-12">
      <div className="flex items-center mb-4 px-1">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
          {ist ? "Istorija termina" : "Aktivni termini"}
        </h2>
        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
          {termini.length} UKUPNO
        </span>
      </div>

      <div className="bg-white/60 rounded-2xl border border-dashed border-gray-200 overflow-hidden">
        <ul className="divide-y divide-gray-100 opacity-80">
          {termini.slice(0, loadAmmount).map((termin, index) => (
            <AppointmentRow
              termin={termin}
              key={index}
              index={index}
              bez={false}
            />
          ))}
        </ul>
      </div>

      {/* Gumbi za Stare */}
      <div className="mt-3">
        {loadAmmount < termini.length ? (
          <button
            onClick={() => setLoadAmmount((s) => s + 3)}
            className="w-full py-3 text-sm font-semibold text-gray-600 bg-gray-200/50 rounded-xl hover:bg-gray-200 active:scale-[0.98] transition-all"
          >
            {ist ? " Vidi starije termine" : " Učitaj više aktivnih"}
          </button>
        ) : (
          loadAmmount > 3 && (
            <button
              onClick={() => setLoadAmmount(2)}
              className="w-full py-2 text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors"
            >
              Prikaži manje ↑
            </button>
          )
        )}
      </div>
    </section>
  );
}
export default UserAppointments;
