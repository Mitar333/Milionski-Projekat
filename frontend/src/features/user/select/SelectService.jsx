import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useService } from "../../../store";

const services = [
  {
    name: "Šišanje",
    durationMinutes: 20,
    price: 10,
    description: "Brzo i efikasno šišanje po vašoj želji.",
  },
  {
    name: "Brijanje",
    durationMinutes: 10,
    price: 5,
    description: "Klasično brijanje sa toplim peškirom.",
  },
];

function SelectService() {
  const navigate = useNavigate();
  const setService = useService((state) => state.update);
  useEffect(() => {
    if (services.length < 2) {
      setService({ newService: services.at(0) });
      navigate("/select/appointment");
    }
  }, [navigate]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Izaberite uslugu
      </h2> */}

      {/* Grid koji na mobitelu ima 1 kolonu, a na tabletu/PC-u 2 */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <li
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-100 flex flex-col justify-between hover:shadow-lg transition-shadow"
          >
            <div>
              <div className="flex justify-between items-start">
                <strong className="text-xl font-semibold text-indigo-600">
                  {service.name}
                </strong>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {service.price} KM
                </span>
              </div>
              <p className="text-gray-600 mt-2 text-sm">
                {service.description}
              </p>
            </div>

            <div className="mt-6">
              <div className="text-sm text-gray-500 mb-4 flex items-center">
                {/* Ikona sata (opcionalno) */}
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Trajanje: {service.durationMinutes} min
              </div>

              <Link
                to="/select/appointment"
                className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                onClick={() => setService({ newService: services.at(index) })}
              >
                Izaberi uslugu
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectService;
