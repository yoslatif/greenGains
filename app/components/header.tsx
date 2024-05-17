"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MenuToggle } from "./menu";

export default function Header() {
  const [isOpen, toggleOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Specify HTMLDivElement as the type for useRef
  const toggleDropdown = () => toggleOpen(!isOpen);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Specify MouseEvent as the type for event
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        toggleOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-row items-center justify-between bg-glass backdrop-blur-2xl w-screen p-5 z-20 mb-20 fixed shadow-2xl">
      <Link href="/" passHref>
        <Image
          src="/logo.png"
          alt="Green Gains Fitness Logo"
          width={70}
          height={70}
        />
      </Link>
      <h1 className="text-3xl font-bold text-center flex-1 text-[#ff8b39]">
        Green Gains
      </h1>
      <div
        className="flex flex-col w-1/2 place-items-end items-end justify-end right-10 float-right fixed h-1/2"
        ref={dropdownRef}
      >
        <button
          onClick={toggleDropdown}
          className="flex flex-col justify-around w-10 h-10 bg-glass rounded-lg p-1 fixed"
        >
          <RxHamburgerMenu
            className={
              isOpen
                ? "transition-all transform rotate-90 bg-transparent w-full h-full text-green-300 scale-150"
                : "bg-transparent w-full h-full hover:text-green-300 scale-110"
            }
          />
        </button>
      </div>
      <MenuToggle
        toggle={toggleDropdown}
        isOpen={isOpen}
        dropdownRef={dropdownRef}
      />
    </div>
  );
}
