"use client";
import useAuth from "@/Componets/utils/Hooks/useAuth";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";

const Successpage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [paymentData, setPaymentData] = useState(null);
  const effectRan = useRef(false); // দুইবার কল হওয়া রোধ করতে

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }

    if (sessionId && user && !effectRan.current) {
      effectRan.current = true; // কল হয়ে গেলে True করে দেবে

      axios
        .patch(`/api/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentData(res.data);
          console.log("Verified:", res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [user, loading, router, sessionId]);

  if (loading || (!paymentData && sessionId)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#98B42C]"></div>
        <p className="mt-4 text-gray-500">Processing your secure payment...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-20 p-8 bg-white shadow-2xl rounded-[2.5rem] border border-gray-50">
      <div className="text-center">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-black text-gray-900">Payment Successful!</h1>
        <p className="text-gray-500 mt-2">Your parcel is ready for shipment.</p>
      </div>

      {/* বিস্তারিত ডেটা প্রদর্শন */}
      <div className="mt-10 p-6 bg-gray-50 rounded-3xl space-y-4 border border-gray-100">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Tracking ID</span>
          <span className="font-bold text-gray-800">{paymentData?.trackingId}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Transaction ID</span>
          <span className="font-mono text-xs text-gray-600">{paymentData?.transactionId}</span>
        </div>
        <div className="flex justify-between text-sm border-t border-dashed pt-4">
          <span className="text-gray-400">Amount Paid</span>
          <span className="font-black text-gray-900">${paymentData?.result?.upsertedId || "Confirmed"}</span>
        </div>
      </div>

      <button
        onClick={() => router.push("/dashboard/parcels")}
        className="w-full mt-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-gray-200 transition-all active:scale-95"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default Successpage;