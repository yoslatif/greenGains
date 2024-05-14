// // components/Testimonials.tsx
// import React from 'react';
// import Link from 'next/link';
// import { Testimonials as ExternalTestimonials } from '../../public/testimonials.json';

// export default function Testimonials() {
//     // const testimonials = [{ name: "John Doe", text: "Great experience!" }, { name: "Jane Doe", text: "Loved the personalized service!" }];
//     return (
//         <div className="space-y-4 p-5">
//             <h1>TESTIMONIALS</h1>
//             {ExternalTestimonials.map(ExternalTestimonials => (
//                 <blockquote key={ExternalTestimonials.id}>
//                     "{ExternalTestimonials.quote}" - <strong>{ExternalTestimonials.name}</strong>
//                 </blockquote>
//             ))}
//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import { Testimonials as ExternalTestimonials } from '../../public/testimonials.json';

interface Testimonial {
  id: string;
  name: string;
  quote: string;
  image: string;
}

export default function Testimonials() {
    const [activeTestimonials, setActiveTestimonials] = useState<Testimonial[]>([]);
    const [fadeStatus, setFadeStatus] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const initialTestimonials: Testimonial[] = [];
        while (initialTestimonials.length < 3) {
            const randomTestimonial = ExternalTestimonials[Math.floor(Math.random() * ExternalTestimonials.length)];
            if (!initialTestimonials.find(t => t.id === randomTestimonial.id)) {
                initialTestimonials.push(randomTestimonial);
            }
        }
        setActiveTestimonials(initialTestimonials);
        initialTestimonials.forEach(t => setFadeStatus(prev => ({ ...prev, [t.id]: true })));  // Initially set all to fade in
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const newTestimonials = [...activeTestimonials];
            const indexToUpdate = Math.floor(Math.random() * 3);
            let newTestimonial: Testimonial;

            do {
                newTestimonial = ExternalTestimonials[Math.floor(Math.random() * ExternalTestimonials.length)];
            } while (activeTestimonials.find(t => t.id === newTestimonial.id));

            // Fade out the current testimonial
            setFadeStatus(prev => ({ ...prev, [newTestimonials[indexToUpdate].id]: false }));

            setTimeout(() => {
                newTestimonials[indexToUpdate] = newTestimonial;
                setActiveTestimonials(newTestimonials);
                // Fade in the new testimonial
                setFadeStatus(prev => ({ ...prev, [newTestimonial.id]: true }));
            }, 500); // Wait for fade out to complete
        }, 9000);

        return () => clearInterval(interval);
    }, [activeTestimonials]);

    return (
        <div className="space-y-4 p-5">
            <h1 className="text-green-500 text-xl font-bold">TESTIMONIALS</h1>
            {activeTestimonials.map((testimonial) => (
                <blockquote key={testimonial.id} className={`transition-opacity duration-500 ${fadeStatus[testimonial.id] ? 'opacity-100' : 'opacity-0'}`}>
                    "<span className="text-white">{testimonial.quote}</span>" - <strong className="text-white">{testimonial.name}</strong>
                </blockquote>
            ))}
        </div>
    );
}
