// components/Services.tsx
import React from 'react';
import Link from 'next/link';

export default function Services() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
            <Link className="service-card hover:text-green-500 hover:bg-transparent" href={''}>Personal Training</Link>
            <Link className="service-card hover:text-green-500 hover:bg-transparent" href={''}>Online Coaching</Link>
            <Link className="service-card hover:text-green-500 hover:bg-transparent" href={''}>Nutrition Plans</Link>
        </div>
    );
}
