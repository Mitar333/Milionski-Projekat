/*
"Empty State" postoji ali ga treba testirati sa pravim podacima koji ce biti u db zasad nista

apstrakcije... nemam nacina da dobijem ako je radnik na pauzi do kad je na pauzi zasad nista dok ne dodju podaci sa db

*/

import { UserPlus, Clock, User, Scissors, Zap } from "lucide-react";
import AdminFooter from "../components/AdminFooter";
import Header from "../components/Header";
import { Link, useLocation } from "react-router-dom";
import useListaMogucih, { radnoVrijeme } from "../hooks/useTimeSlots";
import { useState } from "react";
function isNow(termin, pauza) {
  if (termin.start) {
    const sati = new Date().getHours();
    const minuta = new Date().getMinutes() + sati * 60;

    const startH = Number(termin.start.split(":").at(0));
    const startM = Number(termin.start.split(":").at(1)) + startH * 60;

    const endH = Number(termin.end.split(":").at(0));
    const endM = Number(termin.end.split(":").at(1)) + endH * 60;

    if (minuta >= startM && minuta <= endM) {
      return { ...termin, pauza };
    } else {
      return null;
    }
  }
}
function izracunajMinute(vrijeme) {
  let [sati, minuta] = vrijeme.split(":");
  sati = Number(sati);
  return Number(minuta) + sati * 60;
}
function getCurrentAppointment(listaMogucih) {
  const sati = new Date().getHours();
  const minuta = new Date().getMinutes() + sati * 60;

  const lista = listaMogucih
    .map((termin) => {
      if (termin.start) {
        let [startSati, startMinuta] = termin.start.split(":");
        let [endSati, endMinuta] = termin.end.split(":");
        startSati = Number(startSati);
        startMinuta = Number(startMinuta) + startSati * 60;
        endSati = Number(endSati);
        endMinuta = Number(endMinuta) + endSati * 60;

        if (minuta <= endMinuta && minuta >= startMinuta) return termin;
      }
    })
    .filter((termin) => {
      return termin;
    })
    .at(0);

  return lista;
}

