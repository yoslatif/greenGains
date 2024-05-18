// import React, { useState, useEffect } from 'react';
// import testimonialsData from '../../public/testimonials.json';

// interface Testimonial {
//   id: string;
//   name: string;
//   quote: string;
//   image: string;
// }

// export default function Testimonials() {
//     const [activeTestimonials, setActiveTestimonials] = useState<Testimonial[]>([]);
//     const [fadeStatus, setFadeStatus] = useState<{ [key: string]: boolean }>({});

//     useEffect(() => {
//         const initialTestimonials: Testimonial[] = [];
//         while (initialTestimonials.length < 3) {
//             const randomTestimonial = testimonialsData.Testimonials[Math.floor(Math.random() * testimonialsData.Testimonials.length)];
//             if (!initialTestimonials.find(t => t.id === randomTestimonial.id)) {
//                 initialTestimonials.push(randomTestimonial);
//             }
//         }
//         setActiveTestimonials(initialTestimonials);
//         initialTestimonials.forEach(t => setFadeStatus(prev => ({ ...prev, [t.id]: true })));  // Initially set all to fade in
//     }, []);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             const newTestimonials = [...activeTestimonials];
//             const indexToUpdate = Math.floor(Math.random() * 3);
//             let newTestimonial: Testimonial;

//             do {
//                 newTestimonial = testimonialsData.Testimonials[Math.floor(Math.random() * testimonialsData.Testimonials.length)];
//             } while (activeTestimonials.find(t => t.id === newTestimonial.id));

//             // Fade out the current testimonial
//             setFadeStatus(prev => ({ ...prev, [newTestimonials[indexToUpdate].id]: false }));

//             setTimeout(() => {
//                 newTestimonials[indexToUpdate] = newTestimonial;
//                 setActiveTestimonials(newTestimonials);
//                 // Fade in the new testimonial
//                 setFadeStatus(prev => ({ ...prev, [newTestimonial.id]: true }));
//             }, 500); // Wait for fade out to complete
//         }, 9000);

//         return () => clearInterval(interval);
//     }, [activeTestimonials]);

//     return (
//         <div className="space-y-4 p-5">
//             <h1 className="text-green-500 text-xl font-bold">TESTIMONIALS</h1>
//             {activeTestimonials.map((testimonial) => (
//                 <blockquote key={testimonial.id} className={`transition-opacity duration-500 ${fadeStatus[testimonial.id] ? 'opacity-100' : 'opacity-0'} testimonial-text`}>
//                 &quot;<span>{testimonial.quote}</span>&quot; - <strong>{testimonial.name}</strong>
//             </blockquote>
//             ))}
//         </div>
//     );
// }







import React, { useState, useEffect } from 'react';
import Image from "next/image";
import testimonialsData from '../../public/testimonials.json';

interface Testimonial {
  id: string;
  name: string;
  quote: string;
  image: string;
}

export default function Testimonials() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prevIndex) => 
                prevIndex === testimonialsData.Testimonials.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Change testimonial every 3 seconds
        return () => clearInterval(timer);
    }, []);

    

    const getTestimonialStyle = (testIndex: number) => {
        let style = "transition-transform duration-1000 transform ";
        if (testIndex === index) {
            style += " scale-100 opacity-100 ";
        } else {
            style += " scale-75 opacity-50 ";
        }
        return style;
    };

    return (
        <div className="relative w-full overflow-hidden h-140 flex items-center">
            <div className="flex transition-transform duration-1000" style={{ transform: `translateX(-${index * 100}%)` }}>
                {testimonialsData.Testimonials.map((testimonial, testIndex) => (
                    <div key={testimonial.id} className={getTestimonialStyle(testIndex) + " flex-shrink-0 w-full flex flex-col items-center text-center p-5"}>
                        <div className="relative w-full flex justify-center items-end">
                            <Image src={testimonial.image} alt={testimonial.name} width={500} height={500} className="rounded-lg object-cover" />
                            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"></div>
                        </div>
                        <blockquote className="text-white mt-[-20px] z-10">
                            &ldquo;{testimonial.quote}&rdquo; - <strong>{testimonial.name}</strong>
                        </blockquote>
                    </div>
                ))}
            </div>
        </div>
    );
}
