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
    <>
      <div className="flex flex-row items-center justify-between bg-glass backdrop-blur-2xl w-screen p-5 z-20 mb-20 fixed shadow-2xl h-auto">
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
        <h1 className="text-3xl font-bold text-center flex-1 text-[#ff8b39]">
          Green Gains
        </h1>
        {/* <div className="flex flex-col w-full place-items-end items-end justify-center right-10 float-right fixed h-full"></div> */}
        <div
          className="flex flex-col w-full place-items-center items-end justify-center right-10 float-right fixed h-full"
          ref={dropdownRef}
        >
          <button
            className={`bg-none hover:text-black text-white font-sans py-2 px-4 rounded-xl cursor-pointer ${
              isOpen
                ? "transform rotate-90 duration-300"
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
    </>
  );
}
