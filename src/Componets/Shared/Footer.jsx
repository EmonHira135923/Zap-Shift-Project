"use client";
import React from "react";
import Link from "next/link";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathName = usePathname();
  if (pathName.startsWith("/auth")) return <></>;
  return (
    <footer className="w-full bg-[#f3f4f6] px-4 py-12">
      {/* Black Container */}
      <div className="max-w-7xl mx-auto bg-[#0A0A0A] rounded-[40px] py-16 px-6 flex flex-col items-center text-center">
        {/* Logo Section */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-[#C6EB71] rounded-sm transform -skew-x-12"></div>
          <span className="text-2xl font-bold text-white tracking-tight">
            ZapShift
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm max-w-2xl leading-relaxed mb-8">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        {/* Dashed Divider 1 */}
        <div className="w-full border-t border-dashed border-gray-800 mb-6"></div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-gray-300 mb-6">
          <Link
            href="/services"
            className="hover:text-[#C6EB71] transition-colors"
          >
            Services
          </Link>
          <Link
            href="/coverage"
            className="hover:text-[#C6EB71] transition-colors"
          >
            Coverage
          </Link>
          <Link
            href="/about"
            className="hover:text-[#C6EB71] transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/pricing"
            className="hover:text-[#C6EB71] transition-colors"
          >
            Pricing
          </Link>
          <Link href="/blog" className="hover:text-[#C6EB71] transition-colors">
            Blog
          </Link>
          <Link
            href="/contact"
            className="hover:text-[#C6EB71] transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Dashed Divider 2 */}
        <div className="w-full border-t border-dashed border-gray-800 mb-8"></div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <Link
            href="https://linkedin.com"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0077B5] text-white hover:opacity-80 transition-opacity"
          >
            <FaLinkedinIn size={16} />
          </Link>

          <Link
            href="https://twitter.com"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-200 transition-colors"
          >
            <FaTwitter size={16} />
          </Link>

          <Link
            href="https://facebook.com"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1877F2] text-white hover:opacity-80 transition-opacity"
          >
            <FaFacebookF size={16} />
          </Link>

          <Link
            href="https://youtube.com"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#FF0000] text-white hover:opacity-80 transition-opacity"
          >
            <FaYoutube size={16} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
