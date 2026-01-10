/*SMANJITI NA MANJE OD 100 linija */
import { UserPlus, Edit3, Trash2, Mail, Phone } from "lucide-react";
import AdminFooter from "../components/AdminFooter";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import Modal from "../components/Modal";
import { CloseButton } from "../components/DateTable";
import { useState } from "react";

function EmployeeDetails() {
  const location = useLocation();
  const [employeeToEdit, setEmployeeToEdit] = useState("");
  const [employeeToDelete, setEmployeeToDelete] = useState("");
  // Mock podaci za vizuelni test
  const employees = [
    {
      id: 1,
      name: "Marko Marković",
      title: "Glavni berber",
      email: "marko@salon.com",
      phone: "065 123 456",
      services: [1],
    },
    {
      id: 2,
      name: "Ana Anić",
      title: "Frizerka",
      email: "ana@salon.com",
      phone: "066 987 654",
      services: [1, 2],
    },
  ];
  const services = [
    { id: 1, name: "Muško šišanje", duration: 30, price: 15 },
    { id: 2, name: "Pranje kose i feniranje", duration: 20, price: 10 },
  ];

  return (
    <Modal>
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans antialiased">
        <Header
          to={`/admin/${location.pathname.split("/").at(2)}`}
          label="Upravljanje radnicima"
        />

        <main className="flex-1 p-5 max-w-xl mx-auto w-full pb-24">
          {/* Dugme za dodavanje - Suptilni Indigo */}
          <Modal.Open opens="addEmployee">
            {/* Bitno je da dugme unutra zadrži sve svoje klase */}
            <button className="w-full mb-8 flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 py-3.5 rounded-xl font-semibold border border-indigo-100 hover:bg-indigo-100 transition-colors">
              <UserPlus className="w-4 h-4" />
              Novi radnik
            </button>
          </Modal.Open>
          {/* Lista radnika */}
          <div className="space-y-4">
            {employees.map((employee) => (
              <div
                key={employee.id}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Ime i Titula */}
                    <div className="mb-3">
                      <h3 className="text-[16px] font-bold text-gray-800 tracking-tight leading-none">
                        {employee.name}
                      </h3>
                      <span className="text-[12px] font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md mt-1.5 inline-block">
                        {employee.title}
                      </span>
                    </div>

                    {/* Kontakt podaci - Manji i sivi */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-[13px] text-gray-500">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        {employee.email}
                      </div>
                      <div className="flex items-center gap-2 text-[13px] text-gray-500">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        {employee.phone}
                      </div>
                    </div>
                  </div>

                  {/* Akcije */}
                  <div className="flex flex-col gap-1">
                    <Modal.Open opens="editEmployee">
                      <button
                        onClick={() => setEmployeeToEdit(employee.id)}
                        className="p-2.5 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </Modal.Open>
                    <Modal.Open opens="deleteEmployee">
                      <button
                        className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        onClick={() => setEmployeeToDelete(employee.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </Modal.Open>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        <AdminFooter
          trenutno="/employees"
          salonId={location.pathname.split("/").at(2)}
        />
      </div>
      <Modal.Window name="addEmployee">
        <div className="flex flex-col max-h-[85vh] w-full max-w-lg overflow-hidden">
          {/* HEADER - Jasne margine */}
          <div className="border-b border-gray-100 pb-5 mb-2 px-1">
            <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
              <span className="bg-indigo-100 p-2 rounded-lg text-xl">👤</span>
              Dodaj novog radnika
            </h1>
            <p className="text-md text-gray-500 mt-2 font-medium">
              Popunite osnovne informacije o zaposlenom.
            </p>
          </div>

          {/* SKROLABILNI SADRŽAJ - Povećan gap (razmak) između grupa */}
          <div className="flex-1 overflow-y-auto pr-3 space-y-8 py-4">
            {/* GRUPA: OSNOVNI PODACI */}
            <div className="space-y-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700 tracking-wide ml-1">
                  Puno ime i prezime
                </label>
                <input
                  type="text"
                  placeholder="Marko Marković"
                  className="w-full text-base font-medium border-2 border-gray-200 rounded-2xl py-3.5 px-5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all placeholder:text-gray-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700 tracking-wide ml-1">
                  Titula / Pozicija
                </label>
                <input
                  type="text"
                  placeholder="Npr. Senior ženski frizer"
                  className="w-full text-base font-medium border-2 border-gray-200 rounded-2xl py-3.5 px-5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            {/* GRUPA: KONTAKT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="marko@mail.com"
                  className="w-full text-base border-2 border-gray-200 rounded-2xl py-3 px-5 outline-none focus:border-indigo-500 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Telefon
                </label>
                <input
                  type="text"
                  placeholder="065 123 456"
                  className="w-full text-base border-2 border-gray-200 rounded-2xl py-3 px-5 outline-none focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* GRUPA: USLUGE */}
            <div className="flex flex-col gap-4">
              <label className="text-sm font-black text-gray-400 uppercase tracking-[2px] ml-1">
                Dostupne usluge
              </label>
              <div className="grid grid-cols-1 gap-3">
                {services.map((service) => (
                  <label
                    key={service.id}
                    className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/30 cursor-pointer transition-all group"
                  >
                    <span className="text-md font-bold text-gray-700 group-hover:text-indigo-700">
                      {service.name}
                    </span>
                    <input
                      type="checkbox"
                      className="w-6 h-6 text-indigo-600 border-2 border-gray-300 rounded-lg focus:ring-indigo-500 cursor-pointer"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex gap-4 mt-6 border-t-2 border-gray-50 pt-5 bg-white">
            <CloseButton />
            <button
              onClick={() => {}}
              className="flex-2 px-6 py-4 text-md font-black text-white bg-indigo-600 rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all active:scale-[0.98]"
            >
              SAČUVAJ RADNIKA
            </button>
          </div>
        </div>
      </Modal.Window>
      <Modal.Window name="editEmployee">
        <div className="flex flex-col max-h-[85vh] w-full max-w-lg overflow-hidden">
          {/* HEADER - Jasne margine */}
          <div className="border-b border-gray-100 pb-5 mb-2 px-1">
            <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
              <span className="bg-indigo-100 p-2 rounded-lg text-xl">👤</span>
              Izmjeni podatke radnika
            </h1>
            <p className="text-md text-gray-500 mt-2 font-medium">
              Popunite informacije koje zelite promjeniti o zaposlenom.
            </p>
          </div>

          {/* SKROLABILNI SADRŽAJ - Povećan gap (razmak) između grupa */}
          <div className="flex-1 overflow-y-auto pr-3 space-y-8 py-4">
            {/* GRUPA: OSNOVNI PODACI */}
            <div className="space-y-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700 tracking-wide ml-1">
                  Puno ime i prezime
                </label>
                <input
                  defaultValue={
                    employees.find((employee) => employee.id === employeeToEdit)
                      ?.name
                  }
                  type="text"
                  placeholder="Marko Marković"
                  className="w-full text-base font-medium border-2 border-gray-200 rounded-2xl py-3.5 px-5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all placeholder:text-gray-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700 tracking-wide ml-1">
                  Titula / Pozicija
                </label>
                <input
                  type="text"
                  defaultValue={
                    employees.find((employee) => employee.id === employeeToEdit)
                      ?.title
                  }
                  placeholder="Npr. Senior ženski frizer"
                  className="w-full text-base font-medium border-2 border-gray-200 rounded-2xl py-3.5 px-5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            {/* GRUPA: KONTAKT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  E-mail
                </label>
                <input
                  defaultValue={
                    employees.find((employee) => employee.id === employeeToEdit)
                      ?.email
                  }
                  type="email"
                  placeholder="marko@mail.com"
                  className="w-full text-base border-2 border-gray-200 rounded-2xl py-3 px-5 outline-none focus:border-indigo-500 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Telefon
                </label>
                <input
                  defaultValue={
                    employees.find((employee) => employee.id === employeeToEdit)
                      ?.phone
                  }
                  type="text"
                  placeholder="065 123 456"
                  className="w-full text-base border-2 border-gray-200 rounded-2xl py-3 px-5 outline-none focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* GRUPA: USLUGE */}
            <div className="flex flex-col gap-4">
              <label className="text-sm font-black text-gray-400 uppercase tracking-[2px] ml-1">
                Dostupne usluge
              </label>
              <div className="grid grid-cols-1 gap-3">
                {services.map((service) => {
                  return employees
                    .find((employee) => employee.id === employeeToEdit)
                    ?.services?.includes(service.id) ? (
                    <label
                      key={service.id}
                      className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/30 cursor-pointer transition-all group"
                    >
                      <span className="text-md font-bold text-gray-700 group-hover:text-indigo-700">
                        {service.name}
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={true}
                        className="w-6 h-6 text-indigo-600 border-2 border-gray-300 rounded-lg focus:ring-indigo-500 cursor-pointer"
                      />
                    </label>
                  ) : (
                    <label
                      key={service.id}
                      className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/30 cursor-pointer transition-all group"
                    >
                      <span className="text-md font-bold text-gray-700 group-hover:text-indigo-700">
                        {service.name}
                      </span>
                      <input
                        type="checkbox"
                        className="w-6 h-6 text-indigo-600 border-2 border-gray-300 rounded-lg focus:ring-indigo-500 cursor-pointer"
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex gap-4 mt-6 border-t-2 border-gray-50 pt-5 bg-white">
            <CloseButton />
            <button
              onClick={() => {}}
              className="flex-2 px-6 py-4 text-md font-black text-white bg-indigo-600 rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all active:scale-[0.98]"
            >
              SAČUVAJ PROMJENE PODATAKA RADNIKA
            </button>
          </div>
        </div>
      </Modal.Window>
      <Modal.Window name="deleteEmployee">
        <div className="flex flex-col items-center text-center p-2 max-w-sm">
          {/* IKONA SA PULSIRAJUĆOM POZADINOM */}
          <div className="mb-6 flex items-center justify-center w-20 h-20 bg-rose-100 text-rose-600 rounded-full animate-pulse">
            <span className="text-4xl">⚠️</span>
          </div>

          {/* NASLOV I OPIS */}
          <h1 className="text-2xl font-black text-gray-900 mb-2">
            Brisanje radnika
          </h1>
          <p className="text-gray-500 font-medium leading-relaxed">
            Da li ste sigurni da želite obrisati radnika
            <span className="text-gray-900 font-bold">
              {" "}
              {employees.find((e) => e.id === employeeToDelete)?.name}
            </span>
            ? Ova radnja se ne može poništiti.
          </p>

          {/* AKCIJE */}
          <div className="flex flex-col w-full gap-3 mt-8">
            <button
              onClick={() => {
                // Ovdje ide tvoja logika za brisanje (npr. deleteEmployee(employeeToEdit))
                console.log("Brisanje radnika:", employeeToDelete);
              }}
              className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-2xl shadow-lg shadow-rose-200 transition-all active:scale-95 uppercase tracking-wider"
            >
              Da, obriši radnika
            </button>

            <CloseButton />
          </div>
        </div>
      </Modal.Window>
    </Modal>
  );
}

export default EmployeeDetails;
