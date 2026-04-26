import Beariderpage from "@/Componets/Pages/BeARider/Beariderpage";
import React from "react";

export const metadata = {
  title: "Be A Rider | ZAP-SHIFT-PROJECT | Courier & Logistics Company",

  description:
    "Join ZAP-SHIFT-PROJECT as a rider and start earning with flexible working hours. Deliver parcels across Bangladesh with a trusted logistics company.",

  keywords: [
    "be a rider Bangladesh",
    "courier rider job Bangladesh",
    "delivery rider job",
    "logistics rider signup",
    "earn money delivery job",
    "parcel delivery rider",
    "ZAP SHIFT PROJECT rider",
    "part time rider job Bangladesh",
  ],

  openGraph: {
    title: "Be A Rider | ZAP-SHIFT-PROJECT",
    description:
      "Apply as a rider and start earning by delivering parcels with flexible timing and trusted support.",
    url: "https://yourdomain.com/be-a-rider",
    siteName: "ZAP-SHIFT-PROJECT",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const BeARiderPage = () => {
  return (
    <div>
      <Beariderpage />
    </div>
  );
};

export default BeARiderPage;
