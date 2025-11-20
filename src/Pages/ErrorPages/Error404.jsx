import React from "react";
import { Link } from "react-router";
import Footer from "../../Componets/Footer/Footer";
import Navvar from "../../Componets/Navvar/Navvar";

const Error404 = () => {
  return (
    <div>
      <Navvar />
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          {/* Simple 404 */}
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          </div>

          {/* Straightforward Message */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Page not found
            </h2>
            <p className="text-gray-600">
              Sorry, we couldn't find the page you're looking for.
            </p>
          </div>

          {/* Simple Button */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Go back home
            </Link>
          </div>

          {/* Optional: Help link */}
          <div>
            <p className="text-gray-500 text-sm">
              Think this is an error?{" "}
              <Link
                to="/contact"
                className="text-gray-700 hover:text-gray-900 underline"
              >
                Contact support
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Error404;
