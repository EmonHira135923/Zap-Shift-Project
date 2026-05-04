"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

import useAuth from "@/Componets/utils/Hooks/useAuth";
import useLocations from "@/Componets/utils/Hooks/useLocations";
import BeARiderPageSkeleton from "@/Componets/Skeltons/BeARiderPageSkeleton";

import {
  FiCheckCircle,
  FiCreditCard,
  FiPhone,
  FiTruck,
  FiUser,
} from "react-icons/fi";

const Beariderpage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { allStates, getDistrictsByState, loading } = useLocations();
  const [selectedDivision, setSelectedDivision] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    // values ব্যবহার করলে ডাটা আসার সাথে সাথে ফিল্ড আপডেট হবে
    values: {
      name: user?.displayName || user?.name || "",
      email: user?.email || "",
      contact: user?.phone || "",
    },
  });

  const filteredDistricts = getDistrictsByState(selectedDivision);

  const onSubmit = async (data) => {
    if (data.vehicle === "none" || !data.vehicle) {
      toast.error("Bike, Bicycle or Delivery Van required to become a rider");
      return;
    }

    try {
      // API কল করার সময় await ব্যবহার নিশ্চিত করা হয়েছে
      const res = await axios.post("/api/riders", data);

      if (res.data.success) {
        toast.success("Application submitted successfully!");
        reset();
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      // ব্যাকএন্ড থেকে আসা নির্দিষ্ট এরর মেসেজ দেখানো (যেমন: Already Applied)
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  if (loading) {
    return <BeARiderPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-6xl mx-auto w-full bg-white rounded-[40px] shadow-sm border border-gray-100 p-6 md:p-10 lg:p-16">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-[#002B36] mb-4">Be a Rider</h1>
          <p className="text-gray-500 max-w-2xl leading-relaxed">
            Join ZapShift and start earning by delivering parcels in your city.
          </p>
        </header>

        <hr className="border-gray-100 mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold text-[#002B36] mb-8">Tell us about yourself</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      {...register("name")}
                      readOnly
                      className="w-full bg-gray-100 rounded-2xl py-4 pl-12 focus:outline-none cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      {...register("email")}
                      readOnly
                      className="w-full bg-gray-100 rounded-2xl py-4 pl-12 focus:outline-none cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Age</label>
                  <input
                    type="number"
                    placeholder="Minimum 18"
                    {...register("age", { required: "Age is required", min: 18 })}
                    className="w-full bg-gray-50 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-[#C6EB71]"
                  />
                  {errors.age && <p className="text-red-500 text-xs mt-1">Minimum age is 18</p>}
                </div>

                {/* Division & District */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Division</label>
                    <select
                      {...register("division", { required: true })}
                      onChange={(e) => setSelectedDivision(e.target.value)}
                      className="w-full bg-gray-50 rounded-2xl py-4 px-4 focus:outline-none"
                    >
                      <option value="">Select</option>
                      {allStates.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">District</label>
                    <select
                      {...register("district", { required: true })}
                      disabled={!selectedDivision}
                      className="w-full bg-gray-50 rounded-2xl py-4 px-4 focus:outline-none disabled:opacity-50"
                    >
                      <option value="">Select</option>
                      {filteredDistricts.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
                    </select>
                  </div>
                </div>

                {/* NID & License */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">NID Number</label>
                    <input
                      {...register("nid", { required: true })}
                      placeholder="NID"
                      className="w-full bg-gray-50 rounded-2xl py-4 px-6 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">License</label>
                    <input
                      {...register("license", { required: true })}
                      placeholder="License No"
                      className="w-full bg-gray-50 rounded-2xl py-4 px-6 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Vehicle */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Vehicle Type</label>
                  <select
                    {...register("vehicle", { required: true })}
                    className="w-full bg-gray-50 rounded-2xl py-4 px-6 focus:outline-none"
                  >
                    <option value="">Select Vehicle</option>
                    <option value="Bike">Motor Bike</option>
                    <option value="Cycle">Bicycle</option>
                    <option value="Van">Delivery Van</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#C6EB71] text-[#002B36] font-bold py-5 rounded-2xl hover:bg-[#b5db5a] transition-all flex items-center justify-center gap-2"
              >
                Submit Application <FiCheckCircle />
              </button>
            </form>
          </div>

          <div className="hidden lg:flex justify-center items-center h-full">
            <Image
              src="https://i.ibb.co/sLz8CbM/Rider.jpg"
              alt="Rider Illustration"
              height={500}
              width={500}
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beariderpage;
