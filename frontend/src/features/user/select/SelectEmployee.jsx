import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const employees = [
  {
    name: "Marko Marković",
    bio: "Stručnjak za moderne muške frizure",
    phone: "066/123-456",
    email: "marko@example.com",
  },
  {
    name: "Nikola Nikolić",
    bio: "Majstor za brijanje i oblikovanje brade",
    phone: "065/987-654",
    email: "nikola@example.com",
  },
];

function SelectEmployee() {
  const navigate = useNavigate();

  useEffect(() => {
    if (employees.length < 2) {
      navigate("/select/service");
    }
  }, [navigate]);

  return (
    <div className="max-w-5xl mx-auto">
      {/* <h2 className="text-2xl font-bold text-gray-800 mb-8">Naš tim</h2> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {employees.map((employee, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-md transition-all"
          >
            {/* Avatar Placeholder */}
            <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
              {employee.name.charAt(0)}
            </div>

            <h3 className="text-lg font-bold text-gray-900">{employee.name}</h3>
            <p className="text-indigo-600 text-sm font-medium mb-3">
              {employee.bio}
            </p>

            <div className="text-gray-500 text-xs space-y-1 mb-6">
              <p>📱 {employee.phone}</p>
              <p>📩 {employee.email}</p>
            </div>

            <Link
              to="/select/service"
              className="w-full py-2 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Izaberi radnika
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectEmployee;
