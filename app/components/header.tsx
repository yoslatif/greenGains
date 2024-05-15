"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Specify HTMLDivElement as the type for useRef

  const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Specify MouseEvent as the type for event
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-row items-center justify-between bg-glass backdrop-blur-2xl absolute w-full p-5 z-20">
      <Link href="/" passHref>
        <Image
          src="/logo.png"
          alt="Green Gains Fitness Logo"
          width={70}
          height={70}
        />
      </Link>
      <h1 className="text-3xl font-bold text-center flex-1 neon-text">
        Green Gains
      </h1>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="flex flex-col justify-around w-10 h-10 bg-glass border border-gray-800 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          <div
            className={
              isDropdownVisible
                ? `transform rotate-90 -translate-x-3 translate-y-3 bg-white h-1 w-full transition-all ease-in duration-300`
                : `w-full h-1 bg-white transition-all ease-in duration-300 hover:bg-green hover:w-[120%]`
            }
          ></div>
          <div
            className={
              isDropdownVisible
                ? `transform rotate-90 translate-x-0.5 translate-y-[0.1rem]  bg-white h-1 w-full transition-all ease-in duration-300`
                : `w-full h-1 bg-white transition-all ease-in duration-300 hover:bg-green hover:w-[120%]`
            }
          ></div>
          <div
            className={
              isDropdownVisible
                ? `transform rotate-90 translate-x-3 -translate-y-2 bg-white h-1 w-full transition-all ease-in duration-300`
                : `w-full h-1 bg-white transition-all ease-in duration-300 hover:bg-green hover:w-[120%]`
            }
          ></div>
        </button>
        {isDropdownVisible && (
          <div
            className="w-auto h-auto absolute right-0 mt-2 py-2 bg-glass rounded-lg shadow-xl backdrop-blur-3xl"
            onMouseLeave={() => setDropdownVisible(false)}
          >
            <Link
              href="/"
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
            >
              Contact
            </Link>
            <Link
              href="/services"
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
            >
              Services
            </Link>
            <Link
              href="/appointments"
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
            >
              Book Appointment
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
