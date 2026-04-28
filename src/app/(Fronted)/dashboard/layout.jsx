import DashboardLayoutClient from "@/Componets/Shared/DashboardLayoutClient";

export const metadata = {
  title: {
    default: "Dashboard | ZAP-SHIFT-PROJECT | Courier & Logistics Company",
    template: "%s | ZAP-SHIFT-PROJECT",
  },

  description:
    "Access your ZAP-SHIFT-PROJECT dashboard to manage parcels, track deliveries, view orders, and control your courier activities بسهولة and securely.",

  keywords: [
    "dashboard ZAP SHIFT PROJECT",
    "courier dashboard",
    "parcel management system",
    "track delivery dashboard",
    "logistics dashboard Bangladesh",
    "user dashboard courier",
    "order management system",
    "shipping dashboard",
  ],

  openGraph: {
    title: "Dashboard | ZAP-SHIFT-PROJECT",
    description:
      "Manage your courier activities, track parcels, and control your orders from one dashboard.",
    url: "https://yourdomain.com/dashboard",
    siteName: "ZAP-SHIFT-PROJECT",
    type: "website",
  },

  robots: {
    index: false,
    follow: true,
  },
};

const DashboardLayout = ({ children }) => {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
};

export default DashboardLayout;
