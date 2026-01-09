import { Link, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 pb-safe-area-inset-bottom shadow-lg">
      <div className="max-w-2xl mx-auto flex justify-around items-center h-16 px-4">
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 transition-colors ${
            location.pathname === "/"
              ? "text-blue-600"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <span className="text-xs font-semibold">Pocetna</span>
        </Link>
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
