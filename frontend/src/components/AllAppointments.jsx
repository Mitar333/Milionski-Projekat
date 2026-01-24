import { Clock } from "lucide-react";
import { useState } from "react";

export function AllAppointments({ rasporedPoRadnicima }) {
  // Postavi default na 0 da se odmah vidi prvi radnik, ili ostavi "" za prazno
  const [tab, setTab] = useState(0);

  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
        {rasporedPoRadnicima.map((radnik, i) => (
          <button
            key={i}
            onClick={() => setTab(i)}
            className={`px-5 py-2 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-sm border ${
              tab === i
                ? "bg-indigo-600 text-white border-indigo-600 shadow-indigo-100"
                : "bg-white text-gray-400 border-gray-100 hover:border-indigo-200"
            }`}
          >
            {radnik.at(0)?.employee || `Radnik ${i + 1}`}
          </button>
        ))}
      </div>

      {(tab === 0 || tab) && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <h2 className="text-[11px] font-black uppercase tracking-[2px] text-gray-400">
                Predstojeći termini
              </h2>
            </div>
            <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full border border-indigo-100">
              {rasporedPoRadnicima[tab]?.length > 1
                ? rasporedPoRadnicima[tab]?.length
                : 0}{" "}
              ukupno
            </span>
          </div>

          <div className="space-y-2">
            {rasporedPoRadnicima[tab]?.length > 1 ? (
              rasporedPoRadnicima[tab]?.map((termin) => (
                <div
                  key={termin.id}
                  className="bg-white border border-gray-100 rounded-3xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col items-center justify-center border-r border-gray-100 pr-4 min-w-15">
                    <span className="text-[9px] font-black text-gray-400 uppercase mb-1">
                      Start
                    </span>
                    <span className="text-sm font-black text-gray-800">
                      {termin.start}
                    </span>
                  </div>

                  <div className="flex-1 px-4 truncate">
                    <p className="font-bold text-gray-800 text-[14px] truncate">
                      {termin.client}
                    </p>
                    <p className="text-[11px] text-gray-400 font-medium truncate italic">
                      {termin.service}
                    </p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-[9px] font-black px-2 py-1 rounded-lg uppercase ${
                        termin.status === "potvrđeno"
                          ? "text-emerald-500 bg-emerald-50"
                          : "text-indigo-400 bg-indigo-50"
                      }`}
                    >
                      {termin.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="font-bold text-gray-800 text-[14px] truncate">
                Nema rezervacija
              </p>
            )}

            {/* Empty state ako radnik nema termina */}
            {rasporedPoRadnicima[tab]?.length === 0 && (
              <div className="text-center py-10 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-400 text-xs italic">
                  Nema predstojećih termina.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
