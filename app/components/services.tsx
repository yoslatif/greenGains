import React, { useEffect, useRef } from "react";

export default function Services() {
  const [showModal, setShowModal] = React.useState(false);
  const refModal = useRef<HTMLDivElement>(null);
  const handleClickNav = (e: any) => scrollTo(e.target.id);
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
    },
    {
      id: 2,
      name: "Online Coaching",
      description: "Tailored coaching regardless...",
      imageUrl: "/coaching.jpg",
      lorem:
        "I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves! They're slowed down by their perception of themselves. If you're taught you can’t do anything, you won’t do anything. I was taught I could do everything.",
    },
    {
      id: 3,
      name: "Nutrition Plans",
      description: "Enjoy healthy, yummy meal plans...",
      imageUrl: "/nutrition-plans.jpg",
      lorem:
        "I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves! They're slowed down by their perception of themselves. If you're taught you can’t do anything, you won’t do anything. I was taught I could do everything.",
    },
  ];

  return (
    <div
      className="flex flex-wrap lg:flex-nowrap p-5 w-full items-center justify-center gap-10"
      ref={refModal}
    >
      {services.map((service, index) => (
        <div
          key={index}
          style={{ backgroundImage: `url(${service.imageUrl})` }}
          className="relative w-full max-w-xl h-96 lg:h-[500px] border-2 border-gray-200 rounded-lg bg-cover bg-center group hover:scale-105 hover:transition-transform duration-500 ease-in-out"
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg group-hover:bg-opacity-20 transition-all duration-500 ease-in-out"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
            <h1 className="text-4xl font-bold mb-4 group-hover:opacity-100 opacity-0 transition-opacity duration-300">
              {service.name}
            </h1>
            <p className="text-2xl mb-6 group-hover:opacity-100 opacity-0 transition-opacity duration-300">
              {service.description}
            </p>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 transition-opacity duration-500 group-hover:opacity-100 opacity-0"
              onClick={() => setShowModal(true)}
            >
              Learn More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}



// return (
//   <div
//     className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 max-md:h-full max-md:w-full"
//     ref={refModal}
//   >
//     {services.map((service, index) => (
//       <div
//         key={index}
//         className={
//           showModal
//             ? "active:opacity-100 active:w-screen active:h-screen active:row-span-3 p-2 opacity-0 hover:transition-opacity hover:duration-500 hover:opacity-100 relative overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105 rounded-xl active:overflow-visible active:md:col-span-3"
//             : "relative overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105 rounded-xl h-full w-full"
//         }
//       >
//         <Image
//           src={service.imageUrl}
//           alt={service.name}
//           width={500}
//           height={300}
//           className="object-cover w-full h-full absolute"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 opacity-0 hover:transition-opacity hover:duration-500 hover:opacity-100">
//           <div className="text-white text-center">
//             <h2
//               className={
//                 showModal ? "text-opacity-50" : "text-xl font-bold mb-2"
//               }
//             >
//               {service.name}
//             </h2>
//             <p className="mb-4">{service.description}</p>
//             <button
//               className={
//                 showModal
//                   ? "hidden"
//                   : "bg-green-500 hover:bg-green-600 text-white font-sans py-2 px-4 rounded"
//               }
//               onClick={() => setShowModal(true)}
//             >
//               Learn More
//             </button>
//             {showModal && (
//               <ServicesModal
//                 serviceModal={service}
//                 setShowModal={setShowModal}
//                 handleClickNav={function (name: string): void {
//                   throw new Error("Function not implemented.");
//                 }}
//               />
//             )}
//           </div>
//         </div>
//         <h3 className="absolute flex flex-col  justify-center items-center p-4 text-lg font-bold text-white z-10">
//           {service.name}
//         </h3>
//       </div>
//     ))}
//   </div>
// );
