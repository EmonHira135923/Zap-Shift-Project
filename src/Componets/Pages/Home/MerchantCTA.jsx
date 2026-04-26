import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { PiMapPinLineBold } from "react-icons/pi";

const MerchantCTA = () => {
  return (
    <section className="w-full py-12 px-4 bg-[#F3F4F6]">
      <div className="max-w-7xl mx-auto bg-[#003033] rounded-[40px] p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Content Side */}
        <div className="z-10 max-w-xl space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Merchant and Customer Satisfaction <br />
            <span className="text-white/90">is Our First Priority</span>
          </h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            We offer the lowest delivery charge with the highest value, along
            with 100% safety of your product. ZapShift courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-[#C6EB71] text-black px-8 py-3.5 rounded-full font-bold flex items-center gap-2 hover:bg-[#b5da56] transition-all group">
              Become a Merchant
            </button>
            <button className="border border-[#C6EB71] text-[#C6EB71] px-8 py-3.5 rounded-full font-bold hover:bg-[#C6EB71]/10 transition-all">
              Earn with ZapShift Courier
            </button>
          </div>
        </div>

        {/* Illustration Side (Using Icon as placeholder for the line-art) */}
        <div className="relative flex-1 flex justify-center md:justify-end opacity-20 md:opacity-100">
          <PiMapPinLineBold
            size={240}
            className="text-[#C6EB71] animate-pulse"
            strokeWidth={0.5}
          />
          {/* Background decorative waves can be added via CSS or SVG */}
        </div>
      </div>
    </section>
  );
};

export default MerchantCTA;
