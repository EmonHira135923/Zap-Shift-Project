import React from "react";
import Link from "next/link";
import { MoveLeft, PackageSearch } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#F9FAFB] px-6 text-center antialiased">
      {/* Icon/Illustration Area */}
      <div className="relative mb-8">
        <div className="absolute inset-0 animate-ping rounded-full bg-[#C6EB71]/20 scale-150 opacity-30"></div>
        <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl bg-white shadow-xl shadow-lime-100 border border-gray-100">
          <PackageSearch
            size={64}
            className="text-[#C6EB71]"
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* Error Text */}
      <h1 className="text-9xl font-black text-[#1A1A1A] tracking-tighter opacity-10 leading-none">
        404
      </h1>

      <div className="mt-[-2rem] space-y-4">
        <h2 className="text-3xl font-bold text-[#1A1A1A]">Parcel Not Found</h2>
        <p className="max-w-md text-gray-500 font-medium">
          Oops! It looks like the page you are looking for has been redirected
          or lost in transit. Let's get you back on the right track.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 bg-[#C6EB71] hover:bg-[#b5da56] text-black px-8 py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-lime-200/50"
        >
          <MoveLeft size={20} />
          Back to Home
        </Link>

        <Link
          href="/contact"
          className="px-8 py-3.5 rounded-2xl border border-gray-200 font-bold text-gray-700 hover:bg-white hover:shadow-md transition-all"
        >
          Report Issue
        </Link>
      </div>

      {/* Decorative Background Element */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
        <div className="flex gap-4 items-center">
          <div className="h-1 w-12 rounded-full bg-gray-300"></div>
          <div className="h-1 w-1 rounded-full bg-gray-300"></div>
          <div className="h-1 w-1 rounded-full bg-gray-300"></div>
          <div className="h-1 w-12 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
