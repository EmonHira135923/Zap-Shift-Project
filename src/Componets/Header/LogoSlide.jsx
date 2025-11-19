import React from "react";
import logo from "../../assets/brands/amazon_vector.png";
import logo1 from "../../assets/brands/amazon.png";
import logo2 from "../../assets/brands/casio.png";
import logo3 from "../../assets/brands/moonstar.png";
import logo4 from "../../assets/brands/randstad.png";
import logo5 from "../../assets/brands/star.png";
import logo6 from "../../assets/brands/start_people.png";
import Marquee from "react-fast-marquee";

const LogoSlider = [logo, logo1, logo2, logo3, logo4, logo5, logo6];

const LogoSlide = () => {
  return (
    <div className="py-14 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Header Section */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 leading-snug">
          Trusted by Top Global Brands
        </h2>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          We’ve partnered with companies across multiple industries
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative max-w-7xl mx-auto px-2 sm:px-6">
        {/* Left Gradient Overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-gray-50 to-transparent z-20 pointer-events-none" />

        {/* Right Gradient Overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-gray-50 to-transparent z-20 pointer-events-none" />

        <Marquee speed={60} gradient={false} pauseOnHover={false}>
          {LogoSlider.map((item, index) => (
            <div
              key={index}
              className="
                flex items-center justify-center 
                h-16 sm:h-20 
                w-28 sm:w-36 
                mx-4 sm:mx-6 
                bg-white/80 
                backdrop-blur-md 
                rounded-xl sm:rounded-2xl 
                shadow-md 
                hover:shadow-xl 
                transition-all duration-300 
                border border-gray-200
                p-3 sm:p-4
              "
            >
              <img
                src={item}
                alt={`logo-${index}`}
                className="
                  max-h-full 
                  max-w-full 
                  object-contain 
                  grayscale 
                  opacity-70 
                  hover:grayscale-0 
                  hover:opacity-100 
                  transition-all duration-300
                "
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default LogoSlide;
