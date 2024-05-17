"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { FaWeightHanging } from "react-icons/fa6";
import { FcAbout } from "react-icons/fc";
import { MdContactPage } from "react-icons/md";

const menuVariants = {
  open: {
    y: 0,
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
  { id: 0, name: "Home", icon: <FaHome />, link: "/" },
  { id: 1, name: "About", icon: <FcAbout />, link: "/#About" },
  { id: 2, name: "Services", icon: <FaWeightHanging />, link: "/#Services" },
  { id: 3, name: "Contact", icon: <MdContactPage />, link: "/#Contact" },
];

const Path = ({ props }: { props: any }) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

// const MenuToggle = ({ toggle }) => (
//   <button onClick={toggle}>
//     <svg width="23" height="23" viewBox="0 0 23 23">
//       <Path
//         variants={{
//           closed: { d: "M 2 2.5 L 20 2.5" },
//           open: { d: "M 3 16.5 L 17 2.5" },
//         }}
//       />
//       <Path
//         d="M 2 9.423 L 20 9.423"
//         variants={{
//           closed: { opacity: 1 },
//           open: { opacity: 0 },
//         }}
//         transition={{ duration: 0.1 }}
//       />
//       <Path
//         variants={{
//           closed: { d: "M 2 16.346 L 20 16.346" },
//           open: { d: "M 3 2.5 L 17 16.346" },
//         }}
//       />
//     </svg>
//   </button>
// );

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

export function MenuToggle({
  toggle,
  isOpen,
  dropdownRef,
}: {
  toggle: any;
  isOpen: any;
  dropdownRef: any;
}) {
  const router = useRouter();
  const handleClick = (link: string) => {
    router.push(`/${link}`);
  };

  const MenuItem = ({ index }: { index: any }) => {
    const style = {
      border: `2px solid ${colors[index.id]}`,
      backgroundColor: colors[index.id],
    };
    return (
      <motion.li
        variants={menuVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-[40px] h-[40px] rounded-md flex" style={style}>
          <span className="m-auto text-white w-full h-full p-2">
            {index.icon}
          </span>
        </div>
        <div
          className="rounded-md w-[200px] h-auto flex-1 m-5"
          style={style}
          onClick={() => handleClick(index.link)}
        >
          <h1 className="text-3xl text-white">{index.name}</h1>
        </div>
      </motion.li>
    );
  };
  return (
    <motion.nav
      className="w-[300px] h-full bg-red absolute flex flex-col justify-start top-40 right-0 p-5 z-20"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      ref={dropdownRef}
      variants={sidebar}
    >
      <motion.ul
        variants={navVariants}
        className="flex flex-col h-full w-full"
        onMouseLeave={() => toggle(false)}
      >
        {itemIds.map((index: any) => (
          <MenuItem key={index} index={index} />
        ))}
      </motion.ul>
    </motion.nav>
  );
}
