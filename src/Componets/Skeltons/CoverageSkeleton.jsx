import React from "react";

const CoverageSkeleton = () => {
  return (
    <div className="w-full bg-[#f3f4f6] py-10 px-4 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Skeleton */}
        <div className="text-center md:text-left space-y-4">
          <div className="h-10 md:h-12 bg-gray-200 rounded-xl w-3/4 md:w-1/2 mx-auto md:mx-0"></div>
          <div className="h-4 bg-gray-200 rounded-lg w-1/2 md:w-1/4 mx-auto md:mx-0"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar List Skeleton */}
          <div className="lg:col-span-1 bg-white p-6 rounded-[30px] border border-gray-100 h-[600px] space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded-xl w-full"></div>
            ))}
          </div>

          {/* Map Skeleton */}
          <div className="lg:col-span-3 h-[600px] rounded-[30px] bg-gray-200 border border-gray-100 flex items-center justify-center">
             <div className="text-gray-400 flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverageSkeleton;