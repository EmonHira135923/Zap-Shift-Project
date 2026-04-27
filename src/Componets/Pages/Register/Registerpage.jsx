"use client";
import React, { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, Phone, Camera, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Socialpage from "./Socialpage";
import useAuth from "@/Componets/utils/Hooks/useAuth";
import { uploadToCloudinary } from "@/app/(Backend)/lib/cloudanry";

const Registerpage = () => {
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // React Hook Form Initialization
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle Image Selection & Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Form Submit Function
  const onSubmit = async (data) => {
    if (!imageFile) {
      return toast.error("Please upload a profile photo!");
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Creating your account...");

    try {
      // ১. Cloudinary-তে ইমেজ আপলোড (Dynamic Folder: users)
      const imageData = await uploadToCloudinary(imageFile, "users");

      if (!imageData?.secure_url) {
        throw new Error("Image upload failed. Please try again.");
      }

      // ২. রেজিস্ট্রেশন ডাটা অবজেক্ট তৈরি
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        image: imageData.secure_url,
      };

      // ৩. আপনার AuthProvider এর register ফাংশন কল করা
      const result = await registerUser(userData);

      if (result.success) {
        toast.update(toastId, {
          render: "Account Created Successfully! 🎉",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        reset();
        setImagePreview(null);
        router.push("/auth/login");
      }
    } catch (err) {
      toast.update(toastId, {
        render: err.message || "Something went wrong!",
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
        
        {/* Left Side: Brand Visual */}
        <div className="md:w-5/12 bg-[#002B36] p-10 flex flex-col justify-between text-white">
          <div>
            <h2 className="text-3xl font-bold mb-4">Join ZapShift</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Create an account to start sending parcels across 64 districts with real-time tracking.
            </p>
          </div>
          
          <div className="hidden md:block">
             <div className="bg-[#C6EB71]/10 p-6 rounded-2xl border border-[#C6EB71]/20">
                <p className="text-[#C6EB71] font-medium italic">
                  "Fastest delivery network in the country."
                </p>
             </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-7/12 p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h3 className="text-2xl font-bold text-[#002B36] mb-4">Create Account</h3>

            {/* Profile Image Upload */}
            <div className="flex flex-col items-center justify-center mb-6">
              <label className="relative cursor-pointer group">
                <div className="w-24 h-24 rounded-full bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#C6EB71]">
                  {imagePreview ? (
                    <Image src={imagePreview} alt="Preview" className="w-full h-full object-cover" width={96} height={96} />
                  ) : (
                    <Camera className="text-gray-400 group-hover:text-[#C6EB71]" size={32} />
                  )}
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                <div className="absolute bottom-0 right-0 bg-[#C6EB71] p-1.5 rounded-full shadow-lg">
                   <ArrowRight size={12} className="-rotate-45 text-[#002B36]" />
                </div>
              </label>
              <span className="text-[10px] text-gray-400 mt-2 uppercase tracking-wider font-bold">Upload Photo</span>
            </div>

            {/* Input Fields */}
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
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#C6EB71] outline-none text-sm transition-all" 
                   />
                 </div>
                 {errors.name && <p className="text-red-500 text-[10px] ml-1">{errors.name.message}</p>}
               </div>

               {/* Phone Number */}
               <div className="space-y-1">
                 <label className="text-xs font-bold text-[#002B36] uppercase ml-1">Phone Number</label>
                 <div className="relative">
                   <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                   <input 
                    {...register("phone", { 
                        required: "Phone is required",
                        pattern: { value: /^01[3-9]\d{8}$/, message: "Invalid BD Phone Number" }
                    })}
                    type="tel" 
                    placeholder="017XXXXXXXX" 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#C6EB71] outline-none text-sm transition-all" 
                   />
                 </div>
                 {errors.phone && <p className="text-red-500 text-[10px] ml-1">{errors.phone.message}</p>}
               </div>

               {/* Email Address */}
               <div className="space-y-1">
                 <label className="text-xs font-bold text-[#002B36] uppercase ml-1">Email Address</label>
                 <div className="relative">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                   <input 
                    {...register("email", { 
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                    })}
                    type="email" 
                    placeholder="hello@example.com" 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#C6EB71] outline-none text-sm transition-all" 
                   />
                 </div>
                 {errors.email && <p className="text-red-500 text-[10px] ml-1">{errors.email.message}</p>}
               </div>

               {/* Password */}
               <div className="space-y-1">
                 <label className="text-xs font-bold text-[#002B36] uppercase ml-1">Password</label>
                 <div className="relative">
                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                   <input 
                    {...register("password", { 
                        required: "Password is required",
                        minLength: { value: 6, message: "Password must be at least 6 characters" }
                    })}
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#C6EB71] outline-none text-sm transition-all" 
                   />
                 </div>
                 {errors.password && <p className="text-red-500 text-[10px] ml-1">{errors.password.message}</p>}
               </div>
            </div>

            {/* Submit Button */}
            <button 
              disabled={isSubmitting}
              type="submit" 
              className="w-full bg-[#C6EB71] hover:bg-[#b5da56] text-[#002B36] font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Divider */}
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-[10px] font-bold uppercase">Or continue with</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            <Socialpage />

            <p className="text-center text-gray-500 text-sm pt-2">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-[#002B36] font-bold hover:underline">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Registerpage;