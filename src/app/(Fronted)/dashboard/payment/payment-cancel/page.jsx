export const metadata = {
  title: "Payment Cancelled",

  description:
    "Your payment process was cancelled on ZAP-SHIFT-PROJECT. Review payment details and try again securely from your dashboard.",

  keywords: [
    "payment cancelled",
    "payment failed",
    "transaction cancelled",
    "courier payment cancel",
    "ZAP SHIFT PROJECT payment",
  ],

  openGraph: {
    title: "Payment Cancelled | ZAP-SHIFT-PROJECT",
    description:
      "Payment was cancelled. Review your transaction and retry payment securely.",
    url: "https://yourdomain.com/dashboard/payments/cancel",
    siteName: "ZAP-SHIFT-PROJECT",
    type: "website",
  },

  robots: {
    index: false,
    follow: false,
  },
};

import Cancepage from "@/Componets/Pages/dashboard/Payment/Cancepage";
import React from "react";

const PaymentCancel = () => {
  return (
    <div>
      <Cancepage />
    </div>
  );
};

export default PaymentCancel;