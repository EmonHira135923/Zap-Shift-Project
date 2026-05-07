"use client";

import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CheckCircle2, PackageCheck } from "lucide-react";
import React, { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const AssignDeliveryButton2 = ({ parcel }) => {
  const [loadingAction, setLoadingAction] = useState("");
  const [localStatus, setLocalStatus] = useState(null);

  const [pendingAction, setPendingAction] = useState(null);
  const modalId = `modal_${parcel._id}`;

  const queryClient = useQueryClient();
  const currentStatus = localStatus ?? parcel?.DeliveryStatus;
  const normalizedStatus = String(currentStatus || "")
    .trim()
    .toLowerCase();

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

      const res = await axios.patch(`/api/parcels/${parcel._id}/status`, {
        action: pendingAction,
      });

      if (res.data.success) {
        toast.success(
          pendingAction === "pickup"
            ? "Parcel Picked Up Successfully"
            : "Parcel Delivered Successfully",
        );

        // --- মূল পরিবর্তন এখানে ---
        if (pendingAction === "deliver") {
          // যদি অ্যাকশন 'deliver' হয়, তবে ক্যাশ থেকে এই পার্সেলটি রিমুভ করে দিন
          queryClient.setQueryData(["assigned-delivery"], (oldData) => {
            if (!oldData) return [];
            // লজিক: শুধু সেই পার্সেলগুলো রাখুন যেগুলোর আইডি বর্তমান আইডি'র সমান নয়
            return oldData.filter((p) => p._id !== parcel._id);
          });
        } else {
          // যদি শুধু পিকআপ হয়, তবে লোকাল স্ট্যাটাস আপডেট করুন
          setLocalStatus("picked up");
        }

        // সার্ভার থেকে লেটেস্ট ডেটা সিঙ্ক করার জন্য রিফেচ করুন
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
      {/* Buttons */}
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

      {/* Confirmation Modal */}
      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl border border-gray-100">
          <div className="mb-5 flex justify-center">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
                pendingAction === "pickup"
                  ? "bg-amber-100 text-amber-600"
                  : "bg-emerald-100 text-emerald-600"
              }`}
            >
              {pendingAction === "pickup" ? (
                <PackageCheck size={32} />
              ) : (
                <AiFillCheckCircle size={32} />
              )}
            </div>
          </div>

          <h3 className="mb-2 text-xl font-black text-slate-800">
            {pendingAction === "pickup"
              ? "Confirm Pickup?"
              : "Mark as Delivered?"}
          </h3>

          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            Are you sure you want to update status to{" "}
            <span className="font-bold text-slate-700 capitalize">
              {pendingAction === "pickup" ? "Picked Up" : "Delivered"}
            </span>
            ?
            {pendingAction === "deliver" &&
              " This will remove the parcel from your active list."}
          </p>

          <div className="mb-8 rounded-2xl bg-gray-50 p-4 border border-gray-100 text-left">
            <p className="text-sm font-bold text-slate-700">
              {parcel?.parcelName}
            </p>
            <p className="text-xs text-gray-500">ID: {parcel?.trackingId}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={closeConfirmModal}
              className="flex-1 rounded-xl border border-gray-200 py-3 text-xs font-black uppercase text-gray-400"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleProgressAction}
              disabled={!!loadingAction}
              className={`flex-1 rounded-xl py-3 text-xs font-black uppercase text-white shadow-lg ${
                pendingAction === "pickup"
                  ? "bg-amber-500 shadow-amber-100"
                  : "bg-emerald-600 shadow-emerald-100"
              }`}
            >
              {loadingAction ? "Updating..." : "Yes, Confirm"}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={closeConfirmModal}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default AssignDeliveryButton2;
