export const metadata = {
  title: "Payment History",

  description:
    "View your complete payment history on ZAP-SHIFT-PROJECT dashboard. Track transactions, payment records, and billing details securely.",

  keywords: [
    "payment history",
    "transaction history dashboard",
    "billing records",
    "courier payment history",
    "financial records dashboard",
    "ZAP SHIFT PROJECT payments",
  ],

  openGraph: {
    title: "Payment History | ZAP-SHIFT-PROJECT",
    description:
      "Access all your transaction records, billing details, and payment history securely from your dashboard.",
    url: "https://yourdomain.com/dashboard/payments/history",
    siteName: "ZAP-SHIFT-PROJECT",
    type: "website",
  },

  robots: {
    index: false,
    follow: false,
  },
};

import Paymenhistorypage from "@/Componets/Pages/dashboard/Payment/Paymenhistorypage";
import React from "react";

const Paymenthistory = () => {
  return (
    <div>
      <Paymenhistorypage />
    </div>
  );
};

export default Paymenthistory;