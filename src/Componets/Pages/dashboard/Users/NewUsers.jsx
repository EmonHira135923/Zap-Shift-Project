"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { Mail, ShieldCheck, Send, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const NewUsers = () => {
    const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // TanStack Query Mutation ব্যবহার করে API কল
  const mutation = useMutation({
    mutationFn: async (userData) => {
      const response = await axios.post("/api/auth/invite", userData);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Invitation sent successfully!");
        reset();
        router.push("/dashboard/users");
      } else {
        toast.error(data.message || "Failed to send invitation");
      }
    },
    onError: (error) => {
      const errorMsg = error.response?.data?.message || "Something went wrong!";
      toast.error(errorMsg);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-2xl font-bold text-[#002B36]">Invite New Team Member</h2>
        <p className="text-gray-500 text-sm">Onboard staff by sending a secure link.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#002B36] uppercase ml-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              {...register("email", { 
                required: "Email is required", 
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } 
              })}
              type="email"
              placeholder="staff@zapshift.com"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#C6EB71] outline-none"
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Role Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#002B36] uppercase ml-1">Assign Permission Role</label>
          <div className="relative">
            <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              {...register("role", { required: "Role selection is required" })}
              className="w-full pl-12 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#C6EB71] outline-none appearance-none cursor-pointer text-gray-700"
            >
              <option value="user">User (Standard)</option>
              <option value="rider">Rider (Delivery Staff)</option>
              <option value="admin">Admin (Full Control)</option>
            </select>
            {/* Custom arrow for select */}
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                ▼
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-[#002B36] hover:bg-[#001f27] text-[#C6EB71] font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-70"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Sending Invitation...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>Send Invitation Link</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default NewUsers;