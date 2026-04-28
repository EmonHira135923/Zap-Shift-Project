import Profilepage from "@/Componets/Pages/profile/page";
import React from "react";

export const metadata = {
  title: "My Profile",

  description:
    "View and manage your profile information in ZAP-SHIFT-PROJECT. Update personal details, contact information, and account settings بسهولة and securely.",

  keywords: [
    "user profile dashboard",
    "my profile courier",
    "account settings",
    "user information update",
    "ZAP SHIFT PROJECT profile",
  ],

  openGraph: {
    title: "My Profile | ZAP-SHIFT-PROJECT",
    description:
      "Access and manage your personal profile and account settings بسهولة.",
    url: "https://yourdomain.com/dashboard/profile",
    siteName: "ZAP-SHIFT-PROJECT",
    type: "website",
  },

  robots: {
    index: false,
    follow: true,
  },
};

const MyProfile = () => {
  return (
    <div>
      <Profilepage />
    </div>
  );
};

export default MyProfile;
