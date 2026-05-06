"use client";

import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

const AssignDeliveryButton = ({ parcel }) => {
  const [loadingAction, setLoadingAction] = useState("");
  const [pendingAction, setPendingAction] = useState("");
  const [localStatus, setLocalStatus] = useState(null);

  const queryClient = useQueryClient();

  const modalId = `delivery_confirm_modal_${parcel?._id}`;
  const currentStatus = localStatus ?? parcel?.DeliveryStatus;
  const normalizedStatus = String(currentStatus || "").trim().toLowerCase();
  const isAcceptedDelivery = ["accepted", "rider arriving"].includes(
    normalizedStatus,
  );
  const isRejectedDelivery = normalizedStatus === "rejected";

  const openConfirmModal = (action) => {
    setPendingAction(action);
    document.getElementById(modalId)?.showModal();
  };

  const closeConfirmModal = () => {
    if (loadingAction) return;

    document.getElementById(modalId)?.close();
    setPendingAction("");
  };

  const handleDeliveryAction = async () => {
    if (!pendingAction) return;

    try {
      setLoadingAction(pendingAction);

      const res = await axios.patch(`/api/parcels/${parcel._id}/status`, {
        action: pendingAction,
      });

      if (res.data.success) {
        const newStatus =
          res.data.DeliveryStatus ||
          (pendingAction === "accept" ? "accepted" : "rejected");

        setLocalStatus(newStatus);

        toast.success(
          pendingAction === "accept"
            ? "Delivery Accepted Successfully"
            : "Delivery Rejected Successfully",
        );

        document.getElementById(modalId)?.close();
        setPendingAction("");

        queryClient.invalidateQueries({
          queryKey: ["assigned-delivery"],
          exact: false,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoadingAction("");
    }
  };

  if (isAcceptedDelivery) {
    return (
      <div className="flex justify-end">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C6EB71]/30 border border-[#C6EB71]/60 text-[#002B36] text-[10px] font-black uppercase tracking-wider">
          <FiCheckCircle size={14} />
          Accepted
        </span>
      </div>
    );
  }

  if (isRejectedDelivery) {
    return (
      <div className="flex justify-end">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 border border-red-100 text-red-500 text-[10px] font-black uppercase tracking-wider">
          <FiXCircle size={14} />
          Rejected
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        <button
          disabled={!!loadingAction}
          onClick={() => openConfirmModal("accept")}
          className="px-4 py-2 rounded-xl bg-[#C6EB71] text-[#002B36] text-[10px] font-black uppercase tracking-wider hover:bg-[#b4dc55] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Accept
        </button>

        <button
          disabled={!!loadingAction}
          onClick={() => openConfirmModal("reject")}
          className="px-4 py-2 rounded-xl bg-red-50 border border-red-100 text-red-500 text-[10px] font-black uppercase tracking-wider hover:bg-red-100 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reject
        </button>
      </div>

      <dialog
        id={modalId}
        className="modal modal-bottom sm:modal-middle"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            closeConfirmModal();
          }
        }}
        onCancel={(e) => {
          e.preventDefault();
          closeConfirmModal();
        }}
      >
        <div className="modal-box max-w-lg bg-white rounded-[2rem] p-8 text-center shadow-2xl">
          <div className="flex justify-center mb-5">
            <div
              className={
                pendingAction === "accept"
                  ? "w-16 h-16 rounded-full bg-[#C6EB71]/30 text-[#002B36] flex items-center justify-center"
                  : "w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center"
              }
            >
              {pendingAction === "accept" ? (
                <FiCheckCircle size={34} />
              ) : (
                <FiXCircle size={34} />
              )}
            </div>
          </div>

          <h3 className="font-black text-2xl text-[#002B36] mb-3">
            {pendingAction === "accept"
              ? "Accept Delivery?"
              : "Reject Delivery?"}
          </h3>

          <p className="text-sm text-gray-500 leading-6 max-w-sm mx-auto">
            Are you sure you want to{" "}
            <span
              className={
                pendingAction === "accept"
                  ? "font-black text-[#98B42C]"
                  : "font-black text-red-500"
              }
            >
              {pendingAction}
            </span>{" "}
            this parcel?
          </p>

          <div className="mt-6 bg-gray-50 border border-gray-100 rounded-2xl p-5 text-center">
            <p className="text-base font-black text-[#002B36]">
              {parcel?.parcelName}
            </p>

            <p className="text-xs text-gray-400 font-bold mt-2">
              Tracking ID:{" "}
              <span className="text-gray-500">{parcel?.trackingId}</span>
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Receiver:{" "}
              <span className="font-semibold text-gray-500">
                {parcel?.receiverName}
              </span>
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={closeConfirmModal}
              disabled={!!loadingAction}
              className="min-w-[110px] px-5 py-3 rounded-xl border border-gray-200 bg-white text-gray-500 text-xs font-black uppercase hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleDeliveryAction}
              disabled={!!loadingAction}
              className={
                pendingAction === "accept"
                  ? "min-w-[130px] px-5 py-3 rounded-xl bg-[#C6EB71] text-[#002B36] text-xs font-black uppercase hover:bg-[#b4dc55] transition-all disabled:opacity-50"
                  : "min-w-[130px] px-5 py-3 rounded-xl bg-red-500 text-white text-xs font-black uppercase hover:bg-red-600 transition-all disabled:opacity-50"
              }
            >
              {loadingAction
                ? pendingAction === "accept"
                  ? "Accepting..."
                  : "Rejecting..."
                : pendingAction === "accept"
                  ? "Yes, Accept"
                  : "Yes, Reject"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AssignDeliveryButton;
