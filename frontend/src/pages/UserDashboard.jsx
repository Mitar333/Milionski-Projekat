import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { FaChevronRight } from "react-icons/fa";
import Modal from "../components/Modal";
import { Trash2 } from "lucide-react";
import DeleteModal from "../components/DeleteModal";
import { AppointmentRow } from "../components/AppointmentRow";
const termini = [
  {
    employeeId: 1,
    serviceId: 1,
    startTime: "12:20",
    endTime: "12:40",
    status: "confirmed",
  },
];

function UserDashboard() {
  return (
    <Modal>
      {/* Glavni kontejner sa min-visinom da footer uvijek bude dole */}
      <div className="min-h-screen flex flex-col bg-[#FDFDFF]">
        <Header label="Zdravo, USER 👋" />

        <main className="flex-1 px-4 py-6 flex flex-col space-y-8 max-w-2xl mx-auto w-full">
          {/* Hero Sekcija */}
          <section className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">
                Vrijeme je za osvježenje?
              </h2>
              <p className="text-indigo-100 text-sm mb-6 max-w-50">
                Pronađi slobodan termin u par klikova.
              </p>
              <Link
                to="/select/salon"
                className="inline-flex items-center justify-center bg-white text-indigo-600 px-8 py-3 rounded-2xl font-black text-sm hover:bg-indigo-50 transition-all active:scale-95 shadow-lg"
              >
                Zakaži odmah
              </Link>
            </div>

            {/* Dekoracija u pozadini */}
            <div className="absolute -right-6 -bottom-6 text-white/10 rotate-12 pointer-events-none">
              <FaChevronRight size={160} />
            </div>
          </section>

          {/* Aktivni termini sekcija */}
          <section className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="font-black text-gray-900 uppercase tracking-tight text-sm">
                Vaši termini
              </h2>
              <span className="bg-indigo-600 text-white text-[10px] px-2.5 py-1 rounded-lg font-black">
                {termini.length}
              </span>
            </div>

            <ul className="space-y-3">
              {termini.length > 0 ? (
                termini.map((termin, index) => (
                  <AppointmentRow key={index} termin={termin} />
                ))
              ) : (
                <div className="text-center py-12 bg-gray-50/50 rounded-4xl border-2 border-dashed border-gray-100">
                  <p className="text-gray-400 text-sm font-medium">
                    Trenutno nemaš zakazanih termina
                  </p>
                </div>
              )}
            </ul>
          </section>
        </main>

        <Footer />

        <Modal.Window name="deleteAppointment">
          <DeleteModal type="appointment" />
        </Modal.Window>
      </div>
    </Modal>
  );
}
export default UserDashboard;
