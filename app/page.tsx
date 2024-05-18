"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Quotes } from "../public/quotes.json";
import Services from "./components/services";
import Testimonials from "./components/testimonials";
import Footer from "./components/footer";

interface Quote {
  id: number;
  text: string;
  author: string;
}

export default function Home(props?: any) {
  const [quotes, setQuotes] = useState<Quote[]>(Quotes);
  const [quote, setQuote] = useState<Quote>();
  const [fade, setFade] = useState(true);
  const [backgroundIndex, setBackgroundIndex] = useState(0); // New state for background index
  const { setShowModal, serviceModal } = props;
  // const backgrounds = ["/background.jpg", "/gymNeon.jpg", "/abstract-fitness.jpg", "/beachgym.jpg"]; // Array of background images
  const backgrounds = ["/gymNeon.jpg"];

  const indexRef = useRef(0); // Declare indexRef variable

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        const newIndex =
          quotes.length > 1 ? (indexRef.current + 1) % quotes.length : 0;
        indexRef.current = newIndex;
        setQuote(quotes[newIndex]);
        setFade(true);
      }, 500);
    }, 5000);
    return () => clearInterval(quoteInterval);
  }, [quotes]);

  useEffect(() => {
    const backgroundInterval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % backgrounds.length); // Cycle through background images
    }, 13000); // Change background every 10 seconds
    return () => clearInterval(backgroundInterval);
  }, [backgrounds.length]);

  return (
    <div className="w-screen min-h-[200vh] relative overflow-hidden bg-[url('/gymNeon.jpg')] bg-fixed items-center justify-center flex flex-col">
      <div
        className={`transition-opacity duration-1000 text-center h-screen w-full items-center justify-center flex flex-col`}
      >
        <div className="h-1/2 w-3/4 bg-transparent backdrop-blur-2xl items-center justify-center flex flex-col rounded-2xl">
          <h1
            className={`text-4xl font-bold text-white p-10 max-sm:text-xl max-sm:p-5 duration-500 ${
              fade ? "text-opacity-100" : "text-opacity-0"
            }`}
          >
            {quote?.text || "Welcome to Green Gains Fitness"}
          </h1>
          <p
            className={`flex text-2xl font-bold text-white p-10 max-sm:text-xl max-sm:p-5 duration-500 left-52 justify-end items-end w-full ${
              fade ? "text-opacity-100" : "text-opacity-0"
            }`}
          >
            - {quote?.author}
          </p>
        </div>
      </div>

      <div className="w-10/12 h-dvh flex flex-col items-center justify-center bg-transparent backdrop-blur-2xl m-10 rounded-2xl">
        <Services />
      </div>
      <div className="w-10/12 h-1/2 flex flex-col items-center justify-center bg-transparent backdrop-blur-2xl m-10 rounded-2xl">
        <Testimonials />
      </div>
    </div>
  );
}
