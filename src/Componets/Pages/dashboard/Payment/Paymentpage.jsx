"use client";
import PaymentCheckoutPageSkeleton from "@/Componets/Skeltons/PaymentCheckoutPageSkeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { LuCreditCard, LuShieldCheck } from "react-icons/lu";

const Paymentpage = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    isLoading,
    data: parcel,
    error,
  } = useQuery({
    queryKey: ["parcels", id],
    queryFn: async () => {
      const res = await axios.get(`/api/parcels/${id}`);
      console.log("API Response Data:", res.data.result);
      return res.data.result;
    },
    enabled: !!id,
  });

  if (isLoading) return <PaymentCheckoutPageSkeleton />;

  if (error || !parcel) {
    return (
      <div className="p-10 text-center text-red-500 font-bold">
        Something went wrong!
      </div>
    );
  }

  const handlepayment = async () => {
    const paymentinfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      parcelName: parcel.parcelName,
      senderName: parcel.senderName,
      senderEmail: parcel.senderEmail,
      phone: parcel.senderPhone,
    };
    const res = await axios.post(`/api/checkout`, paymentinfo);
    console.log(res.data.result);
    router.push(res.data.url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-2xl shadow-gray-200/50">
        {/* Left Side: Summary */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Checkout
            </h1>
            <p className="text-gray-400 mt-2">
              Secure payment for your delivery
            </p>
          </div>

          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-4 text-sm font-medium text-gray-500">
              <span>Parcel Description</span>
              <span>Price</span>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-800">{parcel.parcelName}</h3>
              <span className="text-xl font-black text-gray-900">
                ${parcel.cost}
              </span>
            </div>
            <hr className="my-4 border-dashed border-gray-200" />
            <div className="flex justify-between items-center text-gray-400 text-xs">
              <span>Delivery Charge</span>
              <span>Included</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 w-fit px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
            <LuShieldCheck size={16} />
            SSL Encrypted Secure Payment
          </div>
        </div>

        {/* Right Side: Payment Button Section */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-4">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
              Select Payment Method
            </label>
            <div className="p-4 border-2 border-[#98B42C] bg-[#98B42C]/5 rounded-2xl flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#98B42C] rounded-lg flex items-center justify-center text-white">
                  <LuCreditCard size={20} />
                </div>
                <span className="font-bold text-gray-800">Card Payment</span>
              </div>
              <div className="w-5 h-5 rounded-full border-4 border-[#98B42C] bg-white" />
            </div>
          </div>

          {/* THE MAIN PAY BUTTON */}
          <button
            className="w-full py-5 bg-gray-700 hover:bg-gray-900 text-white rounded-2xl font-black text-lg shadow-xl shadow-gray-200 hover:shadow-[#98B42C]/20 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3"
            onClick={() => handlepayment()}
          >
            Confirm & Pay ${parcel.cost}
          </button>

          <p className="text-center text-[10px] text-gray-400 px-8">
            By clicking &quot;Confirm & Pay&quot;, you agree to our terms of service and
            refund policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Paymentpage;
