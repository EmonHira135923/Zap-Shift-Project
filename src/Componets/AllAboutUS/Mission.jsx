import React from "react";

const Mission = () => {
  return (
    <div className="w-full py-14 px-6">
      {/* Title */}
      <h2
        className="text-4xl font-extrabold text-center 
      bg-gradient-to-r from-blue-600 to-cyan-500 
      bg-clip-text text-transparent mb-10"
      >
        Our Mission
      </h2>

      {/* Card */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8 md:p-10 border border-gray-100">
        <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
          <p>
            Our mission is simple — to redefine the future of parcel delivery by
            combining technology, efficiency, and customer trust. We aim to
            create a delivery ecosystem where every package moves faster,
            smoother, and more securely than ever before.
          </p>

          <p>
            By integrating smart tracking, optimized logistics, and a dedicated
            support system, we ensure that individuals and businesses experience
            seamless parcel delivery — without delays, confusion, or stress.
          </p>

          <p>
            We are committed to continuous growth, innovation, and excellence.
            Every delivery we make strengthens our relationship with customers
            and motivates us to push the boundaries of what's possible in modern
            logistics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mission;
