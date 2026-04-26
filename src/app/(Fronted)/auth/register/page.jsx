import Registerpage from "@/Componets/Pages/Register/Registerpage";
import React from "react";

export const metadata = {
  title: "Sign Up | ZAP-SHIFT-PROJECT | Courier & Logistics Company",

  description:
    "Create a new account on ZAP-SHIFT-PROJECT to access fast courier services, parcel tracking, and logistics solutions across Bangladesh.",

  keywords: [
    "sign up ZAP SHIFT PROJECT",
    "create courier account Bangladesh",
    "logistics registration",
    "parcel delivery sign up",
    "courier service registration",
    "customer account create",
    "shipping service signup",
    "ecommerce logistics account",
  ],

  openGraph: {
    title: "Sign Up | ZAP-SHIFT-PROJECT",
    description:
      "Register now to get started with fast and reliable courier and logistics services in Bangladesh.",
    url: "https://yourdomain.com/signup",
    siteName: "ZAP-SHIFT-PROJECT",
    type: "website",
  },

  robots: {
    index: false,
    follow: true,
  },
};

const SignUpPage = () => {
  return (
    <div>
      <Registerpage />
    </div>
  );
};

export default SignUpPage;
