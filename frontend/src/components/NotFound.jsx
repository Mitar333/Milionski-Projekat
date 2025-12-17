import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function NotFound() {
  return (
    <div>
      <Header label="Pogresan url" />
      <div className="my-48 flex">
        <Link
          to="/"
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
