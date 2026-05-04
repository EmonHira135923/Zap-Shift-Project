const PaymentSuccessProcessingSkeleton = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#98B42C]"></div>
    <p className="mt-4 text-gray-500">Processing your secure payment...</p>
  </div>
);

export default PaymentSuccessProcessingSkeleton;
