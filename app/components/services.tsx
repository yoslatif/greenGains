import React, { useEffect, useRef } from "react";

export default function Services() {
  const [showModal, setShowModal] = React.useState(false);
  const refModal = useRef<HTMLDivElement>(null);
  const handleClickNav = (e: any) => {
    console.log(e);
    if (window.location.pathname !== "/") {
      window.location.href = "/";
    }
    const element = document.getElementById(e);
    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  useOnClickOutside();

  function useOnClickOutside() {
    useEffect(() => {
      const listener = (event: { target: any }) => {
        if (!refModal.current || refModal.current.contains(event.target)) {
          return;
        }
        setShowModal(false);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          setShowModal(false);
        }
      });
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
        document.removeEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            setShowModal(false);
          }
        });
      };
    }, []);
  }

  const services = [
    {
      id: 1,
      name: "Personal Training",
      description: "Get personalized workouts...",
      imageUrl: "/personal-training.jpg",
      lorem:
        "I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves! They're slowed down by their perception of themselves. If you're taught you can’t do anything, you won’t do anything. I was taught I could do everything.",
      path: "services-expanded",
    },
    {
      id: 2,
      name: "Online Coaching",
      description: "Tailored coaching regardless...",
      imageUrl: "/coaching.jpg",
      lorem:
        "I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves! They're slowed down by their perception of themselves. If you're taught you can’t do anything, you won’t do anything. I was taught I could do everything.",
      path: "services-expanded",
    },
    {
      id: 3,
      name: "Nutrition Plans",
      description: "Enjoy healthy, yummy meal plans...",
      imageUrl: "/nutrition-plans.jpg",
      lorem:
        "I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves! They're slowed down by their perception of themselves. If you're taught you can’t do anything, you won’t do anything. I was taught I could do       everything.",
      path: "services-expanded",
    },
  ];

  return (
    <div
      className="flex flex-wrap lg:flex-nowrap p-6 w-full items-center justify-center gap-7"
      ref={refModal}
    >
      {services.map((service, index) => (
        <div
          key={index}
          style={{ backgroundImage: `url(${service.imageUrl})` }}
          className="relative w-full max-w-xl h-96 lg:h-[550px] border-gray-200 rounded-lg bg-cover bg-center group hover:scale-105 hover:transition-transform duration-500 ease-in-out"
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg group-hover:bg-opacity-20 transition-all duration-500 ease-in-out"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
            <h1 className="text-4xl font-bold mb-4 group-hover:opacity-100 opacity-0 transition-opacity duration-300">
              {service.name}
            </h1>
            <p className="text-2xl mb-6 group-hover:opacity-100 opacity-0 transition-opacity duration-300">
              {service.description}
            </p>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 transition-opacity duration-500 group-hover:opacity-100 opacity-0"
              onClick={() => {
                handleClickNav(service.path);
                console.log(service.path);
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

