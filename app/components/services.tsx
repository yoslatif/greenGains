import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import ServicesModal from "./modal";
import Home from "../page";
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
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        handler(e);
      }
    });
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
      document.removeEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          handler(e);
        }
      });
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
      lorem:
        "I always \
      felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves! They're slowed down by their perception of themselves. If you're taught you can’t do anything, you won’t do anything. I was taught I could do everything.",
    },
    {
      id: 2,
      name: "Online Coaching",
      description: "Tailored coaching regardless...",
      imageUrl: "/coaching.jpg",
      lorem:
        "I always 2 \
      felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves! They're slowed down by their perception of themselves. If you're taught you can’t do anything, you won’t do anything. I was taught I could do everything.",
    },
    {
      id: 3,
      name: "Nutrition Plans",
      description: "Enjoy healthy, yummy meal plans...",
      imageUrl: "/nutrition-plans.jpg",
      lorem:
        "I always 3 \
      felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves! They're slowed down by their perception of themselves. If you're taught you can’t do anything, you won’t do anything. I was taught I could do everything.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
      {services.map((service, index) => (
        <div
          key={index}
          className={
            showModal
              ? "target:opacity-100 target:w-screen target:h-full target:row-span-3 p-2 opacity-10 hover:transition-opacity hover:duration-500 hover:opacity-100 relative overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105 rounded-xl"
              : "relative overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105 rounded-xl"
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
                className={
                  showModal
                    ? "hidden"
                    : "bg-green-500 hover:bg-green-600 text-white font-sans py-2 px-4 rounded"
                }
                onClick={() => setShowModal(true)}
              >
                Learn More
              </button>
              {showModal && (
                <ServicesModal
                  serviceModal={service}
                  setShowModal={setShowModal}
                />
              )}
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
