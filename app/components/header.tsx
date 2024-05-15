"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);  // Specify HTMLDivElement as the type for useRef

    const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {  // Specify MouseEvent as the type for event
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex flex-row items-center justify-between bg-transparent backdrop-blur-2xl absolute w-full p-5 z-20">
            <Link href="/" passHref>
                <Image src="/logo.png" alt="Green Gains Fitness Logo" width={70} height={70} />
            </Link>
            <h1 className="text-3xl font-bold text-center flex-1 neon-text">Green Gains</h1>
            <div className="relative" ref={dropdownRef}>
                <button onClick={toggleDropdown} className="hamburger">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </button>
                {isDropdownVisible && (
                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl"
                         onMouseLeave={() => setDropdownVisible(false)}>
                        <Link href="/" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">Home</Link>
                        <Link href="/about" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">About</Link>
                        <Link href="/contact" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">Contact</Link>
                        <Link href="/services" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">Services</Link>
                        <Link href="/appointments" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">Book Appointment</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
