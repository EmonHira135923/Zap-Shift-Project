import React from "react";
import { LiaTruckSolid, LiaWarehouseSolid } from "react-icons/lia";
import { PiHandCoins, PiBuildings } from "react-icons/pi";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <LiaTruckSolid size={44} />,
      title: "Booking Pick & Drop",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      id: 2,
      icon: <PiHandCoins size={44} />,
      title: "Cash On Delivery",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      id: 3,
      icon: <LiaWarehouseSolid size={44} />,
      title: "Delivery Hub",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      id: 4,
      icon: <PiBuildings size={44} />,
      title: "Booking SME & Corporate",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];

  return (
    <section className="w-full bg-[#f3f4f6] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#002B36] mb-12">
          How it Works
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white rounded-[40px] p-10 flex flex-col items-start shadow-sm border border-gray-50 hover:shadow-md transition-all duration-300 group"
            >
              {/* Icon Container */}
              <div className="mb-6 text-[#002B36] group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#002B36] mb-4 leading-tight">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
