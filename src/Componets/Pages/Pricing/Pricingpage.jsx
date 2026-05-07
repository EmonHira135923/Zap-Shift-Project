"use client";
import React from "react";
import { LuCheck, LuZap, LuRocket, LuCrown } from "react-icons/lu";

const Pricingpage = () => {
  const plans = [
    {
      name: "Basic",
      price: "15",
      icon: <LuZap size={24} />,
      features: ["Single Parcel Tracking", "Standard Delivery", "Email Support", "Basic Insurance"],
      highlight: false,
    },
    {
      name: "Business Pro",
      price: "49",
      icon: <LuRocket size={24} />,
      features: ["Unlimited Tracking", "Priority Pickup", "24/7 Live Support", "Full Insurance", "API Access"],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "99",
      icon: <LuCrown size={24} />,
      features: ["Custom Logistics", "Dedicated Manager", "Bulk Discounts", "Global Shipping", "Custom Reports"],
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-20 px-6">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-[#98B42C] font-black uppercase tracking-widest text-sm mb-4">Pricing Plans</h2>
        <h1 className="text-5xl font-black text-[#002B36] tracking-tight">
          Flexible Plans for <span className="text-[#98B42C]">Every Need</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative p-8 rounded-[2.5rem] transition-all duration-300 ${
              plan.highlight 
                ? "bg-[#002B36] text-white scale-105 shadow-2xl shadow-[#002B36]/20" 
                : "bg-white text-gray-800 border border-gray-100 hover:shadow-xl"
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#98B42C] text-[#002B36] px-4 py-1 rounded-full text-xs font-black uppercase">
                Most Popular
              </span>
            )}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${plan.highlight ? "bg-[#98B42C] text-[#002B36]" : "bg-gray-50 text-[#98B42C]"}`}>
              {plan.icon}
            </div>
            <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-black">${plan.price}</span>
              <span className={plan.highlight ? "text-gray-400" : "text-gray-400"}>/month</span>
            </div>
            <ul className="space-y-4 mb-10">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm font-medium">
                  <LuCheck className={plan.highlight ? "text-[#98B42C]" : "text-[#98B42C]"} strokeWidth={3} />
                  {feature}
                </li>
              ))}
            </ul>
            <button className={`w-full py-4 rounded-2xl font-black transition-all active:scale-95 ${plan.highlight ? "bg-[#98B42C] text-[#002B36] hover:bg-[#C6EB71]" : "bg-gray-900 text-white hover:bg-black"}`}>
              Get Started Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricingpage;