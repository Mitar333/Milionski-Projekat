function SelectWorkingHours({ employeeId, setEmployeeId }) {
  const employees = [
    {
      id: 100,
      name: "Marko Marković",
      title: "Glavni berber",
      email: "marko@salon.com",
      phone: "065 123 456",
      services: [1],
    },
    {
      id: 101,
      name: "Zivko Zivković",
      title: "Glavni berber",
      email: "zivko@salon.com",
      phone: "065 123 456",
      services: [1],
    },
  ];
  if (!employees.length) return null;
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          Uredi radno vrijeme za:
        </span>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {/* Dugme za SVE radnike (Salon level) */}
        <button
          onClick={() => setEmployeeId("all")}
          className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            employeeId === "all"
              ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100"
              : "bg-white text-gray-500 border-gray-100 hover:border-indigo-200"
          }`}
        >
          Svi (Salon)
        </button>

        {/* Dugmići za pojedinačne radnike */}
        {employees.map((employee) => (
          <button
            key={employee.id}
            onClick={() => setEmployeeId(employee.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
              employeeId === employee.id
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100"
                : "bg-white text-gray-500 border-gray-100 hover:border-indigo-200"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${employeeId === employee.id ? "bg-white" : "bg-indigo-400"}`}
            />
            {employee.name}
          </button>
        ))}
      </div>

      {/* Mala napomena za admina */}
      <p className="text-[10px] text-indigo-400 italic px-1">
        {employeeId === "all"
          ? "* Podešavate radno vrijeme za cijeli salon."
          : `* Podešavate izuzetak samo za radnika: ${employees.find((e) => e.id === employeeId)?.name}`}
      </p>
    </div>
  );
}

export default SelectWorkingHours;
