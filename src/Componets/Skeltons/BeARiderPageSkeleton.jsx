const BeARiderPageSkeleton = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 animate-pulse">
    <div className="max-w-6xl mx-auto w-full bg-white rounded-[40px] shadow-sm border border-gray-100 p-6 md:p-10 lg:p-16">
      <div className="mb-12 space-y-3">
        <div className="h-10 w-52 bg-gray-200 rounded-xl"></div>
        <div className="h-4 w-96 max-w-full bg-gray-100 rounded"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="h-8 w-64 bg-gray-200 rounded"></div>
          {[1, 2, 3, 4, 5, 6].map((row) => (
            <div key={row} className="h-14 bg-gray-100 rounded-2xl"></div>
          ))}
        </div>
        <div className="hidden lg:block h-[420px] bg-gray-100 rounded-[2rem]"></div>
      </div>
    </div>
  </div>
);

export default BeARiderPageSkeleton;
