import React from "react";
import WeAllAbout from "../../Componets/AllAboutUS/WeAllAbout";
import { Outlet } from "react-router";

const AboutUs = () => {
  return (
    <div>
      <WeAllAbout />
      <Outlet />
    </div>
  );
};

export default AboutUs;
