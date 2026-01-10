import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import useOutsideClick from "../hooks/useModal"; // Osiguraj da ovaj hook radi sa ref-om
import { ModalContext } from "../hooks/ModalContext";

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }) {
  const { open } = useContext(ModalContext);

  // Koristimo span kao wrapper da ne bi klonirali elemente
  return (
    <span onClick={() => open(opens)} className="block w-full cursor-pointer">
      {children}
    </span>
  );
}

function Window({ name, children }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    /* OVERLAY */
    <div className="fixed top-0 left-0 w-full h-screen bg-black/30 backdrop-blur-sm z-1000 transition-all duration-500">
      <div
        ref={ref}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl p-8 transition-all duration-500 w-[95%] max-w-lg"
      >
        <button
          onClick={close}
          className="absolute top-4 right-4 p-1 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all"
        >
          <HiXMark className="w-6 h-6" />
        </button>
        <div className="mt-4">{children}</div>
      </div>
    </div>,
    document.body
  );
}

// Custom hook za lakše zatvaranje modala unutar formi

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
