import { Plus, Edit3, Trash2, Clock, Banknote } from "lucide-react";
import AdminFooter from "../components/AdminFooter";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";

function ServiceDetails() {
  const location = useLocation();
  const services = [
    { id: 1, name: "Muško šišanje", duration: 30, price: 15 },
    { id: 2, name: "Pranje kose i feniranje", duration: 20, price: 10 },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans antialiased">
      <Header
        to={`/admin/${location.pathname.split("/").at(2)}`}
        label="Upravljanje uslugama"
      />

      <main className="flex-1 p-5 max-w-xl mx-auto w-full pb-24">
        {/* Dugme za dodavanje - Nenapadno ali uočljivo */}
        <button className="w-full mb-8 flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 py-3.5 rounded-xl font-semibold border border-indigo-100 hover:bg-indigo-100 transition-colors">
          <Plus className="w-4 h-4" />
          Nova usluga
        </button>

        {/* Lista usluga */}
        <div className="space-y-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm"
            >
              <div className="flex-1">
                <h3 className="text-[16px] font-bold text-gray-800 tracking-tight">
                  {service.name}
                </h3>

                <div className="flex items-center gap-4 mt-1.5">
                  <div className="flex items-center gap-1 text-[13px] text-gray-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    {service.duration} min
                  </div>
                  <div className="flex items-center gap-1 text-[13px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-lg">
                    {service.price} KM
                  </div>
                </div>
              </div>

              {/* Akcije - Obojene ali suptilne */}
              <div className="flex gap-2">
                <button className="p-2.5 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <AdminFooter
        trenutno="/services"
        salonId={location.pathname.split("/").at(2)}
      />
    </div>
  );
}

export default ServiceDetails;
