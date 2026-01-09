import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaSignOutAlt,
  FaChevronLeft,
} from "react-icons/fa";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";

function Profile() {
  const userData = {
    name: "Marko Marić",
    email: "marko.maric@email.com",
    phone: "+387 63 123 456",
  };

  return (
    <div>
      <Header
        to="/settings"
        label={
          <span className="flex items-center gap-2">
            <FaChevronLeft />
            <p className="px-2  text-2xl">Vaš profil</p>
          </span>
        }
      />
      <div className="animate-fadeIn mt-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg mb-3">
            {userData.name.charAt(0)}
          </div>
          <h2 className="text-xl font-bold text-gray-800">{userData.name}</h2>
          <p className="text-sm text-gray-500">Član od Decembra 2024.</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <FaEnvelope className="text-gray-400" />
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400">
                Email adresa
              </p>
              <p className="text-sm text-gray-700">{userData.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <FaPhone className="text-gray-400" />
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400">
                Broj telefona
              </p>
              <p className="text-sm text-gray-700">{userData.phone}</p>
            </div>
          </div>

          <button className="w-full mt-6 flex items-center justify-center gap-2 py-3 text-red-500 font-semibold border border-red-100 rounded-xl hover:bg-red-50 transition-colors">
            <FaSignOutAlt /> Odjavi se
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
