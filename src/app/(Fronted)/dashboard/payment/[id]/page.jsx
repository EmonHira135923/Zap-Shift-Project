import Paymentpage from "@/Componets/Pages/dashboard/Payment/Paymentpage";
import React from "react";

export const metadata = {
  title: "Payments",

  description:
    "Manage all payment records in ZAP-SHIFT-PROJECT dashboard. View transaction history, payment status, and financial activities securely.",

  keywords: [
    "dashboard payments",
    "payment management",
    "transaction history",
    "courier payment system",
    "ZAP SHIFT PROJECT payments",
    "financial dashboard",
  ],

  openGraph: {
    title: "Payments | ZAP-SHIFT-PROJECT",
    description:
      "View and manage all payment transactions, history, and financial records from your dashboard.",
    url: "https://yourdomain.com/dashboard/payments",
    siteName: "ZAP-SHIFT-PROJECT",
    type: "website",
  },

  robots: {
    index: false,
    follow: true,
  },
};

const Payment = () => {
  return (
    <div>
      <Paymentpage />
    </div>
  );
};

export default Payment;
