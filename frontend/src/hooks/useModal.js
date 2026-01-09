import { useContext } from "react";
import { ModalContext } from "./ModalContext";
import { useEffect, useRef } from "react";

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error("useModal must be used within a Modal");
  return context;
}

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        // Ako ref postoji i klik je bio VAN tog elementa
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}

export default useOutsideClick;
