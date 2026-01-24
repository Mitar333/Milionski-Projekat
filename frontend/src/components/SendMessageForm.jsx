import { useState } from "react";
import Input from "./Input";

function SendMessageForm() {
  const [to, setTo] = useState();
  return (
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
  );
}

export default SendMessageForm;
