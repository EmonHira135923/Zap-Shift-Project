"use client";
import React, { useState } from "react";
import useAssignRider from "@/Componets/utils/Hooks/useAssignRider";
import useAuth from "@/Componets/utils/Hooks/useAuth";
import Pagination from "@/Componets/Shared/Pagination";
import { FiSearch, FiTruck, FiUserPlus, FiAlertCircle } from "react-icons/fi";
import AssignRiderPageSkeleton from "@/Componets/Skeltons/AssignRiderPageSkeleton";

const Assignriderpage = () => {
  const { user, loading: authLoading } = useAuth();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } = useAssignRider(
    search,
    page,
    !!user?.email,
    user?.email
  );

  // আপনার API রেসপন্স অনুযায়ী ডাটা এক্সেস করুন
  // সাধারণত আপনার আগের প্রজেক্টে data.message এ লিস্ট থাকত
  const parcels = data?.message || data?.data || data?.result || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / 10) || 1;

  const errorMessage =
    error?.response?.data?.error ||
    error?.response?.data?.message ||
    error?.message;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-10 pb-20 bg-[#F8FAFC] min-h-screen">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#002B36] text-[#C6EB71] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
            <FiTruck /> Dispatch Center
          </div>
          <h1 className="text-4xl font-black text-[#002B36] tracking-tight">
            Assign <span className="text-[#98B42C]">Rider</span>
          </h1>
          <p className="text-gray-400 text-xs font-bold italic">
            List of parcels waiting for pickup assignment
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative group w-full lg:w-96">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#98B42C] transition-colors" />
          <input
            type="text"
            placeholder="Search by Parcel ID or Name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm outline-none focus:ring-4 focus:ring-[#C6EB71]/20 focus:border-[#C6EB71] transition-all text-sm"
          />
        </div>
      </div>

      {/* --- Table Section --- */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden relative">
        {isFetching && (
            <div className="absolute top-0 left-0 w-full h-0.5 bg-[#C6EB71] animate-pulse" />
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Parcel Info</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Weight</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Cost</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {authLoading || isLoading ? (
                <AssignRiderPageSkeleton />
              ) : error ? (
                <tr>
                  <td colSpan="5" className="px-6 py-24 text-center">
                    <FiAlertCircle size={40} className="mx-auto text-red-200 mb-4" />
                    <p className="text-red-500 font-bold text-sm">
                      Could not load parcels.
                    </p>
                    <p className="text-gray-400 text-xs mt-2">{errorMessage}</p>
                  </td>
                </tr>
              ) : parcels.length > 0 ? (
                parcels.map((p) => (
                  <tr key={p._id} className="group hover:bg-gray-50/40 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-800 text-sm">{p.parcelName}</p>
                      <p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">ID: {p._id?.slice(-8)}</p>
                    </td>
                    <td className="px-6 py-4 text-center text-xs font-bold text-gray-500">{p.parcelWeight}kg</td>
                    <td className="px-6 py-4 text-center text-xs font-black text-[#98B42C]">${p.cost}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-100 rounded-md tracking-tighter">
                        {!p.DeliveryStatus ||
                        p.DeliveryStatus === "peanding pickup"
                          ? "pending pickup"
                          : p.DeliveryStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#002B36] text-[#C6EB71] rounded-xl hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200">
                        <FiUserPlus size={14} />
                        <span className="text-[10px] font-black uppercase tracking-tighter">Assign Rider</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-32 text-center">
                    <FiAlertCircle size={40} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-gray-400 font-bold text-sm">No pending parcels found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10">
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      )}
    </div>
  );
};

export default Assignriderpage;
