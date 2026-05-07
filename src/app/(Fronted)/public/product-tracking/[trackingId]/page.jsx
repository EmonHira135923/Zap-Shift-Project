import ProductTrackingPage from "@/Componets/Pages/ProductTracking/ProductTrackingPage";
import React from "react";

// Metadata for SEO
export const metadata = {
  title: "Track Your Parcel | ZAP-SHIFT-PROJECT | Real-Time Courier Tracking",

  description:
    "Track your parcel in real-time with ZAP-SHIFT-PROJECT. Enter your tracking ID to get instant updates on your shipment's location and delivery status across Bangladesh.",

  keywords: [
    "track parcel Bangladesh",
    "courier tracking online",
    "parcel status checker",
    "ZAP SHIFT tracking",
    "real-time delivery tracking",
    "logistics tracking Bangladesh",
    "check shipment status",
  ],

  openGraph: {
    title: "Track Your Parcel | ZAP-SHIFT-PROJECT",
    description:
      "Get real-time updates on your courier. Fast and accurate parcel tracking service by ZAP-SHIFT-PROJECT.",
    url: "https://yourdomain.com/public/product-tracking",
    siteName: "ZAP-SHIFT-PROJECT",
    images: [
      {
        url: "https://yourdomain.com/tracking-og-image.jpg", // আপনার ট্র্যাকিং রিলেটেড কোনো ইমেজ থাকলে তার লিঙ্ক
        width: 1200,
        height: 630,
        alt: "ZAP-SHIFT-PROJECT Tracking",
      },
    ],
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const ProductTracking = () => {
  return (
    <div>
      <ProductTrackingPage />
    </div>
  );
};

export default ProductTracking;
