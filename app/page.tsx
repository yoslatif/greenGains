"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Quotes } from "../public/quotes.json";
import Services from "./components/services";
import Testimonials from "./components/testimonials";
import Footer from './components/footer';
import About from "./components/about";


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
    <div className="w-screen min-h-[200vh] relative overflow-hidden">
      <div className="bg-fixed flex flex-col justify-center items-center w-full h-full">
        <Image
          src={backgrounds[backgroundIndex]} // Use current background
          alt="background"
          layout="fill"
        />
        <div className="flex flex-col items-center justify-center w-[95%] bg-glass backdrop-blur-3xl rounded-xl p-5 shadow-2xl mt-60">
          <div
            className={`transition-opacity duration-1000 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white p-10 max-sm:text-xl max-sm:p-5">
                {quote?.text || "Welcome to Green Gains Fitness"}
              </h1>
              <p className="text-white">{quote?.author}</p>
            </div>
          </div>
          <Services />
          <Testimonials />
          <div id="aboutSection" className="about-container">
  <About />
</div>
          
        </div>
        
      </div>
      <Footer />
    </div>
  );
}
