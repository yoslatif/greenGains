// ServicesModal.tsx
"use client";

import React, { useRef, useEffect } from "react";

interface ServicesModalProps {
  serviceModal: {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    lorem: string;
  };
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickNav: (name: string) => void; // This is the prop that seems to be missing
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
  }, [ref, handler]); // Dependencies should include all variables from the hook's closure
}

const ServicesModal: React.FC<ServicesModalProps> = ({ serviceModal, handleClickNav, setShowModal }) => {
  const refModal = useRef<HTMLDivElement>(null);

  // Use the custom hook
  useOnClickOutside(refModal, () => setShowModal(false));

  return (
    <div ref={refModal} onMouseLeave={() => setShowModal(false)} className="modal-container">
      <div className="justify-center items-center flex relative inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/* Modal content */}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold text-black">
                {serviceModal.name}
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-100 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            {/* Modal body */}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-black text-lg leading-relaxed">
                {serviceModal.lorem}
              </p>
            </div>
            {/* Footer */}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-green-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
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
      </div>
    </div>
  );
};

export default ServicesModal;
