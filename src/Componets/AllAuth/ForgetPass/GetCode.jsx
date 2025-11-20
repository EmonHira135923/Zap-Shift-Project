import React from "react";
import { useNavigate } from "react-router";

const GetCode = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center  px-4 sm:px-6">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Enter Code
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Enter the 6-digit code that we sent to your email address
          </p>
        </div>

        {/* 6 Code Boxes */}
        <div className="flex justify-between mt-6 gap-2">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg sm:text-xl font-medium"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={() => navigate("/resetpass")}
          type="submit"
          className="w-full bg-info text-black py-3 rounded-lg hover:bg-info focus:ring-2 focus:ring-info focus:ring-offset-2 transition-colors font-medium mt-6"
        >
          Verify Code
        </button>
      </div>
    </div>
  );
};

export default GetCode;
