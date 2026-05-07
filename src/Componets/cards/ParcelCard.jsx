"use client";
import React from "react";
import { LuPackage, LuDollarSign, LuCreditCard, LuHash } from "react-icons/lu";
import Link from "next/link";
import ParcelButton from "../buttons/ParcelButton";

const ParcelCard = ({ parcels, currentPage = 1, itemsPerPage = 10 }) => {
  return (
    <div className="w-full bg-white border border-gray-100 rounded-[2rem] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50/40 border-b border-gray-50">
              <th className="px-5 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest w-14">
                No
              </th>
              <th className="px-5 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                Parcel Details
              </th>
              <th className="px-5 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">
                Amount
              </th>
              <th className="px-5 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">
                Tracking ID
              </th>
              <th className="px-5 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">
                Payment
              </th>
              <th className="px-5 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">
                Delivery
              </th>
              <th className="px-5 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right w-32">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {parcels.map((parcel, index) => {
              const isPaid = parcel.paymentStatus?.toLowerCase() === "paid";

              return (
                <tr
                  key={parcel._id}
                  className="group hover:bg-gray-50/30 transition-colors"
                >
                  <td className="px-6 py-4 text-lg text-slate-400 font-medium">
                    {String(
                      (currentPage - 1) * itemsPerPage + index + 1,
                    ).padStart(2, "0")}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gray-50 text-gray-400 group-hover:bg-[#C6EB71]/20 group-hover:text-[#98B42C] rounded-xl flex items-center justify-center transition-colors shrink-0">
                        <LuPackage size={17} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm leading-none mb-1">
                          {parcel.parcelName}
                        </p>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tighter">
                          {parcel.parcelType}{" "}
                          <span className="mx-1 opacity-30">|</span>{" "}
                          {parcel.parcelWeight}kg
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <div className="inline-flex items-center text-[#98B42C] font-black text-sm">
                      <LuDollarSign size={13} strokeWidth={3} />
                      <span>{parcel.cost}</span>
                    </div>
                  </td>

                  {/* Tracking ID Section with "Click to Track" Indicator */}
                  <td className="px-5 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      {/* উপরের ছোট নির্দেশিকা লেবেল */}
                      <span className="text-[9px] font-black text-[#98B42C] uppercase tracking-[0.15em] animate-pulse">
                        Click to Track
                      </span>

                      <Link
                        href={`/public/product-tracking/${parcel.trackingId}`}
                        className="relative group/track"
                      >
                        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-100 text-gray-700 rounded-xl hover:border-[#98B42C] hover:bg-[#C6EB71]/10 hover:text-[#002B36] transition-all duration-300 cursor-pointer shadow-sm active:scale-95">
                          {/* এনিমেটেড পালস ডট */}
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#98B42C] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#98B42C]"></span>
                          </span>

                          {/* মেইন ট্র্যাকিং আইডি */}
                          <span className="text-[12px] font-mono font-black tracking-widest uppercase">
                            {parcel.trackingId}
                          </span>

                          {/* এক্সটারনাল অ্যারো আইকন */}
                          <svg
                            className="w-3.5 h-3.5 opacity-40 group-hover/track:opacity-100 group-hover/track:translate-x-1 transition-all duration-300 text-[#98B42C]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </div>

                        {/* নিচের টুলটিপ (ঐচ্ছিক) */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-[#002B36] text-[#C6EB71] text-[10px] font-bold rounded opacity-0 group-hover/track:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-xl">
                          View Live Location
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-bottom-[#002B36]"></div>
                        </div>
                      </Link>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-center">
                    {isPaid ? (
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[11px] font-black uppercase tracking-tighter">
                          Paid
                        </span>
                      </div>
                    ) : (
                      <Link href={`/dashboard/payment/${parcel._id}`}>
                        <button className="flex items-center gap-1.5 px-2.5 py-1 mx-auto bg-[#002B36] text-[#C6EB71] rounded-lg hover:bg-black transition-all active:scale-95 shadow-sm">
                          <LuCreditCard size={13} />
                          <span className="text-[11px] font-black uppercase tracking-tighter">
                            Pay Now
                          </span>
                        </button>
                      </Link>
                    )}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`text-[11px] font-black uppercase px-2 py-0.5 rounded-md tracking-tighter border ${
                        parcel.DeliveryStatus === "delivered"
                          ? "bg-blue-50 text-blue-600 border-blue-100"
                          : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}
                    >
                      {parcel.DeliveryStatus}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <ParcelButton parcel={parcel} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParcelCard;
