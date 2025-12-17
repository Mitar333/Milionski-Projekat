import { Link } from "react-router-dom";

function Header({ label }) {
  let label1 = label || "HOMEPAGE";
  if (label === "employee") label1 = "Naš tim";
  if (label === "service") label1 = "Izaberite uslugu";
  if (label === "salon") label1 = "Izaberite salon";
  if (label === "appointment") label1 = "Izaberite Termin";
  return (
    <Link to="/">
      <header className="px-4 py-3 bg-white shadow-sm ">
        <h1 className="text-2xl font-bold text-gray-800 ">{label1}</h1>
      </header>
    </Link>
  );
}

export default Header;
