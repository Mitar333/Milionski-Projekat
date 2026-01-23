import Td from "./Td";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import { WorkingHoursForm } from "./WorkingHoursForm";
import { SelectedDate } from "./SelectedDate";
import { daysOfWeek2 } from "../utils/constants";
import FirstRow from "./FirstRow";
import OtherRows from "./OtherRows";

function DateTable({ isSelectDate = false }) {
  return (
    <div className="py-4">
      <SelectedDate />
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
              <FirstRow isSelectDate={isSelectDate} />
              <OtherRows isSelectDate={isSelectDate} />
            </tbody>
          </table>
        </div>

        <Modal.Window name="working-hours-form">
          <WorkingHoursForm isSelectDate={isSelectDate} />
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
export function ModalTd({ ...args }) {
  const { open } = useModal();
  return (
    <Td open={open} {...args}>
      {args.data}
    </Td>
  );
}
