import { Link, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  // Pomoćna funkcija za provjeru aktivne rute (za bojanje ikona/teksta)
  const isActive = (path) => location.pathname === path;

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 pb-safe-area-inset-bottom">
      <div className="max-w-2xl mx-auto flex justify-around items-center h-12 px-4">
        <Link
          to="/inbox"
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive("/inbox")
              ? "text-blue-600"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <span className="text-xs font-semibold">Inbox</span>
        </Link>

        <Link
          to="/appointments"
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive("/appointments")
              ? "text-blue-600"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <span className="text-xs font-semibold">Termini</span>
        </Link>

        <Link
          to="/settings"
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive("/settings")
              ? "text-blue-600"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <span className="text-xs font-semibold">Postavke</span>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
