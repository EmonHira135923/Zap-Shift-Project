"use client";
import React, { useState } from "react";
import { Info, Target, Award, Users } from "lucide-react";

const Aboutpage = () => {
  const [activeTab, setActiveTab] = useState("Story");

  const tabs = [
    { name: "Story", icon: <Info size={18} /> },
    { name: "Mission", icon: <Target size={18} /> },
    { name: "Success", icon: <Award size={18} /> },
    { name: "Team & Others", icon: <Users size={18} /> },
  ];

  const content = {
    Story: {
      title: "Our Story",
      text: "We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.",
    },
    Mission: {
      title: "Our Mission",
      text: "To revolutionize logistics in Bangladesh by providing the most efficient and technologically advanced delivery network. We aim to empower local businesses and individuals with seamless connectivity and absolute transparency in every shipment.",
    },
    Success: {
      title: "Our Success",
      text: "With over thousands of successful deliveries and a growing network of merchants, ZapShift has become synonymous with reliability. We take pride in our 99.9% on-time delivery rate and the trust built with our corporate partners like Casio and Amazon.",
    },
    "Team & Others": {
      title: "Team & Others",
      text: "Our team consists of dedicated logistics experts, tech innovators, and a massive fleet of riders working tirelessly. We are committed to fair employment and providing our riders with the best tools to succeed on the road.",
    },
  };

  return (
    <section className="w-full bg-[#f3f4f6] py-16 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold text-[#002B36]">About Us</h2>
          <p className="text-gray-500 max-w-2xl leading-relaxed">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. 
            From personal packages to business shipments — we deliver on time, every time.
          </p>
          <div className="w-full h-[1px] bg-gray-200 mt-8"></div>
        </div>

        {/* Tab Navigation Section */}
        <div className="flex flex-wrap gap-6 md:gap-12 items-center">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 text-xl md:text-2xl transition-all duration-300 relative pb-2 ${
                activeTab === tab.name
                  ? "text-[#8BAA35] font-bold"
                  : "text-gray-400 font-medium hover:text-gray-600"
              }`}
            >
              {activeTab === tab.name && tab.icon}
              {tab.name}
              {activeTab === tab.name && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8BAA35] animate-in fade-in slide-in-from-left-2"></span>
              )}
            </button>
          ))}
        </div>

        {/* Dynamic Content Area */}
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-6">
            {/* Displaying text multiple times to match your design layout */}
            <p className="text-gray-600 text-lg leading-relaxed">
              {content[activeTab].text}
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              {content[activeTab].text}
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              {content[activeTab].text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutpage;