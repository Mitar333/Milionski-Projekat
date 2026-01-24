import Header from "../components/Header";
import EmployeeFooter from "../components/EmployeeFooter";
import { termini } from "../data";
import { AppointmentCard } from "../components/AppointmentCard";
import { SearchForm, Statistika } from "../components/ArchiveHelpers";

function EmployeeArchive() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans antialiased">
      <Header label="Arhiva" to={`/employee/`} />

      <main className="flex-1 p-5 max-w-xl mx-auto w-full pb-24">
        <Statistika />

        <SearchForm />
        <div className="space-y-3">
          {termini.map((termin) => (
            <AppointmentCard termin={termin} />
          ))}
        </div>
      </main>

      <EmployeeFooter trenutno="/archive" />
    </div>
  );
}

export default EmployeeArchive;
