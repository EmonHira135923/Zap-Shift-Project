import React from "react";
import shopimg from "../../assets/live-tracking.png";
import manimg from "../../assets/safe-delivery.png";

const Delivary = () => {
  return (
    <div className="w-full py-16 px-4 bg-gray-50">
      {/* Top horizontal dotted line */}
      <div className="w-full border-t-2 border-dotted border-gray-300 mb-16"></div>

      <div className="max-w-5xl mx-auto flex flex-col gap-16">
        {/* Features */}
        {[
          {
            img: shopimg,
            title: "Live Parcel Tracking",
            desc: `Stay updated in real-time with our live parcel tracking feature.
                   From pick-up to delivery, monitor your shipment's journey and get
                   instant status updates for complete peace of mind.`,
          },
          {
            img: manimg,
            title: "100% Safe Delivery",
            desc: `We ensure your parcels are handled with the utmost care and
                   delivered securely to their destination. Our reliable process
                   guarantees safe and damage-free delivery every time.`,
          },
          {
            img: manimg,
            title: "24/7 Call Center Support",
            desc: `Our dedicated support team is available around the clock to assist
                   you with any questions, updates, or delivery concerns—anytime you
                   need us.`,
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="flex bg-white p-10 items-start gap-12 relative"
          >
            {/* Image */}
            <div className="w-32 flex-shrink-0 relative z-10">
              <img
                src={feature.img}
                alt={feature.title}
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Vertical dotted line */}
            <div className="absolute left-47 transform -translate-x-1/2 top-5 h-[calc(100%-2rem)] border-l-2 border-dotted border-gray-300"></div>

            {/* Content */}
            <div className="flex-1 pt-2 relative z-10">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {feature.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom horizontal dotted line */}
      <div className="w-full border-t-2 border-dotted border-gray-300 mt-16"></div>
    </div>
  );
};

export default Delivary;
