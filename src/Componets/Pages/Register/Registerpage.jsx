"use client";
import React, { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, Phone, Camera, ArrowRight } from "lucide-react";
import Image from "next/image";
import Socialpage from "./Socialpage";

const Registerpage = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <section className="min-h-screen w-full bg-[#f3f4f6] flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full bg-white rounded-[40px] shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        {/* Left Side: Brand/Visual */}
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
          <form className="space-y-4">
            <h3 className="text-2xl font-bold text-[#002B36] mb-4">Create Account</h3>

            {/* Profile Image Upload */}
            <div className="flex flex-col items-center justify-center mb-6">
              <label className="relative cursor-pointer group">
                <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#C6EB71]">
                  {imagePreview ? (
                    <Image src={imagePreview} alt="Preview" className="w-full h-full object-cover" width={96} height={96} />
                  ) : (
                    <Camera className="text-gray-400 group-hover:text-[#C6EB71]" size={32} />
                  )}
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                <div className="absolute bottom-0 right-0 bg-[#C6EB71] p-1.5 rounded-full shadow-lg">
                   <ArrowRight size={12} className="-rotate-45" />
                </div>
              </label>
              <span className="text-[10px] text-gray-400 mt-2 uppercase tracking-wider font-bold">Upload Photo</span>
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
               {/* Full Name */}
               <div className="space-y-2">
                 <label className="text-xs font-bold text-[#002B36] uppercase ml-1">Full Name</label>
                 <div className="relative">
                   <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                   <input type="text" placeholder="Emon Hossain" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#C6EB71] outline-none text-sm transition-all" />
                 </div>
               </div>

               {/* Phone Number */}
               <div className="space-y-2">
                 <label className="text-xs font-bold text-[#002B36] uppercase ml-1">Phone Number</label>
                 <div className="relative">
                   <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                   <input type="tel" placeholder="017XXXXXXXX" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#C6EB71] outline-none text-sm transition-all" />
                 </div>
               </div>

               {/* Email Address */}
               <div className="space-y-2">
                 <label className="text-xs font-bold text-[#002B36] uppercase ml-1">Email Address</label>
                 <div className="relative">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                   <input type="email" placeholder="hello@example.com" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#C6EB71] outline-none text-sm transition-all" />
                 </div>
               </div>

               {/* Password */}
               <div className="space-y-2">
                 <label className="text-xs font-bold text-[#002B36] uppercase ml-1">Password</label>
                 <div className="relative">
                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                   <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#C6EB71] outline-none text-sm transition-all" />
                 </div>
               </div>
            </div>

            {/* Main Submit Button */}
            <button type="submit" className="w-full bg-[#C6EB71] hover:bg-[#b5da56] text-[#002B36] font-bold py-4 rounded-xl shadow-lg shadow-[#C6EB71]/20 transition-all transform hover:-translate-y-0.5 active:scale-95 mt-6">
              Create Account
            </button>

            {/* Divider */}
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold uppercase">Or continue with</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            {/* Social Buttons Section */}
            <Socialpage/>

            <p className="text-center text-gray-500 text-sm pt-4">
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