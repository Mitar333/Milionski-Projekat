import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import Input from "./Input";

export default function ForgotPassword() {
  return (
    // Promjena: justify-start umjesto justify-center, pt-20 za razmak od vrha
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-start pt-20 px-6 pb-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-indigo-600 transition-colors mb-6 ml-1"
        >
          <GoArrowLeft className="w-5 h-5" /> Nazad na login
        </Link>
        <h2 className="text-3xl font-black text-gray-900 tracking-tighter leading-tight">
          Zaboravljena lozinka?
        </h2>
        <p className="mt-2 text-sm text-gray-500 font-medium italic">
          Unesite vaš e-mail da biste napravili novu lozinku
        </p>
      </div>

      {/* Smanjen mt-10 na mt-8 da bude kompaktnije */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-8 shadow-xl shadow-indigo-100/30 rounded-[40px] border border-gray-100 space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[2px] ml-1 mb-2">
              E-mail adresa
            </label>
            <Input type="email" placeholder="someone@example.com" />
          </div>

          <button className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-indigo-200 text-sm font-black text-white bg-indigo-600 hover:bg-indigo-700 transition-all active:scale-[0.98]">
            Pošalji link za novu lozinku
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500 font-medium">
          Sjećate se lozinke?{" "}
          <Link
            to="/login"
            className="font-black text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Ulogujte se
          </Link>
        </p>
      </div>
    </div>
  );
}
