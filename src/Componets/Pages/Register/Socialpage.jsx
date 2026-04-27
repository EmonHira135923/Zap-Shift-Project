"use client";
import React, { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { ImSpinner2 } from "react-icons/im";

const Socialpage = () => {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSocialLogin = async (provider) => {
    setLoadingProvider(provider);
    try {
      // এটি আপনাকে সংশ্লিষ্ট প্রোভাইডারের লগইন পেজে নিয়ে যাবে
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Login failed:", error);
      setLoadingProvider(null);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {/* Google Login Button */}
        <button
          disabled={loadingProvider !== null}
          onClick={() => handleSocialLogin("google")}
          type="button"
          className="flex items-center justify-center gap-2 py-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all text-sm font-semibold text-gray-600 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loadingProvider === "google" ? (
            <ImSpinner2 className="animate-spin text-red-500" size={18} />
          ) : (
            <FaGoogle className="text-red-500" />
          )}
          <span>
            {loadingProvider === "google" ? "Processing..." : "Google"}
          </span>
        </button>

        {/* GitHub Login Button */}
        <button
          disabled={loadingProvider !== null}
          onClick={() => handleSocialLogin("github")}
          type="button"
          className="flex items-center justify-center gap-2 py-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all text-sm font-semibold text-gray-600 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loadingProvider === "github" ? (
            <ImSpinner2 className="animate-spin text-[#002B36]" size={18} />
          ) : (
            <FaGithub className="text-[#002B36]" />
          )}
          <span>
            {loadingProvider === "github" ? "Processing..." : "GitHub"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Socialpage;
