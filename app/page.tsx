// "use client";
// import Image from "next/image";
// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { Quotes } from "../public/quotes.json";
// import Services from "./components/services"; // Adjust the path as necessary
// import Testimonials from "./components/testimonials"; // Adjust the path as necessary
// import Header from "./components/header"; // Ensure Header is imported if it’s not globally available

// interface Quote {
//   id: number;
//   text: string;
//   author: string;
// }

// export default function Home() {
//   const [quotes, setQuotes] = useState<Quote[]>(Quotes);
//   const [quote, setQuote] = useState<Quote>();
//   const [fade, setFade] = useState(true); // New state to manage fade
//   const indexRef = useRef(0);

//   const randomQuote = () => {
//     const randomIndex = Math.floor(Math.random() * quotes.length);
//     setQuote(quotes[randomIndex]);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setFade(false); // Begin fade out
//       setTimeout(() => {
//         if (++indexRef.current === quotes.length) indexRef.current = 0; // Cycle through quotes
//         setQuote(quotes[indexRef.current]);
//         setFade(true); // Fade in new quote
//       }, 500); // This timeout should match the CSS transition duration
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="main-content">
//       <div className="bg-scroll flex justify-center items-center w-screen min-h-screen">
//         <Image
//           src="/gymNeon.jpg"
//           layout="fill"
//           objectFit="cover"
//           alt="background"
//           className="-z-10"
//         />
// \
//         <div className="flex flex-col items-center justify-center w-[95%] bg-transparent backdrop-blur-3xl rounded-xl p-5 shadow-2xl mt-28">
//           <div
//             className={`transition-opacity duration-800 ${
//               fade ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <div className="text-center">
//               <h1 className="text-4xl font-bold text-white p-10">
//                 {quote?.text || "Welcome to Green Gains Fitness"}
//               </h1>
//               <p className="text-white">{quote?.author}</p>
//             </div>
//           </div>
//           <div className="serviceHome">
//             <Services />
//           </div>
//           <Testimonials />
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Quotes } from "../public/quotes.json";
import Services from "./components/services";
import Testimonials from "./components/testimonials";
import Header from "./components/header";

interface Quote {
  id: number;
  text: string;
  author: string;
}

export default function Home() {
  const [quotes, setQuotes] = useState<Quote[]>(Quotes);
  const [quote, setQuote] = useState<Quote>();
  const [fade, setFade] = useState(true);
  const [backgroundIndex, setBackgroundIndex] = useState(0); // New state for background index
  // const backgrounds = ["/background.jpg", "/gymNeon.jpg", "/abstract-fitness.jpg", "/beachgym.jpg"]; // Array of background images
  const backgrounds = ["/background.jpg"];
  
  const indexRef = useRef(0); // Declare indexRef variable

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        const newIndex = quotes.length > 1 ? (indexRef.current + 1) % quotes.length : 0;
        indexRef.current = newIndex;
        setQuote(quotes[newIndex]);
        setFade(true);
      }, 500);
    }, 5000);
    return () => clearInterval(quoteInterval);
  }, [quotes]);

  useEffect(() => {
    const backgroundInterval = setInterval(() => {
      setBackgroundIndex(prev => (prev + 1) % backgrounds.length); // Cycle through background images
    }, 13000); // Change background every 10 seconds
    return () => clearInterval(backgroundInterval);
  }, [backgrounds.length]);

  return (
    <div className="main-content">
      <div className="bg-scroll flex justify-center items-center w-screen min-h-screen">
        <Image
          src={backgrounds[backgroundIndex]} // Use current background
          layout="fill"
          objectFit="cover"
          alt="background"
          className="-z-10"
        />
        <div className="flex flex-col items-center justify-center w-[95%] bg-transparent backdrop-blur-3xl rounded-xl p-5 shadow-2xl mt-28">
          <div className={`transition-opacity duration-800 ${fade ? "opacity-100" : "opacity-0"}`}>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white p-10">
                {quote?.text || "Welcome to Green Gains Fitness"}
              </h1>
              <p className="text-white">{quote?.author}</p>
            </div>
          </div>
          <Services />
          <Testimonials />
        </div>
      </div>
    </div>
  );
}
