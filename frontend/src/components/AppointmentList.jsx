import useListaMogucih from "../hooks/useTimeSlots";
import { useAppointment } from "../store";
const trajanjeTermina = 10;
function AppointmentList() {
  const listaMogucih = useListaMogucih(trajanjeTermina);
  const setSelectedAppointment = useAppointment((state) => state.update);
  const selectedAppointment = useAppointment((state) => state.termin);

  function handleSelectAppointment(termin, index) {
    setSelectedAppointment({ ...termin, index });
  }
  return (
    <div className="flex items-center overflow-x-auto overflow-y-hidden gap-2 py-1 no-scrollbar h-11 mt-2">
      {listaMogucih.map((termin, index) => {
        const isSelected = selectedAppointment?.index === index;
        if (termin.possible)
          return (
            <button
              onClick={() => handleSelectAppointment(termin, index)}
              key={index}
              disabled={!termin.possible}
              className={`
          px-4 py-1.5 rounded-full text-sm font-medium shrink-0 transition-all duration-200
          ${
            isSelected
              ? "bg-indigo-600 text-white shadow-md scale-105 ring-2 ring-indigo-200"
              : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 active:scale-95"
          }
        `}
            >
              {termin.start} - {termin.end}
            </button>
          );
        //   return (
        //     <button
        //       onClick={() => handleSelectAppointment(termin, index)}
        //       key={index}
        //       disabled={!termin.possible}
        //       className={`
        //   px-4 py-1.5 rounded-full text-sm font-medium shrink-0 transition-all duration-200
        //   ${
        //     !termin.possible
        //       ? "bg-gray-100 text-gray-300 cursor-not-allowed"
        //       : isSelected
        //         ? "bg-indigo-600 text-white shadow-md scale-105 ring-2 ring-indigo-200"
        //         : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 active:scale-95"
        //   }
        // `}
        //     >
        //       {termin.start} - {termin.end}
        //     </button>
        //   );
      })}
    </div>
  );
}

export default AppointmentList;
