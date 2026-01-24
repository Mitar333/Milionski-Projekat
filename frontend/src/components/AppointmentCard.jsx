import { Scissors, User } from "lucide-react";

export function AppointmentCard({ termin }) {
  return (
    <div
      key={termin.id}
      className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm"
    >
      <div className="flex items-center gap-4 text-center border-r border-gray-50 pr-4">
        <div>
          <p className="text-[11px] font-bold text-gray-400 uppercase leading-none mb-1">
            {termin.date}
          </p>
          <p className="text-[15px] font-black text-gray-800">{termin.start}</p>
        </div>
      </div>

      <div className="flex-1 px-4">
        <h4 className="text-[14px] font-bold text-gray-800 leading-tight">
          {termin.client}
        </h4>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-[11px] text-gray-400 font-medium">
          <span className="flex items-center gap-1 leading-none">
            <Scissors className="w-3 h-3" /> {termin.service}
          </span>
          <span className="flex items-center gap-1 leading-none">
            <User className="w-3 h-3" /> {termin.employee}
          </span>
        </div>
      </div>

      <div className="text-right">
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-tight ${
            termin.status === "Odradjeno"
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-500"
          }`}
        >
          {termin.status}
        </span>
        <p className="text-[14px] font-black text-gray-800 mt-1">
          {termin.price}
        </p>
      </div>
    </div>
  );
}
