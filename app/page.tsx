"use client";
import { EmblaOptionsType } from "embla-carousel";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Quotes } from "../public/quotes.json";
import About from "./components/about";
import InstaFeed from "./components/instaFeed";
import Services from "./components/services";
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
  // const backgrounds = ["/background.jpg", "/gymNeon.jpg", "/abstract-fitness.jpg", "/beachgym.jpg"]; // Array of background images
  const backgrounds = ["/gymNeon.jpg"];

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
    }, 13000); // Change background every 10 seconds
    return () => clearInterval(backgroundInterval);
  }, [backgrounds.length]);

  return (
    <div className="w-screen min-h-[200vh] relative overflow-hidden bg-[url('/gymNeon.jpg')] bg-fixed items-center justify-center flex flex-col">
      <div className="transition-opacity duration-1000 text-center h-screen w-[90%] items-center justify-center flex flex-col m-auto">
        <motion.div
          className="h-1/2 w-3/4 bg-transparent backdrop-blur-2xl items-center justify-center flex flex-col rounded-2xl relative"
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
        className="w-[90%] h-[50vh] flex flex-col items-center justify-center bg-transparent backdrop-blur-2xl m-auto rounded-2xl opacity-100 max-sm:h-screen max-sm:w-[90%] max-sm:m-5 relative max-md:h-[80vh]"
        id="Services"
      >
        {/* <motion.div
          className="w-full h-full"
          ref={serviceRef}
          style={{
            x: serviceTranslate,
            scaleX: serviceScaleX,
            scaleY: serviceScaleY,
            opacity: serviceOpacity,
          }}        > */}
        <Services />
        {/* </motion.div> */}
      </div>
      <div
        className="w-[90%] h-screen flex flex-col items-center justify-center bg-transparent backdrop-blur-2xl m-10 rounded-2xl md:h-full p-10"
        id="Testimonials"
      >
        <InstaFeed options={OPTIONS} />
      </div>
      <div
        className="w-[90%] h-1/2 flex flex-col items-center justify-center bg-transparent backdrop-blur-2xl m-10 rounded-2xl"
        id="About"
      >
        <About />
      </div>
    </div>
  );
}
