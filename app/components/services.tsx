import Image from "next/image";
import Link from "next/link";

export default function Services() {
  const services = [
    {
      id: 1,
      name: "Personal Training",
      description: "Get personalized workouts...",
      imageUrl: "/personal-training.jpg",
    },
    {
      id: 2,
      name: "Online Coaching",
      description: "Tailored coaching regardless...",
      imageUrl: "/coaching.jpg",
    },
    {
      id: 3,
      name: "Nutrition Plans",
      description: "Enjoy healthy, yummy meal plans...",
      imageUrl: "/nutrition-plans.jpg",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
      {services.map((service, index) => (
        <div
          key={service.id}
          className={
            "relative overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105 rounded-xl"
          }
        >
          <Image
            src={service.imageUrl}
            alt={service.name}
            width={500}
            height={300}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 opacity-0 hover:transition-opacity hover:duration-500 hover:opacity-100">
            <div className="text-white text-center">
              <h2 className="text-xl font-bold mb-2">{service.name}</h2>
              <p className="mb-4">{service.description}</p>
              <Link
                href="/learn-more"
                passHref
                className="bg-green-500 hover:bg-green-600 text-white font-sans py-2 px-4 rounded"
              >
                Learn More
              </Link>
            </div>
          </div>
          <h3 className="absolute flex flex-col  justify-center items-center p-4 text-lg font-bold text-white z-10">
            {service.name}
          </h3>
        </div>
      ))}
    </div>
  );
}
