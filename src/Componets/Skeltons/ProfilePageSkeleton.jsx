import React from "react";

const ProfilePageSkeleton = () => (
  <div className="max-w-4xl mx-auto space-y-6 pb-10 animate-pulse">
    <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        <div className="h-28 w-28 rounded-full bg-gray-200 border-[6px] border-gray-50 shadow-sm" />
        <div className="space-y-3">
          <div className="h-7 w-48 bg-gray-200 rounded-lg mx-auto sm:mx-0" />
          <div className="h-3 w-24 bg-gray-100 rounded-md mx-auto sm:mx-0" />
        </div>
      </div>
      <div className="h-12 w-36 bg-gray-200 rounded-2xl" />
    </div>
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-8 py-5 border-b border-gray-50 bg-gray-50/50 flex justify-between">
        <div className="h-3 w-32 bg-gray-200 rounded" />
        <div className="h-3 w-20 bg-gray-100 rounded" />
      </div>
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="space-y-2">
            <div className="h-2.5 w-20 bg-gray-100 rounded" />
            <div className="h-5 w-40 bg-gray-200 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
    <div className="bg-gray-100 rounded-[32px] p-8 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <div className="h-12 w-12 bg-gray-200 rounded-2xl rotate-3" />
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-2 w-24 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  </div>
);

export default ProfilePageSkeleton;
