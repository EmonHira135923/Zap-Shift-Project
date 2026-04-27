"use client";
import Link from "next/link";
import React, { useState } from "react";
import Navlink from "./Navlink";
import {
  FiArrowUpRight,
  FiMenu,
  FiX,
  FiLogOut,
  FiUser,
  FiGrid,
} from "react-icons/fi";
import useAuth from "../utils/Hooks/useAuth";
import Image from "next/image";
import { PersonStanding } from "lucide-react";

const Navvbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout, loading } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Coverage", href: "/coverage" },
    { name: "About Us", href: "/about" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <div className="w-full bg-[#f3f4f6] py-4 md:py-6 px-4 sticky top-0 z-50">
      <nav className="flex items-center justify-between px-6 md:px-8 py-3 max-w-7xl mx-auto bg-white rounded-2xl md:rounded-[20px] shadow-sm border border-gray-100 relative">
        {/* LEFT: Logo Section (Always Fixed) */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#C6EB71] rounded-sm transform -skew-x-12"></div>
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold text-[#002B36] tracking-tight"
          >
            ZapShift
          </Link>
        </div>

        {/* CENTER: Desktop Links (Always Fixed) */}
        <div className="hidden lg:flex items-center gap-8 text-[15px] font-medium">
          {navLinks.map((link) => (
            <Navlink key={link.name} href={link.href}>
              {link.name}
            </Navlink>
          ))}
        </div>

        {/* RIGHT: Auth & Profile Section (With Skeleton Loading) */}
        <div className="flex items-center gap-3">
          {loading ? (
            /* Skeleton Loading for Auth Buttons/Profile */
            <div className="flex items-center gap-3 animate-pulse">
              <div className="hidden md:block w-24 h-10 bg-gray-200 rounded-xl"></div>
              <div className="w-10 h-10 md:w-32 md:h-10 bg-gray-200 rounded-full md:rounded-xl"></div>
            </div>
          ) : user ? (
            /* Desktop Profile Dropdown */
            <div className="hidden lg:block relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 rounded-full border-2 border-[#C6EB71] overflow-hidden hover:shadow-md transition-all"
              >
                <Image
                  height={50}
                  width={50}
                  src={
                    user?.image ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-[70] origin-top-right animate-in fade-in zoom-in duration-200">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <p className="text-xs text-gray-400 font-medium uppercase">
                      Welcome
                    </p>
                    <p className="text-sm font-bold text-[#002B36] truncate">
                      {user?.name}
                    </p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-[#f3f4f6]"
                  >
                    <FiGrid size={16} /> Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-[#f3f4f6]"
                  >
                    <PersonStanding size={16} /> Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 border-t border-gray-50 mt-1"
                  >
                    <FiLogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Auth Buttons */
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/auth/login"
                className="px-6 py-2.5 rounded-xl border border-gray-200 font-medium text-gray-700 hover:bg-gray-50 transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="flex items-center gap-2 bg-[#C6EB71] hover:bg-[#b5da56] text-black px-6 py-2.5 rounded-xl font-bold transition-all"
              >
                Be a rider <FiArrowUpRight size={16} />
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-[#002B36] hover:bg-gray-100 rounded-lg"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        <div
          className={`absolute top-full left-0 right-0 mt-3 p-5 bg-white rounded-2xl shadow-2xl lg:hidden transition-all duration-300 origin-top z-[60] border border-gray-100 ${isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}`}
        >
          {user && (
            <div className="flex items-center gap-4 p-4 bg-[#f9fafb] rounded-xl mb-6">
              <Image
                height={48}
                width={48}
                src={
                  user?.image ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-[#C6EB71] object-cover"
              />
              <div>
                <p className="text-sm font-bold text-[#002B36]">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate w-32">
                  {user?.email || "Rider Account"}
                </p>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
              Menu
            </p>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between text-base font-semibold text-[#002B36] hover:text-[#C6EB71] p-2 hover:bg-gray-50 rounded-lg"
              >
                {link.name} <FiArrowUpRight className="opacity-20" />
              </Link>
            ))}
            {user ? (
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 text-[#002B36] font-semibold hover:bg-gray-50 rounded-lg"
                >
                  <FiGrid size={20} className="text-[#C6EB71]" /> Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-[#f3f4f6]"
                >
                  <PersonStanding size={16} /> Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 p-3 text-red-500 font-semibold hover:bg-red-50 rounded-lg mt-2"
                >
                  <FiLogOut size={20} /> Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
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
                  Be a rider <FiArrowUpRight size={18} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navvbar;
