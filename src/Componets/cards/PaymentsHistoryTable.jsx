import React from "react";
import Link from "next/link";
import {
  FiHash,
  FiEye,
  FiCalendar,
  FiCheckCircle,
  FiCreditCard,
} from "react-icons/fi";

const PaymentsHistoryTable = ({
  payments,
  currentPage = 1,
  itemsPerPage = 10,
}) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC] text-[#64748B] uppercase text-[12px] font-bold tracking-[0.1em] border-b border-gray-100">
              <th className="px-8 py-6">No</th>
              <th className="px-8 py-6">Parcel Details</th>
              <th className="px-8 py-6">Transaction Info</th>
              <th className="px-8 py-6">Amount</th>
              <th className="px-8 py-6">Status</th>
              <th className="px-8 py-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {payments.length > 0 ? (
              payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="hover:bg-[#F8FAFC]/50 transition-all group"
                >
                  <td className="px-6 py-4 text-lg text-slate-400 font-medium">
                    {String(
                      (currentPage - 1) * itemsPerPage + index + 1,
                    ).padStart(2, "0")}
                  </td>
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
                        <span className="text-xs font-mono">
                          {payment.transactionId}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <FiCalendar className="text-xs" />
                        <span className="text-[11px] font-bold uppercase">
                          {new Date(
                            payment.paidAt?.$date || payment.paidAt,
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="px-8 py-7">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-[#002B36]">
                        ${payment.amount}
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
                      <span className="text-[11px] font-black uppercase tracking-wider">
                        Paid
                      </span>
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
                    <h3 className="text-xl font-bold text-[#002B36]">
                      No records found
                    </h3>
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
  );
};

export default PaymentsHistoryTable;
