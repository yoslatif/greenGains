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


// components/Testimonials.tsx
import React from 'react';
import { Testimonials as ExternalTestimonials } from '../../public/testimonials.json';

export default function Testimonials() {
    return (
        <div className="space-y-4 p-5">
            <h1 className="text-green-500 text-xl font-bold">TESTIMONIALS</h1>
            {ExternalTestimonials.map(testimonial => (
                <blockquote key={testimonial.id} className="text-white">
                    "<span className="text-white">{testimonial.quote}</span>" - <strong className="text-white">{testimonial.name}</strong>
                </blockquote>
            ))}
        </div>
    );
}
