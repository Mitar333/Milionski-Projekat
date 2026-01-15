/*SMANJITI NA MANJE OD 100 linija */
import { UserPlus, Edit3, Trash2, Mail, Phone } from "lucide-react";
import AdminFooter from "../components/AdminFooter";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import Modal from "../components/Modal";
import { CloseButton } from "../components/DateTable";
import { useState } from "react";
import DeleteModal from "../components/DeleteModal";
import Input from "../components/Input";

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
        <AddEditEmployee services={services} />
      </Modal.Window>
      <Modal.Window name="editEmployee">
        <AddEditEmployee
          employees={employees}
          employeeToEdit={employeeToEdit}
          services={services}
        />
      </Modal.Window>
      <Modal.Window name="deleteEmployee">
        <DeleteModal
          serviceToDelete={employeeToDelete}
          services={employees}
          label="radnika"
          type="employee"
        />
      </Modal.Window>
    </Modal>
  );
}
function AddEditEmployee({ employees, employeeToEdit, services }) {
  const employee = employees?.find(
    (employee) => employee.id === employeeToEdit
  );
  return (
    <div className="flex flex-col max-h-[85vh] w-full max-w-lg overflow-hidden">
      {/* HEADER - Jasne margine */}
      <div className="border-b border-gray-100 pb-5 mb-2 px-1">
        <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
          <span className="bg-indigo-100 p-2 rounded-lg text-xl">👤</span>
          {employeeToEdit ? `Izmjeni podatke radnika` : "Dodaj novog radnika"}
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
            <Input
              defaultValue={employee?.name}
              type="text"
              placeholder={employeeToEdit ? "" : "Marko Marković"}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 tracking-wide ml-1">
              Titula / Pozicija
            </label>
            <Input
              type="text"
              defaultValue={employee?.title}
              placeholder={employeeToEdit ? "" : "Npr. Senior ženski frizer"}
            />
          </div>
        </div>

        {/* GRUPA: KONTAKT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 ml-1">
              E-mail
            </label>
            <Input
              defaultValue={employee?.email}
              type="email"
              placeholder={employeeToEdit ? "" : "marko@mail.com"}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Telefon
            </label>
            <Input
              defaultValue={employee?.phone}
              type="text"
              placeholder={employeeToEdit ? "" : "065 123 456"}
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
              const tf = employee?.services?.includes(service.id);
              return (
                <label
                  key={service.id}
                  className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/30 cursor-pointer transition-all group"
                >
                  <span className="text-md font-bold text-gray-700 group-hover:text-indigo-700">
                    {service.name}
                  </span>
                  <input
                    type="checkbox"
                    defaultChecked={tf}
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
  );
}
export default EmployeeDetails;
