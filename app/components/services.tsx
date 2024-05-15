import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Services() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const services = [
        {
            id: 1,
            name: "Personal Training",
            description: "Get personalized workouts...",
            imageUrl: "/personal-training.jpg"
        },
        {
            id: 2,
            name: "Online Coaching",
            description: "Tailored coaching regardless...",
            imageUrl: "/armfit.jpg"
        },
        {
            id: 3,
            name: "Nutrition Plans",
            description: "Enjoy healthy, yummy meal plans...",
            imageUrl: "/nutrition-plans.jpg"
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
            {services.map((service, index) => (
                <div 
                    key={service.id}
                    onMouseEnter={() => setExpandedIndex(index)}
                    onMouseLeave={() => setExpandedIndex(null)}
                    className={`relative overflow-hidden transition-all duration-500 ease-in-out transform ${expandedIndex === index ? 'scale-105' : 'scale-100'}`}
                >
                    <Image
                        src={service.imageUrl}
                        alt={service.name}
                        width={500}
                        height={300}
                        className="object-cover w-full h-full"
                    />
                    <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 transition-opacity duration-500 ${expandedIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="text-white text-center">
                            <h2 className="text-xl font-bold mb-2">{service.name}</h2>
                            <p className="mb-4">{service.description}</p>
                            <Link href="/learn-more" passHref className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                                Learn More
                            </Link>
                        </div>
                    </div>
                    <h3 className="absolute bottom-0 left-0 p-4 text-lg font-bold text-white bg-gradient-to-t from-black">{service.name}</h3>
                </div>
            ))}
        </div>
    );
}