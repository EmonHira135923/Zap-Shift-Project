export const NavSkeleton = () => (
  <div className="flex items-center gap-3 animate-pulse">
    {/* স্ক্রিনশটের মেনু আইটেমগুলো যদি লোডিং এ নড়াচড়া করে তবে এখানে একটি গ্যাপ রাখা ভালো */}
    <div className="flex items-center gap-3">
       {/* গোল প্রোফাইল ইমেজের স্কেলিটন */}
       <div className="w-10 h-10 bg-gray-200 rounded-full border-2 border-white shadow-sm"></div>
    </div>
  </div>
);