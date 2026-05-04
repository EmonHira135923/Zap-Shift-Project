const SendAParcelPageSkeleton = () => (
  <section className="min-h-screen bg-gray-50 py-10 px-4 animate-pulse">
    <div className="max-w-5xl mx-auto bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100">
      <div className="mb-10 space-y-3">
        <div className="h-9 w-56 bg-gray-200 rounded-xl"></div>
        <div className="h-4 w-72 bg-gray-100 rounded"></div>
      </div>
      <div className="space-y-10">
        <div className="h-8 w-64 bg-gray-100 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-14 bg-gray-100 rounded-lg"></div>
          <div className="h-14 bg-gray-100 rounded-lg"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[1, 2].map((section) => (
            <div key={section} className="space-y-5">
              <div className="h-7 w-40 bg-gray-200 rounded"></div>
              {[1, 2, 3, 4, 5].map((row) => (
                <div key={row} className="h-12 bg-gray-100 rounded-lg"></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default SendAParcelPageSkeleton;
