import React from "react";

const ReviewCard = ({ reviews }) => {
  const { userName, review, user_photoURL, designation } = reviews;

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-6 sm:p-8 max-w-md mx-auto transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-blue-100">
      {/* Quote Icon */}
      <div className="text-blue-500 mb-4">
        <svg
          className="w-8 h-8 opacity-20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
        </svg>
      </div>

      {/* Review Text */}
      <div className="mb-6">
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-light">
          "{review}"
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-blue-200 my-4"></div>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <img
          src={user_photoURL}
          alt={userName}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white shadow-md"
        />
        <div>
          <h1 className="text-gray-900 font-bold text-sm sm:text-lg">
            {userName}
          </h1>
          <p className="text-blue-600 text-xs sm:text-sm font-medium">
            {designation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
