import React from "react";

const TeamsandOther = () => {
  return (
    <div className="w-full bg-gray-50 py-16 px-4">
      {/* Title Section */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Our Teams & Other
        </h1>
        <p className="text-gray-600 text-lg">
          Meet our talented team members and explore other contributors who make
          everything possible.
        </p>
      </div>

      {/* Example card layout for team members */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Single Team Member Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:scale-105 transform transition duration-300">
          <img
            src="https://via.placeholder.com/150"
            alt="Team Member"
            className="w-24 h-24 mx-auto rounded-full mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800">John Doe</h2>
          <p className="text-gray-500">Software Engineer</p>
        </div>

        {/* Duplicate cards as needed */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:scale-105 transform transition duration-300">
          <img
            src="https://via.placeholder.com/150"
            alt="Team Member"
            className="w-24 h-24 mx-auto rounded-full mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800">Jane Smith</h2>
          <p className="text-gray-500">UI/UX Designer</p>
        </div>
      </div>
    </div>
  );
};

export default TeamsandOther;
