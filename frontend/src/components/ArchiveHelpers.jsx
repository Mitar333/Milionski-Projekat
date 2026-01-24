import { ChevronDown, Filter, Search } from "lucide-react";
import { subDays } from "date-fns";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
export function SearchForm() {
  return (
    <div className="bg-white p-5 rounded-4xl border border-gray-100 shadow-sm mb-6 space-y-4">
      {/* Header filtera */}
      <div className="flex items-center justify-between mb-1 px-1">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-indigo-500" />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Napredna pretraga
          </span>
        </div>
        <button className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors uppercase">
          Poništi
        </button>
      </div>

      {/* Search polje - sada na vrhu jer je najbitnije */}
      <div className="relative group">
        <label className="block text-[9px] font-black text-gray-400 uppercase tracking-tighter mb-1.5 ml-1">
          Ime klijenta
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          <input
            placeholder="Npr. Marko Marković"
            className="w-full pl-9 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-xs font-medium placeholder:text-gray-300 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all outline-none"
          />
        </div>
      </div>

      <OdDo />

      {/* Status Select */}
      <div className="space-y-1.5">
        <label className="block text-[9px] font-black text-gray-400 uppercase tracking-tighter ml-1">
          Status termina
        </label>
        <div className="relative">
          <select className="w-full text-xs bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all outline-none appearance-none font-medium text-gray-600 cursor-pointer">
            <option>Svi statusi</option>
            <option>Odrađeno</option>
            <option>No show</option>
            <option>Otkazani</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Statistika() {
  return (
    <div className="grid grid-cols-3 gap-3 mb-8">
      <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm text-center">
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">
          Odrađeno
        </p>
        <p className="text-lg font-bold text-emerald-600">24</p>
      </div>
      <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm text-center">
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">
          No Show
        </p>
        <p className="text-lg font-bold text-red-500">2</p>
      </div>
      <div className="bg-white p-3 rounded-2xl border border-indigo-50 shadow-sm text-center">
        <p className="text-[10px] uppercase tracking-wider text-indigo-400 font-bold mb-1">
          Zarada
        </p>
        <p className="text-lg font-bold text-indigo-600">
          420<span className="text-xs ml-0.5">KM</span>
        </p>
      </div>
    </div>
  );
}

export function OdDo() {
  const today = subDays(new Date(), 7);
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const datum = `${year}-${month}-${day}`;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {" "}
      <DatePicker
        label="Od"
        defaultValue={dayjs(datum)}
        format="DD/MM/YYYY"
        slotProps={{
          textField: {
            fullWidth: true,
            variant: "outlined",
            sx: {
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.75rem",
                backgroundColor: "#f9fafb",
              },
            },
          },
        }}
      />
      <DatePicker
        label="Do"
        defaultValue={dayjs()}
        format="DD/MM/YYYY"
        slotProps={{
          textField: {
            fullWidth: true,
            variant: "outlined",
            sx: {
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.75rem",
                backgroundColor: "#f9fafb",
              },
            },
          },
        }}
      />
    </div>
  );
}
