"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navlink = ({ href, children }) => {
  const pathname = usePathname();
  // Exact match for home, startsWith for other routes
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`transition-colors duration-200 hover:text-black ${
        isActive ? "text-black font-semibold" : "text-gray-500"
      }`}
    >
      {children}
    </Link>
  );
};

export default Navlink;
