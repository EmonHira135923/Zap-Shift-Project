import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const PartnerMarquee = () => {
  const logos = [
    {
      id: 1,
      name: "Casio",
      src: "/casio-image.png",
    },
    {
      id: 2,
      name: "Amazon",
      src: "/amazon-image.png",
    },
    {
      id: 3,
      name: "Moonstar",
      src: "/moonstar-image.png",
    },
    {
      id: 4,
      name: "Star+",
      src: "/starplus-image.png",
    },
    {
      id: 5,
      name: "Startpeople",
      src: "/starpeople-image.png",
    },
    {
      id: 6,
      name: "Randstad",
      src: "/ranstad-image.png",
    },
  ];

  return (
    <section className="w-full bg-[#f3f4f6] py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Heading from your image */}
        <h3 className="text-[#002B36] font-bold text-xl md:text-2xl mb-12">
          We've helped thousands of sales teams
        </h3>

        {/* Marquee Component */}
        <Marquee
          gradient={true}
          gradientColor="#f3f4f6"
          gradientWidth={100}
          speed={40}
          pauseOnHover={true}
        >
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="mx-10 md:mx-16 flex-shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={250}
                height={120}
                className="h-12 md:h-14 w-auto object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default PartnerMarquee;
