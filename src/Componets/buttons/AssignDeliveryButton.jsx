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
  const isPickedUpDelivery = normalizedStatus === "picked up";
  const isDeliveredDelivery = normalizedStatus === "delivered";
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
      <div className="flex justify-start">
        <span className="inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-full border border-[#C6EB71]/70 bg-[#C6EB71]/25 px-3.5 text-[10px] font-black uppercase tracking-wide text-[#002B36]">
          <FiCheckCircle size={14} />
          Accepted
        </span>
      </div>
    );
  }

  if (isRejectedDelivery) {
    return (
      <div className="flex justify-start">
        <span className="inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-full border border-red-100 bg-red-50 px-3.5 text-[10px] font-black uppercase tracking-wide text-red-500">
          <FiXCircle size={14} />
          Rejected
        </span>
      </div>
    );
  }

  if (isPickedUpDelivery) {
    return (
      <div className="flex justify-start">
        <span className="inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-full border border-sky-100 bg-sky-50 px-3.5 text-[10px] font-black uppercase tracking-wide text-sky-600">
          <FiCheckCircle size={14} />
          Picked Up
        </span>
      </div>
    );
  }

  if (isDeliveredDelivery) {
    return (
      <div className="flex justify-start">
        <span className="inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-full border border-emerald-100 bg-emerald-50 px-3.5 text-[10px] font-black uppercase tracking-wide text-emerald-600">
          <FiCheckCircle size={14} />
          Delivered
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-start gap-2">
        <button
          type="button"
          disabled={!!loadingAction}
          onClick={() => openConfirmModal("accept")}
          className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#C6EB71] px-3.5 text-[10px] font-black uppercase tracking-wide text-[#002B36] transition-all hover:bg-[#b4dc55] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FiCheckCircle size={13} />
          Accept
        </button>

        <button
          type="button"
          disabled={!!loadingAction}
          onClick={() => openConfirmModal("reject")}
          className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-full border border-red-100 bg-red-50 px-3.5 text-[10px] font-black uppercase tracking-wide text-red-500 transition-all hover:bg-red-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FiXCircle size={13} />
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
        <div className="modal-box max-w-lg rounded-2xl bg-white p-8 text-center shadow-2xl">
          <div className="mb-5 flex justify-center">
            <div
              className={
                pendingAction === "accept"
                  ? "flex h-16 w-16 items-center justify-center rounded-full bg-[#C6EB71]/30 text-[#002B36]"
                  : "flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500"
              }
            >
              {pendingAction === "accept" ? (
                <FiCheckCircle size={34} />
              ) : (
                <FiXCircle size={34} />
              )}
            </div>
          </div>

          <h3 className="mb-3 text-2xl font-black text-[#002B36]">
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

          <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center">
            <p className="text-base font-black text-[#002B36]">
              {parcel?.parcelName}
            </p>

            <p className="mt-2 text-xs font-bold text-gray-400">
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
              className="min-w-[110px] rounded-full border border-gray-200 bg-white px-5 py-3 text-xs font-black uppercase text-gray-500 transition-all hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleDeliveryAction}
              disabled={!!loadingAction}
              className={
                pendingAction === "accept"
                  ? "min-w-[130px] rounded-full bg-[#C6EB71] px-5 py-3 text-xs font-black uppercase text-[#002B36] transition-all hover:bg-[#b4dc55] disabled:opacity-50"
                  : "min-w-[130px] rounded-full bg-red-500 px-5 py-3 text-xs font-black uppercase text-white transition-all hover:bg-red-600 disabled:opacity-50"
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
