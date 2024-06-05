// components/Footer.tsx
import { AiOutlineCalendar } from "react-icons/ai"; // For the calendar icon
import { FaInstagram } from "react-icons/fa"; // For the Instagram icon
import { MdEmail } from "react-icons/md"; // For the email icon

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-transparent border-zinc-700 backdrop-blur-2xl rounded-t-lg text-white text-center p-1 z-50">
      <div className="flex justify-center items-center space-x-4">
        <a
          href="https://www.instagram.com/greengainsfitness_/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="hover:text-green-500 hover:scale-150 hover:transition-all hover:duration-300 hover:ease-in-out h-14 w-14" />
        </a>
        <a href="mailto:greengainsfitness28@gmail.com">
          <MdEmail className="hover:text-green-500 hover:scale-150 hover:transition-all hover:duration-300 hover:ease-in-out h-14 w-14" />
        </a>
        <a
          href="https://calendly.com/greengainsfitness"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiOutlineCalendar className="hover:text-green-500 hover:scale-150 hover:transition-all hover:duration-300 hover:ease-in-out h-14 w-14" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
