import CompleteDeliveryPage from "@/Componets/Pages/dashboard/Riders/CompleteDelivery";
import React from "react";

export const metadata = {
  title: "Completed Deliveries | Dashboard | ZAP-SHIFT-PROJECT",

  description:
    "View all completed parcel deliveries in your ZAP-SHIFT-PROJECT dashboard. Track successful shipments, delivery history, and completed courier tasks.",

  keywords: [
    "completed deliveries",
    "delivery history dashboard",
    "successful parcel delivery",
    "completed courier tasks",
    "parcel delivery records",
    "logistics dashboard Bangladesh",
    "shipment history",
    "courier completed orders",
  ],

  openGraph: {
    title: "Completed Deliveries | ZAP-SHIFT-PROJECT",
    description:
      "Check all completed deliveries, shipment records, and successful courier tasks from your dashboard.",
    url: "https://yourdomain.com/dashboard/completed-deliveries",
    siteName: "ZAP-SHIFT-PROJECT",
    type: "website",
  },

  robots: {
    index: false,
    follow: true,
  },
};

const CompleteDelivery = () => {
  return (
    <div>
      <CompleteDeliveryPage />
    </div>
  );
};

export default CompleteDelivery;
