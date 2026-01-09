import { UserPlus, Edit3, Trash2, Mail, Phone } from "lucide-react";
import AdminFooter from "../components/AdminFooter";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";

function EmployeeDetails() {
  const location = useLocation();
  // Mock podaci za vizuelni test
  const employees = [
    {
      id: 1,
      name: "Marko Marković",
      title: "Glavni berber",
      email: "marko@salon.com",
      phone: "065 123 456",
    },
    {
      id: 2,
      name: "Ana Anić",
      title: "Frizerka",
      email: "ana@salon.com",
      phone: "066 987 654",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans antialiased">
      <Header
        to={`/admin/${location.pathname.split("/").at(2)}`}
        label="Upravljanje radnicima"
      />

      <main className="flex-1 p-5 max-w-xl mx-auto w-full pb-24">
        {/* Dugme za dodavanje - Suptilni Indigo */}
        <button className="w-full mb-8 flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 py-3.5 rounded-xl font-semibold border border-indigo-100 hover:bg-indigo-100 transition-colors">
          <UserPlus className="w-4 h-4" />
          Novi radnik
        </button>

        {/* Lista radnika */}
        <div className="space-y-4">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Ime i Titula */}
                  <div className="mb-3">
                    <h3 className="text-[16px] font-bold text-gray-800 tracking-tight leading-none">
                      {employee.name}
                    </h3>
                    <span className="text-[12px] font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md mt-1.5 inline-block">
                      {employee.title}
                    </span>
                  </div>

                  {/* Kontakt podaci - Manji i sivi */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-[13px] text-gray-500">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      {employee.email}
                    </div>
                    <div className="flex items-center gap-2 text-[13px] text-gray-500">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      {employee.phone}
                    </div>
                  </div>
                </div>

                {/* Akcije */}
                <div className="flex flex-col gap-1">
                  <button className="p-2.5 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <AdminFooter
        trenutno="/employees"
        salonId={location.pathname.split("/").at(2)}
      />
    </div>
  );
}

export default EmployeeDetails;
