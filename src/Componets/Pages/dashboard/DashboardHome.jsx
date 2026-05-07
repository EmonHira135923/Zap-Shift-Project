"use client";
import React from "react";
import AllParcelsPageSkeleton from "@/Componets/Skeltons/AllParcelsPageSkeleton";
import AdminDashboard from "./AdminDashboard";
import RiderDashboard from "./RiderDashboard";
import UserDashboard from "./UserDashboard";
import useAuth from "@/Componets/utils/Hooks/useAuth";


const DashboardHome = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <AllParcelsPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      {/* Dynamic Header based on Role */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#002B36]">
          Welcome back, <span className="text-[#98B42C]">{user?.name}</span>
        </h1>
        <p className="text-gray-400 font-medium">
          Role: <span className="uppercase text-[10px] bg-[#C6EB71] text-[#002B36] px-2 py-0.5 rounded-full font-bold ml-1">
            {user?.role || "Customer"}
          </span>
        </p>
      </div>

      {/* Role Based Conditional Rendering */}
      {user?.role === "admin" && <AdminDashboard user={user} />}
      {user?.role === "rider" && <RiderDashboard user={user} />}
      {(user?.role === "user" || !user?.role) && <UserDashboard user={user} />}
    </div>
  );
};

export default DashboardHome;