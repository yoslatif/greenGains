// "use client";
// import Image from "next/image";
// import { useState } from 'react';

// export default function Header() {
//   const [isDropdownVisible, setDropdownVisible] = useState(false);

//   const toggleDropdown = () => {
//     setDropdownVisible(!isDropdownVisible);
//   }; // Function to toggle the dropdown UNFINISHED


//   return (
//     <div
//       className="flex flex-row p-5 items-center justify-between
//      bg-transparent backdrop-blur-2xl absolute w-full h-auto z-20"
//     >
//       <a href="/">
//     <Image src="/logo.png" alt="Green Gains Fitness Logo" width={70} height={70} />
//   </a>
//       <div className="group/list absolute w-auto justify-center items-center h-full block md:justify-center md:items-end right-0">
//         <h1 className="text-4xl font-bold text-black group-hover/list:text-white group-hover:bg-black rounded-xl justify-end items-end flex m-7 cursor-pointer">
//           Green Gains
//         </h1>
//         <div className="w-full block h-auto px-5 invisible group-hover/list:visible relative bg-red z-20 mt-10 cursor-pointer">
//           <ul className="justify-start items-end bg-transparent backdrop-blur-2xl w-full flex flex-row md:flex-col md:h-full cursor-pointer">
//             <li className="text-white font-semibold text-3xl opacity-0 animate-slide-in [--slide-in-delay:500ms] rounded-xl hover:text-black hover:bg-white/30 justify-end items-end p-5 m-3 w-auto flex cursor-pointer">
//               <h3 className="">
//                 <a href="/">Home</a>
//               </h3>
//             </li>
//             <li className="text-white font-semibold text-3xl opacity-0 animate-slide-in [--slide-in-delay:700ms] rounded-xl hover:text-black hover:bg-white/30 p-5 m-3 cursor-pointer">
//               About
//             </li>
//             <li className="text-white font-semibold text-3xl opacity-0 animate-slide-in  [--slide-in-delay:900ms] rounded-xl  hover:text-black hover:bg-white/30 p-5 m-3 cursor-pointer">
//               Contact
//             </li>
//             <li className="opacity-0 animate-slide-in [--slide-in-delay:1100ms] justify-center items-center flex flex-row-reverse">
//               <div className="group/sublist">
//                 <div className="hover:text-black hover:bg-white/30 rounded-xl p-5 justify-end items-end cursor-pointer">
//                   <h4 className="text-3xl font-semibold text-white">
//                     Services
//                   </h4>
//                 </div>
//                 <div>
//                   <ul className="invisible group-hover/sublist:visible w-auto h-auto">
//                     <li className="m-5 p-5 hover:bg-white/50 rounded-xl">
//                       <h5 className="text-white font-medium text-xl cursor-pointer">
//                         Personal Training
//                       </h5>
//                     </li>
//                     <li className="m-5 p-5 hover:bg-white/50 rounded-xl cursor-pointer">
//                       <h5 className="text-white font-medium text-xl">
//                         Online Training
//                       </h5>
//                     </li>
//                     <li className="m-5 p-5 hover:bg-white/50 rounded-xl cursor-pointer">
//                       <h5 className="text-white font-medium text-xl">
//                         Consultation
//                       </h5>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </li>
//             <li className="text-white font-semibold text-3xl opacity-0 animate-slide-in [--slide-in-delay:1100ms] rounded-xl  hover:text-black hover:bg-white/30 p-5 m-3">
//               <a href="/appointments">Book appointment</a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }


// header.tsx
// header.tsx
"use client";
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);

    return (
        <div className="flex flex-row items-center justify-between bg-transparent backdrop-blur-2xl absolute w-full p-5 z-20">
            <Link href="/" passHref>
                <Image src="/logo.png" alt="Green Gains Fitness Logo" width={70} height={70} />
            </Link>
            <div className="relative">
                <button onClick={toggleDropdown} className="text-4xl font-bold text-white bg-transparent hover:text-white hover:bg-lime-600 rounded-xl p-7">
                    Green Gains
                </button>
                {isDropdownVisible && (
                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
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
