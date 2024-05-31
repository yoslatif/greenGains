"use client";
import { motion } from "framer-motion";
import React from "react";
import { FaHome } from "react-icons/fa";
import { FaWeightHanging } from "react-icons/fa6";
import { FcAbout } from "react-icons/fc";
import { IoFitnessSharp } from "react-icons/io5";
import { MdContactPage } from "react-icons/md";

const menuVariants = {
  open: {
    y: 1,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
    zIndex: 30,
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
    zIndex: -30,
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
  { id: 1, name: "About", icon: <IoFitnessSharp />, link: "About" },
  { id: 2, name: "Services", icon: <FaWeightHanging />, link: "Services" },
  { id: 3, name: "Contact", icon: <MdContactPage />, link: "Contact" },
];

const sidebar = {
  open: {
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  },
  closed: {
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Navigation = ({ toggle }: { toggle: any }) => (
  <motion.ul
    variants={navVariants}
    className={"absolute w-[300px] top-0 bottom-0 right-0 bg-white text-white"}
  >
    {itemIds.map((i) => (
      <MenuItem i={i} key={i.id} toggle={toggle} />
    ))}
  </motion.ul>
);

const MenuItem = ({ i, toggle }: { i: any; toggle: any }) => {
  const style = {
    border: `2px solid ${colors[i.id]}`,
    backgroundColor: colors[i.id],
  };
  return (
    <motion.li
      variants={menuVariants}
      whileHover={{ scale: 1.5 }}
      whileTap={{ scale: 0.95 }}
      className={
        toggle
          ? "relative mb-5 flex items-center cursor-pointer w-full h-full mt-20 -z-60 -mx-10"
          : "relative mb-5 flex items-center cursor-pointer w-full h-full mt-20 z-30"
      }
    >
      <div
        className="w-full h-[50px] rounded-xl m-5 flex flex-row items-center justify-around cursor-pointer text-2xl"
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
      className="w-12 h-12 rounded-2xl z-50 block items-center justify-center cursor-pointer absolute right-5"
    >
      {/* <FaHome className="h-full w-full text-white" /> */}
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

export function MenuToggled({
  dropdownRef,
  isOpen,
  setIsOpen,
  toggle,
}: {
  dropdownRef: React.ForwardedRef<HTMLDivElement>;
  isOpen: any;
  setIsOpen: any;
  toggle: any;
}) {
  //   const dropdownRef = useRef<HTMLDivElement>(null);
  //   const [isOpen, setIsOpen] = useState(false);
  //   const toggle = () => setIsOpen((prevOpen) => !prevOpen);

  //   useEffect(() => {
  //     const handleClickOutside = (event: MouseEvent) => {
  //       // Specify MouseEvent as the type for event
  //       if (
  //         dropdownRef.current &&
  //         !dropdownRef.current.contains(event.target as Node)
  //       ) {
  //         setIsOpen(false);
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
      animate={isOpen ? "open" : "closed"}
      ref={dropdownRef}
      variants={sidebar}
      className={isOpen ? "relative top-0 bottom-0 right-0 bg-white" : "hidden"}
    >
      <motion.div className="relative w-auto h-full">
        <Navigation toggle={toggle} />
      </motion.div>
    </motion.nav>
  );
}
