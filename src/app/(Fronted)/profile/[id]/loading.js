export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 animate-pulse">
      <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 px-8 py-10 space-y-3">
          <div className="h-8 w-40 bg-gray-200 rounded-lg" />
          <div className="h-3 w-56 bg-gray-100 rounded" />
        </div>
        <div className="p-8 space-y-8">
          <div className="flex flex-col items-center gap-4">
            <div className="h-28 w-28 rounded-full bg-gray-200" />
            <div className="h-6 w-32 bg-gray-50 rounded-lg" />
          </div>
          {[1, 2].map((i) => (
            <div key={i} className="space-y-3">
              <div className="h-3 w-20 bg-gray-100 rounded" />
              <div className="h-14 w-full bg-gray-100 rounded-2xl" />
            </div>
          ))}
          <div className="flex gap-4">
            <div className="h-14 flex-1 bg-gray-50 rounded-2xl" />
            <div className="h-14 flex-[2] bg-gray-200 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
