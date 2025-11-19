import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../assets/banner/banner1.png";
import banner2 from "../../assets/banner/banner2.png";
import banner3 from "../../assets/banner/banner3.png";
import { Carousel } from "react-responsive-carousel";
import { NavLink } from "react-router";

const Hero = () => {
  const slides = [
    {
      image: banner1,
      title: "Fast & Reliable Parcel Delivery",
      description:
        "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.",
      primaryBtn: "Track Your Parcel",
      secondaryBtn: "Sign Up",
    },
    {
      image: banner2,
      title: "Nationwide Coverage",
      description:
        "We deliver across the country with our extensive network of delivery partners and hubs.",
      primaryBtn: "Learn More",
      secondaryBtn: "Get Quote",
    },
    {
      image: banner3,
      title: "Secure & Insured Deliveries",
      description:
        "Your packages are protected with our comprehensive insurance and security measures.",
      primaryBtn: "View Services",
      secondaryBtn: "Contact Us",
    },
  ];

  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={5000}
        showThumbs={false}
        showStatus={false}
        stopOnHover={false}
        className="rounded-xl overflow-hidden shadow-lg"
      >
        {slides.map((slide, index) => (
          <div key={index} className="bg-white">
            {/* Image Section */}
            <div className="relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-[50vh] md:h-[60vh] object-cover"
              />
            </div>

            {/* Text Content Below Image */}
            <div className="container mx-auto px-6 py-8">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                  {slide.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <NavLink
                    to="/track"
                    className="btn px-8 py-4 font-bold text-lg rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
                  >
                    {slide.primaryBtn}
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="btn px-8 py-4 font-bold text-lg rounded-full bg-gray-800 text-white hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 text-center"
                  >
                    {slide.secondaryBtn}
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;
