import { Link, useLocation } from "react-router-dom";
import Header from "./Header";
import { UserPlus } from "lucide-react";
import { HasClient } from "./HasClient";

export function RadnikNaPauzi({ i }) {
  return (
    <div
      key={i}
      className={`opacity-60 grayscale-[0.5] rounded-3xl p-5 border shadow-sm transition-all ${"bg-gray-50 border-dashed border-gray-300"}`}
    >
      <p>Radnik je trenutno na pauzi</p>
    </div>
  );
}
export function NotFinishedConfiguration({ bez = true }) {
  const location = useLocation();
  return (
    <div>
      {bez && (
        <Header
          label="Admin Dashboard"
          to={`/admin/${location.pathname.split("/").at(2)}`}
        />
      )}
      <p>Konfiguracija Zaposlenih nije zavrsena</p>
      <Link
        to={`/admin/${location.pathname.split("/").at(2)}/employees-details`}
      >
        Zavrsite konfiguraciju
      </Link>
    </div>
  );
}
export function UnutarRadnogVremena({
  trenutniTermini,
  currentAppointmentForEachEmployee,
}) {
  return trenutniTermini.map((trenutni2, i) => {
    if (trenutni2.length) return <HasClient trenutni2={trenutni2} key={i} />;
    else if (currentAppointmentForEachEmployee.at(i).start) {
      return (
        <FreeOfClient
          currentAppointmentForEachEmployee={currentAppointmentForEachEmployee}
          i={i}
          key={i}
        />
      );
    } else {
      return <RadnikNaPauzi i={i} key={i} />;
      //radnik je na pauzi
    }
  });
}
export function UnutarRadnogVremenaEmployee({
  trenutniTermin,
  trenutniPrazanTermin,
}) {
  if (trenutniTermin.start) return <HasClient trenutni2={[trenutniTermin]} />;
  else if (trenutniPrazanTermin.start) {
    return (
      <FreeOfClient
        currentAppointmentForEachEmployee={[trenutniPrazanTermin]}
        i={0}
      />
    );
  } else {
    return <RadnikNaPauzi i={1} />;
    //radnik je na pauzi
  }
}
export function FreeOfClient({ currentAppointmentForEachEmployee, i }) {
  return (
    <div
      key={i}
      className={`rounded-3xl p-5 border shadow-sm transition-all ${"bg-gray-50 border-dashed border-gray-300"}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">
            Radnik:
            {currentAppointmentForEachEmployee.at(i)?.name}
          </p>
          <p className="text-xl font-black text-gray-800 tracking-tighter">
            {currentAppointmentForEachEmployee.at(i)?.start} -
            {currentAppointmentForEachEmployee.at(i)?.end}
          </p>
        </div>
      </div>
      <WalkIn />
    </div>
  );
}
export function WalkIn() {
  return (
    <div className="py-2 text-center">
      <p className="text-sm text-gray-400 font-medium mb-4 italic px-4">
        Ovaj termin je trenutno slobodan.
      </p>
      <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-600 py-3 rounded-xl font-bold text-sm hover:border-indigo-300 transition-all">
        <UserPlus className="w-4 h-4" /> Dodaj "Walk-in" klijenta
      </button>
    </div>
  );
}
export function KrajRadnogVremena() {
  return (
    <div
      className={`opacity-60 grayscale-[0.5] rounded-3xl p-5 border shadow-sm transition-all ${"bg-gray-50 border-dashed border-gray-300"}`}
    >
      <p>Kraj radnog vremena</p>
    </div>
  );
}
