export const TrackingSkeleton = () => {
  return (
    <div className="animate-pulse space-y-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-6">
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 bg-gray-200 rounded-full" />
            <div className="w-0.5 h-16 bg-gray-100" />
          </div>
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-3 bg-gray-100 rounded w-1/2" />
            <div className="h-2 bg-gray-50 rounded w-1/6 mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
};