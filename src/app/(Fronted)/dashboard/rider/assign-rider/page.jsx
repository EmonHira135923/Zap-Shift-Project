import Assignriderpage from "@/Componets/Pages/dashboard/Riders/Assignriderpage";
import React from "react";

export const metadata = {
  title: "Assign Rider",
  description:
    "Assign riders to deliveries and manage rider allocation in ZAP-SHIFT-PROJECT dashboard.",

  keywords: [
    "assign rider",
    "rider assignment",
    "delivery management",
    "ZAP SHIFT riders",
  ],

  openGraph: {
    title: "Assign Rider | ZAP-SHIFT-PROJECT",
    description: "Assign riders to parcels and manage delivery workflow.",
    url: "https://yourdomain.com/dashboard/assign-rider",
    siteName: "ZAP-SHIFT-PROJECT",
    type: "website",
  },

  robots: {
    index: false,
    follow: true,
  },
};

const AssignRider = () => {
  return <Assignriderpage />;
};

export default AssignRider;
