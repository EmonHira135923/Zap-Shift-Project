"use client";
import React from "react";
import { LuTruck, LuShieldCheck, LuGlobe, LuClock, LuSmartphone, LuPackageCheck } from "react-icons/lu";

const Servicepage = () => {
  const services = [
    {
      title: "Express Delivery",
      desc: "Get your parcels delivered within 24 hours inside the city with real-time tracking.",
      icon: <LuTruck size={30} />,
    },
    {
      title: "Secure Packaging",
      desc: "We provide premium bubble wrap and box packaging for fragile items safety.",
      icon: <LuShieldCheck size={30} />,
    },
    {
      title: "Global Shipping",
      desc: "Connect with the world through our international logistics partner network.",
      icon: <LuGlobe size={30} />,
    },
    {
      title: "Real-time Tracking",
      desc: "Monitor your parcel lifecycle from pickup to delivery with GPS accuracy.",
      icon: <LuSmartphone size={30} />,
    },
    {
      title: "Scheduled Pickup",
      desc: "Choose your preferred time and our agent will arrive at your doorstep.",
      icon: <LuClock size={30} />,
    },
    {
      title: "Warehousing",
      desc: "Safe and climate-controlled storage solutions for your business inventory.",
      icon: <LuPackageCheck size={30} />,
    },
  ];

  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block bg-[#C6EB71]/20 text-[#98B42C] px-4 py-1 rounded-full text-xs font-black uppercase mb-4">
            Our Expertise
          </div>
          <h1 className="text-5xl font-black text-[#002B36] tracking-tight mb-6">
            Logistics Solutions <br /> <span className="text-[#98B42C]">Tailored for Success</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">
            We offer a wide range of courier services designed to meet the demands of modern businesses and individuals alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div key={index} className="group p-10 rounded-[3rem] bg-gray-50 border border-transparent hover:border-[#C6EB71] hover:bg-white hover:shadow-2xl hover:shadow-gray-200 transition-all duration-500">
              <div className="w-16 h-16 bg-white shadow-sm text-[#98B42C] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              <h3 className="text-2xl font-black text-[#002B36] mb-4">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                {service.desc}
              </p>
              <div className="mt-8 flex items-center gap-2 text-[#98B42C] font-bold text-sm cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Servicepage;