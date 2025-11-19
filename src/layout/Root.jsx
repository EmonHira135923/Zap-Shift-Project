import React from "react";
import Navvar from "../Componets/Navvar/Navvar.jsx";
import Footer from "../Componets/Footer/Footer.jsx";
import { Outlet } from "react-router";

const Root = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navvar></Navvar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
