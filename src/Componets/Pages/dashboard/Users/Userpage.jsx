// app/admin/users/page.jsx
"use client";
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/Componets/utils/Hooks/useAuth";
import UsersTable from "@/Componets/cards/UsersTable";

const Userpage = () => {
  const { user: currentUser } = useAuth();

  // Data Fetching
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", currentUser?._id],
    queryFn: async () => {
      const res = await axios.get("/api/auth/register");
      return res.data.message;
    },
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Users Management
          </h1>
          <p className="text-sm text-slate-500">
            Manage your system users and roles
          </p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase">
            Total Users
          </span>
          <span className="text-xl font-bold text-green-600">
            {users.length}
          </span>
        </div>
      </div>

      {/* Table Component */}
      <UsersTable users={users} isLoading={isLoading} />
    </div>
  );
};

export default Userpage;
