"use client";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { LuEye, LuPencilLine, LuTrash2 } from "react-icons/lu";
import { toast } from "react-toastify";
import axios from "axios";

const ParcelButton = ({ parcel }) => {
  const { _id, parcelName, paymentStatus } = parcel; // paymentStatus নিয়ে আসলাম
  const queryClient = useQueryClient();

  const isPaid = paymentStatus === "paid"; // চেক করছি পেইড কি না

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
    <div className="inline-flex items-center justify-end gap-2 w-full">
      {/* View Button - সবসময় চালু থাকবে */}
      <Link
        href={`/dashboard/parcels/${_id}`}
        title="View Details"
        className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm flex-shrink-0"
      >
        <LuEye size={16} />
      </Link>

      {/* Edit Button - পেইড হলে ডিসেবল */}
      {isPaid ? (
        <span 
          title="Paid parcels cannot be edited"
          className="p-2.5 bg-gray-100 text-gray-400 rounded-xl cursor-not-allowed shadow-sm flex-shrink-0"
        >
          <LuPencilLine size={16} />
        </span>
      ) : (
        <Link
          href={`/dashboard/parcels/update-parcel/${_id}`}
          title="Edit Parcel"
          className="p-2.5 bg-orange-50 text-orange-600 rounded-xl hover:bg-orange-600 hover:text-white transition-all shadow-sm flex-shrink-0"
        >
          <LuPencilLine size={16} />
        </Link>
      )}

      {/* Delete Button - পেইড হলে ডিসেবল */}
      <button
        onClick={() => !isPaid && document.getElementById(`modal_${_id}`).showModal()}
        disabled={isPaid}
        title={isPaid ? "Paid parcels cannot be deleted" : "Delete Parcel"}
        className={`p-2.5 rounded-xl transition-all shadow-sm flex-shrink-0 ${
          isPaid 
            ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
            : "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
        }`}
      >
        <LuTrash2 size={16} />
      </button>

      {/* DaisyUI Confirmation Modal */}
      {!isPaid && (
        <dialog id={`modal_${_id}`} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-white rounded-[2rem]">
            <h3 className="font-black text-xl text-gray-800">Are you sure?</h3>
            <p className="py-4 text-gray-500 font-medium">
              Do you really want to delete <span className="text-red-500 font-bold">"{parcelName}"</span>?
            </p>
            <div className="modal-action gap-3">
              <form method="dialog" className="flex gap-2">
                <button className="btn bg-gray-100 hover:bg-gray-200 border-none text-gray-600 rounded-xl px-6">Cancel</button>
              </form>
              <button onClick={() => handleDelete(_id)} className="btn bg-red-500 hover:bg-red-600 border-none text-white rounded-xl px-6">
                Confirm Delete
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop"><button>close</button></form>
        </dialog>
      )}
    </div>
  );
};

export default ParcelButton;