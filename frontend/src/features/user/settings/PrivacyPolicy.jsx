import { FaChevronLeft } from "react-icons/fa";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

function PrivacyPolicy() {
  return (
    <div>
      <Header
        to="/settings"
        label={
          <span className="flex items-center gap-2">
            <FaChevronLeft />
            <p className="px-2  text-2xl"> Politika Privatnosti</p>
          </span>
        }
      />
      <div className="animate-fadeIn prose prose-sm mt-8 px-4">
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h3 className="text-sm font-bold text-gray-700 uppercase mb-2">
              1. Koje podatke prikupljamo?
            </h3>
            <p className="text-sm">
              Prikupljamo vaše ime, prezime, broj telefona i email adresu
              isključivo u svrhu rezervacije termina i komunikacije vezane uz
              vaše posjete salonu.
            </p>
          </section>

          <section>
            <h3 className="text-sm font-bold text-gray-700 uppercase mb-2">
              2. Kako koristimo podatke?
            </h3>
            <p className="text-sm">
              Vaši podaci se koriste isključivo unutar našeg sustava. Nikada ih
              ne dijelimo s trećim stranama niti ih koristimo za neželjeni
              marketing (SPAM).
            </p>
          </section>

          <section className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-xs text-blue-700 italic">
              Zadnja izmjena: 17.12.2025. Ukoliko imate pitanja, kontaktirajte
              nas na support@salon.ba
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
