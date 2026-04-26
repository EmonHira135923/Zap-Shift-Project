import Coveragepage from "@/Componets/Pages/Coverage/Coveragepage";
import React from "react";

export const metadata = {
  title: "Coverage Area | ZAP-SHIFT-PROJECT | Courier & Logistics Company",

  description:
    "Check ZAP-SHIFT-PROJECT service coverage areas across Bangladesh. We provide fast and reliable parcel delivery in major cities and districts.",

  keywords: [
    "courier coverage Bangladesh",
    "delivery service area Bangladesh",
    "ZAP SHIFT PROJECT coverage",
    "parcel delivery locations",
    "logistics service area",
    "shipping coverage Bangladesh",
    "city wise courier service",
    "delivery availability Bangladesh",
  ],

  openGraph: {
    title: "Coverage Area | ZAP-SHIFT-PROJECT",
    description:
      "Explore where ZAP-SHIFT-PROJECT delivers parcels across Bangladesh with fast and reliable service coverage.",
    url: "https://yourdomain.com/coverage",
    siteName: "ZAP-SHIFT-PROJECT",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const CoveragePage = () => {
  return (
    <div>
      <Coveragepage />
    </div>
  );
};

export default CoveragePage;
