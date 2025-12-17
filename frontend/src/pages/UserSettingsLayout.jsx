import { Outlet, Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import {
  FaAddressBook,
  FaArchive,
  FaComments,
  FaChevronLeft,
  FaChevronRight,
  FaFilePowerpoint,
} from "react-icons/fa";

function UserSettingsLayout() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  // Lista linkova za lakše upravljanje
  const menuItems = [
    { path: "/settings/faq", label: "FAQ", icon: <FaComments /> },
    {
      path: "/settings/privacy-policy",
      label: "Privatnost",
      icon: <FaFilePowerpoint />,
    },
    { path: "/settings/profile", label: "Profil", icon: <FaAddressBook /> },
    { path: "/settings/history", label: "Povijest", icon: <FaArchive /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-5">
      <Header label="Postavke" />

      <div className="flex max-w-5xl mx-auto min-h-[83vh] mt-4 px-2 gap-4">
        {/* SIDEBAR */}
        <aside
          className={`bg-white rounded-2xl  max-h-[35vh] shadow-sm border border-gray-100 transition-all duration-300 flex flex-col ${
            isOpen ? "w-48" : "w-16"
          }`}
        >
          {/* Gumb za skupljanje/širenje - sad je mali i diskretan na vrhu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-4 text-gray-400 hover:text-blue-500 flex justify-center border-b border-gray-50"
          >
            {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>

          <nav className="flex-1 py-4">
            <ul className="space-y-2 px-2">
              {menuItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                        active
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      {isOpen && (
                        <span className="text-sm font-medium whitespace-nowrap">
                          {item.label}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* SADRŽAJ (Outlet) */}
        <main className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {/* Ako ništa nije odabrano (npr. samo si na /settings), pokaži neku poruku */}
          {location.pathname === "/settings/" ||
          location.pathname === "/settings" ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 italic text-sm text-center">
              <p>
                Odaberite stavku iz izbornika s lijeve strane kako biste vidjeli
                detalje.
              </p>
            </div>
          ) : (
            <Outlet context={{ isOpen }} />
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default UserSettingsLayout;
