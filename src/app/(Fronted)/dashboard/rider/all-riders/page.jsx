import AllRiderpage from "@/Componets/Pages/dashboard/Riders/AllRiderpage";
import React from "react";

export const metadata = {
  title: "All Riders",

  description:
    "Manage all riders in the ZAP-SHIFT-PROJECT dashboard. View rider information, delivery status, and performance securely.",

  keywords: [
    "dashboard riders",
    "manage riders",
    "rider management",
    "delivery riders list",
    "ZAP SHIFT PROJECT riders",
  ],

  openGraph: {
    title: "All Riders | ZAP-SHIFT-PROJECT",
    description:
      "View and manage all registered riders and their delivery activities from the dashboard.",
    url: "https://yourdomain.com/dashboard/riders",
    siteName: "ZAP-SHIFT-PROJECT",
    type: "website",
  },

  robots: {
    index: false,
    follow: true,
  },
};

const AllRider = () => {
  return (
    <div>
      <AllRiderpage />
    </div>
  );
};

export default AllRider;