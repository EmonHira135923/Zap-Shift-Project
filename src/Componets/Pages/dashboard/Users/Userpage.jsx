"use client";
import React, { useState } from "react";
import useAuth from "@/Componets/utils/Hooks/useAuth";
import UsersTable from "@/Componets/cards/UsersTable";
import useUsers from "@/Componets/utils/Hooks/useUsers";
import { FiSearch, FiUsers, FiActivity } from "react-icons/fi";
import Pagination from "@/Componets/Shared/Pagination";

const Userpage = () => {
  const { user: currentUser } = useAuth();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useUsers(currentUser, search, page);

  const users = data?.message || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / 10);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-10 pb-20 bg-[#F8FAFC] min-h-screen">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#002B36] text-[#C6EB71] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <FiActivity /> System Administration
          </div>
          <h1 className="text-5xl font-black text-[#002B36] tracking-tight">
            User <span className="text-[#98B42C]">Management</span>
          </h1>
          <p className="text-gray-400 font-medium italic">
            Monitor, manage and update all registered members
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          {/* Modern Search Box */}
          <div className="relative group w-full sm:w-80">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#98B42C] transition-colors" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-12 pr-10 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm outline-none focus:ring-4 focus:ring-[#C6EB71]/20 focus:border-[#C6EB71] transition-all"
            />
          </div>

          {/* User Count Card */}
          <div className="bg-[#002B36] px-8 py-4 rounded-2xl shadow-xl shadow-[#002B36]/10 flex flex-col items-center justify-center min-w-[140px] w-full sm:w-auto">
            <span className="text-[10px] text-[#C6EB71] font-bold uppercase tracking-tighter leading-none mb-1">Total Members</span>
            <span className="text-2xl font-black text-white leading-none">{total}</span>
          </div>
        </div>
      </div>

      {/* --- Table Container --- */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#C6EB71] to-[#002B36] rounded-[2.5rem] blur opacity-[0.03] transition-opacity"></div>
        
        <div className="relative bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
          {/* Loader Overlay */}
          {isFetching && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C6EB71] to-transparent animate-shimmer"></div>
          )}

          <div className="overflow-x-auto min-h-[400px]">
            <UsersTable users={users} isLoading={isLoading} />
            
            {!isLoading && users.length === 0 && (
              <div className="py-32 text-center">
                <div className="inline-flex p-6 bg-gray-50 rounded-full mb-4">
                  <FiUsers size={40} className="text-gray-200" />
                </div>
                <h3 className="text-xl font-bold text-gray-700">No Users Found</h3>
                <p className="text-gray-400 mt-1">We couldn't find any users matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default Userpage;