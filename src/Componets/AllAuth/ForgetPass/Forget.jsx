import React from "react";
import { NavLink, useNavigate } from "react-router";

const Forget = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Forgot Password
          </h1>
          <p className="text-gray-600 mb-6">
            Enter your email address and we'll send you a reset link.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <button
            onClick={() => navigate("/getcode")}
            type="submit"
            className="w-full bg-info text-black py-3 px-4 rounded-lg hover:bg-info focus:ring-2 focus:ring-info focus:ring-offset-2 transition-colors font-medium"
          >
            Send
          </button>
        </form>

        {/* Redirect to Login */}
        <div className="text-center text-sm">
          <p className="text-gray-600">
            Remember your password?{" "}
            <NavLink
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forget;
