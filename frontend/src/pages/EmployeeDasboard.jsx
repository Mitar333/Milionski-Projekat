import { UserPlus, Clock, User, Scissors, Zap } from "lucide-react";

import Header from "../components/Header";

import useListaMogucih, { radnoVrijeme } from "../hooks/useTimeSlots";
import { useState } from "react";
import EmployeeFooter from "../components/EmployeeFooter";
import { RadnikNaPauzi, WalkIn } from "./AdminDasboard";
function isNow(termin) {
  if (termin.start) {
    const sati = new Date().getHours();
    const minuta = new Date().getMinutes() + sati * 60;

    const startH = Number(termin.start.split(":").at(0));
    const startM = Number(termin.start.split(":").at(1)) + startH * 60;

    const endH = Number(termin.end.split(":").at(0));
    const endM = Number(termin.end.split(":").at(1)) + endH * 60;

    if (minuta >= startM && minuta <= endM) {
      return { ...termin };
    } else {
      return null;
    }
  }
}
function izracunajMinute(vrijeme) {
  if (vrijeme) {
    let [sati, minuta] = vrijeme.split(":");
    sati = Number(sati);
    return Number(minuta) + sati * 60;
  }
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
function EmployeeDasboard() {
  let [krajRVSati, krajRVMinuta] = radnoVrijeme.end.split(":");
  krajRVSati = Number(krajRVSati);
  krajRVMinuta = Number(krajRVMinuta) + krajRVSati * 60;
  const sati = new Date().getHours();
  const minuta = new Date().getMinutes() + sati * 60;

  // const rasporedPoRadnicima = [[{}], [{}], [{}]];
  const terminiZaDanas = [
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
  ];
  const listaMogucih = useListaMogucih(10);
  const trenutniPrazanTermin = getCurrentAppointment(listaMogucih);
  const trenutniTermin = terminiZaDanas
    .map((termin) => isNow(termin))
    .filter((termin) => termin)
    .at(0);

  if (minuta > krajRVMinuta)
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans antialiased">
        <Header label="Emplyee Dashboard" to={`/employee`} />
        <KrajRadnogVremena />
        <EmployeeFooter trenutno="/" />
      </div>
    );
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans antialiased">
      <Header label="Employee Dashboard" to={`/employee`} />

      {/* DODAT MAIN TAG SA PADDINGOM - Ovo popravlja centriranje */}
      <main className="flex-1 p-5 pb-24 w-full max-w-md mx-auto">
        {/* LOGIKA ZA PRIKAZ GORNJEG DIJELA */}
        {minuta > krajRVMinuta ? (
          <KrajRadnogVremena />
        ) : trenutniTermin?.start ? (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 px-1">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <h2 className="text-[11px] font-black uppercase tracking-[2px] text-gray-400">
                Trenutno na stolici
              </h2>
            </div>

            <div className="rounded-3xl p-5 border shadow-sm bg-white border-indigo-100 ring-1 ring-indigo-50">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">
                    Radnik: {trenutniTermin.employee}
                  </p>
                  <p className="text-xl font-black text-gray-800 tracking-tighter">
                    {trenutniTermin.start} - {trenutniTermin.end}
                  </p>
                </div>
                <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg animate-pulse">
                  U TOKU
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 mb-6">
                <div className="flex justify-between items-end mb-1.5 px-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Progres
                  </span>
                  <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                    {/* Skraćena matematika radi preglednosti */}
                    {Math.round(
                      Math.min(
                        Math.max(
                          ((izracunajMinute(
                            new Date().getHours() +
                              ":" +
                              new Date().getMinutes()
                          ) -
                            izracunajMinute(trenutniTermin.start)) /
                            (izracunajMinute(trenutniTermin.end) -
                              izracunajMinute(trenutniTermin.start))) *
                            100,
                          0
                        ),
                        100
                      )
                    )}
                    %
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-50">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                    style={{
                      width: `${Math.round(Math.min(Math.max(((izracunajMinute(new Date().getHours() + ":" + new Date().getMinutes()) - izracunajMinute(trenutniTermin.start)) / (izracunajMinute(trenutniTermin.end) - izracunajMinute(trenutniTermin.start))) * 100, 0), 100))}%`,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-800 font-bold">
                  <User className="w-4 h-4 text-gray-400" />{" "}
                  {trenutniTermin.client}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 italic mb-4">
                  <Scissors className="w-4 h-4 text-gray-400" />{" "}
                  {trenutniTermin.service}
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-600 py-3 rounded-xl font-bold text-sm hover:border-indigo-300 transition-all">
                  <UserPlus className="w-4 h-4" /> Dodaj klijenta
                </button>
              </div>
            </div>
          </div>
        ) : trenutniPrazanTermin?.start ? (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 px-1">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <h2 className="text-[11px] font-black uppercase tracking-[2px] text-gray-400">
                Slobodan si
              </h2>
            </div>
            <div className="rounded-3xl p-5 border border-dashed border-indigo-200 bg-indigo-50/30">
              <p className="text-xl font-black text-indigo-900 mb-4 tracking-tighter">
                {trenutniPrazanTermin.start} - {trenutniPrazanTermin.end}
              </p>
              <WalkIn />
            </div>
          </div>
        ) : (
          <RadnikNaPauzi />
        )}

        {/* DONJI DIO: LISTA SVIH TERMINA */}
        <div className="mt-10">
          <AllAppointments rasporedPoRadnicima={[terminiZaDanas]} />
        </div>
      </main>

      <EmployeeFooter trenutno="/" />
    </div>
  );
}

export default EmployeeDasboard;

function AllAppointments({ rasporedPoRadnicima }) {
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
