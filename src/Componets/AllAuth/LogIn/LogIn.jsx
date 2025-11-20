import React from "react";
import { NavLink } from "react-router";

const LogIn = () => {
  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-0 min-h-screen ">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 mb-8">Login with ZapShift</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
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

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                autoComplete="new-password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <NavLink
              to="/forgot"
              type="button"
              className="text-sm text-blue-600 hover:underline font-medium transition-all"
            >
              Forgot Password?
            </NavLink>
          </div>

          <button
            type="submit"
            className="w-full bg-info text-black py-3 px-4 rounded-lg hover:bg-info focus:ring-2 focus:ring-info focus:ring-offset-2 transition-colors font-medium"
          >
            Login
          </button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <NavLink
              to="/register"
              className="text-blue-600 hover:underline font-medium transition-all"
            >
              Register
            </NavLink>
          </p>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        <div>
          <button className="w-full bg-white text-gray-700 py-3 px-4 border border-gray-300 rounded-lg hover:bg-info hover:text-black focus:ring-2 focus:ring-info focus:ring-offset-2 transition-colors font-medium flex items-center justify-center gap-3">
            <svg
              aria-label="Google logo"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
