import React from "react";
import { FiAlertCircle, FiUserPlus } from "react-icons/fi";
import AssignRiderPageSkeleton from "../Skeltons/AssignRiderPageSkeleton";
import { Search } from "lucide-react";

const AssignRidersTable = ({
  parcels,
  currentPage = 1,
  itemsPerPage = 10,
  authLoading,
  isLoading,
  error,
  onAssignClick,
}) => {
  console.log(parcels);
  return (
    <div>
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="bg-gray-50/50 border-b border-gray-50">
            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Index
            </th>
            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Parcel Info
            </th>
            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
              Weight
            </th>
            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
              Cost
            </th>
            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
              District
            </th>
            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
              Status
            </th>
            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {authLoading || isLoading ? (
            <AssignRiderPageSkeleton />
          ) : error ? (
            <tr>
              <td colSpan="5" className="px-6 py-24 text-center">
                <FiAlertCircle
                  size={40}
                  className="mx-auto text-red-200 mb-4"
                />
                <p className="text-red-500 font-bold text-sm">
                  Could not load parcels.
                </p>
                <p className="text-gray-400 text-xs mt-2">{errorMessage}</p>
              </td>
            </tr>
          ) : parcels.length > 0 ? (
            parcels.map((p, index) => (
              <tr
                key={p._id}
                className="group hover:bg-gray-50/40 transition-colors"
              >
                <td className="px-6 py-4 text-lg text-slate-400 font-medium">
                  {String(
                    (currentPage - 1) * itemsPerPage + index + 1,
                  ).padStart(2, "0")}
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold text-gray-800 text-sm">
                    {p.parcelName}
                  </p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">
                    ID: {p._id?.slice(-8)}
                  </p>
                </td>
                <td className="px-6 py-4 text-center text-xs font-bold text-gray-500">
                  {p.parcelWeight}kg
                </td>
                <td className="px-6 py-4 text-center text-xs font-black text-[#98B42C]">
                  ${p.cost}
                </td>
                <td className="px-6 py-4 text-center text-xs font-bold text-gray-500">
                  {p.senderDistrict}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-100 rounded-md tracking-tighter">
                    {!p.DeliveryStatus || p.DeliveryStatus === "peanding pickup"
                      ? "pending pickup"
                      : p.DeliveryStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onAssignClick(p)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#002B36] text-[#C6EB71] rounded-xl hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200"
                  >
                    <Search size={14} />
                    <span className="text-[10px] font-black uppercase tracking-tighter">
                      Find Rider
                    </span>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-32 text-center">
                <FiAlertCircle
                  size={40}
                  className="mx-auto text-gray-200 mb-4"
                />
                <p className="text-gray-400 font-bold text-sm">
                  No pending parcels found.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssignRidersTable;
