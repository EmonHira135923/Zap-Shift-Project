"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  FiPackage,
  FiUser,
  FiMapPin,
  FiTruck,
  FiCalendar,
  FiPhone,
  FiMail,
  FiInfo,
} from "react-icons/fi";

const Parceldetailspage = ({ id }) => {
  const { data: parcel, isLoading } = useQuery({
    queryKey: ["parcel", id],
    queryFn: async () => {
      const res = await axios.get(`/api/parcels/${id}`);
      return res.data.result;
    },
    enabled: !!id,
  });

  // --- LOADING SKELETON ---
  if (isLoading)
    return (
      <div className="max-w-6xl mx-auto p-4 sm:p-8 animate-pulse">
        {/* Hero Skeleton */}
        <div className="h-64 bg-gray-200 rounded-[2.5rem] mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="h-48 bg-gray-200 rounded-[2rem]" />
            <div className="h-48 bg-gray-200 rounded-[2rem]" />
          </div>
          <div className="h-96 bg-gray-200 rounded-[2rem]" />
        </div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 pb-20">
      {/* HEADER HERO */}
      <div className="bg-gradient-to-br from-[#002B36] to-[#083d4a] rounded-[2.5rem] p-8 md:p-12 text-white mb-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-[#C6EB71] text-[#002B36] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-lime-500/20">
              {parcel?.parcelType}
            </span>
            <span className="bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase border border-white/20">
              ID: {id}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
            {parcel?.parcelName}
          </h1>
          <div className="flex items-center gap-4 text-blue-100/60 font-medium">
            <span className="flex items-center gap-2">
              <FiCalendar /> Created:{" "}
              {parcel?.createdAt?.$date
                ? new Date(parcel.createdAt.$date).toLocaleDateString()
                : parcel?.createdAt
                  ? new Date(parcel.createdAt).toLocaleDateString()
                  : "N/A"}
            </span>
          </div>
        </div>
        <FiPackage className="absolute -right-12 -bottom-12 text-[18rem] text-white/5 rotate-12" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-8">
          {/* SENDER & RECEIVER CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sender */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-6 text-[#002B36]">
                <div className="p-3 bg-[#f0f9d8] rounded-2xl">
                  <FiUser size={20} className="text-[#8da13d]" />
                </div>
                <h2 className="font-black text-xl">Sender</h2>
              </div>
              <div className="space-y-5">
                <DetailItem label="Full Name" value={parcel?.senderName} />
                <DetailItem
                  label="Email"
                  value={parcel?.senderEmail}
                  icon={<FiMail className="inline mr-2" />}
                />
                <DetailItem
                  label="Phone"
                  value={parcel?.senderPhone}
                  icon={<FiPhone className="inline mr-2" />}
                />
                <DetailItem
                  label="Address"
                  value={`${parcel?.senderAddress}, ${parcel?.senderDistrict}`}
                  icon={<FiMapPin className="inline mr-2" />}
                />
              </div>
            </div>

            {/* Receiver */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-6 text-[#002B36]">
                <div className="p-3 bg-[#e8f4f7] rounded-2xl">
                  <FiTruck size={20} className="text-[#002B36]" />
                </div>
                <h2 className="font-black text-xl">Receiver</h2>
              </div>
              <div className="space-y-5">
                <DetailItem label="Full Name" value={parcel?.receiverName} />
                <DetailItem
                  label="Email"
                  value={parcel?.receiverEmail}
                  icon={<FiMail className="inline mr-2" />}
                />
                <DetailItem
                  label="Phone"
                  value={parcel?.receiverPhone}
                  icon={<FiPhone className="inline mr-2" />}
                />
                <DetailItem
                  label="Address"
                  value={`${parcel?.receiverAddress}, ${parcel?.receiverDistrict}`}
                  icon={<FiMapPin className="inline mr-2" />}
                />
              </div>
            </div>
          </div>

          {/* INSTRUCTIONS & METADATA */}
          <div className="bg-[#f9fafb] p-8 rounded-[2rem] border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <FiInfo className="text-[#8da13d]" />
              <h3 className="font-black text-[#002B36] text-xl">
                Delivery Logistics
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[11px] font-black uppercase text-gray-400">
                  Pickup Note
                </p>
                <p className="text-gray-700 font-bold bg-white p-4 rounded-2xl border border-gray-100 italic">
                  "{parcel?.pickupInstruction}"
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-black uppercase text-gray-400">
                  Delivery Note
                </p>
                <p className="text-gray-700 font-bold bg-white p-4 rounded-2xl border border-gray-100 italic">
                  "{parcel?.deliveryInstruction}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: BILLING CARD */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl sticky top-24 ring-4 ring-[#C6EB71]/10">
            <h3 className="font-black text-[#002B36] text-2xl mb-8">
              Billing Summary
            </h3>

            <div className="space-y-5">
              <SummaryRow
                label="Parcel Weight"
                value={`${parcel?.parcelWeight} KG`}
              />
              <SummaryRow
                label="Region From"
                value={`${parcel?.senderDistrict}`}
              />
              <SummaryRow
                label="Region To"
                value={`${parcel?.receiverDistrict}`}
              />

              <div className="my-8 py-6 border-y border-dashed border-gray-200">
                <div className="flex justify-between items-end">
                  <span className="font-black text-gray-400 uppercase text-xs">
                    Total Payable
                  </span>
                  <span className="text-5xl font-black text-[#002B36]">
                    ৳{parcel?.cost}
                  </span>
                </div>
              </div>

              <button className="w-full bg-[#C6EB71] hover:bg-[#b5da56] text-[#002B36] py-5 rounded-2xl font-black text-lg transition-all transform hover:-translate-y-1 shadow-xl shadow-lime-500/20 active:scale-95">
                Confirm & Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components for Clean Code
const DetailItem = ({ label, value, icon }) => (
  <div>
    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">
      {label}
    </p>
    <p className="font-bold text-gray-800 text-[15px]">
      {icon} {value}
    </p>
  </div>
);

const SummaryRow = ({ label, value }) => (
  <div className="flex justify-between items-center bg-[#f9fafb] p-3 rounded-xl border border-gray-50">
    <span className="text-[11px] font-black text-gray-400 uppercase">
      {label}
    </span>
    <span className="font-black text-[#002B36]">{value}</span>
  </div>
);

export default Parceldetailspage;
