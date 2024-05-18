// ServicesModal.tsx
"use client";

import React, { useRef, useEffect } from "react";

interface ServiceModalProps {
  serviceModal: {
    name: string;
    lorem: string;
  };
  handleClickNav: (name: string) => void;
  setShowModal: (show: boolean) => void;
}

function useOnClickOutside(ref: React.RefObject<HTMLDivElement>, handler: (event: MouseEvent | TouchEvent) => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

const ServicesModal: React.FC<ServiceModalProps> = ({ serviceModal, handleClickNav, setShowModal }) => {
  const refModal = useRef<HTMLDivElement>(null);

  useOnClickOutside(refModal, () => setShowModal(false));

  return (
    <div ref={refModal} onMouseLeave={() => setShowModal(false)} className="modal-container fixed inset-0 z-50 flex justify-center items-center">
      <div className="modal-content bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-5 max-w-4xl mx-auto my-6 overflow-hidden relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-black text-3xl leading-none z-50 font-semibold outline-none focus:outline-none"
        >
          ×
        </button>
        <div className="text-center">
          <h3 className="text-3xl font-semibold mb-4">{serviceModal.name}</h3>
          <p className="text-lg">{serviceModal.lorem}</p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-green-500 text-white font-bold uppercase text-sm px-6 py-2 rounded shadow hover:bg-green-600 focus:outline-none ease-linear transition-all duration-150"
            onClick={() => {
              handleClickNav(serviceModal.name);
              setShowModal(false);
            }}
          >
            Learn More About {serviceModal.name}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesModal;
