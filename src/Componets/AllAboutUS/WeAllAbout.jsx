import React from "react";
import { NavLink } from "react-router";

const WeAllAbout = () => {
  const activeClass =
    "bg-blue-600 text-white shadow-sm rounded-xl px-6 py-2 transition duration-200";
  const normalClass =
    "bg-gray-100 text-gray-700 rounded-xl px-6 py-2 border border-gray-300 hover:bg-gray-200 transition duration-200";

  return (
    <div className="max-w-5xl mx-auto py-16 px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1
          className="text-5xl font-extrabold 
        bg-gradient-to-r from-blue-600 to-cyan-500 
        bg-clip-text text-transparent mb-4"
        >
          About Us
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Fast, reliable parcel delivery with real-time tracking — from personal
          to business shipments.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 flex-wrap">
        <NavLink
          to="/aboutus"
          end
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          Story
        </NavLink>

        <NavLink
          to="/aboutus/mission"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          Mission
        </NavLink>

        <NavLink
          to="/aboutus/success"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          Success
        </NavLink>

        <NavLink
          to="/aboutus/teamothers"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          Teams & Other
        </NavLink>
      </div>
    </div>
  );
};

export default WeAllAbout;
