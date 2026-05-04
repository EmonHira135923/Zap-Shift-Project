"use client";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { LuEye, LuPencilLine, LuTrash2 } from "react-icons/lu";
import { toast } from "react-toastify";
import axios from "axios";

const ParcelButton = ({ parcel }) => {
  const { _id, parcelName, paymentStatus } = parcel;
  const queryClient = useQueryClient();

  const isPaid = paymentStatus?.toLowerCase() === "paid";

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/parcels/${id}`);
      if (res.data) {
        toast.success("Parcel deleted successfully!");
        queryClient.invalidateQueries(["parcels"]);
        document.getElementById(`modal_${id}`).close();
      }
    } catch (error) {
      toast.error("Failed to delete parcel");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2 pr-2">
      {/* View Button */}
      <Link
        href={`/dashboard/parcels/${_id}`}
        title="View Details"
        className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center shadow-sm shrink-0"
      >
        <LuEye size={18} />
      </Link>

      {/* Edit Button */}
      {isPaid ? (
        <span 
          title="Paid parcels cannot be edited"
          className="w-10 h-10 bg-gray-50 text-gray-300 rounded-xl cursor-not-allowed flex items-center justify-center shrink-0 border border-gray-100"
        >
          <LuPencilLine size={18} />
        </span>
      ) : (
        <Link
          href={`/dashboard/parcels/update-parcel/${_id}`}
          title="Edit Parcel"
          className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-600 hover:text-white transition-all flex items-center justify-center shadow-sm shrink-0"
        >
          <LuPencilLine size={18} />
        </Link>
      )}

      {/* Delete Button */}
      <button
        onClick={() => !isPaid && document.getElementById(`modal_${_id}`).showModal()}
        disabled={isPaid}
        title={isPaid ? "Paid parcels cannot be deleted" : "Delete Parcel"}
        className={`w-10 h-10 rounded-xl transition-all flex items-center justify-center shadow-sm shrink-0 ${
          isPaid 
            ? "bg-gray-50 text-gray-300 cursor-not-allowed border border-gray-100" 
            : "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
        }`}
      >
        <LuTrash2 size={18} />
      </button>

      {/* --- DaisyUI Modal (Optimized) --- */}
      {!isPaid && (
        <dialog id={`modal_${_id}`} className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
          <div className="modal-box bg-white p-8 rounded-[2.5rem] border border-gray-100 text-center">
            {/* Warning Icon */}
            <div className="mx-auto w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
              <LuTrash2 size={32} />
            </div>
            
            <h3 className="font-black text-2xl text-[#002B36] tracking-tight">Confirm Deletion</h3>
            
            <p className="py-4 text-gray-500 font-medium leading-relaxed">
              Are you sure you want to delete <br />
              <span className="text-red-500 font-bold block mt-1">"{parcelName}"</span>
              This action cannot be undone.
            </p>

            <div className="modal-action flex justify-center gap-3 mt-6">
              <form method="dialog" className="flex gap-3 w-full">
                <button className="flex-1 btn bg-gray-100 hover:bg-gray-200 border-none text-gray-600 rounded-2xl h-14 font-bold transition-all">
                  Cancel
                </button>
                <button 
                  type="button"
                  onClick={() => handleDelete(_id)} 
                  className="flex-1 btn bg-red-500 hover:bg-red-600 border-none text-white rounded-2xl h-14 font-bold shadow-lg shadow-red-200 transition-all"
                >
                  Delete Now
                </button>
              </form>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop bg-[#002B36]/20">
            <button className="cursor-default">close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default ParcelButton;