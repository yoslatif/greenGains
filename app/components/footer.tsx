// components/Footer.tsx
import React from 'react';
import { FaInstagram } from 'react-icons/fa'; // For the Instagram icon
import { MdEmail } from 'react-icons/md'; // For the email icon
import { AiOutlineCalendar } from 'react-icons/ai'; // For the calendar icon

const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 w-full bg-glass backdrop-blur-2xl text-white text-center p-2 z-50">
            <div className="flex justify-center items-center space-x-4">
                <a href="https://www.instagram.com/greengainsfitness_/" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
                    <FaInstagram size={20} />
                </a>
                <a href="mailto:yoslatif@gmail.com" className="hover:text-green-500">
                    <MdEmail size={20} />
                </a>
                <a href="https://calendly.com/greengainsfitness" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
                    <AiOutlineCalendar size={20} />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
