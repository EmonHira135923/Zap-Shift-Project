import Editpage from "@/Componets/Pages/profile/Editpage";
import React from "react";

export const metadata = {
  title: "Edit Profile",

  description:
    "Update your profile information in ZAP-SHIFT-PROJECT. Change personal details, contact info, and account settings securely from your dashboard.",

  keywords: [
    "edit profile dashboard",
    "update user profile",
    "change account details",
    "profile settings courier",
    "ZAP SHIFT PROJECT profile update",
  ],

  openGraph: {
    title: "Edit Profile | ZAP-SHIFT-PROJECT",
    description:
      "Easily update your personal details and manage your account settings from your dashboard.",
    url: "https://yourdomain.com/dashboard/profile/edit",
    siteName: "ZAP-SHIFT-PROJECT",
    type: "website",
  },

  robots: {
    index: false,
    follow: true,
  },
};

const ProfileUpdate = () => {
  return (
    <div>
      <Editpage />
    </div>
  );
};

export default ProfileUpdate;
