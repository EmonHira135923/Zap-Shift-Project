"use client";
import React from "react";
import Navvar from "./Navvar";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathName = usePathname();
  if (pathName.startsWith("/auth")) return <></>;
  return (
    <div>
      <header>
        <Navvar />
      </header>
    </div>
  );
};

export default Header;
