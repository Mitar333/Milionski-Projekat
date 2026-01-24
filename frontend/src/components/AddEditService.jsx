import { CloseButton } from "./DateTable";
import Input from "./Input";

export function AddEditService({ services, serviceToEdit }) {
  const service = services?.find((service) => service.id === serviceToEdit);
  return (
    <div className="flex flex-col max-h-[85vh] w-full max-w-lg overflow-hidden">
      {/* HEADER - Jasne margine */}
      <div className="border-b border-gray-100 pb-5 mb-2 px-1">
        <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
          <span className="bg-indigo-100 p-2 rounded-lg text-xl">✂</span>
          {serviceToEdit ? `Izmjeni podatke o usluzi` : "Dodaj novu uslugu"}
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
            <Input
              defaultValue={service?.name}
              placeholder={serviceToEdit ? "" : "Marko Marković"}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 tracking-wide ml-1">
              Trajanje
            </label>
            <div className="relative">
              <Input
                defaultValue={service?.duration}
                placeholder={serviceToEdit ? "" : "Npr. 30"}
                type="number" // Bolje je number za mobilne tastature
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400 pointer-events-none">
                min
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Cijena</label>
          <div className="relative">
            <Input
              type="number"
              placeholder={serviceToEdit ? "" : "10"}
              defaultValue={service?.price}
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
  );
}
