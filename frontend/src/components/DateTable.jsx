import {
  useCalendar,
  daysOfWeek,
  daysOfWeek2,
  pet,
  sedam,
  months,
} from "../hooks/useCalendar";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Td from "./Td";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import { WorkingHoursForm } from "./WorkingHoursForm";

const today = new Date();
function DateTable({ onSelectDate = false }) {
  const {
    day,
    month,
    year,
    dayOfWeek,
    active,
    nastavak,
    handleSelectDay,
    max,
    nedelja,
    prviUMjesecu,
    prvaSedmica,
    prvaSedmicaSledecegMjeseca,
    handleNextMonth,
    handlePrevMonth,
  } = useCalendar();

  return (
    <div className="py-4">
      {/*Naslov meseca ide VAN tabele ili u <caption> */}
      <div className="flex items-center justify-center gap-4">
        {(month !== today.getMonth() || year > today.getFullYear()) && (
          <button className="cursor-pointer" onClick={handlePrevMonth}>
            <GoArrowLeft size={24} />
          </button>
        )}

        <h1 className="text-base font-bold">
          {dayOfWeek || dayOfWeek === 0 ? `${daysOfWeek[dayOfWeek]},` : ""}{" "}
          {day ? `${day}-${nastavak} ` : ""}
          {months[month].at(1)}, {year}
        </h1>

        <button className="cursor-pointer" onClick={handleNextMonth}>
          <GoArrowRight size={24} />
        </button>
      </div>

      <Modal>
        <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="min-w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {Object.values(daysOfWeek2).map((dan, i) => (
                  <th
                    className="py-3 text-[10px] uppercase tracking-widest text-gray-400 font-bold text-center border-r last:border-r-0 border-gray-200"
                    key={`dan-${i}`}
                  >
                    {dan.slice(0, 3)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="last:border-b-0">
                {prvaSedmica.map((dan, i) => {
                  const args = {
                    onSelectDate: !!onSelectDate,
                    dan,
                    prva: true,
                    active,
                    opens: "working-hours-form",
                    max,
                    prviUMjesecu,
                    handleSelectDay,
                    k: i + 1,
                    data: dan,
                  };

                  if (!onSelectDate)
                    return (
                      <Td key={dan || `prazno-${i}`} {...args}>
                        {dan}
                      </Td>
                    );
                  return <ModalTd key={dan || `prazno-${i}`} {...args} />;
                })}
              </tr>
              {pet.map(
                (c, i) =>
                  i * 7 + (1 + nedelja) < max && (
                    <tr key={i} className="last:border-b-0">
                      {sedam.map((s, k) => {
                        const dan = i * 7 + (k + 1 + nedelja);
                        const args = {
                          onSelectDate: !!onSelectDate,
                          opens: "working-hours-form",
                          dan,
                          k: k + 1,
                          active,
                          max,
                          handleSelectDay,
                          data: dan < max ? dan : prvaSedmicaSledecegMjeseca[k],
                        };
                        if (!onSelectDate)
                          return (
                            <Td key={dan} {...args}>
                              {args.data}
                            </Td>
                          );
                        return <ModalTd {...args} key={dan} />;
                      })}
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>

        <Modal.Window name="working-hours-form">
          <WorkingHoursForm
            dayOfWeek={dayOfWeek}
            day={day}
            month={month}
            year={year}
            nastavak={nastavak}
            onSelectDate={onSelectDate}
          />
        </Modal.Window>
      </Modal>
    </div>
  );
}
export default DateTable;

export function CloseButton() {
  const { close } = useModal();
  return (
    <button
      onClick={close}
      className="flex-1 px-4 py-3 text-sm font-bold text-gray-500 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
    >
      Odustani
    </button>
  );
}
function ModalTd({ ...args }) {
  const { open } = useModal(); //cijela komponenta postoji samo zbog ovoga
  //   const args = {
  //                     onSelectDate,
  //                     dan,
  //                     prva: true,
  //                     active,
  //                     opens: "working-hours-form",
  //                     max,
  //                     prviUMjesecu,
  //                     handleSelectDay,
  //                     k: i + 1,
  //                     data: dan,
  //                   };
  //  const args = {
  //                           onSelectDate,
  //                           opens: "working-hours-form",
  //                           dan,
  //                           k: k + 1,
  //                           active,
  //                           max,
  //                           handleSelectDay,
  //                           data: dan < max ? dan : prvaSedmicaSledecegMjeseca[k],
  //                         };
  return (
    <Td open={open} {...args}>
      {args.data}
    </Td>
  );
}
