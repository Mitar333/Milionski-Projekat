import { useState } from "react";
// import { useOutletContext } from "react-router-dom";
import { FaChevronDown, FaChevronLeft, FaChevronUp } from "react-icons/fa";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const questions = [
  {
    id: 1,
    q: "Kako otkazati termin?",
    a: "Termin možete otkazati najkasnije 24 sata prije početka putem vašeg profila ili pozivom u salon.",
  },
  {
    id: 2,
    q: "Nudite li poklon bonove?",
    a: "Da! Poklon bonove možete kupiti direktno u salonu u bilo kojem iznosu.",
  },
  {
    id: 3,
    q: "Gdje se nalazite?",
    a: "Nalazimo se u centru grada, na adresi Kralja Tomislava 15.",
  },
  {
    id: 4,
    q: "Radite li nedjeljom?",
    a: "Nažalost, nedjeljom ne radimo. Naše radno vrijeme je od ponedjeljka do subote.",
  },
];

function Faq() {
  // const { isOpen } = useOutletContext();
  const [activeId, setActiveId] = useState(null);

  const toggle = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div>
      <Header
        to="/settings"
        label={
          <span className="flex items-center gap-2">
            <FaChevronLeft />
            <p className="px-2  text-2xl"> Često postavljana pitanja</p>
          </span>
        }
      />
      <div className="animate-fadeIn mt-8 ">
        {/* Dinamički Grid: 1 kolona ako je sidebar otvoren, 2 kolone ako je skupljen */}
        <div className={`grid gap-4 transition-all duration-500 grid-cols-1`}>
          {questions.map((item) => (
            <div
              key={item.id}
              className={`border rounded-xl transition-all ${
                activeId === item.id
                  ? "border-blue-200 bg-blue-50/30"
                  : "border-gray-100 bg-white"
              }`}
            >
              <button
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span
                  className={`text-sm font-semibold ${activeId === item.id ? "text-blue-600" : "text-gray-700"}`}
                >
                  {item.q}
                </span>
                {activeId === item.id ? (
                  <FaChevronUp className="text-blue-500 text-xs" />
                ) : (
                  <FaChevronDown className="text-gray-400 text-xs" />
                )}
              </button>

              {activeId === item.id && (
                <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed animate-slideDown">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Faq;
