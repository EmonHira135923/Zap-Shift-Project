import React from "react";
import Image from "next/image";

const LoadingPage = () => {
  return (
    // Main Container: Full screen, Light background
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F9FAFB] text-[#1A1A1A] antialiased">
      <div className="flex flex-col items-center gap-6 px-4">
        {/* LOGO & PULSE EFFECT */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          {/* Pulse Layer 1 (Outer) - Light Lime */}
          <div className="absolute h-full w-full animate-ping rounded-full bg-[#C6EB71]/30 duration-1000"></div>
          {/* Pulse Layer 2 (Inner) - Slightly Darker Lime */}
          <div className="absolute h-3/4 w-3/4 animate-ping rounded-full bg-[#C6EB71]/50 duration-700"></div>

          {/* Actual Logo Image Container */}
          <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-3 shadow-xl shadow-lime-100 border border-gray-100">
            <Image
              src="/loading.png"
              alt="ZapShift Loading"
              width={80}
              height={80}
              className="h-auto w-full object-contain"
              priority
            />
          </div>
        </div>

        {/* Brand Text */}
        <div className="text-center">
          <h1 className="font-bold text-4xl tracking-tighter text-[#1A1A1A]">
            Zap<span className="text-[#C6EB71] drop-shadow-sm">Shift</span>
          </h1>
          <p className="mt-2 font-medium text-gray-500 text-xs uppercase tracking-[0.2em]">
            Courier & Logistics
          </p>
        </div>

        {/* LOADING STATUS & PROGRESS BAR */}
        <div className="mt-8 flex w-full max-w-xs flex-col items-center gap-4">
          {/* Fading text loader */}
          <span className="animate-pulse font-semibold text-gray-600 text-sm tracking-tight">
            Preparing your parcel...
          </span>

          {/* Progress Bar Container */}
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 border border-gray-100 shadow-inner">
            {/* The actual progress bar using the lime green color */}
            <div className="h-full rounded-full bg-[#C6EB71] animate-loadingProgress shadow-[0_0_10px_rgba(198,235,113,0.5)]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
