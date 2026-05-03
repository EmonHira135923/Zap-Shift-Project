"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "@/Componets/utils/Hooks/useAuth";
import { RiderTableSkeleton } from "@/Componets/Skeltons/RiderTableSkeleton";
import RiderButton from "@/Componets/buttons/RiderButton";

const AllRiderpage = () => {
  const { user } = useAuth();

  const { data: riders = [], isLoading } = useQuery({
    queryKey: ["Riders", user?.email],
    queryFn: async () => {
      const res = await axios.get("/api/riders");
      return res.data.data || res.data.result;
    },
  });

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#002B36]">
              Rider Management
            </h1>
            <p className="text-gray-500">
              View and manage all rider applications
            </p>
          </div>
          <div className="bg-white px-6 py-2 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-sm font-semibold text-gray-400">Total: </span>
            <span className="text-xl font-bold text-[#002B36]">
              {riders.length}
            </span>
          </div>
        </header>

        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase">
                    Rider Name
                  </th>
                  <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase">
                    Contact Info
                  </th>
                  <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase">
                    Vehicle
                  </th>
                  <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase">
                    Location
                  </th>
                  <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase">
                    Status
                  </th>
                  <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <RiderTableSkeleton />
                ) : (
                  riders.map((rider) => (
                    <tr
                      key={rider._id}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-5 px-6">
                        <div className="font-bold text-[#002B36]">
                          {rider.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          Age: {rider.age}
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="text-sm text-gray-600">
                          {rider.email}
                        </div>
                        <div className="text-sm text-gray-500">
                          {rider.contact}
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold">
                          {rider.vehicle}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-sm text-gray-600">
                        {rider.district}
                      </td>
                      <td className="py-5 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                            rider.status === "pending"
                              ? "bg-orange-100 text-orange-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {rider.status}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        {/* Action Button */}
                        <RiderButton rider={rider} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!isLoading && riders.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400">No rider applications found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllRiderpage;
