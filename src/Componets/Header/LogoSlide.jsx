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
    <div className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Header Section */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          We've helped thousands of sales teams
        </h2>
      </div>

      {/* Slider Container */}
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Left Gradient Overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />

        {/* Right Gradient Overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        <Marquee speed={80} gradient={true} pauseOnHover={false}>
          {LogoSlider.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-20 w-44 mx-6 bg-white rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl p-4"
            >
              <img
                src={item}
                alt={`logo-${index}`}
                className="max-h-full max-w-full filter grayscale-[30%] opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default LogoSlide;
