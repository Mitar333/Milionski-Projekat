import DateTable from "../components/DateTable";
import Header from "../components/Header";

import EmployeeFooter from "../components/EmployeeFooter";

function EmployeeWorkingHours() {
  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col font-sans antialiased">
      <Header to={`/employee`} label="Radno Vrijeme" />

      <main className="flex-1 p-5 max-w-xl mx-auto w-full pb-24 text-gray-800">
        {/* Sekcija za specifične datume */}
        <div className="mb-6">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3 block px-1">
            Specifični dani / Praznici
          </label>

          <DateTable onSelectDate={true} />
        </div>
      </main>

      <EmployeeFooter trenutno="/hours" />
    </div>
  );
}

export default EmployeeWorkingHours;
