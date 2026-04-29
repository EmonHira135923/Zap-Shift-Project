export const metadata = {
  title: "All Parcels",

  description:
    "Manage and track all parcels from the ZAP-SHIFT-PROJECT dashboard. View delivery status, parcel details, and shipping records securely.",

  keywords: [
    "all parcels dashboard",
    "parcel management",
    "track parcels",
    "delivery records",
    "shipping dashboard",
    "ZAP SHIFT PROJECT parcels",
  ],

  openGraph: {
    title: "All Parcels | ZAP-SHIFT-PROJECT",
    description:
      "Access all parcel information, delivery updates, and shipping records from your dashboard.",
    url: "https://yourdomain.com/dashboard/parcels",
    siteName: "ZAP-SHIFT-PROJECT",
    type: "website",
  },

  robots: {
    index: false,
    follow: true,
  },
};

import AllParcel from "@/Componets/Pages/dashboard/Parcel/AllParcel";
import React from "react";

const Parcel = () => {
  return (
    <div>
      <AllParcel />
    </div>
  );
};

export default Parcel;