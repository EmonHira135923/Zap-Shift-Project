import { Authcontext } from "@/Componets/Provider/Provider";
import React, { use } from "react";

const useAuth = () => {
  const authinfo = use(Authcontext);
  return authinfo;
};

export default useAuth;