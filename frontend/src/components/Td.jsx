const stil =
  "bg-indigo-600 text-white font-bold shadow-sm scale-105 rounded-sm "; // Dodat razmak na kraju i rounded

export default function Td({ children, dan, k, handleSelectDay, active }) {
  const cistiK = typeof k === "string" ? k.slice(0, -1) : k;
  let isSelected = false;
  if (active && dan) isSelected = active === dan;

  return (
    <td
      className={`
        ${isSelected ? stil : "text-gray-700 hover:bg-indigo-50"} 
        py-1.5 text-sm border-b border-r last:border-r-0 border-gray-100 text-center cursor-pointer transition-all
      `}
      onClick={() => (dan !== "" ? handleSelectDay(dan, cistiK) : undefined)}
    >
      {children}
    </td>
  );
}
