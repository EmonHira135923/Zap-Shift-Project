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

                  <td className="px-5 py-4 text-center">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md">
                      <LuHash size={11} />
                      <span className="text-[11px] font-black tracking-wider uppercase">
                        {parcel.trackingId}
                      </span>
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
