const UpdateParcelPageSkeleton = () => (
  <div className="max-w-6xl mx-auto p-10 bg-[#f8fafc] min-h-screen animate-pulse">
    <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100">
      <div className="h-9 w-56 bg-gray-200 rounded-xl mb-3"></div>
      <div className="h-4 w-72 bg-gray-100 rounded mb-10"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="space-y-2">
            <div className="h-3 w-24 bg-gray-100 rounded"></div>
            <div className="h-14 bg-gray-100 rounded-xl"></div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-12">
        {[1, 2].map((section) => (
          <div key={section} className="space-y-4">
            <div className="h-7 w-40 bg-gray-200 rounded"></div>
            {[1, 2, 3, 4].map((row) => (
              <div key={row} className="h-12 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default UpdateParcelPageSkeleton;
