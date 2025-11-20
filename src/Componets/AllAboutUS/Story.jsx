import React from "react";

const Story = () => {
  return (
    <div className="w-full py-14 px-6">
      {/* Title */}
      <h2
        className="text-4xl font-extrabold text-center 
      bg-gradient-to-r from-blue-600 to-cyan-500 
      bg-clip-text text-transparent mb-10"
      >
        Our Story
      </h2>

      {/* Card */}
      <div
        className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8 md:p-10 
      border border-gray-100"
      >
        <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
          <p>
            We started with a simple promise — to make parcel delivery fast,
            reliable, and stress-free. Over the years, our commitment to
            real-time tracking, efficient logistics, and customer-first service
            has made us a trusted partner for thousands. Whether it's a personal
            gift or a time-sensitive business delivery, we ensure it reaches its
            destination — on time, every time.
          </p>

          <p>
            With a dedicated logistics network and a passion for innovation, we
            constantly improve our services to meet the growing demands of
            modern delivery. Our team works around the clock to ensure every
            parcel is handled with care, precision, and speed.
          </p>

          <p>
            Today, we continue to expand our coverage, enhance our technology,
            and strengthen customer trust. Your satisfaction is our motivation,
            and your delivery is our responsibility — delivered safely, swiftly,
            and professionally.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Story;
