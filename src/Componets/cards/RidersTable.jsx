import React from "react";
import { RiderTableSkeleton } from "../Skeltons/RiderTableSkeleton";
import RiderButton from "../buttons/RiderButton";

const RidersTable = ({ riders, isLoading, user }) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase">
                No
              </th>
              <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase">
                Rider Name
              </th>
              <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase">
                Contact Info
              </th>
              <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase">
                Vehicle
              </th>
              <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase">
                Location
              </th>
              <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase">
                Status
              </th>
              <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <RiderTableSkeleton />
            ) : (
              riders.map((rider,index) => (
                <tr
                  key={rider._id}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-slate-400 font-medium">
                    {(index + 1).toString().padStart(2, "0")}
                  </td>
                  <td className="py-5 px-6">
                    <div className="font-bold text-[#002B36]">{rider.name}</div>
                    <div className="text-xs text-gray-400">
                      Age: {rider.age}
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="text-sm text-gray-600">{rider.email}</div>
                    <div className="text-sm text-gray-500">{rider.contact}</div>
                  </td>
                  <td className="py-5 px-6">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold">
                      {rider.vehicle}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-sm text-gray-600">
                    {rider.district}
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase w-fit ${
                          rider.status.toLowerCase() === "pending"
                            ? "bg-orange-100 text-orange-600"
                            : rider.status.toLowerCase() === "accepted"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                        }`}
                      >
                        {rider.status}
                      </span>
                      {/* রাইডারের নিজস্ব রোল যদি অ্যাডমিন হয় তবে ব্যাজ দেখাবে */}
                      {rider.role === "admin" && (
                        <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase w-fit">
                          System Admin
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <RiderButton rider={rider} user={user} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RidersTable;
