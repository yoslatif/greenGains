// "use client";
// import Image from "next/image";
// import { Quotes } from "../public/quotes.json";
// import { useCallback, useEffect, useState } from "react";

// interface quotes {
//   id: number;
//   text: string;
//   author: string;
// }

// export default function Home() {
//   const [Quotes_d, setQuotes] = useState<quotes[]>(Quotes);
//   const [quote, setQuote] = useState<quotes>();
  
//   // Corrected the parameter type to an array of quotes
//   const RandomQuote = (Quotes_S: quotes[]) => {
//     const RandomIndex = Math.floor(Math.random() * Quotes_S.length); // Removed optional chaining since array is now always passed
//     console.log(RandomIndex); // This will log the random index
//     setQuote(Quotes_S[RandomIndex]); // Sets the random quote
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       RandomQuote(Quotes_d); // Calling the function directly without console.log
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [Quotes_d]); // Added Quotes_d as a dependency

//   return (
//     <div className="w-screen h-screen bg-scroll flex justify-center items-center">
//       <Image
//         src="/background.png"
//         layout="fill"
//         objectFit="cover"
//         alt="background"
//         className="-z-10"
//       />
//       <div className="flex flex-col items-center justify-center h-1/3 w-[80%] bg-transparent backdrop-blur-3xl rounded-xl p-5 shadow-2xl">
//         <h1 className="text-4xl font-bold text-white p-10">{quote?.text}</h1>
//         <p className="text-white">{quote?.author}</p>
//       </div>
//     </div>
//   );
// }




// ---------------------------------------------------------------------------------------------------------- //


// import Image from 'next/image';
// import { useState, useEffect } from 'react';
// import Services from './components/services';  // Adjust the path as necessary
// import Testimonials from './components/testimonials';  // Adjust the path as necessary
// import Header from './components/header';  // Ensure Header is imported if it’s not globally available

// export default function Home() {
//   return (
//     <div>
//       <Header />
//       <div className="bg-scroll flex justify-center items-center w-screen h-screen">
//         <Image
//           src="/background.png"
//           layout="fill"
//           objectFit="cover"
//           alt="background"
//           className="-z-10"
//         />
//         <div className="flex flex-col items-center justify-center w-[80%] bg-transparent backdrop-blur-3xl rounded-xl p-5 shadow-2xl">
//           <h1 className="text-4xl font-bold text-white p-10">Welcome to Green Gains Fitness</h1>
//           <Services />
//           <Testimonials />
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Quotes } from '../public/quotes.json';
import Services from './components/services';  // Adjust the path as necessary
import Testimonials from './components/testimonials';  // Adjust the path as necessary
import Header from './components/header';  // Ensure Header is imported if it’s not globally available

interface Quote {
  id: number;
  text: string;
  author: string;
}

export default function Home() {
  const [quotes, setQuotes] = useState<Quote[]>(Quotes);
  const [quote, setQuote] = useState<Quote>();
  const [fade, setFade] = useState(true); // New state to manage fade
  const indexRef = useRef(0);

  const randomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Begin fade out
      setTimeout(() => {
        if (++indexRef.current === quotes.length) indexRef.current = 0; // Cycle through quotes
        setQuote(quotes[indexRef.current]);
        setFade(true); // Fade in new quote
      }, 500); // This timeout should match the CSS transition duration
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="main-content">

      

  <div className="bg-scroll flex justify-center items-center w-screen min-h-screen">
    <Image
      src="/background.png"
      layout="fill"
      objectFit="cover"
      alt="background"
      className="-z-10"
    />
    <div className="flex flex-col items-center justify-center w-[95%] bg-transparent backdrop-blur-3xl rounded-xl p-5 shadow-2xl mt-28">
          <div className={`transition-opacity duration-800 ${fade ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white p-10">{quote?.text || "Welcome to Green Gains Fitness"}</h1>
              <p className="text-white">{quote?.author}</p>
            </div>
          </div>
          <div className="serviceHome">
          <Services />
          </div>
      <Testimonials />
    </div>
  </div>
</div>
  );
}
