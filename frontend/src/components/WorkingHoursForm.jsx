import { useState } from "react";
// import { useActiveDays } from "../store";
import { CloseButton } from "./DateTable";
import Input from "./Input";
import { daysOfWeek, months } from "../utils/constants";
import { useCalendar } from "../hooks/useCalendar";
function getData(/*employeeId izabraniDatum*/) {
  return {
    isOpen: true,
    start: "07:00",
    end: "15:00",
    reason: "",
  };
}

export function WorkingHoursForm({ isSelectDate }) {
  const { day, month, year, dayOfWeek, nastavak } = useCalendar();
  // const activeDays = useActiveDays((state) => state.activeDays);
  const izabraniDatum = `${day < 10 ? `0${day}` : day}-${month + 1 < 10 ? `0${month + 1}` : month + 1}-${year}`;

  const [employeeId, setEmployeeId] = useState("all");
  const employees = [
    {
      id: 100,
      name: "Marko Marković",
      title: "Glavni berber",
      email: "marko@salon.com",
      phone: "065 123 456",
      services: [1],
    },
    {
      id: 101,
      name: "Zivko Zivković",
      title: "Glavni berber",
      email: "zivko@salon.com",
      phone: "065 123 456",
      services: [1],
    },
  ];
  const { isOpen, start, end, reason } = getData(employeeId, izabraniDatum);
  const [isOpen2, setIsOpen2] = useState(isOpen);
  if (day === 99) return null;
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

      {isSelectDate === "admin" && employees.length > 1 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Uredi radno vrijeme za:
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {/* Dugme za SVE radnike (Salon level) */}
            <button
              onClick={() => setEmployeeId("all")}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                employeeId === "all"
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100"
                  : "bg-white text-gray-500 border-gray-100 hover:border-indigo-200"
              }`}
            >
              Svi (Salon)
            </button>

            {/* Dugmići za pojedinačne radnike */}
            {employees.map((employee) => (
              <button
                key={employee.id}
                onClick={() => setEmployeeId(employee.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
                  employeeId === employee.id
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100"
                    : "bg-white text-gray-500 border-gray-100 hover:border-indigo-200"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${employeeId === employee.id ? "bg-white" : "bg-indigo-400"}`}
                />
                {employee.name}
              </button>
            ))}
          </div>

          {/* Mala napomena za admina */}
          <p className="text-[10px] text-indigo-400 italic px-1">
            {employeeId === "all"
              ? "* Podešavate radno vrijeme za cijeli salon."
              : `* Podešavate izuzetak samo za radnika: ${employees.find((e) => e.id === employeeId)?.name}`}
          </p>
        </div>
      )}
      {/* STATUS SEKCIJA (Toggle) */}
      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
        <div>
          <p className="font-bold text-sm text-gray-800">Status salona</p>
          <p className="text-xs text-gray-500">
            {isOpen2 ? "Salon radi po planu" : "Salon je zatvoren cijeli dan"}
          </p>
        </div>
        <div
          onClick={() => {
            setIsOpen2((s) => !s);
          }}
          className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
            isOpen2 ? "bg-emerald-500 shadow-inner" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-5 h-5 rounded-full shadow-lg transform transition-transform duration-300 ${
              isOpen2 ? "translate-x-7" : "translate-x-0"
            }`}
          />
        </div>
      </div>
      {/* INPUTI SEKCIJA */}
      <div
        className={`space-y-5 transition-all duration-300 ${isOpen2 ? "opacity-100" : "opacity-40 pointer-events-none"}`}
      >
        {/* Vrijeme Od - Do */}
        <div
          className="grid grid-cols-2 gap-4"
          key={`${izabraniDatum}-${employeeId}`}
        >
          <div className="relative">
            <span className="absolute -top-2 left-3 px-1 bg-white text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
              Otvaranje
            </span>
            <Input defaultValue={isOpen ? start : "07:00"} type="time" />
          </div>
          <div className="relative">
            <span className="absolute -top-2 left-3 px-1 bg-white text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
              Zatvaranje
            </span>
            <Input defaultValue={isOpen ? end : "15:00"} type="time" />
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
            defaultValue={isOpen ? reason : ""}
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

/**
  const [employeeId, setEmployeeId] = useState("all");
  const activeDays = useActiveDays((state) => state.activeDays);

  //mock data
  const employees = [
    {
      id: 100,
      name: "Marko Marković",
      title: "Glavni berber",
      email: "marko@salon.com",
      phone: "065 123 456",
      services: [1],
    },
  ];
  let specificDates = [];
  if (isSelectDate === "admin") {
    specificDates = [
      {
        date: "07-01-2026",
        start: "",
        end: "",
        isOpen: false,
        reason: "Bozic",
        employees: [100],
      },
      {
        date: "27-01-2026",
        start: "10:00",
        end: "14:00",
        isOpen: true,
        reason: "Sveti Sava",
        employees: [100],
      },
    ];
  } else if (isSelectDate === "employee") {
    specificDates = [
      {
        date: "07-01-2026",
        start: "",
        end: "",
        isOpen: false,
        reason: "Bozic",
      },
      {
        date: "27-01-2026",
        start: "10:00",
        end: "14:00",
        isOpen: true,
        reason: "Sveti Sava",
      },
    ];
  }

  const izabraniDatum = `${day < 10 ? `0${day}` : day}-${month + 1 < 10 ? `0${month + 1}` : month + 1}-${year}`;

  let isSpecial = specificDates.find((date) => date.date === izabraniDatum);
  let isOpen = activeDays[dayOfWeek - 1 === -1 ? 6 : dayOfWeek - 1];
  if (isSpecial) {
    isOpen =
      isOpen &&
      specificDates.find((date) =>
        date.date === izabraniDatum && date.isOpen ? isSpecial?.isOpen : true
      );
  }
  console.log(isSpecial);
  if (onSelectDate === "admin" && employeeId !== "all" && isSpecial) {
    if (!isSpecial.employees?.includes(employeeId)) {
      isSpecial = { isOpen: true, start: "08:00", end: "20:00", reason: "" };
      isOpen = true;
    } else {
      isOpen = isSpecial.isOpen;
    }
  }
  if (onSelectDate === "admin" && employeeId === "all" && isSpecial) {
    if (isSpecial.employees.length === employees.length) {
      isOpen = isSpecial.isOpen;
    } else {
      isSpecial = { isOpen: true, start: "08:00", end: "20:00", reason: "" };
      isOpen = true;
    }
  } */
