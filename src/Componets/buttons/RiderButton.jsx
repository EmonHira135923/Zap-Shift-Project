"use client";

import React from "react";
import { FiCheck, FiX, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const RiderButton = ({ rider, user }) => {
  const queryClient = useQueryClient();
  const modalId = `delete_modal_${rider._id}`;

  // ১. লজিক সেটআপ
  const isRiderAdmin = rider?.role === "admin"; // তালিকার এই রাইডার কি নিজে একজন অ্যাডমিন?
  const isAccepted = rider.status?.toLowerCase() === "accepted";
  const isRejected = rider.status?.toLowerCase() === "rejected";

  const refreshData = () => queryClient.invalidateQueries(["Riders"]);

  // স্ট্যাটাস আপডেট হ্যান্ডলার
  const handleStatusUpdate = async (newStatus) => {
    // যদি রাইডার অ্যাডমিন হয়, তবে কোনো আপডেট হবে না
    if (isRiderAdmin)
      return toast.error("System Admins cannot be modified here!");

    try {
      const { data } = await axios.patch(`/api/riders/${rider._id}`, {
        status: newStatus,
      });
      if (data.success) {
        toast.success(`Rider marked as ${newStatus}`);
        refreshData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  // ডিলিট হ্যান্ডলার
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/riders/${rider._id}`);
      if (data.success) {
        toast.success("Rider removed successfully");
        document.getElementById(modalId)?.close();
        refreshData();
      }
    } catch (error) {
      toast.error("Failed to delete rider");
    }
  };

  // ডাইনামিক বাটন ক্লাস জেনারেটর
  const getBtnClass = (colorType, isDisabled) => {
    const base =
      "p-2 rounded-xl transition-all duration-200 shadow-sm active:scale-95";
    if (isDisabled)
      return `${base} bg-gray-100 text-gray-300 cursor-not-allowed shadow-none`;

    const colors = {
      green: "bg-green-50 text-green-600 hover:bg-green-600 hover:text-white",
      orange:
        "bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white",
      red: "bg-red-50 text-red-500 hover:bg-red-500 hover:text-white",
    };
    return `${base} ${colors[colorType]}`;
  };

  return (
    <div className="relative">
      <div className="flex justify-center gap-3">
        {/* Accept Button: ডিজেবল হবে যদি রাইডার অ্যাডমিন হয় অথবা অলরেডি একসেপ্টেড/রিজেক্টেড থাকে */}
        <button
          onClick={() => handleStatusUpdate("Accepted")}
          disabled={isRiderAdmin || isAccepted || isRejected}
          className={getBtnClass(
            "green",
            isRiderAdmin || isAccepted || isRejected,
          )}
          title={isRiderAdmin ? "Admin cannot be changed" : "Accept"}
        >
          <FiCheck size={18} />
        </button>

        {/* Reject Button: ডিজেবল হবে যদি রাইডার অ্যাডমিন হয় অথবা অলরেডি একসেপ্টেড/রিজেক্টেড থাকে */}
        <button
          onClick={() => handleStatusUpdate("Rejected")}
          disabled={isRiderAdmin || isAccepted || isRejected}
          className={getBtnClass(
            "orange",
            isRiderAdmin || isAccepted || isRejected,
          )}
          title={isRiderAdmin ? "Admin cannot be changed" : "Reject"}
        >
          <FiX size={18} />
        </button>

        {/* Delete Button: ডিজেবল হবে যদি রাইডার অ্যাডমিন হয় অথবা রাইডার অলরেডি একসেপ্টেড থাকে */}
        <button
          onClick={() =>
            !isRiderAdmin &&
            !isAccepted &&
            document.getElementById(modalId).showModal()
          }
          disabled={isRiderAdmin || isAccepted}
          className={getBtnClass("red", isRiderAdmin || isAccepted)}
          title={isRiderAdmin ? "Admin cannot be deleted" : "Delete"}
        >
          <FiTrash2 size={18} />
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {!isRiderAdmin && !isAccepted && (
        <dialog
          id={modalId}
          className="modal modal-bottom sm:modal-middle backdrop-blur-sm"
        >
          <div className="modal-box bg-white rounded-[2rem] p-10 text-center border border-gray-100">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <FiTrash2 size={40} />
            </div>
            <h3 className="font-black text-2xl text-[#002B36] mb-2">
              Delete Rider?
            </h3>
            <p className="text-gray-500 mb-8">
              Are you sure you want to remove <b>{rider.name}</b>?
            </p>
            <div className="flex gap-4">
              <form method="dialog" className="flex-1">
                <button className="btn w-full bg-gray-100 border-none text-gray-500 rounded-2xl">
                  Cancel
                </button>
              </form>
              <button
                onClick={handleDelete}
                className="btn flex-[1.5] bg-red-500 border-none text-white rounded-2xl hover:bg-red-600 shadow-lg shadow-red-200"
              >
                Yes, Delete
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default RiderButton;
