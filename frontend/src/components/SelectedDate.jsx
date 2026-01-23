import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { daysOfWeek, months } from "../utils/constants";
import { useCalendar } from "../hooks/useCalendar";
export function SelectedDate() {
  const {
    day,
    month,
    year,
    dayOfWeek,
    nastavak,
    handleNextMonth,
    handlePrevMonth,
  } = useCalendar();
  const today = new Date();
  return (
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
  );
}
