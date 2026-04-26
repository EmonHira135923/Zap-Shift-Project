import Homepage from "@/Componets/Pages/Home/Homepage";

export const metadata = {
  title: "Home | ZAP-SHIFT-PROJECT | Fast Courier Service in Bangladesh",

  description:
    "ZAP-SHIFT-PROJECT is a reliable courier service in Bangladesh offering fast parcel delivery, real-time tracking, and secure e-commerce logistics solutions for businesses and individuals.",

  keywords: [
    "ZAP SHIFT PROJECT",
    "courier service Bangladesh",
    "parcel delivery Bangladesh",
    "fast delivery service",
    "ecommerce delivery service",
    "logistics company Bangladesh",
    "parcel tracking system",
    "online courier booking",
    "home delivery service",
    "shipping service Bangladesh",
    "cash on delivery courier",
    "same day delivery Bangladesh",
  ],

  openGraph: {
    title: "ZAP-SHIFT-PROJECT | Courier & Delivery Service",
    description:
      "Fast and secure courier service with real-time tracking. Best logistics solution for e-commerce in Bangladesh.",
    url: "https://yourdomain.com",
    siteName: "ZAP-SHIFT-PROJECT",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "ZAP-SHIFT-PROJECT Courier Service",
    description:
      "Reliable parcel delivery and logistics service in Bangladesh with tracking support.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <div>
      <Homepage />
    </div>
  );
}
