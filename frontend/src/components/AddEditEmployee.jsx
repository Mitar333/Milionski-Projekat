import { CloseButton } from "./DateTable";
import Input from "./Input";

export function AddEditEmployee({ employees, employeeToEdit, services }) {
  const employee = employees?.find(
    (employee) => employee.id === employeeToEdit,
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
