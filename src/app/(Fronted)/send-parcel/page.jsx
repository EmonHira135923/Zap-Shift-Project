import SendaParcelPage from '@/Componets/Pages/SendAParcel/SendaParcelPage';
import React from 'react';

export const metadata = {
  title: "Send a Parcel | ZAP-SHIFT-PROJECT | Courier & Logistics Company",

  description:
    "Send your parcels easily with ZAP-SHIFT-PROJECT. Fast, secure, and reliable courier service across Bangladesh for individuals and businesses.",

  keywords: [
    "send parcel Bangladesh",
    "courier send package",
    "parcel delivery service",
    "send package online",
    "logistics shipping Bangladesh",
    "ZAP SHIFT PROJECT send parcel",
    "fast courier service",
    "secure parcel delivery",
  ],

  openGraph: {
    title: "Send a Parcel | ZAP-SHIFT-PROJECT",
    description:
      "Book your parcel delivery بسهولة with fast and reliable courier services across Bangladesh.",
    url: "https://yourdomain.com/send-a-parcel",
    siteName: "ZAP-SHIFT-PROJECT",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const SendAParcel = () => {
    return (
        <div>
            <SendaParcelPage/>
        </div>
    );
};

export default SendAParcel;