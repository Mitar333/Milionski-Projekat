const stil =
  "bg-indigo-600 text-white font-bold shadow-sm scale-105 rounded-sm ";

export default function Td({
  onSelectDate,
  open,
  opens,
  children,
  dan,
  k,
  prva = false,
  prviUMjesecu = 0,
  active,
  max,
  handleSelectDay,
}) {
  const cistiK = typeof k === "string" ? k.slice(0, -1) : k;

  // Provjera da li je dan iz sljedećeg mjeseca
  const isNextMonth = dan >= max;

  let isSelected = false;
  if (active && dan) isSelected = active === dan;
  let onClickk = () => {};

  if (onSelectDate) {
    onClickk = (a) => {
      if (!a) open(opens);
    };
  }

  return (
    <td
      className={`
        ${isSelected && !(prva && dan > prviUMjesecu) ? stil : ""} desetka je bezveze desavala se greska da je prvi 1 a nedjelja 7 pa ako je prvi 11 nema toga 
                                                                  a svejedno najmanji od proslog mjeseca je 23
        ${(!isSelected && isNextMonth) || (prva && dan > prviUMjesecu + 10) ? "text-gray-300 bg-gray-50/30" : "text-gray-700 hover:bg-indigo-50"} 
        
        py-1.5 text-sm border-b border-r last:border-r-0 border-gray-100 text-center cursor-pointer transition-all
      `}
      onClick={() => {
        const a = handleSelectDay(
          dan,
          cistiK,
          !isSelected && isNextMonth,
          prva && dan > prviUMjesecu
        );
        onClickk(a);
      }}
    >
      <span className={isNextMonth ? "opacity-50" : ""}>{children}</span>
    </td>
  );
}
