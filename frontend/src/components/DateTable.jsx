import {
  useCalendar,
  daysOfWeek,
  daysOfWeek2,
  pet,
  sedam,
} from "../hooks/useCalendar";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

import Td from "./Td";
const today = new Date();
function DateTable() {
  const {
    day,
    month,
    year,
    dayOfWeek,
    active,
    max,
    nedelja,
    months,
    prvaSedmica,
    handleNextMonth,
    handleSelectDay,
    handlePrevMonth,
  } = useCalendar();
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
          {daysOfWeek[dayOfWeek]}, {day}-ti {months[month].at(1)}, {year}
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
                  active={active}
                  key={dan || `prazno-${i}`}
                  k={i + 1} // Šaljemo čist index za tvoj handleSelectDay
                  handleSelectDay={handleSelectDay}
                >
                  {dan}
                </Td>
              ))}
            </tr>
            {pet.map((c, i) => (
              <tr key={i} className="last:border-b-0">
                {sedam.map((s, k) => {
                  const dan = i * 7 + (k + 1 + nedelja);
                  return (
                    <Td
                      key={dan}
                      dan={dan}
                      k={k + 1}
                      active={active}
                      handleSelectDay={handleSelectDay}
                    >
                      {dan < max ? dan : ""}
                    </Td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DateTable;
