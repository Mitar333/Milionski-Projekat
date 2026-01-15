import { Link } from "react-router-dom";
import Input from "./Input";

export default function Login() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-3xl font-black text-gray-900 tracking-tighter text-center">
          Dobrodošli nazad
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 font-medium italic">
          Ulogujte se na vaš nalog
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-8 shadow-xl shadow-indigo-100/50 rounded-[40px] border border-gray-100 space-y-6">
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

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-500 font-medium">
                Zapamti me
              </label>
            </div>
            <Link
              to="/forgot-password"
              size="sm"
              className="text-sm font-bold text-indigo-600 hover:text-indigo-500"
            >
              Zaboravili ste šifru?
            </Link>
          </div>

          <button className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-indigo-200 text-sm font-black text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition-all active:scale-95">
            Uloguj se
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Još nemate nalog?{" "}
          <Link
            to="/register"
            className="font-black text-indigo-600 hover:text-indigo-500"
          >
            Napravite nalog
          </Link>
        </p>
      </div>
    </div>
  );
}
