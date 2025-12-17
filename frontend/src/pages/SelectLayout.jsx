import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function SelectLayout() {
  const location = useLocation();

  return (
    // min-h-screen osigurava da layout zauzme cijelu visinu ekrana
    <div className="flex flex-col min-h-screen w-screen bg-gray-50">
      <Header label={location.pathname.split("/").at(2)} />

      {/* main raste (flex-grow) da popuni prostor */}
      <main className="grow container pt-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default SelectLayout;
