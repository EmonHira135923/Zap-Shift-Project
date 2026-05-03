"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FiEye, FiCreditCard, FiCalendar, FiHash, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";
import useAuth from "@/Componets/utils/Hooks/useAuth";

const PaymentHistoryPage = () => {
  const authData = useAuth();
  const user = authData?.user || authData;

  const {
    data: payments = [],
    isLoading,
  } = useQuery({
    queryKey: ["payments-history", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/api/payment-success?email=${user?.email}`);
      return res.data.result || [];
    },
    enabled: !!user?.email,
  });

  // লোডিং স্টেট - সুন্দর স্কেলিটন বা স্পিনার
  if (!user?.email || isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-[#002B36]/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-[#002B36] rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-[#002B36] font-bold animate-pulse">Loading secure payments...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-10 pb-20 bg-[#F8FAFC]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-[#002B36] tracking-tight">
            Payment History
          </h1>
          <p className="text-gray-500 mt-1 font-medium">
            View and manage your recent transaction records
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white shadow-sm border border-gray-100 px-6 py-3 rounded-2xl">
          <div className="bg-[#C6EB71] p-2 rounded-lg">
            <FiCreditCard className="text-[#002B36] text-xl" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 leading-none">Total Spent</p>
            <p className="text-xl font-black text-[#002B36]">
              ৳{payments.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] text-[#64748B] uppercase text-[12px] font-bold tracking-[0.1em] border-b border-gray-100">
                <th className="px-8 py-6">Parcel Details</th>
                <th className="px-8 py-6">Transaction Info</th>
                <th className="px-8 py-6">Amount</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-[#F8FAFC]/50 transition-all group">
                    {/* Parcel Info */}
                    <td className="px-8 py-7">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                          📦
                        </div>
                        <div>
                          <p className="font-bold text-[#002B36] text-lg leading-tight">
                            {payment.parcelName}
                          </p>
                          <p className="text-xs text-gray-400 mt-1 font-medium">
                            ID: #{payment.parcelId?.slice(-6).toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Transaction Info */}
                    <td className="px-8 py-7">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiHash className="text-xs" />
                          <span className="text-xs font-mono">{payment.transactionId}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <FiCalendar className="text-xs" />
                          <span className="text-[11px] font-bold uppercase">
                            {new Date(payment.paidAt?.$date || payment.paidAt).toLocaleDateString('en-GB', {
                              day: '2-digit', month: 'short', year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-8 py-7">
                      <div className="flex flex-col">
                        <span className="text-2xl font-black text-[#002B36]">
                          ৳{payment.amount}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          {payment.currency}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-8 py-7">
                      <div className="inline-flex items-center gap-1.5 bg-[#C6EB71]/20 text-[#4D7C0F] px-3 py-1 rounded-full border border-[#C6EB71]/30">
                        <FiCheckCircle className="text-sm" />
                        <span className="text-[11px] font-black uppercase tracking-wider">Paid</span>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-8 py-7 text-right">
                      <Link
                        href={`/dashboard/parcels/${payment.parcelId}`}
                        className="inline-flex items-center gap-2 bg-[#002B36] hover:bg-[#004d61] text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-[#002B36]/10 active:scale-95"
                      >
                        <FiEye /> Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-32 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <FiCreditCard className="text-gray-300 text-3xl" />
                      </div>
                      <h3 className="text-xl font-bold text-[#002B36]">No records found</h3>
                      <p className="text-gray-400 max-w-[250px] mx-auto mt-2">
                        You haven't made any payments for your parcels yet.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryPage;