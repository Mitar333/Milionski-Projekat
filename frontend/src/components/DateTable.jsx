import {
  useCalendar,
  daysOfWeek,
  daysOfWeek2,
  pet,
  sedam,
  months,
} from "../hooks/useCalendar";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

import Td from "./Td";
import Modal from "./Modal";

import { useModal } from "../hooks/useModal";
import { useActiveDays } from "../store";
import Input from "./Input";

const today = new Date();
function DateTable({ onSelectDate = false }) {
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

    prvaSedmica,
    prvaSedmicaSledecegMjeseca,
    handleNextMonth,

    handlePrevMonth,
  } = useCalendar();
  const thead = (
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
  );
  return (
    <div className="py-4">
      {/*Naslov meseca ide VAN tabele ili u <caption> */}
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

      <Modal>
        <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="min-w-full border-collapse bg-white">
            {thead}
            <tbody>
              <tr className="last:border-b-0">
                {prvaSedmica.map((dan, i) => {
                  const args = {
                    onSelectDate,
                    dan,
                    prva: true,
                    active,
                    opens: "working-hours-form",
                    max,
                    prviUMjesecu,
                    handleSelectDay,
                    k: i + 1, // Ovdje si poslao 'k'
                    data: dan,
                  };

                  if (!onSelectDate)
                    return (
                      <Td key={dan || `prazno-${i}`} {...args}>
                        {dan}
                      </Td>
                    );
                  return <ModalTd key={dan || `prazno-${i}`} {...args} />;
                })}
              </tr>
              {pet.map(
                (c, i) =>
                  i * 7 + (1 + nedelja) < max && (
                    <tr key={i} className="last:border-b-0">
                      {sedam.map((s, k) => {
                        const dan = i * 7 + (k + 1 + nedelja);
                        const args = {
                          onSelectDate,
                          opens: "working-hours-form",
                          dan,
                          k: k + 1,
                          active,
                          max,
                          handleSelectDay,
                          data: dan < max ? dan : prvaSedmicaSledecegMjeseca[k],
                        };
                        if (!onSelectDate)
                          return (
                            <Td key={dan} {...args}>
                              {args.data}
                            </Td>
                          );
                        return <ModalTd {...args} key={dan} />;
                      })}
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>

        <Modal.Window name="working-hours-form">
          <WorkingHoursForm
            dayOfWeek={dayOfWeek}
            day={day}
            month={month}
            year={year}
            nastavak={nastavak}
          />
        </Modal.Window>
      </Modal>
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
function ModalTd({ ...args }) {
  const { open } = useModal(); //cijela komponenta postoji samo zbog ovoga

  return (
    <Td open={open} {...args}>
      {args.data}
    </Td>
  );
}
export default DateTable;
function WorkingHoursForm({ dayOfWeek, nastavak, day, month, year }) {
  const activeDays = useActiveDays((state) => state.activeDays);

  if (day === 99) return null;
  const isOpen = activeDays[dayOfWeek];
  return (
    <div className="flex flex-col gap-6 text-gray-700">
      {/* HEADER SEKCIJA */}
      <div className="border-b border-gray-100 pb-4">
        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <span className="text-indigo-600">📅</span>
          {dayOfWeek || dayOfWeek === 0 ? `${daysOfWeek[dayOfWeek]},` : ""}{" "}
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
          <p className="font-bold text-sm text-gray-800">Status salona</p>
          <p className="text-xs text-gray-500">
            {isOpen ? "Salon radi po planu" : "Salon je zatvoren cijeli dan"}
          </p>
        </div>
        <div
          onClick={() => {}}
          className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
            isOpen ? "bg-emerald-500 shadow-inner" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-5 h-5 rounded-full shadow-lg transform transition-transform duration-300 ${
              isOpen ? "translate-x-7" : "translate-x-0"
            }`}
          />
        </div>
      </div>

      {/* INPUTI SEKCIJA */}
      <div
        className={`space-y-5 transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-40 pointer-events-none"}`}
      >
        {/* Vrijeme Od - Do */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <span className="absolute -top-2 left-3 px-1 bg-white text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
              Otvaranje
            </span>
            <Input defaultValue="07:00" type="time" />
          </div>
          <div className="relative">
            <span className="absolute -top-2 left-3 px-1 bg-white text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
              Zatvaranje
            </span>
            <Input defaultValue="15:00" type="time" />
          </div>
        </div>

        {/* Bilješke */}
        <div className="relative">
          <span className="absolute -top-2 left-3 px-1 bg-white text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
            Povod / Bilješka
          </span>
          <Input
            type="text"
            placeholder="npr. Nova Godina, Slava, Privatne obaveze..."
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
  );
}
