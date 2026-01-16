//filtriranje na BE
import { Filter, User, Scissors, Search, ChevronDown } from "lucide-react";
import AdminFooter from "../components/AdminFooter";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";

function Archive() {
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

          {/* Grid za datume */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-[9px] font-black text-gray-400 uppercase tracking-tighter ml-1">
                Od datuma
              </label>
              <input
                className="w-full text-xs bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all outline-none text-gray-600 font-medium"
                placeholder="dd.mm.yy"
                type="text"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-black text-gray-400 uppercase tracking-tighter ml-1">
                Do datuma
              </label>
              <input
                className="w-full text-xs bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all outline-none text-gray-600 font-medium"
                placeholder="dd.mm.yy"
                type="text"
              />
            </div>
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
  );
}

export default Archive;
