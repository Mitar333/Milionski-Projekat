import { useActiveDays } from "../store";

export function WorkingDay({ dan, i }) {
  const toggleDay = useActiveDays((state) => state.toggleDay);
  const activeDays = useActiveDays((state) => state.activeDays);

  return (
    <li className="py-5 px-3">
      <div className="flex items-center justify-between mb-4">
        <span
          className={`font-bold ${activeDays[i] ? "text-gray-800" : "text-gray-400"}`}
        >
          {dan}
        </span>

        {/* PRAVI TOGGLE ELEMENT */}
        <div
          onClick={() => toggleDay(i)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
            activeDays[i] ? "bg-emerald-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
              activeDays[i] ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </div>
      </div>

      {activeDays[i] ? (
        <div className="grid grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="relative">
            <span className="absolute -top-2 left-3 px-1 bg-white text-[10px] font-bold text-gray-400 uppercase">
              Od
            </span>
            <input
              defaultValue="07:00"
              type="time"
              className="w-full text-sm font-semibold border border-gray-200 rounded-xl py-3 px-4 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div className="relative">
            <span className="absolute -top-2 left-3 px-1 bg-white text-[10px] font-bold text-gray-400 uppercase">
              Do
            </span>
            <input
              defaultValue="15:00"
              type="time"
              className="w-full text-sm font-semibold border border-gray-200 rounded-xl py-3 px-4 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>
      ) : (
        <p className="text-xs text-gray-400 italic">Ovaj dan salon ne radi.</p>
      )}
    </li>
  );
}
