"use client";

import axios from "axios";
import React, { useState } from "react";
import { FiLoader, FiUserPlus } from "react-icons/fi";
import { toast } from "react-toastify";

const AssignRiderModalTable = ({ riders, selectedParcel }) => {
  const [assigningId, setAssigningId] = useState(null);

  const handleAssignRider = async (rider) => {
    try {
      setAssigningId(rider._id);

      const riderAssignInfo = {
        riderId: rider._id,
        riderEmail: rider.email,
        riderName: rider.name,
        parcelId: selectedParcel._id,
        trackingId: selectedParcel.trackingId,
      };

      const res = await axios.patch(
        `/api/parcels/${selectedParcel._id}`,
        riderAssignInfo,
      );

      if (res.data.success) {
        toast.success("Rider Assign Successfully");

        document.getElementById("assign_rider_modal")?.close();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to assign rider");
    } finally {
      setAssigningId(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-[11px] text-gray-400 font-bold border-b border-gray-100">
            <th className="py-3 w-12">#</th>
            <th className="py-3">Name</th>
            <th className="py-3">Email</th>
            <th className="py-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {riders.map((rider, index) => (
            <tr
              key={rider._id}
              className="border-b border-gray-100 hover:bg-gray-50 transition"
            >
              <td className="py-4 text-sm font-bold text-gray-700">
                {index + 1}
              </td>

              <td className="py-4">
                <div>
                  <p className="text-sm font-bold text-gray-700">
                    {rider.name}
                  </p>

                  <p className="text-[11px] text-gray-400">{rider.contact}</p>
                </div>
              </td>

              <td className="py-4 text-sm text-gray-600">{rider.email}</td>

              <td className="py-4 text-center">
                <button
                  disabled={assigningId === rider._id}
                  onClick={() => handleAssignRider(rider)}
                  className="min-w-[130px] justify-center px-5 py-2 rounded-md bg-[#C6EB71] text-[#002B36] text-xs font-black hover:bg-[#b4dc55] transition inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {assigningId === rider._id ? (
                    <>
                      <FiLoader className="animate-spin" size={14} />
                      Assigning...
                    </>
                  ) : (
                    <>
                      <FiUserPlus size={14} />
                      <span className="uppercase tracking-tighter">
                        Assign Rider
                      </span>
                    </>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignRiderModalTable;
