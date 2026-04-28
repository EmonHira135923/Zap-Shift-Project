export const metadata = {
  title: "Dashboard Home | ZAP-SHIFT-PROJECT",

  description:
    "Welcome to your dashboard home. View recent activities, track parcels, and manage your courier services easily.",

  keywords: [
    "dashboard home",
    "courier dashboard home",
    "parcel tracking dashboard",
    "user dashboard overview",
    "ZAP SHIFT PROJECT dashboard",
  ],

  openGraph: {
    title: "Dashboard Home | ZAP-SHIFT-PROJECT",
    description:
      "Access your dashboard home to monitor activities and manage your courier services.",
    url: "https://yourdomain.com/dashboard",
    siteName: "ZAP-SHIFT-PROJECT",
    type: "website",
  },

  robots: {
    index: false,
    follow: true,
  },
};

import DashboardHome from "@/Componets/dashboard/DashboardHome";
import React from "react";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <DashboardHome />
    </div>
  );
};

export default Dashboard;