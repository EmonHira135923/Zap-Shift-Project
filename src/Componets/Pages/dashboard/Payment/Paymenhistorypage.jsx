"use client";
import React, { useState } from "react";
import { FiCreditCard, FiSearch, FiActivity } from "react-icons/fi";
import useAuth from "@/Componets/utils/Hooks/useAuth";
import PaymentsHistoryTable from "@/Componets/cards/PaymentsHistoryTable";
import usePayments from "@/Componets/utils/Hooks/usePayments";
import Pagination from "@/Componets/Shared/Pagination";
import PaymentHistoryPageSkeleton from "@/Componets/Skeltons/PaymentHistoryPageSkeleton";

const PaymentHistoryPage = () => {
  const authData = useAuth();
  const user = authData?.user || authData;

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = usePayments(
    user?.email,
    search,
    page,
  );

  const payments = data?.result || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / 10);

  if (!user?.email || isLoading) {
    return <PaymentHistoryPageSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-10 pb-24 min-h-screen bg-[#F8FAFC]">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#002B36] text-[#C6EB71] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <FiActivity /> Financial Ledger
          </div>
          <h1 className="text-5xl font-black text-[#002B36] tracking-tight">
            Payment <span className="text-[#98B42C]">History</span>
          </h1>
          <p className="text-gray-400 font-medium italic">
            Track your investments and delivery costs seamlessly
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative group w-full sm:w-80">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#98B42C] transition-colors" />
            <input
              type="text"
              placeholder="Search transaction ID..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-12 pr-10 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm outline-none focus:ring-4 focus:ring-[#C6EB71]/20 focus:border-[#C6EB71] transition-all"
            />
            {isFetching && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-gray-200 border-t-[#002B36] rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          <div className="bg-[#002B36] px-8 py-4 rounded-2xl shadow-xl shadow-[#002B36]/10 flex flex-col items-center justify-center min-w-[140px]">
            <span className="text-[10px] text-[#C6EB71] font-bold uppercase tracking-tighter leading-none mb-1">
              Total Entries
            </span>
            <span className="text-2xl font-black text-white leading-none">
              {total}
            </span>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#C6EB71] to-[#002B36] rounded-[2.5rem] blur opacity-[0.03] group-hover:opacity-[0.06] transition-opacity"></div>
        <div className="relative bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
          {payments.length > 0 ? (
            <div className="overflow-x-auto">
              <PaymentsHistoryTable
                payments={payments}
                currentPage={page}
                itemsPerPage={10}
              />
            </div>
          ) : (
            <div className="py-32 text-center">
              <div className="inline-flex p-6 bg-gray-50 rounded-full mb-4">
                <FiCreditCard size={40} className="text-gray-200" />
              </div>
              <h3 className="text-xl font-bold text-gray-700">
                No Transactions Yet
              </h3>
              <p className="text-gray-400 mt-1">
                When you pay for parcels, they will appear here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Reusable Pagination - এখানে এখন আমাদের কাস্টম কম্পোনেন্ট কাজ করবে */}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default PaymentHistoryPage;
