import Navvbar from "@/Componets/Shared/Navvar";
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <Navvbar />
      <main>{children}</main>
    </div>
  );
};

export default AuthLayout;
