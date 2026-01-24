import { useState } from "react";
import { ChevronDown, ChevronUp, Save, Settings2 } from "lucide-react";
import AdminFooter from "../components/AdminFooter";
import DateTable from "../components/DateTable";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { CalendarProvider } from "../context/CalendarContext";
import { daysOfWeek2 } from "../utils/constants";
import { WorkingDay } from "../components/WorkingDay";

function WorkingHours() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col font-sans antialiased">
      <Header
        to={`/admin/${location.pathname.split("/").at(2)}`}
        label="Radno Vrijeme"
      />

      <main className="flex-1 p-5 max-w-xl mx-auto w-full pb-24 text-gray-800">
        {/* Sekcija za specifične datume */}
        <div className="mb-6">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3 block px-1">
            Specifični dani / Praznici
          </label>
          <CalendarProvider>
            <DateTable isSelectDate={"admin"} />
          </CalendarProvider>
        </div>

        {/* Standardno radno vrijeme */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between p-5 bg-gray-50/50 border-b border-gray-100"
          >
            <div className="flex items-center gap-3 font-bold text-gray-700">
              <Settings2 className="w-5 h-5 text-indigo-600" />
              Standardno radno vrijeme
            </div>
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {isOpen && (
            <div className="p-2">
              <ul className="divide-y divide-gray-100">
                {Object.values(daysOfWeek2).map((dan, i) => (
                  <WorkingDay dan={dan} key={i} i={i} />
                ))}
              </ul>

              <div className="p-3">
                <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-100">
                  <Save className="w-5 h-5" />
                  SAČUVAJ PROMJENE
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <AdminFooter
        trenutno="/hours"
        salonId={location.pathname.split("/").at(2)}
      />
    </div>
  );
}

export default WorkingHours;
