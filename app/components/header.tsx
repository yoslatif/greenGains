"use client";
import Image from "next/image";

export default function Header() {
  return (
    <div
      className="flex flex-row p-5 items-center justify-between
     bg-transparent backdrop-blur-2xl absolute w-full h-auto z-20"
    >
      <div>
        <Image src="/logo.jpg" alt="logo" width={70} height={70} />
      </div>
      <div className="group/list absolute w-auto justify-center items-center h-full block md:justify-center md:items-end right-0">
        <h1 className="text-4xl font-bold text-black group-hover/list:text-white group-hover:bg-black rounded-xl justify-end items-end flex m-7">
          Green Gains
        </h1>
        <div className="w-full block h-auto px-5 invisible group-hover/list:visible relative bg-red z-20 mt-10">
          <ul className="justify-start items-end bg-transparent backdrop-blur-2xl w-full flex flex-row md:flex-col md:h-full">
            <li className="text-white font-semibold text-3xl opacity-0 animate-slide-in [--slide-in-delay:500ms] rounded-xl hover:text-black hover:bg-white/30 justify-end items-end p-5 m-3 w-auto flex">
              <h3 className="">
                <a href="/">Home</a>
              </h3>
            </li>
            <li className="text-white font-semibold text-3xl opacity-0 animate-slide-in [--slide-in-delay:700ms] rounded-xl hover:text-black hover:bg-white/30 p-5 m-3">
              About
            </li>
            <li className="text-white font-semibold text-3xl opacity-0 animate-slide-in  [--slide-in-delay:900ms] rounded-xl  hover:text-black hover:bg-white/30 p-5 m-3">
              Contact
            </li>
            <li className="opacity-0 animate-slide-in [--slide-in-delay:1100ms] justify-center items-center flex flex-row-reverse">
              <div className="group/sublist">
                <div className="hover:text-black hover:bg-white/30 rounded-xl p-5 justify-end items-end">
                  <h4 className="text-3xl font-semibold text-white">
                    Services
                  </h4>
                </div>
                <div>
                  <ul className="invisible group-hover/sublist:visible w-auto h-auto">
                    <li className="m-5 p-5 hover:bg-white/50 rounded-xl">
                      <h5 className="text-white font-medium text-xl">
                        Personal Training
                      </h5>
                    </li>
                    <li className="m-5 p-5 hover:bg-white/50 rounded-xl">
                      <h5 className="text-white font-medium text-xl">
                        Online Training
                      </h5>
                    </li>
                    <li className="m-5 p-5 hover:bg-white/50 rounded-xl">
                      <h5 className="text-white font-medium text-xl">
                        Consultation
                      </h5>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li className="text-white font-semibold text-3xl opacity-0 animate-slide-in [--slide-in-delay:1100ms] rounded-xl  hover:text-black hover:bg-white/30 p-5 m-3">
              <a href="/appointments">Book appointment</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
