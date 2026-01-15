import { Link, useLocation } from "react-router-dom";

import {
  FaAddressBook,
  FaArchive,
  FaComments,
  FaChevronLeft,
  FaFilePowerpoint,
  FaCalendarDay,
} from "react-icons/fa";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

function SettingsOverview() {
  const location = useLocation();

  const menuItems = [
    { path: "/settings/faq", label: "FAQ", icon: <FaComments /> },
    {
      path: "/settings/privacy-policy",
      label: "Privatnost",
      icon: <FaFilePowerpoint />,
    },
    { path: "/settings/profile", label: "Profil", icon: <FaAddressBook /> },

    { path: "/appointments", label: "Termini", icon: <FaCalendarDay /> },
  ];

  return (
    <div className="h-dvh  bg-gray-50 ">
      <Header
        label={
          <span className="flex items-center gap-2">
            <FaChevronLeft />
            <p className="px-4">Postavke</p>
          </span>
        }
      />

      <div className="w-full mt-4 px-4  pb-12">
        {/* SIDEBAR */}
        <div
          className={`bg-white   transition-all duration-300   h-fit max-h-[80vh]`}
          /* h-fit sprečava da sidebar ide do dna ako ima malo linkova */
        >
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-2 px-2">
              {menuItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <li
                    key={item.path}
                    className="border border-gray-200 shadow-sm "
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                        active
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-lg">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* SADRŽAJ */}
      </div>

      <Footer />
    </div>
  );
}

export default SettingsOverview;
