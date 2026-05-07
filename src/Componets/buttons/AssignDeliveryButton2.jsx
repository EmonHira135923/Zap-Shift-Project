"use client";

import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CheckCircle2, PackageCheck } from "lucide-react";
import React, { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const AssignDeliveryButton2 = ({ parcel }) => {
  const [loadingAction, setLoadingAction] = useState("");
  const [pendingAction, setPendingAction] = useState(null);
  const modalId = `modal_${parcel._id}`;

  const queryClient = useQueryClient();
  const normalizedStatus = String(parcel?.DeliveryStatus || "").trim().toLowerCase();

  const canPickUp = ["accepted", "rider arriving"].includes(normalizedStatus);
  const canDeliver = normalizedStatus === "picked up";

  const openConfirmModal = (action) => {
    setPendingAction(action);
    const modal = document.getElementById(modalId);
    if (modal) modal.showModal();
  };

  const closeConfirmModal = () => {
    setPendingAction(null);
    const modal = document.getElementById(modalId);
    if (modal) modal.close();
  };

  const handleProgressAction = async () => {
    if (!pendingAction) return;

    try {
      setLoadingAction(pendingAction);

      // ফিক্স: trackingId বডিতে পাঠানো হয়েছে
      const res = await axios.patch(`/api/parcels/${parcel._id}/status`, {
        action: pendingAction,
        trackingId: parcel.trackingId, 
      });

      if (res.data.success) {
        toast.success(
          pendingAction === "pickup"
            ? "Parcel Picked Up Successfully"
            : "Parcel Delivered Successfully"
        );

        // ফিক্স: ইনভ্যালিডেট কুয়েরি (এটি করলে অটোমেটিক লিস্ট থেকে রিমুভ হয়ে যাবে এবং নতুন ডেটা আসবে)
        queryClient.invalidateQueries({
          queryKey: ["assigned-delivery"],
          exact: false,
        });

        closeConfirmModal();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoadingAction("");
    }
  };

  return (
    <div className="flex min-w-max items-center justify-end gap-3">
      <button
        type="button"
        disabled={!!loadingAction || !canPickUp}
        onClick={() => openConfirmModal("pickup")}
        className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3.5 text-[10px] font-black uppercase text-amber-700 transition-all hover:bg-amber-100 disabled:opacity-50"
      >
        <PackageCheck size={14} />
        <span>Pick Up</span>
      </button>

      <button
        type="button"
        disabled={!!loadingAction || !canDeliver}
        onClick={() => openConfirmModal("deliver")}
        className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 text-[10px] font-black uppercase text-white transition-all hover:bg-emerald-700 disabled:opacity-50"
      >
        <CheckCircle2 size={14} />
        <span>Delivered</span>
      </button>

      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl border border-gray-100">
          <div className="mb-5 flex justify-center">
             <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${pendingAction === 'pickup' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
              {pendingAction === "pickup" ? <PackageCheck size={32} /> : <AiFillCheckCircle size={32} />}
            </div>
          </div>
          <h3 className="mb-2 text-xl font-black text-slate-800">
            {pendingAction === "pickup" ? "Confirm Pickup?" : "Mark as Delivered?"}
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Update status to <b>{pendingAction === "pickup" ? "Picked Up" : "Delivered"}</b>?
          </p>
          <div className="flex items-center gap-3">
            <button type="button" onClick={closeConfirmModal} className="flex-1 rounded-xl border border-gray-200 py-3 text-xs font-black text-gray-400 uppercase">Cancel</button>
            <button 
                type="button" 
                onClick={handleProgressAction} 
                disabled={!!loadingAction} 
                className={`flex-1 rounded-xl py-3 text-xs font-black uppercase text-white ${pendingAction === 'pickup' ? 'bg-amber-500' : 'bg-emerald-600'}`}
            >
              {loadingAction ? "Updating..." : "Yes, Confirm"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignDeliveryButton2;