"use client";
import React, { useState, useEffect } from "react";
import { User, Mail, Lock, Phone, Camera, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import Socialpage from "./Socialpage";
import useAuth from "@/Componets/utils/Hooks/useAuth";
import { uploadToCloudinary } from "@/app/(Backend)/lib/cloudanry";

const Registerpage = () => {
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // URL থেকে টোকেন এবং ইমেইল নেওয়া
  const token = searchParams.get("token");
  const invitedEmail = searchParams.get("email");

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  // যদি ইনভাইটেশন ইমেইল থাকে, তবে ইমেইল ফিল্ডে সেটি সেট করে দেওয়া
  useEffect(() => {
    if (invitedEmail) {
      setValue("email", invitedEmail);
    }
  }, [invitedEmail, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    if (!imageFile) return toast.error("Please upload a profile photo!");

    setIsSubmitting(true);
    const toastId = toast.loading("Processing registration...");

    try {
      // ১. Cloudinary আপলোড
      const imageData = await uploadToCloudinary(imageFile, "users");
      if (!imageData?.secure_url) throw new Error("Image upload failed.");

      // ২. ডাটা অবজেক্ট (টোকেনসহ)
      const userData = {
        ...data,
        image: imageData.secure_url,
        token: token || null, // ইনভাইটেশন টোকেন থাকলে পাঠাবে
      };

      // ৩. AuthProvider এর মাধ্যমে সাবমিট
      const result = await registerUser(userData);

      if (result.success) {
        toast.update(toastId, {
          render: "Welcome! Account ready. 🎉",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        reset();
        router.push("/auth/login");
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      toast.update(toastId, {
        render: err.message || "Failed to register",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen w-full bg-[#f3f4f6] flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full bg-white rounded-[40px] shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        {/* Left Side */}
        <div className="md:w-5/12 bg-[#002B36] p-10 flex flex-col justify-between text-white">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              {token ? "Claim Your Invite" : "Join ZapShift"}
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              {token 
                ? "Complete your profile to join the team and start managing deliveries." 
                : "Create an account to start sending parcels across 64 districts."}
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-7/12 p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h3 className="text-2xl font-bold text-[#002B36] mb-4">
              {token ? "Setup Your Profile" : "Create Account"}
            </h3>

            {/* Photo Upload */}
            <div className="flex flex-col items-center justify-center mb-6">
              <label className="relative cursor-pointer group">
                <div className="w-24 h-24 rounded-full bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden group-hover:border-[#C6EB71]">
                  {imagePreview ? (
                    <Image src={imagePreview} alt="Preview" className="w-full h-full object-cover" width={96} height={96} />
                  ) : (
                    <Camera className="text-gray-400" size={32} />
                  )}
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
              <span className="text-[10px] text-gray-400 mt-2 uppercase font-bold">Upload Photo</span>
            </div>

            <div className="space-y-3">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#002B36] uppercase ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    {...register("name", { required: "Name is required" })}
                    type="text" 
                    placeholder="Emon Hossain" 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#C6EB71] outline-none text-sm" 
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#002B36] uppercase ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    {...register("email", { required: "Email is required" })}
                    type="email" 
                    placeholder="your@gmail.com" 
                    readOnly={!!invitedEmail} // ইনভাইট লিঙ্কে ইমেইল থাকলে এডিট করা যাবে না
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl outline-none text-sm ${invitedEmail ? 'bg-gray-200 text-gray-500' : 'bg-gray-50'}`}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#002B36] uppercase ml-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    {...register("phone", { required: "Phone is required" })}
                    type="tel" 
                    placeholder="017XXXXXXXX" 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none text-sm" 
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#002B36] uppercase ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    {...register("password", { required: "Password is required", minLength: 6 })}
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none text-sm" 
                  />
                </div>
              </div>
            </div>

            <button 
              disabled={isSubmitting}
              className="w-full bg-[#C6EB71] hover:bg-[#b5da56] text-[#002B36] font-bold py-4 rounded-xl shadow-lg mt-6 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Complete Registration"}
            </button>

            {!token && (
              <>
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-gray-100"></div>
                  <span className="flex-shrink mx-4 text-gray-400 text-[10px] font-bold uppercase">Or</span>
                  <div className="flex-grow border-t border-gray-100"></div>
                </div>
                <Socialpage />
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Registerpage;