function AdminDashboard() {
  const location = useLocation();

  let [krajRVSati, krajRVMinuta] = radnoVrijeme.end.split(":");
  krajRVSati = Number(krajRVSati);
  krajRVMinuta = Number(krajRVMinuta) + krajRVSati * 60;
  const sati = new Date().getHours();
  const minuta = new Date().getMinutes() + sati * 60;
  // const employees = [];
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
    {
      id: 3,
      name: "Igor Igorovic",
      title: "Frizer",
      email: "igor@salon.com",
      phone: "066 333 444",
      services: [1, 2],
    },
  ];
  // const rasporedPoRadnicima = [[{}], [{}], [{}]];
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
        end: "09:00",
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
        start: "09:00",
        end: "10:00",
        client: "Marko V.",
        service: "Farbanje",
        status: "potvrđeno",
      },
      {
        id: 403,
        employee: "Igor",
        employeeId: "3",
        start: "10:00",
        end: "17:30",
        client: "Marko V.",
        service: "Farbanje",
        status: "potvrđeno",
      },
      {
        id: 404,
        employee: "Igor",
        employeeId: "3",
        start: "18:00",
        end: "18:30",
        client: "Marko V.",
        service: "Farbanje",
        status: "potvrđeno",
      },
    ],
  ];
  const listaMogucih = useListaMogucih(10);
  if (!employees || !employees.length)
    return (
      <div>
        <Header
          label="Admin Dashboard"
          to={`/admin/${location.pathname.split("/").at(2)}`}
        />
        <p>Konfiguracija Zaposlenih nije zavrsena</p>
        <Link
          to={`/admin/${location.pathname.split("/").at(2)}/employees-details`}
        >
          Zavrsite konfiguraciju
        </Link>
      </div>
    );
  // if (!rasporedPoRadnicima || !rasporedPoRadnicima.length)
  //   //vjerovatno nepotrebno
  //   return (
  //     <div>
  //       <Header
  //         label="Admin Dashboard"
  //         to={`/admin/${location.pathname.split("/").at(2)}`}
  //       />
  //       <p>Konfiguracija Zaposlenih nije zavrsena</p>
  //       <Link to={`/admin/${location.pathname.split("/").at(2)}`}>
  //         API greska
  //       </Link>
  //     </div>
  //   );
  // if (!rasporedPoRadnicima.at(0).values)
  //   return (
  //     <div>
  //       <Header
  //         label="Admin Dashboard"
  //         to={`/admin/${location.pathname.split("/").at(2)}`}
  //       />
  //       <p>Niko nije rezervisao termin danas</p>
  //     </div>
  //   );
  // const employees = [];
  const currentAppointmentForEachEmployee = employees.map((employee) => {
    return {
      ...getCurrentAppointment(listaMogucih),
      name: employee.name,
      title: employee.title,
    };
  });

  // const services = [
  //   { id: 1, name: "Muško šišanje", duration: 30, price: 15 },
  //   { id: 2, name: "Pranje kose i feniranje", duration: 20, price: 10 },
  // ];

  const pauze = rasporedPoRadnicima.map((radnik) => {
    return radnik.map((termin, i) => {
      if (radnik[i + 1]) {
        return radnik[i + 1].start;
      } else {
        return radnoVrijeme.end;
      }
    });
  });

  // const sviTermini = rasporedPoRadnicima.flat().sort((a, b) => {
  //   const aH = Number(a.start.split(":").at(0));
  //   const aM = Number(a.start.split(":").at(1)) + aH * 60;
  //   const bH = Number(b.start.split(":").at(0));
  //   const bM = Number(b.start.split(":").at(1)) + bH * 60;
  //   return aM - bM;
  // });

  const trenutniTermini = rasporedPoRadnicima
    .map((radnik, i) => {
      return radnik.map((termin, k) => isNow(termin, pauze[i][k]));
    }) //ovo dole ukida null-ove
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

      {trenutniTermini.length || currentAppointmentForEachEmployee.length ? (
        <main className="flex-1 p-5 max-w-xl mx-auto w-full pb-24">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 px-1">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <h2 className="text-[11px] font-black uppercase tracking-[2px] text-gray-400">
                Trenutno na stolici
              </h2>
            </div>

            <div className="space-y-4">
              {
                krajRVMinuta > minuta ? (
                  trenutniTermini.map((trenutni2, i) => {
                    if (trenutni2.length)
                      return trenutni2.map((trenutni) => {
                        return (
                          <div
                            key={trenutni.id}
                            className={`rounded-3xl p-5 border shadow-sm transition-all ${"bg-white border-indigo-100 ring-1 ring-indigo-50"}`}
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
                              <div className="mt-4 mb-6">
                                {/* Labela sa procentom ili preostalim minutama */}
                                <div className="flex justify-between items-end mb-1.5 px-1">
                                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    Progres termina
                                  </span>
                                  <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                                    {Math.round(
                                      Math.min(
                                        Math.max(
                                          ((izracunajMinute(
                                            new Date().getHours() +
                                              ":" +
                                              new Date().getMinutes()
                                          ) -
                                            izracunajMinute(trenutni.start)) /
                                            (izracunajMinute(trenutni.end) -
                                              izracunajMinute(
                                                trenutni.start
                                              ))) *
                                            100,
                                          0
                                        ),
                                        100
                                      )
                                    )}
                                    %
                                  </span>
                                </div>

                                {/* Pozadina Progress Bara */}
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-50">
                                  {/* Aktivni dio Progress Bara */}
                                  <div
                                    className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(99,102,241,0.4)]"
                                    style={{
                                      width: `${Math.min(
                                        Math.max(
                                          ((izracunajMinute(
                                            new Date().getHours() +
                                              ":" +
                                              new Date().getMinutes()
                                          ) -
                                            izracunajMinute(trenutni.start)) /
                                            (izracunajMinute(trenutni.end) -
                                              izracunajMinute(
                                                trenutni.start
                                              ))) *
                                            100,
                                          0
                                        ),
                                        100
                                      )}%`,
                                    }}
                                  />
                                </div>
                                <div className="py-2 mt-2 text-center">
                                  <p className="text-sm text-gray-400 font-medium mb-2 italic px-4">
                                    Rezervisite sledeci termin <br />
                                    {trenutni.end}-{trenutni.pauza}(pocinje
                                    sledeci)
                                  </p>
                                  <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-600 py-3 rounded-xl font-bold text-sm hover:border-indigo-300 transition-all">
                                    <UserPlus className="w-4 h-4" /> Dodaj
                                    klijenta
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <WalkIn />
                            )}
                          </div>
                        );
                      });
                    else if (currentAppointmentForEachEmployee.at(i).start) {
                      return (
                        <div
                          key={i}
                          className={`rounded-3xl p-5 border shadow-sm transition-all ${"bg-gray-50 border-dashed border-gray-300"}`}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">
                                Radnik:
                                {currentAppointmentForEachEmployee.at(i)?.name}
                              </p>
                              <p className="text-xl font-black text-gray-800 tracking-tighter">
                                {currentAppointmentForEachEmployee.at(i)?.start}{" "}
                                -{currentAppointmentForEachEmployee.at(i)?.end}
                              </p>
                            </div>
                          </div>
                          <WalkIn />
                        </div>
                      );
                    } else {
                      return <RadnikNaPauzi i={i} />;
                      //radnik je na pauzi
                    }
                  })
                ) : (
                  <KrajRadnogVremena />
                )
                //kraj radnog vremena
              }
            </div>
          </div>

          <AllAppointments rasporedPoRadnicima={rasporedPoRadnicima} />
        </main>
      ) : (
        <div>Jos niste zavrsili konfiguraciju vaseg salona</div>
      )}

      <AdminFooter trenutno="/" salonId={location.pathname.split("/").at(2)} />
    </div>
  );
}

export default AdminDashboard;
export function WalkIn() {
  return (
    <div className="py-2 text-center">
      <p className="text-sm text-gray-400 font-medium mb-4 italic px-4">
        Ovaj termin je trenutno slobodan.
      </p>
      <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-600 py-3 rounded-xl font-bold text-sm hover:border-indigo-300 transition-all">
        <UserPlus className="w-4 h-4" /> Dodaj "Walk-in" klijenta
      </button>
    </div>
  );
}
export function KrajRadnogVremena() {
  return (
    <div
      className={`opacity-60 grayscale-[0.5] rounded-3xl p-5 border shadow-sm transition-all ${"bg-gray-50 border-dashed border-gray-300"}`}
    >
      <p>Kraj radnog vremena</p>
    </div>
  );
}
export function RadnikNaPauzi({ i }) {
  return (
    <div
      key={i}
      className={`opacity-60 grayscale-[0.5] rounded-3xl p-5 border shadow-sm transition-all ${"bg-gray-50 border-dashed border-gray-300"}`}
    >
      <p>Radnik je trenutno na pauzi</p>
    </div>
  );
}
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
