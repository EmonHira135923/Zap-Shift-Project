"use client";
import React from "react";
import { LuPackage, LuDollarSign, LuCreditCard } from "react-icons/lu";
import Link from "next/link"; // Added Link for navigation
import ParcelButton from "../buttons/ParcelButton";

const ParcelCard = ({ parcels }) => {
  return (
    <div className="w-full bg-white border border-gray-100 rounded-[2.5rem] shadow-sm overflow-hidden">
      <div
        className="overflow-x-auto"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <table
          className="text-left border-collapse"
          style={{ minWidth: "600px", width: "100%" }}
        >
          <thead>
            <tr className="bg-gray-50/50">
              <th
                className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]"
                style={{ width: "56px" }}
              >
                No
              </th>
              <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Parcel Info
              </th>
              <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">
                Price
              </th>
              <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">
                Payment Status
              </th>
              <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">
                Delivery Status
              </th>
              <th
                className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] text-right"
                style={{ width: "140px" }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {parcels.map((parcel, index) => {
              // Logic for Payment Status Colors
              const isPaid = parcel.paymentStatus?.toLowerCase() === "paid";

              return (
                <tr
                  key={parcel._id}
                  className="group hover:bg-gray-50/50 transition-colors"
                >
                  {/* Serial Number */}
                  <td className="px-6 py-4" style={{ width: "56px" }}>
                    <span className="text-sm font-bold text-gray-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </td>

                  {/* Parcel Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#F3FCE2] rounded-xl flex items-center justify-center text-[#98B42C] shrink-0">
                        <LuPackage size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">
                          {parcel.parcelName}
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                          {parcel.parcelType} • {parcel.parcelWeight}kg
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#D4F06D]/10 rounded-full">
                      <LuDollarSign size={12} className="text-[#98B42C]" />
                      <span className="text-sm font-black text-gray-800">
                        {parcel.cost}
                      </span>
                    </div>
                  </td>

                  {/* Payment Status (Conditional) */}
                  <td className="px-6 py-4 text-center">
                    {isPaid ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                        <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                        <span className="text-[10px] font-bold uppercase tracking-wide">
                          Paid
                        </span>
                      </div>
                    ) : (
                      <Link href={`/dashboard/payment/${parcel._id}`}>
                        <button className="group flex items-center gap-2 px-3 py-1.5 mx-auto bg-white border border-gray-200 hover:border-[#98B42C] hover:bg-[#98B42C]/5 rounded-lg transition-all duration-200">
                          <LuCreditCard
                            size={14}
                            className="text-gray-400 group-hover:text-[#98B42C] transition-colors"
                          />
                          <span className="text-[11px] font-bold text-gray-600 group-hover:text-[#98B42C] uppercase tracking-tight">
                            Pay Now
                          </span>
                        </button>
                      </Link>
                    )}
                  </td>

                  {/* Delivery Status */}
                  <td className="px-6 py-4 text-center">
                    <span className="text-[11px] font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                      {parcel.DeliveryStatus}
                    </span>
                  </td>

                  {/* Actions */}
                  <td
                    className="px-6 py-4 text-right"
                    style={{ width: "140px" }}
                  >
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
