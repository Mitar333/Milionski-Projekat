/*1. Dinamički Progress Bar (Vrijeme do kraja termina)
2. "Empty State" za predstojeće termine
3. Brza pretraga klijenta (Search Bar) */

import { Check, X, UserPlus, Clock, User, Scissors, Zap } from "lucide-react";
import AdminFooter from "../components/AdminFooter";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";

function AdminDashboard() {
  const location = useLocation();

  // MOCK DATA: Trenutni termini (SADA na stolici)
  const sati = new Date().getHours();
  const minuta = new Date().getMinutes() + sati * 60;

  // MOCK DATA: Svi današnji termini
  const rasporedPoRadnicima = [
    // Niz za Radnika 1 (npr. Marko)
    [
      {
        id: 201,
        employee: "Marko",
        employeeId: "1",
        start: "08:00",
        end: "09:30",
        client: "Nikola J.",
        service: "Šišanje",
        status: "odrađeno",
      },
      {
        id: 202,
        employee: "Marko",
        employeeId: "1",
        start: "08:30",
        end: "24:00",
        client: "Denis K.",
        service: "Brijanje",
        status: "odrađeno",
      },
    ],

    // Niz za Radnika 2 (npr. Ana)
    [
      {
        id: 301,
        employee: "Ana",
        employeeId: "2",
        start: "09:00",
        end: "08:45",
        client: "Sara M.",
        service: "Feniranje",
        status: "odrađeno",
      },
    ],

    // Niz za Radnika 3 (npr. Igor)
    [
      {
        id: 401,
        employee: "Igor",
        employeeId: "3",
        start: "08:00",
        end: "09:00",
        client: "Marko V.",
        service: "Farbanje",
        status: "potvrđeno",
      },
      {
        id: 402,
        employee: "Igor",
        employeeId: "3",
        start: "08:00",
        end: "24:00",
        client: "Marko V.",
        service: "Farbanje",
        status: "potvrđeno",
      },
    ],
  ];
  const sviTermini = rasporedPoRadnicima.flat().sort((a, b) => {
    const aH = Number(a.start.split(":").at(0));
    const aM = Number(a.start.split(":").at(1)) + aH * 60;
    const bH = Number(b.start.split(":").at(0));
    const bM = Number(b.start.split(":").at(1)) + bH * 60;
    return aM - bM;
  });

  const trenutniTermini = rasporedPoRadnicima
    .map((radnik) => {
      return radnik.map((termin) => {
        const startH = Number(termin.start.split(":").at(0));
        const startM = Number(termin.start.split(":").at(1)) + startH * 60;

        const endH = Number(termin.end.split(":").at(0));
        const endM = Number(termin.end.split(":").at(1)) + endH * 60;

        if (minuta >= startM && minuta <= endM) {
          return termin;
        }
      });
    })
    .map((radnik) => {
      return radnik.filter((termin) => {
        return !!termin;
      });
    });

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans antialiased">
      <Header
        label="Admin Dashboard"
        to={`/admin/${location.pathname.split("/").at(2)}`}
      />

      <main className="flex-1 p-5 max-w-xl mx-auto w-full pb-24">
        {/* SEKCIJA: TRENUTNO (Live Status) */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 px-1">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            <h2 className="text-[11px] font-black uppercase tracking-[2px] text-gray-400">
              Trenutno na stolici
            </h2>
          </div>

          <div className="space-y-4">
            {trenutniTermini.map((trenutni2) => {
              if (trenutni2)
                return trenutni2.map((trenutni) => {
                  return (
                    <div
                      key={trenutni.id}
                      className={`rounded-3xl p-5 border shadow-sm transition-all ${
                        trenutni.client
                          ? "bg-white border-indigo-100 ring-1 ring-indigo-50"
                          : "bg-gray-50 border-dashed border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">
                            Radnik: {trenutni.employee}
                          </p>
                          <p className="text-xl font-black text-gray-800 tracking-tighter">
                            {trenutni.start} - {trenutni.end}
                          </p>
                        </div>
                        {trenutni.client && (
                          <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg animate-pulse">
                            U TOKU
                          </span>
                        )}
                      </div>

                      {trenutni.client ? (
                        <div>
                          <div className="space-y-1 mb-5">
                            <div className="flex items-center gap-2 text-gray-800 font-bold">
                              <User className="w-4 h-4 text-gray-400" />{" "}
                              {trenutni.client}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium italic">
                              <Scissors className="w-4 h-4 text-gray-400" />{" "}
                              {trenutni.service}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 py-3 rounded-xl font-bold text-sm hover:bg-emerald-100 transition-colors">
                              <Check className="w-4 h-4" /> Došao
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-red-50 text-red-500 py-3 rounded-xl font-bold text-sm hover:bg-red-100 transition-colors">
                              <X className="w-4 h-4" /> Nije došao
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="py-2 text-center">
                          <p className="text-sm text-gray-400 font-medium mb-4 italic px-4">
                            Ovaj termin je trenutno slobodan.
                          </p>
                          <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-600 py-3 rounded-xl font-bold text-sm hover:border-indigo-300 transition-all">
                            <UserPlus className="w-4 h-4" /> Dodaj "Walk-in"
                            klijenta
                          </button>
                        </div>
                      )}
                    </div>
                  );
                });
            })}
          </div>
        </div>

        {/* SEKCIJA: DANAS (Raspored) */}
        <div className="mb-4 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <h2 className="text-[11px] font-black uppercase tracking-[2px] text-gray-400">
              Predstojeći termini
            </h2>
          </div>
          <span className="text-[10px] font-bold bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
            {sviTermini.length} ukupno
          </span>
        </div>

        <div className="space-y-2">
          {sviTermini.map((termin) => (
            <div
              key={termin.id}
              className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm"
            >
              <div className="flex flex-col items-center justify-center border-r border-gray-100 pr-4 min-w-15">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter leading-none mb-1">
                  Start
                </span>
                <span className="text-[16px] font-black text-gray-800">
                  {termin.start}
                </span>
              </div>

              <div className="flex-1 px-4 truncate">
                <p className="font-bold text-gray-800 text-[14px] truncate">
                  {termin.client}
                </p>
                <p className="text-[11px] text-gray-400 font-medium truncate italic">
                  {termin.service} {termin.employee}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-indigo-400 bg-indigo-50 px-2 py-1 rounded-lg">
                  {termin.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <AdminFooter trenutno="/" salonId={location.pathname.split("/").at(2)} />
    </div>
  );
}

export default AdminDashboard;
