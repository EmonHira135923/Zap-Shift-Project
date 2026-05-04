import React from "react";

const AllUsersTableRowSkeleton = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-4">
      <div className="h-4 w-4 bg-slate-100 rounded"></div>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-100 rounded-lg"></div>
        <div className="space-y-2">
          <div className="h-3 w-24 bg-slate-100 rounded"></div>
          <div className="h-2 w-32 bg-slate-50 rounded"></div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="h-6 w-16 bg-slate-100 rounded-full"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 w-24 bg-slate-100 rounded"></div>
    </td>
    <td className="px-6 py-4 text-right">
      <div className="flex justify-end gap-2">
        <div className="h-8 w-8 bg-slate-100 rounded-lg"></div>
        <div className="h-8 w-8 bg-slate-100 rounded-lg"></div>
        <div className="h-8 w-8 bg-slate-100 rounded-lg"></div>
      </div>
    </td>
  </tr>
);

export default AllUsersTableRowSkeleton;
