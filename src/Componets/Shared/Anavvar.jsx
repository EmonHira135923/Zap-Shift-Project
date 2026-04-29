"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import useAuth from "../utils/Hooks/useAuth";
import Image from "next/image";


const Anavvar = ({ onMenuToggle, onCollapseToggle, collapsed }) => {
  const { logout, user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setShowDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <div className="flex items-center justify-between h-20 px-4 sm:px-8 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Mobile Hamburger - ZapStyle */}
        <button 
          onClick={onMenuToggle} 
          className="md:hidden p-2.5 text-gray-600 hover:bg-[#D4F06D] hover:text-black rounded-xl transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop Collapse Toggle */}
        <button 
          onClick={onCollapseToggle} 
          className="hidden md:flex p-2 text-gray-400 hover:text-black hover:bg-gray-50 rounded-lg transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={collapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-3">
        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowDropdown((v) => !v)} 
            className="flex items-center gap-3 p-1.5 pr-3 rounded-full border border-gray-100 hover:border-[#D4F06D] hover:bg-gray-50 transition-all group"
          >
            <div className="h-9 w-9 rounded-full bg-[#D4F06D] border-2 border-white shadow-sm overflow-hidden flex items-center justify-center shrink-0">
              {user?.image ? (
                <Image height={48} width={48} src={user.image} alt="User" className="h-full w-full object-cover" />
              ) : (
                <span className="text-sm font-black text-black">
                  {user?.name?.charAt(0) || "U"}
                </span>
              )}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-[12px] font-black text-gray-900 leading-none truncate max-w-[100px]">
                {user?.name?.split(" ")[0]}
              </p>
              <p className="text-[10px] font-bold text-[#8da13d] uppercase tracking-tighter mt-0.5">
                {user?.role || "Member"}
              </p>
            </div>
            <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl border border-gray-100 shadow-2xl py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
              {/* Header Info */}
              <div className="px-5 py-4 border-b border-gray-50 mb-2 bg-[#f9fbf2]/50">
                <p className="text-[13px] font-black text-gray-900 truncate">{user?.name}</p>
                <p className="text-[11px] font-medium text-gray-400 truncate">{user?.email}</p>
              </div>

              {/* Menu Links */}
              <div className="px-2 space-y-1">
                <Link href="/" className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-bold text-gray-600 hover:bg-[#D4F06D] hover:text-black rounded-xl transition-all">
                  <span className="text-base">🏠</span> Home
                </Link>

                <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-bold text-gray-600 hover:bg-[#D4F06D] hover:text-black rounded-xl transition-all">
                  <span className="text-base">👤</span> Profile Settings
                </Link>
              </div>

              {/* Logout Section */}
              <div className="mt-3 pt-3 border-t border-gray-50 px-2">
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-black text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <span className="text-base">🚪</span> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Anavvar;