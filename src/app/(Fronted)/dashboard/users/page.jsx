import Userpage from "@/Componets/Pages/dashboard/Users/Userpage";
import React from "react";
export const metadata = {
  title: "Users",

  description:
    "Manage all users in the ZAP-SHIFT-PROJECT dashboard. View customer information, account details, and user activities securely.",

  keywords: [
    "dashboard users",
    "manage users",
    "customer management",
    "user list dashboard",
    "ZAP SHIFT PROJECT users",
  ],

  openGraph: {
    title: "Users | ZAP-SHIFT-PROJECT",
    description:
      "View and manage all registered users and their activities from the dashboard.",
    url: "https://yourdomain.com/dashboard/users",
    siteName: "ZAP-SHIFT-PROJECT",
    type: "website",
  },

  robots: {
    index: false,
    follow: true,
  },
};

const User = () => {
  return (
    <div>
      <Userpage />
    </div>
  );
};

export default User;
