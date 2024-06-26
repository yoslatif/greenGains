"use client";
import { EmblaOptionsType } from "embla-carousel";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Quotes } from "../public/quotes.json";
import { services } from "../public/services.json";
import About from "./components/about";
import InstaFeed from "./components/instaFeed";
import Services from "./components/services";
import { StickyScroll } from "./components/services-scroll-reveal";
import Testimonials from "./components/testimonials";

interface Quote {
  id: number;
  text: string;
  author: string;
}

const serviceVariants = {
  inView: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  outView: { opacity: 0, scale: 0, transition: { duration: 0.5 } },
};

export default function Home(props?: any) {
  const OPTIONS: EmblaOptionsType = { loop: true };
  const [quotes, setQuotes] = useState<Quote[]>(Quotes);
  const [quote, setQuote] = useState<Quote>();
  const [fade, setFade] = useState(true);
  const [backgroundIndex, setBackgroundIndex] = useState(0); // New state for background index
  const { setShowModal, serviceModal } = props;
  const backgrounds = ["/darkfitness.png"];

  const indexRef = useRef(0); // Declare indexRef variable
  const quoteRef = useRef<HTMLDivElement>(null); // Declare quoteRef variable used for quote div scroll animation
  const serviceRef = useRef<HTMLDivElement>(null); // Declare serviceRef variable used for service div scroll animation

  const { scrollYProgress: qouteScrollYProgress } = useScroll({
    target: quoteRef,
    offset: ["center", "center start"],
  });

  const { scrollYProgress: serviceScrollYProgress } = useScroll({
    target: serviceRef,
    offset: ["1 1.4", "1 2.5"],
  });

  const translate = useTransform(qouteScrollYProgress, [0, 1], [1, 0]);
  const scaleX = useTransform(qouteScrollYProgress, [0, 1], [1, 3]);
  const scaleY = useTransform(qouteScrollYProgress, [0, 1], [1, 3]);
  const opacity = useTransform(qouteScrollYProgress, [0, 1], [1, 0]);

  const serviceTranslate = useTransform(serviceScrollYProgress, [0, 1], [1, 0]);
  const serviceScaleX = useTransform(serviceScrollYProgress, [1, 0], [5, 0.9]);
  const serviceScaleY = useTransform(serviceScrollYProgress, [1, 0], [5, 0.9]);
  const serviceOpacity = useTransform(serviceScrollYProgress, [0, 1], [1, 0]);

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
    }, 13000); // Change background every 13 seconds
    return () => clearInterval(backgroundInterval);
  }, [backgrounds.length]);

  return (
    <div className="w-screen min-h-[200vh] relative overflow-hidden bg-fixed bg-[url('/darkfitness.png')] background-animated items-center justify-center flex flex-col space-y-20 p-10">
      <div className="transition-opacity duration-1000 text-center h-screen w-[90%] items-center justify-center flex flex-col m-auto">
        <motion.div
          className="h-1/2 w-3/4 bg-glass backdrop-blur-2xl items-center justify-center flex flex-col rounded-2xl relative max-md:p-5 max-md:h-auto max-md:w-full max-md:m-5 border-1 border-glassBorder"
          ref={quoteRef}
          style={{
            x: translate,
            scaleX: scaleX,
            scaleY: scaleY,
            opacity: opacity,
          }}
          id="Home"
        >
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
        </motion.div>
      </div>
    
      <div
        className="w-[99%] h-[80vh] flex flex-col items-center justify-center bg-glass border-1 border-glassBorder shadow-4xl backdrop-blur-2xl m-auto rounded-2xl relative space-y-10 max-md:p-5 max-md:h-auto max-md:w-full max-md:m-5"
        id="Services"
      >
        <Services />
      </div>
      <div>
        <Testimonials/>
      </div>
      <div
        className="w-[90%] h-[70vh] flex flex-col items-center justify-center bg-glass border-1 border-glassBorder shadow-2xl backdrop-blur-2xl rounded-2xl p-10 space-y-10 max-md:p-5 max-md:h-auto max-md:w-full max-md:m-5"
        id="Testimonials"
      >
        <InstaFeed options={OPTIONS} />
      </div>
      <div
        className="w-[90%]  h-lvh flex flex-col items-center justify-center bg-glass border-1 border-glassBorder shadow-2xl backdrop-blur-xl p-10 rounded-2xl max-md:p-5 max-md:h-auto max-md:w-full max-md:m-5"
        id="services-expanded"
      >
        <StickyScroll content={services} contentClassName="w-[70%] h-[70%]" />
      </div>
      <div
        className="w-[90%] h-auto flex flex-col items-center justify-center bg-glass border-1 border-glassBorder shadow-2xl backdrop-blur-2xl m-10 rounded-2xl space-y-10"
        id="About"
      >
        <About />
      </div>
    </div>
  );
}
