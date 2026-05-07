import React from "react";
import { FiPackage, FiCheckCircle, FiDollarSign } from "react-icons/fi";
import DeliveryAssignTableSkeleton from "../Skeltons/DeliveryAssignTableSkeleton";

const CompletedDeliveryTable = ({
  parcels,
  isLoading,
  error,
  currentPage,
  itemsPerPage,
}) => {
  if (error)
    return (
      <div className="p-10 text-center text-red-500 font-bold">
        Error loading data. Please try again.
      </div>
    );

  // পেআউট ক্যালকুলেশন ফাংশন
  const calculatedPayment = (parcel) => {
    const cost = Number(parcel.cost) || 0;
    // একই ডিস্ট্রিক্ট হলে ৮০%, অন্যথায় ৬০%
    const rate = parcel.senderDistrict === parcel.receiverDistrict ? 0.8 : 0.6;
    return (cost * rate).toFixed(2);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              {[
                "Index",
                "Parcel",
                "Receiver",
                "Status",
                "Cost",
                "Payout",
                "Action",
              ].map((head) => (
                <th
                  key={head}
                  className="px-6 py-4 text-[10px] font-black uppercase text-slate-400"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <DeliveryAssignTableSkeleton />
            ) : parcels.length > 0 ? (
              parcels.map((parcel, index) => (
                <tr
                  key={parcel._id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  {/* Index */}
                  <td className="px-6 py-6 text-sm font-black text-slate-300">
                    {String(
                      (currentPage - 1) * itemsPerPage + index + 1,
                    ).padStart(2, "0")}
                  </td>

                  {/* Parcel Info */}
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <FiPackage size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#002B36]">
                          {parcel.parcelName}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400">
                          {parcel.trackingId}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Receiver Info */}
                  <td className="px-6 py-6">
                    <p className="text-sm font-bold text-slate-700">
                      {parcel.receiverName}
                    </p>
                    <p className="text-xs text-slate-400">
                      {parcel.receiverDistrict}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-black uppercase text-emerald-600 ring-1 ring-emerald-100">
                      <FiCheckCircle size={12} /> Delivered
                    </span>
                  </td>

                  {/* Original Cost */}
                  <td className="px-6 py-6 font-black text-slate-600 text-sm">
                    ${parcel.cost}
                  </td>

                  {/* Payout (Rider's Earning) */}
                  <td className="px-6 py-6">
                    <span className="text-base font-black text-emerald-600">
                      ${calculatedPayment(parcel)}
                    </span>
                  </td>

                  {/* Action Button */}
                  <td className="px-6 py-6">
                    <button className="flex items-center gap-2 rounded-lg bg-[#002B36] px-4 py-2 text-[10px] font-bold uppercase text-white transition-all hover:bg-emerald-600 active:scale-95 shadow-sm">
                      <FiDollarSign size={14} />
                      Cashout
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="py-20 text-center text-slate-400 font-bold"
                >
                  No completed deliveries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveryTable;
