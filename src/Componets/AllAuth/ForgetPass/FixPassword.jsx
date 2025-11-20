import React from "react";

const FixPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  px-4 sm:px-6">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Enter your new password below
          </p>
        </div>

        {/* Password Form */}
        <form className="space-y-4">
          {/* New Password */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              autoComplete="new-password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter new password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Confirm new password"
            />
          </div>

          {/* Reset Button */}
          <button
            type="submit"
            className="w-full bg-info text-black py-3 rounded-lg  focus:ring-2 focus:ring-info focus:ring-offset-2 transition-colors font-medium mt-4"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default FixPassword;
