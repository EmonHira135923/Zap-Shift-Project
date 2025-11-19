import React from "react";
import { NavLink } from "react-router";

const WeAllAbout = () => {
  const tabs = ["Story", "Mission", "Success", "Team & Others"];

  return (
    <div className="max-w-5xl mx-auto py-16 px-6">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {tabs.map((tab, i) => (
          <NavLink
            key={i}
            to="/"
            className={({ isActive }) =>
              `px-6 py-2 rounded-full text-sm font-medium border transition 
              ${
                isActive
                  ? "bg-info text-white border-info shadow"
                  : "text-gray-700 border-gray-300 hover:bg-gray-100"
              }`
            }
          >
            {tab}
          </NavLink>
        ))}
      </div>

      {/* Content Section */}
      <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
        <p>
          We started with a simple promise — to make parcel delivery fast,
          reliable, and stress-free. Over the years, our commitment to real-time
          tracking, efficient logistics, and customer-first service has made us
          a trusted partner for thousands. Whether it's a personal gift or a
          time-sensitive business delivery, we ensure it reaches its destination
          — on time, every time.
        </p>

        <p>
          With a dedicated logistics network and a passion for innovation, we
          constantly improve our services to meet the growing demands of modern
          delivery. Our team works around the clock to ensure every parcel is
          handled with care, precision, and speed.
        </p>

        <p>
          Today, we continue to expand our coverage, enhance our technology, and
          strengthen customer trust. Your satisfaction is our motivation, and
          your delivery is our responsibility — delivered safely, swiftly, and
          professionally.
        </p>
      </div>
    </div>
  );
};

export default WeAllAbout;
