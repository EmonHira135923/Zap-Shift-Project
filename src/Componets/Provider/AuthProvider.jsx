"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Authcontext } from "./Provider";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSession, signOut } from "next-auth/react";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const checkUserSession = async () => {
      setLoading(true);
      try {
        // ১. প্রথমে চেক করুন Google/GitHub (NextAuth) সেশন আছে কিনা
        if (status === "authenticated") {
          setUser(session.user);
        }
        // ২. যদি সোশ্যাল সেশন না থাকে, তবে আপনার কাস্টম API চেক করুন
        else if (status === "unauthenticated") {
          const response = await axios.get("/api/auth/myprofile");
          if (response.data.success) {
            setUser(response.data.result);
          } else {
            setUser(null);
          }
        }
      } catch (err) {
        console.log("No active session found");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (status !== "loading") {
      checkUserSession();
    }
  }, [session, status]);

  const register = async (userData) => {
    try {
      const response = await axios.post("/api/auth/register", userData);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong";
      console.error("Registration Error:", errorMsg);
      throw new Error(errorMsg);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      if (response.data.success) {
        setUser(response.data.result);
        setLoading(false);
        return response.data;
      }
    } catch (err) {
      setLoading(false);
      const errorMsg = err.response?.data?.message || "Login Failed";
      throw new Error(errorMsg);
    }
  };

  const logout = async () => {
    try {
      // ১. যদি Google বা GitHub ইউজার হয়, NextAuth থেকে সাইন আউট করুন
      if (status === "authenticated") {
        await signOut({ redirect: false });
      }

      // ২. আপনার কাস্টম লগআউট API কল করুন
      const response = await axios.post("/api/auth/logout");

      if (response.data.success || status === "authenticated") {
        setUser(null);
        toast.success("Logged out successfully");
        router.push("/auth/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const authInfo = {
    user,
    loading,
    register,
    login,
    logout,
  };

  // Note: Added .Provider which is usually required for Context
  return <Authcontext value={authInfo}>{children}</Authcontext>;
};

export default AuthProvider;
