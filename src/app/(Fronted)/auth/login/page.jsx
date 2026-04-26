import Loginpage from "@/Componets/Pages/Login/Loginpage";
import React from "react";

export const metadata = {
  title: "Login | ZAP-SHIFT-PROJECT | Courier & Logistics Company",

  description:
    "Login to your ZAP-SHIFT-PROJECT account to access courier tracking, order management, and delivery services. Secure login for customers and businesses.",

  keywords: [
    "login ZAP SHIFT PROJECT",
    "courier login Bangladesh",
    "logistics account login",
    "parcel tracking login",
    "delivery service login",
    "customer dashboard login",
    "shipping account access",
    "secure login courier service",
  ],

  openGraph: {
    title: "Login | ZAP-SHIFT-PROJECT",
    description:
      "Securely login to manage your courier orders, track parcels, and access your dashboard.",
    url: "https://yourdomain.com/login",
    siteName: "ZAP-SHIFT-PROJECT",
    type: "website",
  },

  robots: {
    index: false,
    follow: true,
  },
};

const LoginPage = () => {
  return (
    <div>
      <Loginpage />
    </div>
  );
};

export default LoginPage;
