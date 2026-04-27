"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Socialpage from "../Register/Socialpage";
import useAuth from "@/Componets/utils/Hooks/useAuth";

const Loginpage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // React Hook Form Initialization
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Form Submit Handler
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Verifying your credentials...");

    try {
      // AuthProvider থেকে আসা login ফাংশন কল করা
      const result = await login(data.email, data.password);

      if (result?.success) {
        toast.update(toastId, {
          render: "Welcome back to ZapShift! 🚚",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        
        // লগইন সফল হলে ড্যাশবোর্ডে রিডাইরেক্ট
        router.push("/dashboard");
      }
    } catch (err) {
      toast.update(toastId, {
        render: err.message || "Invalid email or password",
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
        
        {/* Left Side: Brand Visual Section */}
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <h3 className="text-2xl font-bold text-[#002B36] mb-1">Log In</h3>
              <p className="text-gray-400 text-sm">Enter your credentials to continue.</p>
            </div>

            <div className="space-y-4">
              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#002B36] uppercase ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    {...register("email", { 
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                    })}
                    type="email" 
                    placeholder="hello@example.com" 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#C6EB71] outline-none text-sm transition-all" 
                  />
                </div>
                {errors.email && <p className="text-red-500 text-[10px] ml-1 font-semibold">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-[#002B36] uppercase">Password</label>
                  <Link href="/auth/forgot-password" size={14} className="text-xs font-semibold text-gray-400 hover:text-[#002B36]">
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    {...register("password", { 
                      required: "Password is required",
                      minLength: { value: 6, message: "Minimum 6 characters required" }
                    })}
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#C6EB71] outline-none text-sm transition-all" 
                  />
                </div>
                {errors.password && <p className="text-red-500 text-[10px] ml-1 font-semibold">{errors.password.message}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <button 
              disabled={isSubmitting}
              type="submit" 
              className="w-full bg-[#C6EB71] hover:bg-[#b5da56] text-[#002B36] font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Social Login Section */}
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-[10px] font-bold uppercase">Or continue with</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            <Socialpage />

            <p className="text-center text-gray-500 text-sm pt-2">
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