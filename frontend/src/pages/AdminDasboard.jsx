/*
"Empty State" postoji ali ga treba testirati sa pravim podacima koji ce biti u db zasad nista

apstrakcije... nemam nacina da dobijem ako je radnik na pauzi do kad je na pauzi zasad nista dok ne dodju podaci sa db

*/
import { Zap } from "lucide-react";
import AdminFooter from "../components/AdminFooter";
import Header from "../components/Header";
import useListaMogucih, { radnoVrijeme } from "../hooks/useTimeSlots";
import { AllAppointments } from "../components/AllAppointments";
import {
  getCurrentAppointmentForEachEmployee,
  getPauze,
  getTrenutniTermini,
  izracunajMinute,
} from "../utils/timeHelpers";
import { employees, rasporedPoRadnicima } from "../data";
import { useMemo } from "react";
import {
  KrajRadnogVremena,
  NotFinishedConfiguration,
  UnutarRadnogVremena,
} from "../components/DashboardHelpers";

function AdminDashboard() {
  let krajRVMinuta = izracunajMinute(radnoVrijeme.end);
  const sati = new Date().getHours();
  const minuta = new Date().getMinutes() + sati * 60;
  const listaMogucih = useListaMogucih(10);
  const currentAppointmentForEachEmployee =
    getCurrentAppointmentForEachEmployee(employees, listaMogucih);

  const pauze = useMemo(
    () => getPauze(rasporedPoRadnicima, radnoVrijeme),
    [],
  ); /*rasporedPoRadnicima bi trebao ici u zagrade ali sada je statican pa ne treba */
  const trenutniTermini = useMemo(
    () => getTrenutniTermini(rasporedPoRadnicima, pauze),
    [
      pauze,
    ] /*rasporedPoRadnicima bi trebao ici u zagrade ali sada je statican pa ne treba */,
  );

  if (!employees || !employees.length) return <NotFinishedConfiguration />;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans antialiased">
      <Header
        label="Admin Dashboard"
        to={`/admin/${location.pathname.split("/").at(2)}`}
      />

      {trenutniTermini.length || currentAppointmentForEachEmployee.length ? (
        <main className="flex-1 p-5 max-w-xl mx-auto w-full pb-24">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 px-1">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <h2 className="text-[11px] font-black uppercase tracking-[2px] text-gray-400">
                Trenutno na stolici
              </h2>
            </div>

            <div className="space-y-4">
              {
                krajRVMinuta > minuta ? (
                  <UnutarRadnogVremena
                    trenutniTermini={trenutniTermini}
                    currentAppointmentForEachEmployee={
                      currentAppointmentForEachEmployee
                    }
                  />
                ) : (
                  <KrajRadnogVremena />
                )
                //kraj radnog vremena
              }
            </div>
          </div>

          <AllAppointments rasporedPoRadnicima={rasporedPoRadnicima} />
        </main>
      ) : (
        <NotFinishedConfiguration bez={false} />
      )}

      <AdminFooter trenutno="/" salonId={location.pathname.split("/").at(2)} />
    </div>
  );
}

export default AdminDashboard;
