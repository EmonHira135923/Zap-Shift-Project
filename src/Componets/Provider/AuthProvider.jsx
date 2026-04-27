"use client";
import React, { useEffect, useState } from "react";
import { Authcontext } from "./Provider";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        setLoading(true);
        // আপনার API endpoint কল করা হচ্ছে
        const response = await axios.get("/api/auth/myprofile");
        if (response.data.success) {
          setUser(response.data.result);
        }
      } catch (err) {
        console.log("No active session found");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUserSession();
  }, []);

  const register = async (userData) => {
    try {
      const response = await axios.post("/api/auth/register", userData);
      console.log(response.data);
      return response.data;
    } catch (err) {
      setLoading(false);
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
        setLoading(false); // সফল হলে লোডিং ফলস
        return response.data;
      }
    } catch (err) {
      setLoading(false); // এরর হলেও লোডিং ফলস
      const errorMsg = err.response?.data?.message || "Login Failed";
      console.error("Login Error:", errorMsg);
      throw new Error(errorMsg);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post("/api/auth/logout");
      if (response.data.success) {
        setUser(null);
        toast.success("Logged out successfully");
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const authInfo = {
    user,
    loading,
    register,
    login,
    logout
  };

  return <Authcontext value={authInfo}> {children} </Authcontext>;
};

export default AuthProvider;
