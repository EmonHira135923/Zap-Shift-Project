"use client";
import React, { useState } from "react";
import useAuth from "@/Componets/utils/Hooks/useAuth";
import useDeliveryParcel from "@/Componets/utils/Hooks/useDeliveryParcel";
import Pagination from "@/Componets/Shared/Pagination";
import CompletedDeliveryTable from "@/Componets/cards/CompletedDeliveryTable";

const CompleteDeliveryPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useDeliveryParcel({
    riderEmail: user?.email,
    page,
    search,
    enabled: !!user?.email,
  });

  const parcels = data?.data || [];
  const totalPages = Math.ceil((data?.total || 0) / (data?.limit || 10));

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-10 pb-20 bg-[#F8FAFC] min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-[#002B36] tracking-tight">
          Completed <span className="text-emerald-500">Deliveries</span>
        </h1>
        <p className="text-gray-400 text-xs font-bold italic mt-2">
          History of all your successful deliveries
        </p>
      </div>

      <CompletedDeliveryTable
        parcels={parcels}
        isLoading={isLoading || authLoading}
        error={error}
        currentPage={page}
        itemsPerPage={data?.limit || 10}
      />

      {totalPages > 1 && (
        <div className="mt-10">
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      )}
    </div>
  );
};

export default CompleteDeliveryPage;
