"use client";
import React, { useState } from "react";
import ParcelCard from "@/Componets/cards/ParcelCard";
import { ParcelSkeleton } from "@/Componets/Skeltons/ParcelSkeleton";
import useAuth from "@/Componets/utils/Hooks/useAuth";
import useParcels from "@/Componets/utils/Hooks/useParcels";
import { FiSearch, FiPackage, FiTruck } from "react-icons/fi";
import Pagination from "@/Componets/Shared/Pagination";

const AllParcel = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useParcels(user?.email, search, page);

  const parcels = data?.message || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / 10);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-10 pb-20 bg-[#F8FAFC] min-h-screen">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#C6EB71] text-[#002B36] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <FiTruck /> Logistics Tracker
          </div>
          <h1 className="text-5xl font-black text-[#002B36] tracking-tight">
            My <span className="text-[#98B42C]">Parcels</span>
          </h1>
          <p className="text-gray-400 font-medium italic">
            Real-time tracking and delivery lifecycle management
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          {/* Modern Search Bar */}
          <div className="relative group w-full sm:w-80">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#98B42C] transition-colors" />
            <input
              type="text"
              placeholder="Search by Parcel ID..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-12 pr-10 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm outline-none focus:ring-4 focus:ring-[#C6EB71]/20 focus:border-[#C6EB71] transition-all"
            />
          </div>

          {/* Stats Card */}
          <div className="bg-[#002B36] px-8 py-4 rounded-2xl shadow-xl shadow-[#002B36]/10 flex flex-col items-center justify-center min-w-[140px] w-full sm:w-auto">
            <span className="text-[10px] text-[#C6EB71] font-bold uppercase tracking-tighter leading-none mb-1">Total Parcels</span>
            <span className="text-2xl font-black text-white leading-none">{total}</span>
          </div>
        </div>
      </div>

      {/* --- Content Area --- */}
      <div className="relative min-h-[400px]">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ParcelSkeleton />
            <ParcelSkeleton />
            <ParcelSkeleton />
          </div>
        ) : parcels.length > 0 ? (
          <div className="bg-white/50 backdrop-blur-sm p-8 rounded-[3rem] border border-gray-100 shadow-inner">
             {/* Note: Ensure ParcelCard handles the grid layout internally or wrap it */}
            <ParcelCard parcels={parcels} />
          </div>
        ) : (
          <div className="py-32 text-center bg-white rounded-[3rem] border border-dashed border-gray-200 shadow-sm">
            <div className="inline-flex p-8 bg-[#F8FAFC] rounded-full mb-6">
              <FiPackage size={48} className="text-gray-200" />
            </div>
            <h2 className="text-2xl font-bold text-[#002B36]">No Parcels Found</h2>
            <p className="text-gray-400 mt-2 max-w-xs mx-auto">
              Your delivery list is empty. Start a new shipment to track it here!
            </p>
          </div>
        )}
      </div>

      <div className="mt-12">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
};

export default AllParcel;