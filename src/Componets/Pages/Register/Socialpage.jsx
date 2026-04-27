import React from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
const Socialpage = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="flex items-center justify-center gap-2 py-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all text-sm font-semibold text-gray-600"
        >
          <FaGoogle className="text-red-500" /> Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 py-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all text-sm font-semibold text-gray-600"
        >
          <FaGithub className="text-[#002B36]" /> GitHub
        </button>
      </div>
    </div>
  );
};

export default Socialpage;
