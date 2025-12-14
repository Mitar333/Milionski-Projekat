import { Link } from "react-router-dom";

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
      <header className="px-4 py-3 bg-white shadow-sm">
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </header>

      {/* MAIN */}
      <main className="flex-1 px-4 py-6 space-y-6">
        <div className="space-y-2">
          <p className="text-gray-700">Pozdrav, USER 👋</p>

          <Link
            to="/select/salon"
            className="inline-block w-full text-center bg-indigo-500 text-white py-3 rounded-xl font-medium"
          >
            Zakaži termin
          </Link>
        </div>

        <div className="space-y-3">
          <h2 className="font-medium text-gray-900">Aktivni termini</h2>

          <ul className="space-y-3">
            {termini.map((termin, index) => (
              <AppointmentRow key={index} termin={termin} />
            ))}
          </ul>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="px-4 py-3 bg-white text-center text-sm text-gray-500">
        footer
      </footer>
    </div>
  );
}

export default UserDashboard;

export function AppointmentRow({ termin }) {
  return (
    <li className="bg-white rounded-2xl p-4 shadow-sm flex flex-wrap gap-3 text-sm text-gray-700">
      <p>
        <span className="font-medium">Radnik:</span> {termin.employeeId}
      </p>
      <p>
        <span className="font-medium">Usluga:</span> {termin.serviceId}
      </p>
      <p>
        <span className="font-medium">Početak:</span> {termin.startTime}
      </p>
      <p>
        <span className="font-medium">Kraj:</span> {termin.endTime}
      </p>
      <p className="text-green-600 font-medium">{termin.status}</p>
    </li>
  );
}
