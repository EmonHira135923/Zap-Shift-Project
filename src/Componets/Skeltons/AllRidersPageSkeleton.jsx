const AllRidersPageSkeleton = () => (
  <div className="max-w-7xl mx-auto p-4 sm:p-10 pb-24 min-h-screen bg-[#F8FAFC] animate-pulse">
    <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
      <div className="space-y-3">
        <div className="h-7 w-40 bg-gray-200 rounded-full"></div>
        <div className="h-12 w-80 max-w-full bg-gray-200 rounded-xl"></div>
        <div className="h-4 w-72 max-w-full bg-gray-100 rounded"></div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-center w-full lg:w-auto">
        <div className="h-14 w-full sm:w-80 bg-white border border-gray-100 rounded-2xl"></div>
        <div className="h-16 min-w-[140px] w-full sm:w-36 bg-[#002B36]/10 rounded-2xl"></div>
      </div>
    </div>
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="grid grid-cols-6 gap-4 px-6 py-5 border-b border-gray-50">
          <div className="h-4 bg-gray-100 rounded"></div>
          <div className="h-4 bg-gray-100 rounded col-span-2"></div>
          <div className="h-4 bg-gray-100 rounded"></div>
          <div className="h-5 bg-gray-100 rounded-full"></div>
          <div className="h-8 bg-gray-100 rounded-xl"></div>
        </div>
      ))}
    </div>
  </div>
);

export default AllRidersPageSkeleton;
