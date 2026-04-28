"use client";
import React, { useState, useEffect } from "react";
import Aside from "./Aside";
import Anavvar from "./Anavvar";

const DashboardLayoutClient = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Aside 
        sidebarOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        collapsed={collapsed} 
      />

      <div className={`flex flex-col flex-1 transition-all duration-300 ${collapsed ? "md:ml-[72px]" : "md:ml-64"}`}>
        <Anavvar 
          onMenuToggle={() => setSidebarOpen((v) => !v)} 
          onCollapseToggle={() => setCollapsed((v) => !v)} 
          collapsed={collapsed} 
        />

        <main className="flex-1 p-4 sm:p-6">
          <div className="mx-auto max-w-7xl w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayoutClient;