import { Link } from "react-router-dom";
import Input from "./Input";

export default function Register() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-black text-gray-900 tracking-tighter">
          Napravite nalog
        </h2>
        <p className="mt-2 text-sm text-gray-500 font-medium italic">
          Registrujte se da biste nastavili
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-8 shadow-xl shadow-indigo-100/50 rounded-[40px] border border-gray-100 space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2">
              Puno ime
            </label>
            <Input placeholder="Marko Marković" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2">
              E-mail
            </label>
            <Input type="email" placeholder="someone@example.com" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2">
              Lozinka
            </label>
            <Input type="password" placeholder="●●●●●●●●" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2">
              Ponovite lozinku
            </label>
            <Input type="password" placeholder="●●●●●●●●" />
          </div>

          <div className="flex items-start px-1 py-2">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <p className="ml-2 text-xs text-gray-500 leading-relaxed">
              Prihvatam{" "}
              <Link
                to="/settings/privacy-policy"
                className="text-indigo-600 font-bold underline"
              >
                Politiku Privatnosti
              </Link>{" "}
              i uslove korišćenja.
            </p>
          </div>

          <button className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-indigo-200 text-sm font-black text-white bg-indigo-600 hover:bg-indigo-700 transition-all active:scale-95">
            Napravite nalog
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Već imate nalog?{" "}
          <Link
            to="/login"
            className="font-black text-indigo-600 hover:text-indigo-500"
          >
            Ulogujte se
          </Link>
        </p>
      </div>
    </div>
  );
}
