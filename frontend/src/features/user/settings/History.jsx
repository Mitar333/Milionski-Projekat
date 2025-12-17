import { FaCut, FaCheckCircle } from "react-icons/fa";

const historyData = [
  {
    id: 1,
    service: "Šišanje i pranje kose",
    date: "10.11.2025.",
    price: "25 KM",
    barber: "Ivan",
  },
  {
    id: 2,
    service: "Uređivanje brade",
    date: "25.10.2025.",
    price: "15 KM",
    barber: "Ivan",
  },
  {
    id: 3,
    service: "Svečana frizura",
    date: "05.09.2025.",
    price: "50 KM",
    barber: "Ana",
  },
];

function History() {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-lg font-bold text-gray-800 mb-6">
        Povijest tretmana
      </h2>
      <div className="space-y-4">
        {historyData.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-lg text-gray-500">
                <FaCut />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800">
                  {item.service}
                </h4>
                <p className="text-xs text-gray-500">
                  {item.date} • {item.barber}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-blue-600">{item.price}</p>
              <div className="flex items-center gap-1 text-[10px] text-green-500 font-bold uppercase">
                <FaCheckCircle /> Plaćeno
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
