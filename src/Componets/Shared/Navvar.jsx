import Link from "next/link";
import React from "react";
import Navlink from "./Navlink";
import { ArrowUpRight } from "lucide-react"; // Optional: for the arrow icon

const Navvbar = () => {
  return (
    <div className="w-full bg-[#f3f4f6] py-6 px-4">
      {" "}
      {/* Light gray background for the page */}
      <nav className="flex items-center justify-between px-8 py-3 max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100">
        {/* LEFT: Logo Section */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#C6EB71] rounded-sm transform -skew-x-12"></div>{" "}
          {/* Placeholder for ZapShift logo icon */}
          <Link
            href="/"
            className="text-2xl font-bold text-[#1a1a1a] tracking-tight"
          >
            ZapShift
          </Link>
        </div>

        {/* CENTER: Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-[15px] font-medium">
          <Navlink href="/services">Services</Navlink>
          <Navlink href="/coverage">Coverage</Navlink>
          <Navlink href="/about">About Us</Navlink>
          <Navlink href="/pricing">Pricing</Navlink>
          <Navlink href="/be-a-rider">Be a Rider</Navlink>
        </div>

        {/* RIGHT: Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="px-6 py-2.5 rounded-xl border border-gray-200 font-medium text-gray-700 hover:bg-gray-50 transition-all"
          >
            Sign In
          </Link>

          <Link
            href="/auth/register"
            className="flex items-center gap-2 bg-[#C6EB71] hover:bg-[#b5da56] text-black px-6 py-2.5 rounded-xl font-bold transition-all group"
          >
            Be a rider
            <div className="bg-[#1a1a1a] p-1 rounded-full text-[#C6EB71]">
              <ArrowUpRight size={16} />
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navvbar;
