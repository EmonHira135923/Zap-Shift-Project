"use client";
import ParcelCard from "@/Componets/cards/ParcelCard";
import { ParcelSkeleton } from "@/Componets/Skeltons/ParcelSkeleton";
import useAuth from "@/Componets/utils/Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const AllParcel = () => {
  const { user } = useAuth();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/api/parcels?email=${user?.email}`);
      return res.data.message;
    },
  });

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            My Parcels
          </h1>
          <p className="text-gray-500 font-medium">
            Manage and track your delivery status
          </p>
        </div>
        <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            Total
          </span>
          <span className="text-xl font-black text-[#98B42C]">
            {parcels.length}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full">
        {isLoading ? (
          <ParcelSkeleton />
        ) : parcels.length > 0 ? (
          <ParcelCard parcels={parcels} />
        ) : (
          <div className="py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
            <p className="text-gray-400 font-medium text-lg">
              No parcels found in your account.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllParcel;
