"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { MenuToggled } from "./menu";
export default function Header() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prevOpen) => !prevOpen);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Specify MouseEvent as the type for event
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex flex-row items-center justify-between bg-peachGlass border-2 border-glassPeachBorder backdrop-blur-2xl w-full p-2 z-20 mb-20 fixed shadow-2xl h-auto rounded-b-lg">
      <div className="items-center justify-center flex  basis-[100%] max-md:basis-[50%]">
        <Image
          src="/logo.png"
          alt="Green Gains Fitness Logo"
          width={70}
          height={70}
          className="rounded-full cursor-pointer"
          onClick={() => {
            const element = document.getElementById("Home");
            element?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        />
        <h1 className="flex-1 text-[green] relative top-0 w-fit h-auto py-5 justify-center flex bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-4xl font-semibold text-transparent text-center select-auto">
        {/* add and remove "font-extrabold" and see which one you like more */}
          Green Gains
        </h1>
      </div>
      {/* <div className="flex flex-col w-full place-items-end items-end justify-center right-10 float-right fixed h-full"></div> */}
      <div
        className="flex flex-col w-auto place-items-center items-end justify-center right-10 float-right fixed h-full basis-[100%]"
        ref={dropdownRef}
      >
        <button
          className={`bg-none hover:text-green-500 text-white font-sans py-2 px-4 rounded-xl cursor-pointer ${
            isOpen
              ? "transform rotate-180 duration-500"
              : "transform rotate-0 duration-300"
          } `}
          onClick={() => {
            toggle();
            console.log(
              "Menu button clicked, isOpen is now: " + isOpen.toString()
            );
          }}
        >
          <IoMdMenu className="h-[50px] w-[50px]" />
        </button>
      </div>
      <MenuToggled
        dropdownRef={dropdownRef}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toggle={toggle}
      />
    </div>
  );
}
