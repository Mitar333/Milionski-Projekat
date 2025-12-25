import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* HEADER */}
      <Header />

      {/* MAIN */}
      <main className="flex-1 px-4 py-6 flex flex-col">
        {/* Gornji sadržaj */}
        <div className="space-y-2">
          <p className="text-gray-700">Pozdrav, USER 👋</p>
        </div>

        {/* Dugme dole */}
        <div className="my-48 flex">
          <Link
            to="/select/salon"
            className="mx-auto w-72 text-center bg-indigo-500 text-white py-2.5 rounded-xl font-medium text-sm"
          >
            Zakaži termin
          </Link>
        </div>

        {/* Aktivni termini */}
        <div className="mt-8 space-y-3">
          <h2 className="flex-1 text-center font-medium text-gray-900">
            <span>Aktivni termini</span>
          </h2>

          <ul className="space-y-3">
            {termini.map((termin, index) => (
              <AppointmentRow key={index} termin={termin} />
            ))}
          </ul>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
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
