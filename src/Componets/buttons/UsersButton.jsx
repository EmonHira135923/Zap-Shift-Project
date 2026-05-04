import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const UsersButton = ({ user, isDisabled }) => {
  const queryClient = useQueryClient();

  // চেক করুন ইউজারটি অ্যাডমিন কি না
  const isAdmin = user?.role === "admin";

  const handleDelete = async (id) => {
    // সেফটি চেক: যদি কোনোভাবে বাটন ক্লিক হয়, ফাংশন কাজ করবে না
    if (isAdmin) {
      toast.error("Admin accounts cannot be deleted!");
      return;
    }

    try {
      const res = await axios.delete(`/api/auth/register/${id}`);
      if (res.data) {
        toast.success("User deleted successfully!");
        queryClient.invalidateQueries(["users"]);
        document.getElementById(`delete_modal_${id}`).close();
      }
    } catch (error) {
      // সার্ভার থেকে আসা নির্দিষ্ট এরর মেসেজ দেখানো
      const errorMsg = error.response?.data?.message || "Failed to delete user";
      toast.error(errorMsg);
      console.error(error);
    }
  };

  return (
    <div className="flex justify-end gap-2">
      {/* View Link */}
      <Link
        href={`/dashboard/users/${user?._id}`}
        className="p-2 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors"
        title="View"
      >
        <FaEye size={14} />
      </Link>

      {/* * --- Edit Button/Link (Disabled if user is Rider) --- */}
      {isDisabled ? (
        <button
          disabled
          className="p-2 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed opacity-70"
          title="Rider cannot be edited"
        >
          <FaEdit size={14} />
        </button>
      ) : (
        <Link
          href={`/dashboard/users/update-users/${user?._id}`}
          className="p-2 rounded-lg bg-orange-50 text-orange-500 hover:bg-orange-100 transition-colors"
          title="Edit"
        >
          <FaEdit size={14} />
        </Link>
      )}

      {/* Delete Button (Disabled for Admins) */}
      <button
        onClick={() =>
          document.getElementById(`delete_modal_${user?._id}`).showModal()
        }
        disabled={isAdmin} // অ্যাডমিন হলে বাটন ডিজেবল থাকবে
        className={`p-2 rounded-lg transition-colors ${
          isAdmin
            ? "bg-gray-100 text-gray-400 cursor-not-allowed" // ডিজেবল লুক
            : "bg-red-50 text-red-500 hover:bg-red-100"
        }`}
        title={isAdmin ? "Cannot delete admin" : "Delete"}
      >
        <FaTrashAlt size={14} />
      </button>

      {/* --- DaisyUI Confirmation Modal --- */}
      {!isAdmin && ( // অ্যাডমিন হলে মোডাল রেন্ডার করার প্রয়োজন নেই
        <dialog
          id={`delete_modal_${user?._id}`}
          className="modal modal-bottom sm:modal-middle text-left"
        >
          <div className="modal-box bg-white">
            <h3 className="font-bold text-lg text-slate-800">
              Confirm Deletion
            </h3>
            <p className="py-4 text-slate-500">
              Are you sure you want to delete{" "}
              <span className="font-bold text-red-500">{user?.name}</span>? This
              action cannot be undone.
            </p>
            <div className="modal-action flex gap-2">
              <form method="dialog">
                <button className="btn btn-ghost rounded-xl">Cancel</button>
              </form>
              <button
                onClick={() => handleDelete(user?._id)}
                className="btn bg-red-500 hover:bg-red-600 text-white border-none rounded-xl"
              >
                Confirm Delete
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

export default UsersButton;
