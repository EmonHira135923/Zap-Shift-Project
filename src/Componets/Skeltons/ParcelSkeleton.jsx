export const ParcelSkeleton = () => (
  <div className="bg-white border border-gray-100 rounded-[2rem] p-6 space-y-6 animate-pulse">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-200 rounded-2xl"></div>
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-3 w-16 bg-gray-100 rounded"></div>
        </div>
      </div>
      <div className="h-8 w-16 bg-gray-200 rounded-lg"></div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="h-10 bg-gray-50 rounded-xl"></div>
      <div className="h-10 bg-gray-50 rounded-xl"></div>
    </div>
    <div className="h-16 bg-gray-50 rounded-2xl w-full"></div>
  </div>
);