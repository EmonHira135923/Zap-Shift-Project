"use client";
import React from "react";
import AllParcelsPageSkeleton from "@/Componets/Skeltons/AllParcelsPageSkeleton";
import AdminDashboard from "./AdminDashboard";
import RiderDashboard from "./RiderDashboard";
import UserDashboard from "./UserDashboard";
import useAuth from "@/Componets/utils/Hooks/useAuth";

const DashboardHome = () => {
  const { user, loading } = useAuth();

  // 1. Handle Loading State
  if (loading) {
    return <AllParcelsPageSkeleton />;
  }

  // 2. Handle missing user session
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-xl font-bold text-red-500">Authentication Required</h2>
        <p className="text-gray-500">Please sign in to access your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#002B36]">
          Welcome back, <span className="text-[#98B42C]">{user?.name || "Guest"}</span>
        </h1>
        <div className="mt-2">
           <span className="uppercase text-[10px] bg-[#C6EB71] text-[#002B36] px-3 py-1 rounded-full font-bold">
            {user?.role || "user"}
          </span>
        </div>
      </div>

      {/* 3. Safe Conditional Rendering */}
      {user?.role === "admin" && <AdminDashboard user={user} />}
      {user?.role === "rider" && <RiderDashboard user={user} />}
      {(user?.role === "user" || !user?.role) && <UserDashboard user={user} />}
    </div>
  );
};

export default DashboardHome;