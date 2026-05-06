import DeliveryAssignRiderpage from "@/Componets/Pages/dashboard/Riders/DeliveryAssignRiderpage";
import React from "react";

export const metadata = {
  title: "Assign Delivery Rider | ZAP-SHIFT-PROJECT",

  description:
    "Assign riders to delivery parcels and manage rider allocation efficiently in the ZAP-SHIFT dashboard.",

  keywords: [
    "assign delivery rider",
    "delivery rider management",
    "parcel assignment",
    "delivery dashboard",
    "ZAP SHIFT",
  ],

  openGraph: {
    title: "Assign Delivery Rider | ZAP-SHIFT-PROJECT",

    description:
      "Manage parcel delivery assignments and allocate riders easily from the dashboard.",

    url: "https://yourdomain.com/dashboard/rider/assign-delivery",

    siteName: "ZAP-SHIFT-PROJECT",

    type: "website",
  },

  robots: {
    index: false,
    follow: true,
  },
};

const AssignDelivery = () => {
  return (
    <div>
      <DeliveryAssignRiderpage />
    </div>
  );
};

export default AssignDelivery;