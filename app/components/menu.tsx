"use client";
import { motion, useCycle } from "framer-motion";
import { useRef } from "react";
import { FaHome } from "react-icons/fa";
import { FaWeightHanging } from "react-icons/fa6";
import { FcAbout } from "react-icons/fc";
import { MdContactPage } from "react-icons/md";

const menuVariants = {
  open: {
    y: 1,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

const navVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemIds = [
  { id: 0, name: "Home", icon: <FaHome />, link: "Home" },
  { id: 1, name: "About", icon: <FcAbout />, link: "About" },
  { id: 2, name: "Services", icon: <FaWeightHanging />, link: "Services" },
  { id: 3, name: "Contact", icon: <MdContactPage />, link: "Contact" },
];

const Path = ({ props }: { props?: any }) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

// const useDimensions = (ref: React.Ref<HTMLDivElement>) => {
//   const dimensions = useRef({ width: 0, height: 0 });

//   useEffect(() => {
//     if (ref !== null && typeof ref !== "function") {
//       dimensions.current.width = ref.current.offsetWidth;
//       dimensions.current.height = ref.current.offsetHeight;
//     }
//   }, [ref]);

//   return dimensions.current;
// };

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Navigation = () => (
  <motion.ul
    variants={navVariants}
    className="absolute w-[300px] top-0 bottom-0 right-0"
  >
    {itemIds.map((i) => (
      <MenuItem i={i} key={i.id} />
    ))}
  </motion.ul>
);

const MenuItem = ({ i }: { i: any }) => {
  const style = {
    border: `2px solid ${colors[i.id]}`,
    backgroundColor: colors[i.id],
  };
  return (
    <motion.li
      variants={menuVariants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="relative mb-5 flex items-center cursor-pointer w-full h-full mt-32"
    >
      <div
        className="w-full h-[40px] rounded-xl m-5 flex flex-row items-center justify-center cursor-pointer"
        style={style}
        onClick={() => handleClick(i.link)}
      >
        {i.icon}
        {i.name}
      </div>
    </motion.li>
  );
};

const MenuToggle = ({ toggle }: { toggle: any }) => {
  return (
    <button
      onClick={toggle}
      className=" w-[50px] h-[50px] rounded-2xl z-50 flex flex-row items-center justify-center cursor-pointer absolute right-5"
    >
      <FaHome className="h-full w-full text-white" />
    </button>
  );
};
const handleClick = (link: string) => {
  const element = document.getElementById(link);
  element?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

export function MenuToggled() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpened, toggleOpen] = useCycle(false, true);

  //   useEffect(() => {
  //     const handleClickOutside = (event: MouseEvent) => {
  //       // Specify MouseEvent as the type for event
  //       if (
  //         dropdownRef.current &&
  //         !dropdownRef.current.contains(event.target as Node)
  //       ) {
  //         toggleOpen = false;
  //       }
  //     };

  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, []);

  return (
    <motion.nav
      initial={false}
      animate={isOpened ? "open" : "closed"}
      ref={dropdownRef}
    >
      <motion.div className="relative w-[300px] bg-white">
        <MenuToggle toggle={() => toggleOpen()} />
        <Navigation />
      </motion.div>
    </motion.nav>
  );
}
