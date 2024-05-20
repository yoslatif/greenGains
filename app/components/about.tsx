// components/About.tsx
import Image from "next/image";
import { useEffect, useRef } from "react";

const About = () => {
  const refContainer = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      {
        root: null, // viewport
        threshold: 0.5,
      }
    );

    if (refContainer.current) {
      observer.observe(refContainer.current);
    }

    return () => {
      if (refContainer.current) {
        observer.unobserve(refContainer.current);
      }
    };
  }, []);

  return (
    <div ref={refContainer} className="container">
      <div className="headshot">
        <Image
          src="/headshot.jpg"
          alt="Coach Sukhpreet"
          width={500}
          height={500}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="bio">
        <h2 className="text-3xl font-bold mb-4">Coach Sukhpreet</h2>
        <p className="text-md">
          My journey began in 2014, inspired by parkour athlete Tim
          Shieff&hellip; I&apos;ve been driven by a deep desire to reclaim my
          health and well-being.
        </p>
      </div>
    </div>
  );
};

export default About;
