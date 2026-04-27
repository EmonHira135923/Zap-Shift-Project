"use client";
import React from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Socialpage from "../Register/Socialpage";

const Loginpage = () => {
  return (
    <section className="min-h-screen w-full bg-[#f3f4f6] flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full bg-white rounded-[40px] shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        {/* Left Side: Brand/Visual Section */}
        <div className="md:w-5/12 bg-[#002B36] p-10 flex flex-col justify-between text-white">
          <div>
            <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Log in to access your dashboard, track shipments, and manage your deliveries across the network.
            </p>
          </div>
          
          <div className="hidden md:block">
             <div className="bg-[#C6EB71]/10 p-6 rounded-2xl border border-[#C6EB71]/20">
                <p className="text-[#C6EB71] font-medium italic">
                  "Streamlining logistics with precision and speed."
                </p>
             </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
          <form className="space-y-6">
            <h3 className="text-2xl font-bold text-[#002B36] mb-2">Log In</h3>
            <p className="text-gray-400 text-sm mb-6">Enter your credentials to continue.</p>

            <div className="space-y-4">
              {/* Email Address */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#002B36] uppercase ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    placeholder="hello@example.com" 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#C6EB71] outline-none text-sm transition-all" 
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-[#002B36] uppercase">Password</label>
                  <Link href="/forgot-password" size={14} className="text-xs font-semibold text-gray-400 hover:text-[#002B36]">
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#C6EB71] outline-none text-sm transition-all" 
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-[#C6EB71] hover:bg-[#b5da56] text-[#002B36] font-bold py-4 rounded-xl shadow-lg shadow-[#C6EB71]/20 transition-all transform hover:-translate-y-0.5 active:scale-95 mt-2"
            >
              Sign In
            </button>

            {/* Social Login Component */}
            <div className="pt-2">
              <Socialpage />
            </div>

            <p className="text-center text-gray-500 text-sm pt-4">
              New to ZapShift?{" "}
              <Link href="/auth/register" className="text-[#002B36] font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Loginpage;