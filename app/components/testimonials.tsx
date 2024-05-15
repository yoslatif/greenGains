import React, { useState, useEffect } from 'react';
import testimonialsData from '../../public/testimonials.json';

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
            const randomTestimonial = testimonialsData.Testimonials[Math.floor(Math.random() * testimonialsData.Testimonials.length)];
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
                newTestimonial = testimonialsData.Testimonials[Math.floor(Math.random() * testimonialsData.Testimonials.length)];
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
                <blockquote key={testimonial.id} className={`transition-opacity duration-500 ${fadeStatus[testimonial.id] ? 'opacity-100' : 'opacity-0'} testimonial-text`}>
                &quot;<span>{testimonial.quote}</span>&quot; - <strong>{testimonial.name}</strong>
            </blockquote>
            ))}
        </div>
    );
}
