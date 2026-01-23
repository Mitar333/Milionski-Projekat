import { useState } from "react";

import { CloseButton } from "./DateTable";
import Input from "./Input";
import { useCalendar } from "../hooks/useCalendar";
import { H1Datum } from "./SelectedDate";
import SelectWorkingHours from "./SelectWorkingHours";
import { Toggle } from "./Toggle";

function getData(/*employeeId izabraniDatum*/) {
  return {
    isOpen: true,
    start: "07:00",
    end: "15:00",
    reason: "",
  };
}

export function WorkingHoursForm({ isSelectDate }) {
  const { day, month, year } = useCalendar();
  const izabraniDatum = `${day < 10 ? `0${day}` : day}-${month + 1 < 10 ? `0${month + 1}` : month + 1}-${year}`;
  const [employeeId, setEmployeeId] = useState("all");
  const { isOpen, start, end, reason } = getData(employeeId, izabraniDatum);
  const [isOpen2, setIsOpen2] = useState(isOpen);

  if (day === 99) return null; //dan nikad nece manuelno od strane korisnika biti 99, u 1 slucaju kada ne treba renderovati formu sam ja rucno stavio da dan bude 99
  return (
    <div className="flex flex-col gap-6 text-gray-700">
      <div className="border-b border-gray-100 pb-4">
        <H1Datum />
        <p className="text-sm text-gray-500 mt-1">
          Postavite specifično radno vrijeme ili označite neradni dan.
        </p>
      </div>

      {isSelectDate === "admin" && (
        <SelectWorkingHours
          employeeId={employeeId}
          setEmployeeId={setEmployeeId}
        />
      )}
      {/* Toggle */}
      <Toggle state={isOpen2} setState={setIsOpen2} />
      {/* Dijelovi koji posive kada je salon zatvoren za taj dan */}
      <div
        className={`space-y-5 transition-all duration-300 ${isOpen2 ? "opacity-100" : "opacity-40 pointer-events-none"}`}
      >
        <div
          className="grid grid-cols-2 gap-4"
          key={`${izabraniDatum}-${employeeId}`}
        >
          {/* Input za vrijeme otvaranja */}
          <div className="relative">
            <span className="absolute -top-2 left-3 px-1 bg-white text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
              Otvaranje
            </span>
            <Input defaultValue={isOpen ? start : "07:00"} type="time" />
          </div>
          {/* Input za vrijeme zatvaranja */}
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
      {/* Dugmad */}
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
