import { useCalendar } from "../hooks/useCalendar";
import { pet, sedam } from "../utils/constants";
import { ModalTd } from "./DateTable";
import Td from "./Td";

function OtherRows({ onSelectDate }) {
  const { max, nedelja, prvaSedmicaSledecegMjeseca } = useCalendar();
  return (
    <>
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
          ),
      )}
    </>
  );
}

export default OtherRows;
