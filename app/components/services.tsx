import React, { useEffect, useRef } from "react";
import ServicesModal from "./modal";

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
    <div
      className="flex flex-row p-5 max-md:h-full max-md:w-full h-full w-full relative items-center justify-center gap-5 max-md:flex-col"
      ref={refModal}
    >
      {services.map((service, index) => (
        <div
          key={index}
          style={{ backgroundImage: `url(${service.imageUrl})` }}
          className={
            showModal
              ? "w-full h-full border-2 border-white flex flex-col items-center justify-center rounded-lg bg-cover object-fill group/item hover:scale-110 hover:transition-all hover:duration-500 hover:ease-in-out hover:bg-opacity-40 opacity-20 target:opacity-100"
              : "w-full h-full border-2 border-white flex flex-col items-center justify-center rounded-lg bg-cover object-fill group/item hover:scale-110 hover:transition-all hover:duration-500 hover:ease-in-out hover:bg-opacity-40"
          }
        >
          <h1 className="text-4xl font-sans text-white group-hover/item:-translate-y-40 group-hover/item:transition-all group-hover/item:duration-300 group-hover/item:ease-in-out max-md:group-hover/item:-translate-y-10">
            {service.name}
          </h1>
          <p className="text-white text-2xl opacity-0 group-hover/item:-translate-y-40 group-hover/item:transition-all group-hover/item:duration-300 group-hover/item:ease-in-out group-hover/item:opacity-100 max-md:group-hover/item:-translate-y-10">
            {service.description}
          </p>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-sans py-2 px-4 rounded group/modal group-hover/item:transition-all group-hover/item:duration-500 group-hover/item:ease-in-out opacity-0 group-hover/item:opacity-100 target:bg-none"
            onClick={() => setShowModal(true)}
          >
            Learn More
            {showModal && (
              <ServicesModal
                serviceModal={service}
                setShowModal={setShowModal}
                handleClickNav={handleClickNav}
              />
            )}
          </button>
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
