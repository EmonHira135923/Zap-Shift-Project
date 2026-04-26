import Aboutpage from "@/Componets/Pages/About/Aboutpage";
import React from "react";

export const metadata = {
  title: "About | ZAP-SHIFT-PROJECT | Courier & Logistics Company",

  description:
    "Learn more about ZAP-SHIFT-PROJECT, a trusted courier and logistics company in Bangladesh. We provide fast, secure, and reliable parcel delivery solutions for individuals and businesses.",

  keywords: [
    "about ZAP SHIFT PROJECT",
    "courier company Bangladesh",
    "logistics company Bangladesh",
    "delivery service company",
    "parcel delivery service",
    "ecommerce logistics Bangladesh",
    "trusted courier service",
    "shipping company Bangladesh",
  ],

  openGraph: {
    title: "About ZAP-SHIFT-PROJECT",
    description:
      "Discover our mission, vision, and commitment to fast and reliable delivery services in Bangladesh.",
    url: "https://yourdomain.com/about",
    siteName: "ZAP-SHIFT-PROJECT",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const AboutPage = () => {
  return (
    <div>
      <Aboutpage />
    </div>
  );
};

export default AboutPage;
