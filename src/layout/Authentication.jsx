import React from "react";
import Logo from "../Componets/AllImg/Logo";
import { Outlet } from "react-router";
import authimage from "../assets/authimage.png";

const Authentication = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Logo and Brand */}
        <header className="py-6">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              ZapShift
            </span>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between min-h-[calc(100vh-100px)]">
          {/* Left Side - Form Section */}
          <div className="w-full lg:w-1/2 flex items-center justify-center py-8 lg:py-0">
            <div className="w-full max-w-md">
              <Outlet />
            </div>
          </div>

          {/* Right Side - Image Section */}
          <div className="w-full lg:w-1/2 flex items-center justify-center py-8 lg:py-0">
            <div className="max-w-lg w-full">
              <img
                src={authimage}
                alt="Authentication illustration"
                className="w-full h-auto object-cover rounded-2xl shadow-lg bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
