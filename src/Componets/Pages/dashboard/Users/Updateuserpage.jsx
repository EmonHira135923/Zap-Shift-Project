"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaUserShield, FaUserEdit, FaSave, FaSpinner, FaChevronLeft, FaExclamationTriangle } from "react-icons/fa";

const Updateuserpage = () => {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState(null);

  // ১. React Hook Form কনফিগারেশন
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ২. TanStack Query দিয়ে ইউজার ডাটা ফেচ করা
  const { data: user, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await axios.get(`/api/auth/register/${id}`);
      return res.data.message;
    },
    enabled: !!id,
  });

  // ৩. ডাটা লোড হলে ফর্মের ডিফল্ট ভ্যালু সেট করা
  useEffect(() => {
    if (user) {
      reset({ role: user.role });
    }
  }, [user, reset]);

  // ৪. TanStack Mutation দিয়ে ডাটা আপডেট করা
  const mutation = useMutation({
    mutationFn: async (updateData) => {
      const res = await axios.patch(`/api/auth/register/${id}`, updateData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("User role updated successfully!");
      queryClient.invalidateQueries(["users"]);
      // মোডাল ক্লোজ করা
      document.getElementById("update_confirm_modal").close();
      router.push("/dashboard/users");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Update failed");
      document.getElementById("update_confirm_modal").close();
    },
  });

  // ৫. ফর্ম সাবমিট হ্যান্ডলার (প্রথমে মোডাল দেখাবে)
  const preSubmit = (data) => {
    setFormData(data);
    document.getElementById("update_confirm_modal").showModal();
  };

  // চূড়ান্ত কনফার্মেশন হ্যান্ডলার
  const confirmUpdate = () => {
    if (formData) {
      mutation.mutate({ role: formData.role });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-slate-50">
        <FaSpinner className="animate-spin text-blue-600 text-4xl mb-4" />
        <p className="text-slate-500 font-medium">Fetching User Data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 flex justify-center items-start">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm">
        
        {/* Header */}
        <div className="flex items-center gap-5 mb-10">
          <div className="p-4 bg-blue-50 rounded-2xl text-blue-600">
            <FaUserEdit size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Access Control</h1>
            <p className="text-slate-500 text-sm font-medium">Update permissions for {user?.name}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(preSubmit)} className="space-y-6 text-left">
          {/* Email Info */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:bg-slate-100/50">
            <p className="text-[10px] uppercase tracking-[2px] text-slate-400 font-black mb-1">Account Email</p>
            <p className="text-slate-700 font-medium break-all">{user?.email}</p>
          </div>

          {/* Role Selection */}
          <div className="space-y-3">
            <label className="text-xs uppercase tracking-widest font-bold text-slate-500 flex items-center gap-2">
              <FaUserShield size={14} className="text-blue-600" /> Security Role
            </label>
            <select
              {...register("role", { required: "Role is required" })}
              className={`w-full bg-white border-2 ${
                errors.role ? "border-red-500" : "border-slate-200"
              } text-slate-700 p-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all cursor-pointer`}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="Rider">Rider</option>
            </select>
            {errors.role && <span className="text-red-500 text-xs font-bold">{errors.role.message}</span>}
          </div>

          {/* Buttons */}
          <div className="pt-6 flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-4 rounded-2xl font-bold text-sm bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] py-4 rounded-2xl font-black text-sm bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
            >
              <FaSave size={16} /> Update Access
            </button>
          </div>
        </form>

        {/* --- Update Confirmation Modal --- */}
        <dialog id="update_confirm_modal" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-white text-left p-8 rounded-3xl border border-slate-100 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-amber-50 rounded-xl text-amber-500">
                <FaExclamationTriangle size={24} />
              </div>
              <h3 className="font-bold text-xl text-slate-800 italic">Confirm Update!</h3>
            </div>
            
            <p className="text-slate-500 leading-relaxed">
              Are you sure you want to change the role of <span className="font-bold text-slate-800">{user?.name}</span>? 
              This will grant them new permissions immediately.
            </p>

            <div className="modal-action flex gap-3 mt-8">
              <form method="dialog" className="flex-1">
                <button className="w-full btn btn-ghost bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl border-none">No, Go Back</button>
              </form>
              <button
                disabled={mutation.isPending}
                onClick={confirmUpdate}
                className="flex-[2] btn bg-blue-600 hover:bg-blue-700 text-white border-none rounded-2xl shadow-lg shadow-blue-600/20"
              >
                {mutation.isPending ? <FaSpinner className="animate-spin" /> : "Yes, Update Now"}
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

      </div>
    </div>
  );
};

export default Updateuserpage;