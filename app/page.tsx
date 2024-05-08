"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [hidden, setHidden] = useState(true);
  return (
    <div className="bg-background-gym w-screen h-dvh bg-fixed bg-center">
      <div className="flex flex-row p-5 items-center justify-between bg-transparent backdrop-blur-2xl">
        <Image src="/logo.jpg" alt="logo" width={70} height={70} />
        <div
          onMouseEnter={() => {
            hidden ? setHidden(false) : setHidden(true);
          }}
        >
          <h1 className="text-4xl font-bold text-white">Green Gains</h1>
        </div>
      </div>
      {hidden ? null : (
        <div
          className="right-0 w-auto items-center justify-end absolute h-1/2 px-5 py-10 bg-transparent backdrop-blur-2xl"
          onMouseLeave={() => {
            setHidden(true);
          }}
        >
          <ul className="group-hover:block">
            <li className="text-white font-semibold text-3xl py-5">Home</li>
            <li className="text-white font-semibold text-3xl py-5">About</li>
            <li className="text-white font-semibold text-3xl py-5">Contact</li>
            <li className="text-white font-semibold text-3xl py-5">
              <a href="/appointments">Book appointment</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
