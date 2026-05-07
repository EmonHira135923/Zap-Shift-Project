"use client";

import useAssigndelivery from "@/Componets/utils/Hooks/useAssigndelivery";
import useAuth from "@/Componets/utils/Hooks/useAuth";
import React, { useState } from "react";
import { FiSearch, FiTruck } from "react-icons/fi";
import DeliveryAssignTable from "@/Componets/cards/DeliveryAssignTable";
import Pagination from "@/Componets/Shared/Pagination";

const DeliveryAssignRiderpage = () => {
  const { user, loading: authLoading } = useAuth();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } = useAssigndelivery({
    riderEmail: user?.email,
    search,
    page,
    enabled: !!user?.email,
  });

  const parcels = data?.data || [];
  const total = data?.total || 0;
  const itemsPerPage = data?.limit || 10;
  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-10 pb-20 bg-[#F8FAFC] min-h-screen">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#002B36] text-[#C6EB71] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
            <FiTruck /> Rider Delivery
          </div>

          <h1 className="text-4xl font-black text-[#002B36] tracking-tight">
            Assigned <span className="text-[#98B42C]">Deliveries</span>
          </h1>

          <p className="text-gray-400 text-xs font-bold italic">
            Parcels assigned to you for delivery
          </p>
        </div>

        <div className="relative group w-full lg:w-96">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#98B42C]" />

          <input
            type="text"
            placeholder="Search tracking ID, parcel, receiver..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm outline-none focus:ring-4 focus:ring-[#C6EB71]/20 focus:border-[#C6EB71] transition-all text-sm"
          />
        </div>
      </div>

      {isFetching && (
        <div className="h-1 bg-[#C6EB71] rounded-full animate-pulse mb-4" />
      )}

      <DeliveryAssignTable
        parcels={parcels}
        isLoading={isLoading || authLoading}
        error={error}
        currentPage={page}
        itemsPerPage={itemsPerPage}
      />

      {totalPages > 1 && (
        <div className="mt-10">
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      )}
    </div>
  );
};

export default DeliveryAssignRiderpage;
