import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { FaChevronRight } from "react-icons/fa";
const termini = [
  {
    employeeId: 1,
    serviceId: 1,
    startTime: "12:20",
    endTime: "12:40",
    status: "confirmed",
  },
];

function UserDashboard() {
  return (
    <div>
      <Header label="Zdravo, USER 👋" />
      <main className="flex-1 px-4 py-6 flex flex-col space-y-8">
        {/* Pozdravna poruka */}

        {/* Glavna akcija - Hero sekcija */}
        <section className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-xl font-semibold mb-2">
              Vrijeme je za osvježenje?
            </h2>
            <p className="text-indigo-100 text-sm mb-4">
              Pronađi slobodan termin u par klikova.
            </p>
            <Link
              to="/select/salon"
              className="inline-block bg-white text-indigo-600 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors"
            >
              Zakaži odmah
            </Link>
          </div>
          {/* Ovdje može ići neka apstraktna ikona u pozadini */}
          <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12">
            <FaChevronRight size={100} />
          </div>
        </section>

        {/* Aktivni termini */}
        <section className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Vaši termini</h2>
            <span className="bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-full font-bold">
              {termini.length}
            </span>
          </div>

          <ul className="space-y-4">
            {termini.length > 0 ? (
              termini.map((termin, index) => (
                <AppointmentRow key={index} termin={termin} />
              ))
            ) : (
              <div className="text-center py-10 bg-white rounded-2xl border-2 border-dashed border-gray-100">
                <p className="text-gray-400">Nema zakazanih termina</p>
              </div>
            )}
          </ul>
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default UserDashboard;

export function AppointmentRow({ termin, index }) {
  return (
    <li
      className="bg-white rounded-2xl p-5 shadow-sm flex flex-wrap gap-3 text-sm text-gray-700"
      key={index}
    >
      <p className="flex-1 text-center">
        <span className="font-medium">Radnik:</span> {termin.employeeId}
      </p>
      <p className="flex-1 text-center">
        <span className="font-medium">Usluga:</span> {termin.serviceId}
      </p>
      <p className="flex-1 text-center">
        <span className="font-medium">Početak:</span> {termin.startTime}
      </p>
      <p className="flex-1 text-center">
        <span className="font-medium">Kraj:</span> {termin.endTime}
      </p>
      <p className="flex-1 text-center text-green-600 font-medium">
        {termin.status}
      </p>
    </li>
  );
}
