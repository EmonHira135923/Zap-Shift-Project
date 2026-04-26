"use client";
import Link from "next/link";
import React, { useState } from "react";
import Navlink from "./Navlink";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi"; // Using Fi for consistency

const Navvbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Coverage", href: "/coverage" },
    { name: "About Us", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "Be a Rider", href: "/be-a-rider" },
  ];

  return (
    <div className="w-full bg-[#f3f4f6] py-4 md:py-6 px-4 sticky top-0 z-50">
      <nav className="flex items-center justify-between px-6 md:px-8 py-3 max-w-7xl mx-auto bg-white rounded-2xl md:rounded-[20px] shadow-sm border border-gray-100 relative">
        {/* LEFT: Logo Section */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#C6EB71] rounded-sm transform -skew-x-12"></div>
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold text-[#002B36] tracking-tight"
          >
            ZapShift
          </Link>
        </div>

        {/* CENTER: Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 text-[15px] font-medium">
          {navLinks.map((link) => (
            <Navlink key={link.name} href={link.href}>
              {link.name}
            </Navlink>
          ))}
        </div>

        {/* RIGHT: Desktop Auth Buttons & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* Desktop Only Buttons */}
          <div className="hidden md:flex items-center gap-3">
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
                <FiArrowUpRight size={16} />
              </div>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-[#002B36] hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* MOBILE: Dropdown Menu */}
        <div
          className={`
          absolute top-full left-0 right-0 mt-2 p-6 bg-white rounded-2xl shadow-xl border border-gray-100 lg:hidden transition-all duration-300 origin-top
          ${isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}
        `}
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-semibold text-[#002B36] hover:text-[#C6EB71] transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Auth Buttons (Visible only on small screens) */}
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100 md:hidden">
              <Link
                href="/auth/login"
                className="w-full text-center px-6 py-3 rounded-xl border border-gray-200 font-bold text-gray-700"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="w-full flex items-center justify-center gap-2 bg-[#C6EB71] text-black px-6 py-3 rounded-xl font-bold"
              >
                Be a rider
                <FiArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navvbar;
