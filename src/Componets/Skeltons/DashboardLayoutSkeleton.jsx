"use client";
import React from "react";

const DashboardLayoutSkeleton = () => (
  <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 p-5 space-y-8">
      <div className="flex items-center gap-3 px-2 animate-pulse">
        <div className="w-9 h-9 bg-gray-200 rounded-xl"></div>
        <div className="h-5 w-28 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="space-y-6 pt-4">
        <div className="px-3">
          <div className="h-2.5 w-12 bg-gray-100 rounded-full animate-pulse"></div>
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-3 rounded-2xl animate-pulse">
              <div className="w-5 h-5 bg-gray-200 rounded-lg"></div>
              <div className="h-4 w-24 bg-gray-100 rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto p-4 bg-gray-50 rounded-2xl space-y-3 animate-pulse">
        <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
        <div className="h-8 w-full bg-gray-200 rounded-xl"></div>
      </div>
    </aside>
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="h-20 bg-white border-b border-gray-100 px-6 md:px-10 flex items-center justify-between">
        <div className="flex items-center gap-4 animate-pulse">
          <div className="h-10 w-10 bg-gray-100 rounded-xl md:hidden"></div>
          <div className="h-10 w-48 md:w-80 bg-gray-50 border border-gray-100 rounded-2xl hidden sm:block"></div>
        </div>
        <div className="flex items-center gap-3 md:gap-5 animate-pulse">
          <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl"></div>
          <div className="w-px h-6 bg-gray-100 hidden sm:block"></div>
          <div className="flex items-center gap-3">
            <div className="text-right space-y-1.5 hidden sm:block">
              <div className="h-3 w-24 bg-gray-200 rounded-full"></div>
              <div className="h-2 w-16 ml-auto bg-gray-100 rounded-full"></div>
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded-full ring-4 ring-gray-50"></div>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
        <div className="flex justify-between items-end animate-pulse">
          <div className="space-y-2">
            <div className="h-6 w-48 bg-gray-200 rounded-lg"></div>
            <div className="h-3 w-64 bg-gray-100 rounded-lg"></div>
          </div>
          <div className="h-11 w-32 bg-gray-200 rounded-xl hidden md:block"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-[2rem] border border-gray-100 p-6 space-y-4 shadow-sm animate-pulse">
              <div className="flex justify-between">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl"></div>
                <div className="w-10 h-4 bg-gray-100 rounded-full"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-1/2 bg-gray-100 rounded"></div>
                <div className="h-7 w-3/4 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm animate-pulse space-y-6">
          <div className="h-5 w-40 bg-gray-200 rounded-lg"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={row} className="flex gap-4 items-center">
                <div className="w-full h-12 bg-gray-50 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  </div>
);

export default DashboardLayoutSkeleton;
