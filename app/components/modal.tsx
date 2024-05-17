"use client";

import React from "react";
import { useEffect } from "react";

function useOnClickOutside(ref: any, handler: any) {
  useEffect(() => {
    const listener = (event: { target: any }) => {
      if (!ref.current || ref.current.contains(event.target)) {
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

export default function ServicesModal(props?: any) {
  const { serviceModal, handleClickNav, setShowModal } = props;

  const refModal = React.useRef<HTMLDivElement>();
  return (
    <div ref={refModal} onMouseLeave={(ref) => setShowModal(false)}>
      <div className="justify-center items-center flex relative inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
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
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-black text-lg leading-relaxed">
                {serviceModal.lorem}
              </p>
            </div>
          </div>
        </div>
      </div>
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
  );
}
