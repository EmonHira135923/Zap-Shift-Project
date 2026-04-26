import Servicepage from "@/Componets/Pages/Services/Servicepage";
import React from "react";

export const metadata = {
  title: "Services | ZAP-SHIFT-PROJECT | Courier & Logistics Company",

  description:
    "Explore professional courier and logistics services by ZAP-SHIFT-PROJECT in Bangladesh. Fast parcel delivery, ecommerce logistics, and secure shipping solutions.",

  keywords: [
    "courier services Bangladesh",
    "logistics services Bangladesh",
    "parcel delivery service",
    "shipping services Bangladesh",
    "ecommerce delivery solution",
    "ZAP SHIFT PROJECT services",
    "fast delivery service",
    "secure courier service",
  ],

  openGraph: {
    title: "Services | ZAP-SHIFT-PROJECT",
    description:
      "Discover fast, secure, and reliable courier and logistics services across Bangladesh.",
    url: "https://yourdomain.com/services",
    siteName: "ZAP-SHIFT-PROJECT",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const ServicePage = () => {
  return (
    <div>
      <Servicepage />
    </div>
  );
};

export default ServicePage;
