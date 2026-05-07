import React from "react";

const DeliveryAssignTableSkeleton = () => {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <tr key={index} className="animate-pulse border-b border-slate-100">
          <td className="px-6 py-6">
            <div className="h-4 w-8 rounded bg-slate-100" />
          </td>
          <td className="px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-slate-200" />
              <div>
                <div className="mb-2 h-4 w-28 rounded bg-slate-200" />
                <div className="h-3 w-20 rounded bg-slate-100" />
              </div>
            </div>
          </td>
          <td className="px-6 py-6">
            <div className="mb-2 h-4 w-28 rounded bg-slate-200" />
            <div className="h-3 w-20 rounded bg-slate-100" />
          </td>
          <td className="px-6 py-6">
            <div className="mb-2 h-4 w-32 rounded bg-slate-200" />
            <div className="h-3 w-44 rounded bg-slate-100" />
          </td>
          <td className="px-6 py-6">
            <div className="h-7 w-24 rounded-full bg-slate-100" />
          </td>
          <td className="px-6 py-6">
            <div className="h-4 w-16 rounded bg-slate-200" />
          </td>
          <td className="px-6 py-6">
            <div className="h-9 w-24 rounded-full bg-slate-100" />
          </td>
          <td className="px-6 py-6">
            <div className="ml-auto h-9 w-56 rounded-full bg-slate-100" />
          </td>
        </tr>
      ))}
    </>
  );
};

export default DeliveryAssignTableSkeleton;
