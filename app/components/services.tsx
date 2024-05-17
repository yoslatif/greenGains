import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

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

export default function Services() {
  const [showModal, setShowModal] = React.useState(false);
  const refModal = useRef<HTMLDivElement>();
  const handleClickNav = (e: any) => scrollTo(e.target.id);
  useOnClickOutside(refModal, () => setShowModal(false));
  const services = [
    {
      id: 1,
      name: "Personal Training",
      description: "Get personalized workouts...",
      imageUrl: "/personal-training.jpg",
      modal: "personal_training",
      lorem:
        "I always \
      felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves! They're slowed down by their perception of themselves. If you're taught you can’t do anything, you won’t do anything. I was taught I could do everything.",
    },
    {
      id: 2,
      name: "Online Coaching",
      description: "Tailored coaching regardless...",
      imageUrl: "/coaching.jpg",
      modal: "online_coaching",
      lorem:
        "I always \
      felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves! They're slowed down by their perception of themselves. If you're taught you can’t do anything, you won’t do anything. I was taught I could do everything.",
    },
    {
      id: 3,
      name: "Nutrition Plans",
      description: "Enjoy healthy, yummy meal plans...",
      imageUrl: "/nutrition-plans.jpg",
      modal: "nutrition_plans",
      lorem:
        "I always \
      felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves! They're slowed down by their perception of themselves. If you're taught you can’t do anything, you won’t do anything. I was taught I could do everything.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
      {services.map((service, index) => (
        <div
          key={index}
          className={
            "relative overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105 rounded-xl"
          }
        >
          <Image
            src={service.imageUrl}
            alt={service.name}
            width={500}
            height={300}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 opacity-0 hover:transition-opacity hover:duration-500 hover:opacity-100">
            <div className="text-white text-center">
              <h2 className="text-xl font-bold mb-2">{service.name}</h2>
              <p className="mb-4">{service.description}</p>
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-sans py-2 px-4 rounded"
                onClick={() => setShowModal(true)}
              >
                Learn More
              </button>
              {showModal ? (
                <div ref={refModal} onMouseLeave={() => setShowModal(false)}>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto relative inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                          <h3 className="text-3xl font-semibold text-black">
                            {service.name}
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
                            {service.lorem}
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
                        handleClickNav(service.name);
                        setShowModal(false);
                      }}
                    >
                      Learn More About {service.name}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <h3 className="absolute flex flex-col  justify-center items-center p-4 text-lg font-bold text-white z-10">
            {service.name}
          </h3>
        </div>
      ))}
    </div>
  );
}
