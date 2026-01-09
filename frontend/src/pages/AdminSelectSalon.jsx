import { useEffect, useMemo } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Phone, Mail, ArrowRight, Building2 } from "lucide-react";

function AdminSelectSalon() {
  const navigate = useNavigate();

  const saloni = useMemo(
    () => [
      {
        address: "Kralja Petra I 22",
        name: "Barber Shop Centar",
        phone: "066 222 333",
        email: "centar@salon.com",
        id: 1,
      },
      {
        address: "Zapadni Trg bb",
        name: "Barber Shop West",
        phone: "066 444 555",
        email: "west@salon.com",
        id: 2,
      },
    ],
    []
  );

  useEffect(() => {
    if (saloni.length === 1) {
      navigate(`/admin/${saloni[0].id}`);
    }
  }, [navigate, saloni]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans antialiased">
      <Header to="/admin" label="Moji Saloni" />

      <main className="flex-1 p-6 max-w-xl mx-auto w-full">
        {/* Pozdravna poruka */}
        <div className="mb-8 px-1">
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">
            Dobrodošli nazad
          </h1>
          <p className="text-sm text-gray-400 font-medium">
            Izaberite poslovnicu kojom želite upravljati danas.
          </p>
        </div>

        <ul className="space-y-4 text-gray-800">
          {saloni.map((salon) => (
            <li key={salon.id}>
              <Link
                to={`/admin/${salon.id}`}
                className="block bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <h2 className="text-lg font-bold text-gray-800 tracking-tight">
                        {salon.name}
                      </h2>
                    </div>

                    <div className="space-y-2 mt-4 px-1">
                      <div className="flex items-center text-[13px] text-gray-500 gap-2 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        {salon.address}
                      </div>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <div className="flex items-center text-[12px] text-gray-400 gap-1.5 font-medium">
                          <Phone className="w-3.5 h-3.5" /> {salon.phone}
                        </div>
                        <div className="flex items-center text-[12px] text-gray-400 gap-1.5 font-medium">
                          <Mail className="w-3.5 h-3.5" /> {salon.email}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="self-center ml-4 p-2 bg-gray-50 rounded-full text-gray-300 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Opciona poruka za dodavanje novog salona ako si Owner */}
        <div className="mt-10 pt-6 border-t border-gray-100 text-center">
          <button className="text-sm font-bold text-indigo-500 hover:text-indigo-700 transition-colors">
            + Dodaj novu poslovnicu
          </button>
        </div>
      </main>
    </div>
  );
}

export default AdminSelectSalon;
