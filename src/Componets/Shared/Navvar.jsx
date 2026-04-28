"use client";
import Link from "next/link";
import React, { useState } from "react";
import Navlink from "./Navlink";
import { FiArrowUpRight, FiMenu, FiX, FiLogOut, FiUser, FiGrid } from "react-icons/fi";
import useAuth from "../utils/Hooks/useAuth";
import { NavSkeleton } from "../Skeltons/NavSkeleton";

const Navvbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // প্রোফাইল ড্রপডাউনের জন্য
  const { user, logout,loading } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  if(loading){
    return <NavSkeleton/>
  }

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Coverage", href: "/coverage" },
    { name: "About Us", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "Be A Rider", href: "/be-a-rider" },
  ];

  return (
    <div className="w-full bg-[#f3f4f6] py-4 md:py-6 px-4 sticky top-0 z-50">
      <nav className="flex items-center justify-between px-6 md:px-8 py-3 max-w-7xl mx-auto bg-white rounded-2xl md:rounded-[20px] shadow-sm border border-gray-100 relative">
        
        {/* LEFT: Logo Section */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#C6EB71] rounded-sm transform -skew-x-12"></div>
          <Link href="/" className="text-xl md:text-2xl font-bold text-[#002B36] tracking-tight">
            ZapShift
          </Link>
        </div>

        {/* CENTER: Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 text-[15px] font-medium">
          {navLinks.map((link) => (
            <Navlink key={link.name} href={link.href}>{link.name}</Navlink>
          ))}
        </div>

        {/* RIGHT: Auth & Profile */}
        <div className="flex items-center gap-3">
          {user ? (
            /* ইউজার লগইন থাকলে ইমেজ এবং ড্রপডাউন */
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 rounded-full border-2 border-[#C6EB71] overflow-hidden hover:shadow-md transition-all"
              >
                <img 
                  src={user?.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </button>

              {/* Profile Dropdown Modal */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 py-2 z-[70] origin-top-right animate-in fade-in zoom-in duration-200">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <p className="text-xs text-gray-400 font-medium uppercase">Welcome</p>
                    <p className="text-sm font-bold text-[#002B36] truncate">{user?.name}</p>
                  </div>
                  
                  <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-[#f3f4f6] transition-colors">
                    <FiGrid size={16} /> Dashboard
                  </Link>
                  <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-[#f3f4f6] transition-colors">
                    <FiUser size={16} /> Profile
                  </Link>
                  
                  <button 
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors border-t border-gray-50 mt-1"
                  >
                    <FiLogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* ইউজার লগইন না থাকলে বাটনসমূহ */
            <div className="hidden md:flex items-center gap-3">
              <Link href="/auth/login" className="px-6 py-2.5 rounded-xl border border-gray-200 font-medium text-gray-700 hover:bg-gray-50 transition-all">
                Sign In
              </Link>
              <Link href="/auth/register" className="flex items-center gap-2 bg-[#C6EB71] hover:bg-[#b5da56] text-black px-6 py-2.5 rounded-xl font-bold transition-all group">
                Be a rider
                <div className="bg-[#1a1a1a] p-1 rounded-full text-[#C6EB71]">
                  <FiArrowUpRight size={16} />
                </div>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMenu} className="lg:hidden p-2 text-[#002B36] hover:bg-gray-100 rounded-lg">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div className={`absolute top-full left-0 right-0 mt-2 p-6 bg-white rounded-2xl shadow-xl lg:hidden transition-all duration-300 origin-top z-[60] ${isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}`}>
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-lg font-semibold text-[#002B36] hover:text-[#C6EB71]">
                {link.name}
              </Link>
            ))}
            {!user && (
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-100 md:hidden">
                <Link href="/auth/login" className="w-full text-center px-6 py-3 rounded-xl border border-gray-200 font-bold text-gray-700">Sign In</Link>
                <Link href="/auth/register" className="w-full flex items-center justify-center gap-2 bg-[#C6EB71] text-black px-6 py-3 rounded-xl font-bold">Be a rider <FiArrowUpRight size={18} /></Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navvbar;