const PaymentCheckoutPageSkeleton = () => (
  <div className="max-w-4xl mx-auto p-6 space-y-8 animate-pulse">
    <div className="space-y-3">
      <div className="h-8 bg-gray-200 rounded-xl w-48"></div>
      <div className="h-4 bg-gray-100 rounded-md w-64"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-6">
        <div className="bg-white border border-gray-100 rounded-[2rem] p-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-2xl"></div>
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded-md w-40"></div>
              <div className="h-3 bg-gray-100 rounded-md w-24"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="h-16 bg-gray-50 rounded-2xl"></div>
            <div className="h-16 bg-gray-50 rounded-2xl"></div>
          </div>
        </div>
        <div className="bg-gray-900 rounded-[2rem] p-8 h-48 relative overflow-hidden">
          <div className="absolute top-8 right-8 w-12 h-8 bg-gray-800 rounded-md"></div>
          <div className="mt-12 h-6 bg-gray-800 rounded-md w-3/4"></div>
          <div className="mt-8 flex gap-4">
            <div className="h-4 bg-gray-800 rounded-md w-20"></div>
            <div className="h-4 bg-gray-800 rounded-md w-20"></div>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-white border border-gray-100 rounded-[2rem] p-6 space-y-4">
          <div className="h-5 bg-gray-200 rounded-md w-32 mb-6"></div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-100 rounded-md w-20"></div>
            <div className="h-4 bg-gray-200 rounded-md w-12"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-100 rounded-md w-24"></div>
            <div className="h-4 bg-gray-200 rounded-md w-12"></div>
          </div>
          <div className="border-t border-dashed border-gray-100 pt-4 mt-4 flex justify-between">
            <div className="h-6 bg-gray-200 rounded-md w-24"></div>
            <div className="h-6 bg-gray-900/10 rounded-md w-16"></div>
          </div>
          <div className="h-12 bg-[#98B42C]/20 rounded-xl w-full mt-6"></div>
        </div>
      </div>
    </div>
  </div>
);

export default PaymentCheckoutPageSkeleton;
