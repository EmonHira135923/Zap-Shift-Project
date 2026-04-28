"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import useAuth from "@/Componets/utils/Hooks/useAuth";
import { toast } from "react-toastify";
import { uploadToCloudinary } from "@/app/(Backend)/lib/cloudanry";
import Image from "next/image";

const Editpage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(null); // Initial state null রাখা হয়েছে এরর এড়াতে

  console.log("user id", id);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const imageFile = watch("imageFile");

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("phone", user.phone);
      setPreview(user.image || "/default-avatar.png"); // ইমেজ না থাকলে একটি ডিফল্ট পাথ
    }
  }, [user, setValue]);

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const objectUrl = URL.createObjectURL(imageFile[0]);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl); // মেমোরি লিক এড়াতে ক্লিনআপ
    }
  }, [imageFile]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    let finalImageUrl = user?.image;

    try {
      if (data.imageFile && data.imageFile[0]) {
        const uploadRes = await uploadToCloudinary(data.imageFile[0], "users");
        finalImageUrl = uploadRes.secure_url;
      }

      const response = await axios.patch(`/api/auth/myprofile/${id}`, {
        name: data.name,
        phone: data.phone,
        image: finalImageUrl,
      });

      if (response.data.success) {
        toast.success("Profile Updated!");
        router.push("/profile");
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-[#f9fbf2] px-8 py-8 border-b border-gray-100 text-center md:text-left">
          <h1 className="text-2xl font-black text-gray-900">Edit Profile</h1>
          <p className="text-[11px] font-bold text-[#8da13d] uppercase tracking-widest mt-1">
            Update ZapShift Account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          {/* ১. ইমেজ প্রিভিউ (টপ সেকশনেই থাকছে ডিজাইনের জন্য) */}
          <div className="flex flex-col items-center gap-4 pb-6 border-b border-gray-50">
            <div className="h-28 w-28 rounded-full border-4 border-[#D4F06D] overflow-hidden bg-gray-50 shadow-inner relative">
              {preview ? (
                <Image
                  fill
                  src={preview}
                  alt="Profile"
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-200 animate-pulse" />
              )}
            </div>
          </div>

          {/* ২. ফুল নেম ফিল্ড */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Full Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-[#D4F06D] outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-[10px] font-bold">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* ৩. ইমেজ ইনপুট ফিল্ড (আপনার রিকুয়েস্ট অনুযায়ী নামের পরে) */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Change Profile Picture
            </label>
            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                {...register("imageFile")}
                className="w-full bg-gray-50 border border-dashed border-gray-200 rounded-2xl px-5 py-8 text-xs font-bold cursor-pointer file:hidden text-center hover:bg-gray-100 transition-all"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-gray-400 font-bold text-[11px] uppercase tracking-tighter">
                Click or drag to upload new image
              </div>
            </div>
          </div>

          {/* ৪. ফোন নাম্বার ফিল্ড */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Phone Number
            </label>
            <input
              {...register("phone")}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-[#D4F06D] outline-none"
            />
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-4 rounded-2xl font-bold text-sm text-gray-500 bg-gray-50"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-[2] bg-black text-[#D4F06D] py-4 rounded-2xl font-black text-sm shadow-xl disabled:opacity-50 transition-all"
            >
              {isSubmitting ? "Processing..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editpage;
