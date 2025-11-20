import React from "react";

const Success = () => {
  return (
    <div className="w-full bg-green-50 py-16 px-4">
      {/* Title Section */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-green-800 mb-4">
          Success Stories
        </h1>
        <p className="text-green-700 text-lg">
          Discover the inspiring success stories of our team members and
          clients.
        </p>
      </div>

      {/* Example cards for success stories */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:scale-105 transform transition duration-300">
          <img
            src="https://via.placeholder.com/150"
            alt="Success Story"
            className="w-24 h-24 mx-auto rounded-full mb-4"
          />
          <h2 className="text-xl font-semibold text-green-800">
            Alice Johnson
          </h2>
          <p className="text-green-600">Reached 1M Users Milestone</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:scale-105 transform transition duration-300">
          <img
            src="https://via.placeholder.com/150"
            alt="Success Story"
            className="w-24 h-24 mx-auto rounded-full mb-4"
          />
          <h2 className="text-xl font-semibold text-green-800">Bob Williams</h2>
          <p className="text-green-600">Awarded Best Startup 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Success;
