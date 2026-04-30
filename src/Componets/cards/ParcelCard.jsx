"use client";
import React from "react";
import { LuPackage, LuDollarSign } from "react-icons/lu";
import ParcelButton from "../buttons/ParcelButton";

const ParcelCard = ({ parcels }) => {
  return (
    <div className="w-full bg-white border border-gray-100 rounded-[2.5rem] shadow-sm overflow-hidden">
      {/* Horizontal scroll wrapper — prevents table from breaking layout on mobile */}
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
              {/* Fixed width column — prevents buttons from stretching full width */}
              <th
                className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] text-right"
                style={{ width: "140px" }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {parcels.map((parcel, index) => (
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

                {/* Parcel Name & Type */}
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

                {/* Cost */}
                <td className="px-6 py-4 text-center">
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#D4F06D]/10 rounded-full">
                    <LuDollarSign size={12} className="text-[#98B42C]" />
                    <span className="text-sm font-black text-gray-800">
                      {parcel.cost}
                    </span>
                  </div>
                </td>

                {/* Actions — fixed width so buttons never stretch on mobile */}
                <td className="px-6 py-4" style={{ width: "140px" }}>
                  <ParcelButton parcel={parcel} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile swipe hint */}
      <div className="md:hidden bg-gray-50 py-2 text-center border-t border-gray-100">
        <p className="text-[10px] text-gray-400 font-bold uppercase animate-pulse">
          ← Swipe to see actions →
        </p>
      </div>
    </div>
  );
};

export default ParcelCard;