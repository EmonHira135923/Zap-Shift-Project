import React from "react";
import { AllRidersTableSkeleton } from "../Skeltons/AllRidersTableSkeleton";
import RiderButton from "../buttons/RiderButton";

const getApplicationStatusClass = (status) => {
  const value = status?.toLowerCase();

  if (value === "pending") return "bg-orange-100 text-orange-600";
  if (value === "accepted") return "bg-green-100 text-green-600";

  return "bg-red-100 text-red-600";
};

const getWorkStatusClass = (workStatus) => {
  const value = workStatus?.toLowerCase();

  if (value === "intransit") return "bg-green-100 text-green-600";
  if (value === "notavailable") return "bg-gray-100 text-gray-500";

  return "bg-red-100 text-red-600";
};

const formatWorkStatus = (workStatus) => {
  const value = workStatus?.toLowerCase();

  if (value === "intransit") return "In Transit";
  if (value === "notavailable") return "Not Available";

  return workStatus || "Unknown";
};

const AdminBadge = () => (
  <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase w-fit">
    System Admin
  </span>
);

const RidersTable = ({
  riders = [],
  isLoading,
  user,
  currentPage = 1,
  itemsPerPage = 10,
}) => {
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
                Application Status
              </th>
              <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase">
                Work Status
              </th>
              <th className="py-5 px-6 text-xs font-bold text-gray-400 uppercase text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <AllRidersTableSkeleton />
            ) : riders.length > 0 ? (
              riders.map((rider, index) => (
                <tr
                  key={rider._id}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-lg text-slate-400 font-medium">
                    {String(
                      (currentPage - 1) * itemsPerPage + index + 1,
                    ).padStart(2, "0")}
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
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase w-fit ${getApplicationStatusClass(
                          rider.status,
                        )}`}
                      >
                        {rider.status}
                      </span>

                      {rider.role === "admin" && <AdminBadge />}
                    </div>
                  </td>

                  <td className="py-5 px-6">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase w-fit ${getWorkStatusClass(
                          rider.workStatus,
                        )}`}
                      >
                        {formatWorkStatus(rider.workStatus)}
                      </span>

                      {rider.role === "admin" && <AdminBadge />}
                    </div>
                  </td>

                  <td className="py-5 px-6 text-center">
                    <RiderButton rider={rider} user={user} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="py-10 text-center text-sm text-gray-400"
                >
                  No riders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RidersTable;
