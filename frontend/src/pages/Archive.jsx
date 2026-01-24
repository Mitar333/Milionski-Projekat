import AdminFooter from "../components/AdminFooter";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import Modal from "../components/Modal";
import SendMessageForm from "../components/SendMessageForm";
import { termini } from "../data";
import { AiOutlineMessage } from "react-icons/ai";
import { AppointmentCard } from "../components/AppointmentCard";
import { SearchForm, Statistika } from "../components/ArchiveHelpers";
function Archive() {
  const location = useLocation();

  return (
    <Modal>
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans antialiased">
        <Header
          label="Arhiva"
          to={`/admin/${location.pathname.split("/").at(2)}`}
        />

        <main className="flex-1 p-5 max-w-xl mx-auto w-full pb-24">
          <Statistika />
          <div className="mt-8 mb-4 px-4">
            <Modal.Open opens="sendMessage">
              <button className="group w-full md:w-auto flex items-center justify-center gap-3 bg-white border-2 border-indigo-50 px-6 py-4 rounded-2xl text-indigo-600 font-bold hover:bg-indigo-50 hover:border-indigo-100 transition-all shadow-sm">
                <AiOutlineMessage size={24} />
                <span>Pošalji poruku korisnicima</span>
              </button>
            </Modal.Open>
          </div>

          <SearchForm />
          {/* LISTA TERMINA */}
          <div className="space-y-3">
            {termini.map((termin, i) => (
              <AppointmentCard termin={termin} key={i} />
            ))}
          </div>
        </main>

        <AdminFooter
          trenutno="/archive"
          salonId={location.pathname.split("/").at(2)}
        />
      </div>
      <Modal.Window name="sendMessage">
        <SendMessageForm />
      </Modal.Window>
    </Modal>
  );
}

export default Archive;
