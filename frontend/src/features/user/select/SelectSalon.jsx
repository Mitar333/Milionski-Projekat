import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const salons = [
  {
    name: "Salon KPI",
    address: "Ulica Kralja Petra I",
    phone: "066/111-222",
    email: "someone@example.com",
  },
  {
    name: "Salon KPI 2",
    address: "Bulevar Mira 45",
    phone: "065/333-444",
    email: "someoneelse@example.com",
  },
];

function SelectSalon() {
  const navigate = useNavigate();

  useEffect(() => {
    if (salons.length < 2) {
      navigate("/select/employee");
    }
  }, [navigate]);

  return (
    <div className=" ">
      {/* <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Izaberite salon
      </h1> */}

      <div className="space-y-4">
        {salons.map((salon, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between hover:border-indigo-300 transition-colors"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800">{salon.name}</h2>
              <p className="text-gray-500 flex items-center mt-1">
                <span className="mr-2">📍</span> {salon.address}
              </p>
              <div className="mt-3 text-sm text-gray-600">
                <p>📞 {salon.phone}</p>
                <p>📧 {salon.email}</p>
              </div>
            </div>

            <Link
              to="/select/employee"
              className="mt-4 md:mt-0 bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-center"
            >
              Izaberi salon
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectSalon;
