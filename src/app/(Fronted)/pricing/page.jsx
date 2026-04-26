import Pricingpage from "@/Componets/Pages/Pricing/Pricingpage";
import React from "react";

export const metadata = {
  title: "Pricing | ZAP-SHIFT-PROJECT | Courier & Logistics Company",

  description:
    "View transparent and affordable pricing plans for ZAP-SHIFT-PROJECT courier and logistics services in Bangladesh. Flexible rates for individuals and businesses.",

  keywords: [
    "courier pricing Bangladesh",
    "delivery charges Bangladesh",
    "logistics pricing",
    "parcel delivery cost",
    "shipping rates Bangladesh",
    "ZAP SHIFT PROJECT pricing",
    "courier service price list",
    "affordable delivery service",
  ],

  openGraph: {
    title: "Pricing | ZAP-SHIFT-PROJECT",
    description:
      "Check affordable and transparent pricing for fast courier and logistics services in Bangladesh.",
    url: "https://yourdomain.com/pricing",
    siteName: "ZAP-SHIFT-PROJECT",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const PricingPage = () => {
  return (
    <div>
      <Pricingpage />
    </div>
  );
};

export default PricingPage;
