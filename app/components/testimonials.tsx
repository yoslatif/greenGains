// components/Testimonials.tsx
export default function Testimonials() {
    const testimonials = [{ name: "John Doe", text: "Great experience!" }, { name: "Jane Doe", text: "Loved the personalized service!" }];
    return (
        <div className="space-y-4 p-5">
            {testimonials.map(testimonial => (
                <blockquote key={testimonial.name}>
                    "{testimonial.text}" - <strong>{testimonial.name}</strong>
                </blockquote>
            ))}
        </div>
    );
}
