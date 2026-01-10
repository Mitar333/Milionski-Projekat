import { Plus, Edit3, Trash2, Clock, Banknote } from "lucide-react";
import AdminFooter from "../components/AdminFooter";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import Modal from "../components/Modal";
import { useState } from "react";
import { CloseButton } from "../components/DateTable";

function ServiceDetails() {
  const [serviceToEdit, setServiceToEdit] = useState("");
  const [serviceToDelete, setServiceToDelete] = useState("");
  const location = useLocation();
  const services = [
    { id: 1, name: "Muško šišanje", duration: 30, price: 15 },
    { id: 2, name: "Pranje kose i feniranje", duration: 20, price: 10 },
  ];

  return (
    <Modal>
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans antialiased">
        <Header
          to={`/admin/${location.pathname.split("/").at(2)}`}
          label="Upravljanje uslugama"
        />

        <main className="flex-1 p-5 max-w-xl mx-auto w-full pb-24">
          {/* Dugme za dodavanje - Nenapadno ali uočljivo */}
          <Modal.Open opens="addService">
            <button className="w-full mb-8 flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 py-3.5 rounded-xl font-semibold border border-indigo-100 hover:bg-indigo-100 transition-colors">
              <Plus className="w-4 h-4" />
              Nova usluga
            </button>
          </Modal.Open>

          {/* Lista usluga */}
          <div className="space-y-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm"
              >
                <div className="flex-1">
                  <h3 className="text-[16px] font-bold text-gray-800 tracking-tight">
                    {service.name}
                  </h3>

                  <div className="flex items-center gap-4 mt-1.5">
                    <div className="flex items-center gap-1 text-[13px] text-gray-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {service.duration} min
                    </div>
                    <div className="flex items-center gap-1 text-[13px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-lg">
                      {service.price} KM
                    </div>
                  </div>
                </div>

                {/* Akcije - Obojene ali suptilne */}
                <div className="flex gap-2">
                  <Modal.Open opens="editService">
                    <button
                      className="p-2.5 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors"
                      onClick={() => setServiceToEdit(service.id)}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </Modal.Open>
                  <Modal.Open opens="deleteService">
                    <button
                      className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      onClick={() => setServiceToDelete(service.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </Modal.Open>
                </div>
              </div>
            ))}
          </div>
        </main>

        <AdminFooter
          trenutno="/services"
          salonId={location.pathname.split("/").at(2)}
        />
      </div>
      <Modal.Window name="addService">
        <div className="flex flex-col max-h-[85vh] w-full max-w-lg overflow-hidden">
          {/* HEADER - Jasne margine */}
          <div className="border-b border-gray-100 pb-5 mb-2 px-1">
            <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
              <span className="bg-indigo-100 p-2 rounded-lg text-xl">✂</span>
              Dodaj novu uslugu
            </h1>
            <p className="text-md text-gray-500 mt-2 font-medium">
              Popunite osnovne informacije o usluzi.
            </p>
          </div>

          {/* SKROLABILNI SADRŽAJ - Povećan gap (razmak) između grupa */}
          <div className="flex-1 overflow-y-auto pr-3 space-y-8 py-4">
            {/* GRUPA: OSNOVNI PODACI */}
            <div className="space-y-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700 tracking-wide ml-1">
                  Puno ime usluge
                </label>
                <input
                  type="text"
                  placeholder="Marko Marković"
                  className="w-full text-base font-medium border-2 border-gray-200 rounded-2xl py-3.5 px-5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all placeholder:text-gray-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700 tracking-wide ml-1">
                  Trajanje
                </label>
                <div className="relative">
                  <input
                    type="number" // Bolje je number za mobilne tastature
                    placeholder="Npr. 30"
                    className="w-full text-base font-medium border-2 border-gray-200 rounded-2xl py-3.5 px-5 pr-16 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all placeholder:text-gray-300"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400 pointer-events-none">
                    min
                  </span>
                </div>
              </div>
            </div>

            {/* GRUPA: KONTAKT */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Cijena
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="10"
                  className="w-full text-base font-medium border-2 border-gray-200 rounded-2xl py-3.5 px-5 pr-14 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400 pointer-events-none">
                  KM
                </span>
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
              SAČUVAJ USLUGU
            </button>
          </div>
        </div>
      </Modal.Window>
      <Modal.Window name="editService">
        <div className="flex flex-col max-h-[85vh] w-full max-w-lg overflow-hidden">
          {/* HEADER - Jasne margine */}
          <div className="border-b border-gray-100 pb-5 mb-2 px-1">
            <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
              <span className="bg-indigo-100 p-2 rounded-lg text-xl">✂</span>
              Izmjeni podatke o usluzi
            </h1>
            <p className="text-md text-gray-500 mt-2 font-medium">
              Popunite osnovne informacije o usluzi.
            </p>
          </div>

          {/* SKROLABILNI SADRŽAJ - Povećan gap (razmak) između grupa */}
          <div className="flex-1 overflow-y-auto pr-3 space-y-8 py-4">
            {/* GRUPA: OSNOVNI PODACI */}
            <div className="space-y-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700 tracking-wide ml-1">
                  Puno ime usluge
                </label>
                <input
                  type="text"
                  defaultValue={
                    services.find((service) => service.id === serviceToEdit)
                      ?.name
                  }
                  className="w-full text-base font-medium border-2 border-gray-200 rounded-2xl py-3.5 px-5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all placeholder:text-gray-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700 tracking-wide ml-1">
                  Trajanje
                </label>
                <div className="relative">
                  <input
                    type="number" // Bolje je number za mobilne tastature
                    className="w-full text-base font-medium border-2 border-gray-200 rounded-2xl py-3.5 px-5 pr-16 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all placeholder:text-gray-300"
                    defaultValue={
                      services.find((s) => s.id === serviceToEdit)?.duration
                    }
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400 pointer-events-none">
                    min
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Cijena
              </label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full text-base font-medium border-2 border-gray-200 rounded-2xl py-3.5 px-5 pr-14 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all"
                  defaultValue={
                    services.find((s) => s.id === serviceToEdit)?.price
                  }
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400 pointer-events-none">
                  KM
                </span>
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
              SAČUVAJ USLUGU
            </button>
          </div>
        </div>
      </Modal.Window>

      <Modal.Window name="deleteService">
        <div className="flex flex-col items-center text-center p-2 max-w-sm">
          {/* IKONA SA PULSIRAJUĆOM POZADINOM */}
          <div className="mb-6 flex items-center justify-center w-20 h-20 bg-rose-100 text-rose-600 rounded-full animate-pulse">
            <span className="text-4xl">⚠️</span>
          </div>

          {/* NASLOV I OPIS */}
          <h1 className="text-2xl font-black text-gray-900 mb-2">
            Brisanje usluge
          </h1>
          <p className="text-gray-500 font-medium leading-relaxed">
            Da li ste sigurni da želite obrisati uslugu{" "}
            <span className="text-gray-900 font-bold">
              {services.find((e) => e.id === serviceToDelete)?.name}
            </span>
            ? Ova radnja se ne može poništiti.
          </p>

          {/* AKCIJE */}
          <div className="flex flex-col w-full gap-3 mt-8">
            <button
              onClick={() => {
                // Ovdje ide tvoja logika za brisanje (npr. deleteEmployee(employeeToEdit))
                console.log("Brisanje usluge:", serviceToDelete);
              }}
              className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-2xl shadow-lg shadow-rose-200 transition-all active:scale-95 uppercase tracking-wider"
            >
              Da, obriši uslugu
            </button>

            <CloseButton />
          </div>
        </div>
      </Modal.Window>
    </Modal>
  );
}

export default ServiceDetails;
