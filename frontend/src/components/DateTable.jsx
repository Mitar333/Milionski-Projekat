/*
 */

import {
  useCalendar,
  daysOfWeek,
  daysOfWeek2,
  pet,
  sedam,
} from "../hooks/useCalendar";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

import Td from "./Td";
import Modal from "./Modal";
import { useState } from "react";
import { useModal } from "../hooks/useModal";

const today = new Date();
function DateTable({ onSelectDate }) {
  const {
    day,
    month,
    year,
    dayOfWeek,
    active,
    nastavak,
    handleSelectDay,

    max,
    nedelja,
    prviUMjesecu,
    months,
    prvaSedmica,
    prvaSedmicaSledecegMjeseca,
    handleNextMonth,

    handlePrevMonth,
  } = useCalendar();

  const [activeDays, setActiveDays] = useState({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: false,
    6: false,
  });

  const toggleDay = (index) => {
    setActiveDays((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="py-4">
      {/*Naslov meseca ide VAN tabele ili u <caption> */}
      {!onSelectDate ? (
        <>
          <div className="flex items-center justify-center gap-4">
            {(month !== today.getMonth() || year > today.getFullYear()) && (
              <button className="cursor-pointer" onClick={handlePrevMonth}>
                <GoArrowLeft size={24} />
              </button>
            )}

            <h1 className="text-base font-bold">
              {dayOfWeek || dayOfWeek === 0 ? `${daysOfWeek[dayOfWeek]},` : ""}{" "}
              {day ? `${day}-${nastavak} ` : ""}
              {months[month].at(1)}, {year}
            </h1>

            <button className="cursor-pointer" onClick={handleNextMonth}>
              <GoArrowRight size={24} />
            </button>
          </div>

          <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table className="min-w-full border-collapse bg-white">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {Object.values(daysOfWeek2).map((dan, i) => (
                    <th
                      className="py-3 text-[10px] uppercase tracking-widest text-gray-400 font-bold text-center border-r last:border-r-0 border-gray-200"
                      key={`dan-${i}`}
                    >
                      {dan.slice(0, 3)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="last:border-b-0">
                  {prvaSedmica.map((dan, i) => (
                    <Td
                      dan={dan}
                      key={dan || `prazno-${i}`}
                      prva={true}
                      active={active}
                      max={max}
                      prviUMjesecu={prviUMjesecu}
                      handleSelectDay={handleSelectDay}
                      k={i + 1} // Šaljemo čist index za tvoj handleSelectDay
                    >
                      {dan}
                    </Td>
                  ))}
                </tr>
                {pet.map(
                  (c, i) =>
                    i * 7 + (1 + nedelja) < max && (
                      <tr key={i} className="last:border-b-0">
                        {sedam.map((s, k) => {
                          const dan = i * 7 + (k + 1 + nedelja);
                          return (
                            <Td
                              key={dan}
                              dan={dan}
                              k={k + 1}
                              active={active}
                              max={max}
                              handleSelectDay={handleSelectDay}
                            >
                              {dan < max ? dan : prvaSedmicaSledecegMjeseca[k]}
                            </Td>
                          );
                        })}
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <Modal>
          <div className="flex items-center justify-center gap-4">
            {(month !== today.getMonth() || year > today.getFullYear()) && (
              <button className="cursor-pointer" onClick={handlePrevMonth}>
                <GoArrowLeft size={24} />
              </button>
            )}

            <h1 className="text-base font-bold">
              {dayOfWeek || dayOfWeek === 0 ? `${daysOfWeek[dayOfWeek]},` : ""}{" "}
              {day ? `${day}-${nastavak} ` : ""}
              {months[month].at(1)}, {year}
            </h1>

            <button className="cursor-pointer" onClick={handleNextMonth}>
              <GoArrowRight size={24} />
            </button>
          </div>

          <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table className="min-w-full border-collapse bg-white">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {Object.values(daysOfWeek2).map((dan, i) => (
                    <th
                      className="py-3 text-[10px] uppercase tracking-widest text-gray-400 font-bold text-center border-r last:border-r-0 border-gray-200"
                      key={`dan-${i}`}
                    >
                      {dan.slice(0, 3)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="last:border-b-0">
                  {prvaSedmica.map((dan, i) => (
                    <ModalTd1
                      key={dan || `prazno-${i}`} // Key ide ovdje, NE unutar args
                      args={{
                        onSelectDate,
                        dan,
                        prva: true,
                        active,
                        max,
                        prviUMjesecu,
                        handleSelectDay,
                        k: i + 1, // Ovdje si poslao 'k'
                      }}
                    />
                  ))}
                </tr>
                {pet.map(
                  (c, i) =>
                    i * 7 + (1 + nedelja) < max && (
                      <tr key={i} className="last:border-b-0">
                        {sedam.map((s, k) => {
                          const dan = i * 7 + (k + 1 + nedelja);
                          return (
                            <ModalTd2
                              key={dan}
                              args={{
                                onSelectDate,
                                opens: "working-hours-form",

                                dan,
                                k: k + 1,
                                active,
                                max,
                                handleSelectDay,
                                data:
                                  dan < max
                                    ? dan
                                    : prvaSedmicaSledecegMjeseca[k],
                              }}
                            />
                          );
                        })}
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
          <Modal.Window name="working-hours-form">
            <div className="flex flex-col gap-6 text-gray-700">
              {/* HEADER SEKCIJA */}
              <div className="border-b border-gray-100 pb-4">
                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="text-indigo-600">📅</span>
                  {dayOfWeek || dayOfWeek === 0
                    ? `${daysOfWeek[dayOfWeek]},`
                    : ""}{" "}
                  {day ? `${day}-${nastavak} ` : ""}
                  {months[month].at(1)}, {year}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Postavite specifično radno vrijeme ili označite neradni dan.
                </p>
              </div>

              {/* STATUS SEKCIJA (Toggle) */}
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div>
                  <p className="font-bold text-sm text-gray-800">
                    Status salona
                  </p>
                  <p className="text-xs text-gray-500">
                    {activeDays[dayOfWeek]
                      ? "Salon radi po planu"
                      : "Salon je zatvoren cijeli dan"}
                  </p>
                </div>
                <div
                  onClick={() => toggleDay(dayOfWeek)}
                  className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
                    activeDays[dayOfWeek]
                      ? "bg-emerald-500 shadow-inner"
                      : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-5 h-5 rounded-full shadow-lg transform transition-transform duration-300 ${
                      activeDays[dayOfWeek] ? "translate-x-7" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>

              {/* INPUTI SEKCIJA */}
              <div
                className={`space-y-5 transition-all duration-300 ${activeDays[dayOfWeek] ? "opacity-100" : "opacity-40 pointer-events-none"}`}
              >
                {/* Vrijeme Od - Do */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <span className="absolute -top-2 left-3 px-1 bg-white text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                      Otvaranje
                    </span>
                    <input
                      defaultValue="07:00"
                      type="time"
                      className="w-full text-sm font-semibold border border-gray-200 rounded-xl py-3 px-4 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute -top-2 left-3 px-1 bg-white text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                      Zatvaranje
                    </span>
                    <input
                      defaultValue="15:00"
                      type="time"
                      className="w-full text-sm font-semibold border border-gray-200 rounded-xl py-3 px-4 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Bilješke */}
                <div className="relative">
                  <span className="absolute -top-2 left-3 px-1 bg-white text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                    Povod / Bilješka
                  </span>
                  <input
                    type="text"
                    placeholder="npr. Nova Godina, Slava, Privatne obaveze..."
                    className="w-full text-sm border border-gray-200 rounded-xl py-3 px-4 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  />
                </div>
              </div>

              {/* AKCIJE (Dugmad) */}
              <div className="flex gap-3 mt-4">
                <CloseButton />
                <button
                  onClick={() => {}}
                  className="flex-2 px-4 py-3 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
                >
                  Sačuvaj izmjene
                </button>
              </div>
            </div>
          </Modal.Window>
        </Modal>
      )}
    </div>
  );
}
export function CloseButton() {
  const { close } = useModal();
  return (
    <button
      onClick={close}
      className="flex-1 px-4 py-3 text-sm font-bold text-gray-500 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
    >
      Odustani
    </button>
  );
}
function ModalTd1({ args }) {
  const { open } = useModal();

  // Izvuci sve iz args da lakše pišeš
  const {
    onSelectDate,
    dan,
    prva,
    active,
    max,
    prviUMjesecu,
    handleSelectDay,
    k,
  } = args;

  return (
    <Td
      onSelectDate={onSelectDate}
      open={open}
      dan={dan}
      prva={prva}
      opens="working-hours-form" // Fiksno ime za ovaj modal
      active={active}
      max={max}
      prviUMjesecu={prviUMjesecu}
      handleSelectDay={handleSelectDay}
      k={k}
    >
      {dan}
    </Td>
  );
}
function ModalTd2({ args }) {
  const { open } = useModal();
  const {
    onSelectDate,
    dan,
    opens,
    active,
    max,
    k,
    handleSelectDay,

    data,
  } = args;

  return (
    <Td
      onSelectDate={onSelectDate}
      opens={opens}
      key={dan}
      open={open}
      dan={dan}
      k={k}
      active={active}
      max={max}
      handleSelectDay={handleSelectDay}
    >
      {data}
    </Td>
  );
}
export default DateTable;
