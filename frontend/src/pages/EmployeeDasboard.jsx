import Header from "../components/Header";
import useListaMogucih, { radnoVrijeme } from "../hooks/useTimeSlots";
import EmployeeFooter from "../components/EmployeeFooter";
import {
  getCurrentAppointment,
  isNow,
  izracunajMinute,
} from "../utils/timeHelpers";
import { AllAppointments } from "../components/AllAppointments";
import { terminiZaDanas } from "../data";
import {
  KrajRadnogVremena,
  RadnikNaPauzi,
  UnutarRadnogVremenaEmployee,
} from "../components/DashboardHelpers";

function EmployeeDasboard() {
  const krajRVMinuta = izracunajMinute(radnoVrijeme.end);
  const sati = new Date().getHours();
  const minuta = new Date().getMinutes() + sati * 60;

  const listaMogucih = useListaMogucih(10);
  const trenutniPrazanTermin = getCurrentAppointment(listaMogucih);
  const trenutniTermin = terminiZaDanas
    .map((termin) => isNow(termin))
    .filter((termin) => termin)
    .at(0);

  if (minuta > krajRVMinuta)
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans antialiased">
        <Header label="Emplyee Dashboard" to={`/employee`} />
        <KrajRadnogVremena />
        <EmployeeFooter trenutno="/" />
      </div>
    );
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans antialiased">
      <Header label="Employee Dashboard" to={`/employee`} />

      <main className="flex-1 p-5 pb-24 w-full max-w-md mx-auto">
        {minuta > krajRVMinuta ? (
          <KrajRadnogVremena />
        ) : trenutniTermin?.start ? (
          <UnutarRadnogVremenaEmployee
            trenutniTermin={trenutniTermin}
            trenutniPrazanTermin={trenutniPrazanTermin}
          />
        ) : (
          <RadnikNaPauzi />
        )}

        <div className="mt-10">
          <AllAppointments rasporedPoRadnicima={[terminiZaDanas]} />
        </div>
      </main>

      <EmployeeFooter trenutno="/" />
    </div>
  );
}

export default EmployeeDasboard;
