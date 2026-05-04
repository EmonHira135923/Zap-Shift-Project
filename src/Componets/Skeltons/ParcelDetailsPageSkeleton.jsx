export const ParcelDetailsPageSkeleton = () => (
  <div className="max-w-6xl mx-auto p-4 sm:p-8 animate-pulse">
    <div className="h-64 bg-gray-200 rounded-[2.5rem] mb-8" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="h-48 bg-gray-200 rounded-[2rem]" />
        <div className="h-48 bg-gray-200 rounded-[2rem]" />
      </div>
      <div className="h-96 bg-gray-200 rounded-[2rem]" />
    </div>
  </div>
);
