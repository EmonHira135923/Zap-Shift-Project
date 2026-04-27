import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "@/Componets/Shared/Header";
import Footer from "@/Componets/Shared/Footer";
import AuthProvider from "@/Componets/Provider/AuthProvider";
import { ToastContainer } from "react-toastify";
import SessionWrapper from "@/Componets/Provider/SessionWrapper";

const urbanistfont = Urbanist({
  weight: ["100", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://yourdomain.com"),

  title: {
    default:
      "ZAP-SHIFT-PROJECT | Fast Courier Service | Secure Delivery & E-commerce Logistics",
    template: "%s | Your Courier Service",
  },

  description:
    "Reliable courier service for fast and secure parcel delivery. Track shipments in real-time, manage orders, and grow your e-commerce business with our smart logistics solution.",

  keywords: [
    "courier service",
    "parcel delivery",
    "ecommerce delivery",
    "logistics service",
    "fast delivery",
    "parcel tracking",
    "delivery service Bangladesh",
    "shipping service",
    "online courier system",
  ],

  authors: [{ name: "Your Company Name" }],
  creator: "Your Company Name",

  openGraph: {
    title: "Fast Courier Service & E-commerce Delivery Solution",
    description:
      "Send parcels quickly and safely with our trusted courier service. Real-time tracking and reliable logistics support.",
    url: "/",
    siteName: "Your Courier Service",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Courier Service & Delivery Platform",
    description:
      "Fast, secure and reliable courier service for your business and personal needs.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      data-theme="mytheme"
      lang="en"
      className={`${urbanistfont.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionWrapper>
          <AuthProvider>
            <ToastContainer />
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
