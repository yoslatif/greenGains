"use client";
import Image from "next/image";
import Link from "next/link";
import { MenuToggled } from "./menu";
export default function Header() {
  return (
    <>
      <div className="flex flex-row items-center justify-between bg-glass backdrop-blur-2xl w-screen p-5 z-20 mb-20 fixed shadow-2xl h-auto">
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
        {/* <div className="flex flex-col w-full place-items-end items-end justify-center right-10 float-right fixed h-full"></div> */}

        <div className="w-auto h-full right-0 flex flex-row z-20 items-center justify-center">
          <MenuToggled />
        </div>
      </div>
    </>
  );
}
