"use client";
import Image from "next/image";
import { Quotes } from "../public/quotes.json";
import { useCallback, useEffect, useState } from "react";

interface quotes {
  id: number;
  text: string;
  author: string;
}

export default function Home() {
  const [Quotes_d, setQuotes] = useState<quotes[]>(Quotes);
  const [quote, setQuote] = useState<quotes>();
  
  // Corrected the parameter type to an array of quotes
  const RandomQuote = (Quotes_S: quotes[]) => {
    const RandomIndex = Math.floor(Math.random() * Quotes_S.length); // Removed optional chaining since array is now always passed
    console.log(RandomIndex); // This will log the random index
    setQuote(Quotes_S[RandomIndex]); // Sets the random quote
  };

  useEffect(() => {
    const interval = setInterval(() => {
      RandomQuote(Quotes_d); // Calling the function directly without console.log
    }, 5000);

    return () => clearInterval(interval);
  }, [Quotes_d]); // Added Quotes_d as a dependency

  return (
    <div className="w-screen h-screen bg-scroll flex justify-center items-center">
      <Image
        src="/background.png"
        layout="fill"
        objectFit="cover"
        alt="background"
        className="-z-10"
      />
      <div className="flex flex-col items-center justify-center h-1/3 w-[80%] bg-transparent backdrop-blur-3xl rounded-xl p-5 shadow-2xl">
        <h1 className="text-4xl font-bold text-white p-10">{quote?.text}</h1>
        <p className="text-white">{quote?.author}</p>
      </div>
    </div>
  );
}
