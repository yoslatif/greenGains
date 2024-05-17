// components/About.tsx
import React, { useRef, useEffect } from "react";
import Image from "next/image";

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
          My journey began in 2014, where I was inspired by a famous parkour
          athlete named Tim Shieff, where he planted the seed of advocating for
          the importance of clean eating and mindful food selection. However,
          despite valuing my health, I struggled to take action and really bring
          change into my life.
          <br></br>
          Fast forward to 2019, and I had reached a critical point. Weighing 218
          pounds (98kg) and facing pre-diabetic symptoms, including sugar
          cravings and low insulin sensitivity, I felt like I was staring into
          the abyss. I was tired of feeling sluggish, tired of feeling like I
          was losing control of my body. I knew I needed to make a change, but I
          didn't know where to start.
          <br></br>
          That's when I made a conscious decision to take back control. I
          adopted a plant-based diet, and immersed myself in fitness and
          nutrition education. It wasn't easy - there were setbacks, struggles,
          and moments of doubt. But I persisted, driven by a deep desire to
          reclaim my health and well-being. The journey was transformative. I
          shed over 50 pounds, and discovered a newfound passion for exercise
          and nutrition. But more than that, I discovered a sense of purpose and
          meaning. I realized that I wasn't just changing my body - I was
          changing my mind and spirit too.
          <br></br>
          Today, I'm dedicated to helping others embark on their own journey of
          transformation. I believe that true change requires a whole-body
          approach - addressing mental, physical, and emotional aspects to bring
          about lasting transformation. It's not just about losing weight or
          building muscle - it's about building resilience, confidence, and a
          deep connection with your overall well-being.
        </p>
      </div>
    </div>
  );
};

export default About;
