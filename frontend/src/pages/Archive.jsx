//filtriranje na BE
import { Filter, User, Scissors, Search, ChevronDown } from "lucide-react";
import AdminFooter from "../components/AdminFooter";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { subDays } from "date-fns";
import Modal from "../components/Modal";
import Input from "../components/Input";
import { useState } from "react";
function Archive() {
  const [to, setTo] = useState();

  const today = subDays(new Date(), 7);
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const datum = `${year}-${month}-${day}`;

  const location = useLocation();
  const termini = [
    {
      id: 1,
      date: "28.10.",
      start: "10:00",
      client: "Nikola N.",
      service: "Šišanje",
      employee: "Marko",
      status: "Odradjeno",
      price: "15 KM",
    },
    {
      id: 2,
      date: "27.10.",
      start: "14:30",
      client: "Dino D.",
      service: "Brijanje",
      employee: "Ana",
      status: "No show",
      price: "10 KM",
    },
  ];

  return (
    <Modal>
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans antialiased">
        <Header
          label="Arhiva"
          to={`/admin/${location.pathname.split("/").at(2)}`}
        />

        <main className="flex-1 p-5 max-w-xl mx-auto w-full pb-24">
          {/* STATISTIKA - Brzi uvid */}
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
          <div className="mt-8 mb-4 px-4">
            <Modal.Open opens="sendMessage">
              <button className="group w-full md:w-auto flex items-center justify-center gap-3 bg-white border-2 border-indigo-50 px-6 py-4 rounded-2xl text-indigo-600 font-bold hover:bg-indigo-50 hover:border-indigo-100 transition-all shadow-sm">
                <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <span>Pošalji poruku korisnicima</span>
              </button>
            </Modal.Open>
          </div>
          {/* FILTERI - Kompaktni */}
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

          {/* LISTA TERMINA */}
          <div className="space-y-3">
            {termini.map((termin) => (
              <div
                key={termin.id}
                className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-4 text-center border-r border-gray-50 pr-4">
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase leading-none mb-1">
                      {termin.date}
                    </p>
                    <p className="text-[15px] font-black text-gray-800">
                      {termin.start}
                    </p>
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
            ))}
          </div>
        </main>

        <AdminFooter
          trenutno="/archive"
          salonId={location.pathname.split("/").at(2)}
        />
      </div>
      <Modal.Window name="sendMessage">
        <div className="p-2">
          {/* Naslov sekcije */}
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-indigo-600">✉️</span>
              Slanje obavještenja
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Izaberite primaoce i napišite poruku koja će im biti isporučena.
            </p>
          </div>

          <div className="space-y-5">
            {/* Izbor primaoca */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                Primalac
              </label>
              <select
                onChange={(e) => setTo(e.target.value === "1")}
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              >
                <option value="svi">📢 Pošalji svima</option>
                <option value="1">👤 Poseban korisnik</option>
              </select>
            </div>

            {/* Input za ime - pojavljuje se sa animacijom */}
            {to && (
              <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                  Ime korisnika
                </label>
                <Input placeholder="Unesite ime i prezime..." />
              </div>
            )}

            {/* Sadržaj poruke */}

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                Sadržaj poruke
              </label>
              <textarea
                rows="4" // Ovo određuje visinu (broj redova)
                placeholder="Vaša poruka ovdje..."
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                // resize-none sprečava korisnika da ručno razvlači textarea i kvari layout
              />
            </div>
            {/* Akcija */}
            <div className="pt-2">
              <button className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                <span>Pošalji poruku</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Modal.Window>
    </Modal>
  );
}

export default Archive;
