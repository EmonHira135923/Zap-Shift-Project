import React, { useState } from "react";
import {
  Menu,
  X,
  House,
  Settings,
  Globe,
  Info,
  DollarSign,
  BookOpen,
  Phone,
} from "lucide-react";
import { NavLink } from "react-router";
import Logo from "../AllImg/Logo";

const Navvar = () => {
  const activeclass =
    "bg-info text-primary font-bold rounded-full px-4 py-2 transition-all duration-200";
  const [toggle, settoggle] = useState(false);

  const navItems = [
    { name: "Home", path: "/", icon: <House size={18} /> },
    { name: "Service", path: "/service", icon: <Settings size={18} /> },
    { name: "Coverage", path: "/coverage", icon: <Globe size={18} /> },
    { name: "About Us", path: "/aboutus", icon: <Info size={18} /> },
    { name: "Pricing", path: "/pricing", icon: <DollarSign size={18} /> },
    { name: "Blog", path: "/blog", icon: <BookOpen size={18} /> },
    { name: "Contact", path: "/contact", icon: <Phone size={18} /> },
  ];

  return (
    <nav className="bg-gray-50 shadow-md px-5 md:px-10 py-3 md:py-4 relative rounded-xl">
      {/* Main container */}
      <div className="flex justify-between items-center w-full">
        {/* Logo */}
        <NavLink className="flex items-center gap-1 md:gap-2" to="/">
          <Logo className="w-8 h-8 md:w-10 md:h-10" />
          <span className="text-xl md:text-2xl font-bold text-secondary">
            HERO.IO
          </span>
        </NavLink>

        {/* Desktop Nav items */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                "flex items-center gap-2 px-2 py-2 rounded-md " +
                (isActive ? activeclass : "")
              }
            >
              {item.icon}
              <span className="text-base font-medium">{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4">
          <NavLink
            to="/login"
            className="btn text-primary rounded-full border border-primary px-4 py-2 hover:bg-info"
          >
            Sign In
          </NavLink>
          <NavLink
            to="/register"
            className="btn bg-info text-primary rounded-full px-4 py-2 "
          >
            Sign Up
          </NavLink>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button onClick={() => settoggle(!toggle)}>
            {toggle ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {toggle && (
        <div className="md:hidden mt-3 bg-gray-100 rounded-xl shadow-lg w-full absolute left-0 p-5 flex flex-col gap-4 z-50">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => settoggle(false)}
              className={({ isActive }) =>
                "flex items-center gap-3 px-3 py-2 rounded-md " +
                (isActive ? activeclass : "")
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-3 mt-2">
            <NavLink
              to="/login"
              onClick={() => settoggle(false)}
              className="btn text-primary rounded-full border border-primary px-4 py-2 hover:bg-info"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/register"
              onClick={() => settoggle(false)}
              className="btn bg-info text-primary rounded-full px-4 py-2"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navvar;
