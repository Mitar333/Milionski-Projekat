import { Link, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function NotFound() {
  const location = useLocation();
  const to = location.pathname.startsWith("/admin")
    ? location.pathname.split("/").slice(0, 3).join("/")
    : location.pathname.startsWith("/employee")
      ? "/employee"
      : "/";
  return (
    <div>
      <Header label="Pogresan url" to={to} />
      <div className="my-48 flex">
        <Link
          to={to}
          className="mx-auto w-72 text-center bg-indigo-500 text-white py-2.5 rounded-xl font-medium text-sm"
        >
          Nazad na pocetak
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default NotFound;
