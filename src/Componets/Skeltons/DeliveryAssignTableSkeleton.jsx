import React from "react";

const DeliveryAssignTableSkeleton = () => {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <tr key={index} className="border-b border-gray-100 animate-pulse">
          <td className="px-6 py-5">
            <div className="h-4 w-8 bg-gray-200 rounded" />
          </td>
          <td className="px-6 py-5">
            <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-24 bg-gray-100 rounded" />
          </td>
          <td className="px-6 py-5">
            <div className="h-4 w-28 bg-gray-200 rounded" />
          </td>
          <td className="px-6 py-5">
            <div className="h-4 w-28 bg-gray-200 rounded" />
          </td>
          <td className="px-6 py-5">
            <div className="h-4 w-20 bg-gray-200 rounded" />
          </td>
          <td className="px-6 py-5 text-right">
            <div className="h-8 w-24 bg-gray-200 rounded ml-auto" />
          </td>
        </tr>
      ))}
    </>
  );
};

export default DeliveryAssignTableSkeleton;