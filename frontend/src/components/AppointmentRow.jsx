import { Trash2 } from "lucide-react";
import Modal from "./Modal";

export function AppointmentRow({ termin, bez = true }) {
  return (
    <li className="bg-white rounded-3xl p-4 shadow-sm border border-gray-50 flex items-center gap-4 transition-all hover:shadow-md">
      {/* VRIJEME - Istaknuto u sivom boxu */}
      <div className="bg-gray-50 rounded-2xl p-3 flex flex-col items-center justify-center min-w-17.5">
        <span className="text-xs font-black text-indigo-600 uppercase tracking-tighter">
          Od
        </span>
        <span className="text-lg font-bold text-gray-900 leading-none">
          {termin.startTime}
        </span>
      </div>

      {/* DETALJI */}
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-800">
            Usluga #{termin.serviceId}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <span className="text-xs text-gray-500">
            Frizer #{termin.employeeId}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${termin.status === "confirmed" ? "bg-emerald-500" : termin.status === "ended" ? "bg-red-500" : "bg-amber-500"}`}
          ></span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            {termin.status}
          </span>
        </div>
      </div>

      {/* AKCIJE */}
      {bez && (
        <div className="flex items-center">
          <Modal.Open opens="deleteAppointment">
            <button className="p-3 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-2xl transition-all active:scale-90">
              <Trash2 className="w-5 h-5" />
            </button>
          </Modal.Open>
        </div>
      )}
    </li>
  );
}
