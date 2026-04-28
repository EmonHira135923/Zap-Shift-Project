import React from "react";
import Link from "next/link";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        {/* আইকন বা ইলাস্ট্রেশন */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-50 p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m0 0v3m0-3h3m-3 0H9m12-3a9 9 0 11-18 0 9 9 0 0118 0zM15 9l-6 6m0-6l6 6"
              />
            </svg>
          </div>
        </div>

        {/* টেক্সট কন্টেন্ট */}
        <h1 className="text-6xl font-black text-gray-900 mb-2">403</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Access Forbidden
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          দুঃখিত! এই পেজটি দেখার অনুমতি আপনার নেই। শুধুমাত্র এডমিনরা এই
          ড্যাশবোর্ড অ্যাক্সেস করতে পারেন।
        </p>

        {/* বাটনসমূহ */}
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
          >
            Back to Home
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-400">
          ZapShift Logistics & Courier Service
        </p>
      </div>
    </div>
  );
};

export default Forbidden;
