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
      primaryBtn: "Track Your Parcel",
      secondaryBtn: "Sign Up",
    },
    {
      image: banner3,
      title: "Secure & Insured Deliveries",
      description:
        "Your packages are protected with our comprehensive insurance and security measures.",
      primaryBtn: "Track Your Parcel",
      secondaryBtn: "Sign Up",
    },
  ];

  return (
    <div className="rounded-xl overflow-hidden shadow-lg">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={4500}
        showThumbs={false}
        showStatus={false}
        stopOnHover={false}
        swipeable={true}
        emulateTouch={true}
      >
        {slides.map((slide, index) => (
          <div key={index} className="bg-white">
            {/* IMAGE ONLY (NO OVERLAY) */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[50vh] md:h-[65vh] object-cover"
            />

            {/* TEXT BELOW IMAGE */}
            <div className="container mx-auto px-6 py-10">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                  {slide.title}
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                  {slide.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <NavLink
                    to="/track"
                    className="px-8 py-4 rounded-full bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-md"
                  >
                    {slide.primaryBtn}
                  </NavLink>

                  <NavLink
                    to="/signup"
                    className="px-8 py-4 rounded-full bg-gray-900 text-white text-lg font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-md"
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
