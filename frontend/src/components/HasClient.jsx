import { UserPlus } from "lucide-react";
import ProgressBar from "./ProgressBar";

export function HasClient({ trenutni2 }) {
  return trenutni2.map((trenutni) => {
    return (
      <div
        key={trenutni.id}
        className={`rounded-3xl p-5 border shadow-sm transition-all ${"bg-white border-indigo-100 ring-1 ring-indigo-50"}`}
      >
        <ProgressBar trenutniTermin={trenutni} />
        <div className="mt-4 mb-6">
          <div className="py-2 mt-2 text-center">
            <p className="text-sm text-gray-400 font-medium mb-2 italic px-4">
              Rezervisite sledeci termin <br />
              {trenutni.end}-{trenutni.pauza}(pocinje sledeci)
            </p>
            <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-600 py-3 rounded-xl font-bold text-sm hover:border-indigo-300 transition-all">
              <UserPlus className="w-4 h-4" /> Dodaj klijenta
            </button>
          </div>
        </div>
      </div>
    );
  });
}
