export const metadata = {
  title: "Payment Success",

  description:
    "Your payment has been completed successfully on ZAP-SHIFT-PROJECT. View transaction confirmation and payment details securely.",

  keywords: [
    "payment success",
    "transaction successful",
    "courier payment confirmation",
    "payment completed",
    "ZAP SHIFT PROJECT payment success",
  ],

  openGraph: {
    title: "Payment Success | ZAP-SHIFT-PROJECT",
    description:
      "Payment completed successfully. Check your transaction details and confirmation securely.",
    url: "https://yourdomain.com/dashboard/payments/success",
    siteName: "ZAP-SHIFT-PROJECT",
    type: "website",
  },

  robots: {
    index: false,
    follow: false,
  },
};

import Successpage from "@/Componets/Pages/dashboard/Payment/Successpage";
import React from "react";

const PaymentSuccess = () => {
  return (
    <div>
      <Successpage />
    </div>
  );
};

export default PaymentSuccess;