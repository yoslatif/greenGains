// "use client";
// import { cn } from "@/utils/cn";
// import { motion, useMotionValueEvent, useScroll } from "framer-motion";
// import React, { useRef } from "react";

// export const StickyScroll = ({
//   content,
//   contentClassName,
// }: {
//   content: {
//     title: string;
//     description: string;
//     content?: React.ReactNode | any;
//   }[];
//   contentClassName?: string;
// }) => {
//   const [activeCard, setActiveCard] = React.useState(0);
//   const ref = useRef<any>(null);
//   const { scrollYProgress } = useScroll({
//     // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
//     // target: ref
//     container: ref,
//     offset: ["start start", "end start"],
//   });
//   const cardLength = content.length;

//   useMotionValueEvent(scrollYProgress, "change", (latest) => {
//     const cardsBreakpoints = content.map((_, index) => index / cardLength);
//     const closestBreakpointIndex = cardsBreakpoints.reduce(
//       (acc, breakpoint, index) => {
//         const distance = Math.abs(latest - breakpoint);
//         if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
//           return index;
//         }
//         return acc;
//       },
//       0
//     );
//     setActiveCard(closestBreakpointIndex);
//   });

//   const backgroundColors = [
//     "var(--slate-900)",
//     "var(--black)",
//     "var(--neutral-900)",
//   ];
//   const linearGradients = [
//     "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
//     "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
//     "linear-gradient(to bottom right, var(--green-500), var(--yellow-500))",
//   ];
//   return (
//     <motion.div
//       animate={{
//         backgroundColor: backgroundColors[activeCard % backgroundColors.length],
//       }}
//       className="h-[60rem] overflow-y-scroll flex justify-center relative space-x-36 rounded-xl p-10 w-full max-md:w-auto max-md:p-2"
//       ref={ref}
//     >
//       <div className="relative  flex items-start px-4 justify-center">
//         <div className="max-w-2xl">
//           {content.map((item, index) => (
//             <div key={item.title + index} className="my-40">
//               <motion.h2
//                 initial={{
//                   opacity: 0,
//                 }}
//                 animate={{
//                   opacity: activeCard === index ? 1 : 0.4,
//                 }}
//                 className="text-2xl font-bold text-slate-100"
//               >
//                 {item.title}
//               </motion.h2>
//               <motion.p
//                 initial={{
//                   opacity: 0,
//                 }}
//                 animate={{
//                   opacity: activeCard === index ? 1 : 0.3,
//                 }}
//                 className="text-kg text-slate-300 max-w-sm mt-10"
//               >
//                 {item.description}
//               </motion.p>
//             </div>
//           ))}
//           <div className="h-40" />
//         </div>
//       </div>
//       <motion.div
//         animate={{
//           background: linearGradients[activeCard % linearGradients.length],
//         }}
//         className={cn(
//           "hidden lg:block h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden",
//           contentClassName
//         )}
//       >
//         {content[activeCard].content ?? null}
//       </motion.div>
//     </motion.div>
//   );
// };

// StickyScroll.tsx
"use client";
import { cn } from "@/utils/cn";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import React, { useRef } from "react";
import Image from "next/image";

// Define the content array with image paths
const content = [
  {
    title: "Title 1",
    description: "Description 1",
    src: "/GGF.png", // Correct path to the image in the public folder
    alt: "Description of image 1",
    content: <div>Content 1</div>,
  },
  {
    title: "Title 2",
    description: "Description 2",
    src: "/GGF.png", // Correct path to the image in the public folder
    alt: "Description of image 2",
    content: <div>Content 2</div>,
  },
  // Add more items as needed
];

// StickyScroll component
export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
    src?: string;
    alt?: string;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
    // target: ref
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "var(--slate-900)",
    "var(--black)",
    "var(--neutral-900)",
  ];

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[60rem] overflow-y-scroll flex justify-center relative space-x-36 rounded-xl p-10 w-full max-md:w-auto max-md:p-2"
      ref={ref}
    >
      <div className="relative flex items-start px-4 justify-center">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-40">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.4,
                }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-kg text-slate-300 max-w-sm mt-10"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div className={cn("hidden lg:block h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden", contentClassName)}>
        {content[activeCard].src && (
          <Image
            src={content[activeCard].src || "/GGF.png"} // Provide a default image path
            alt={content[activeCard].alt || "Default Image"}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        )}
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};

// Render the StickyScroll component
const App = () => {
  return (
    <div>
      <StickyScroll content={content} />
    </div>
  );
};

export default App;
