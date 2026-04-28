"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

// ─── ROUTES CONFIGURATION ──────────────────────────────────────────────────
const ROUTES = [
  { label: "Dashboard", href: "/dashboard", icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  )},
];

const Aside = ({ sidebarOpen, onClose, collapsed }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden backdrop-blur-sm transition-opacity" 
          onClick={onClose} 
        />
      )}

      <aside 
        className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-white border-r border-gray-100 transition-all duration-300 ease-in-out
        ${collapsed ? "md:w-[85px]" : "md:w-64"} 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} w-64`}
      >
        {/* Logo Section */}
        <div className="flex items-center h-20 px-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#D4F06D] rounded-lg flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden">
               <div className="absolute inset-0 bg-black/5 rotate-45 translate-x-4"></div>
               <span className="text-black font-black text-xs relative z-10">ZS</span>
            </div>
            {!collapsed && (
              <span className="font-black text-xl text-[#1A1A1A] tracking-tight">ZapShift</span>
            )}
          </div>
        </div>

        {/* Menu Label */}
        {!collapsed && (
          <div className="px-7 py-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Menu</p>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto scrollbar-hide">
          {ROUTES.map((route) => {
            const active = pathname === route.href;
            return (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => { if (window.innerWidth < 768) onClose(); }}
                className={`group flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 relative
                  ${active 
                    ? "bg-[#D4F06D] text-black shadow-lg shadow-[#D4F06D]/20" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-black"
                  }`}
              >
                <span className={`transition-transform duration-300 ${active ? "scale-110" : "group-hover:scale-110"}`}>
                  {route.icon}
                </span>
                
                {!collapsed && (
                  <span className={`text-[14px] font-bold tracking-tight ${active ? "text-black" : "text-gray-600"}`}>
                    {route.label}
                  </span>
                )}

                {/* Plus Icon Style from Image */}
                {active && !collapsed && (
                  <span className="ml-auto text-lg font-light opacity-60">+</span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Aside;