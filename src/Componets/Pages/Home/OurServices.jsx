import React from "react";
import {
  FaTruck,
  FaMapMarkedAlt,
  FaBoxes,
  FaHome,
  FaBriefcase,
  FaUndo,
} from "react-icons/fa";

const OurServices = () => {
  const services = [
    {
      id: 1,
      icon: <FaTruck />,
      title: "Express & Standard Delivery",
      description:
        "We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6 hours from pick-up to drop-off.",
      isHighlighted: false,
    },
    {
      id: 2,
      icon: <FaMapMarkedAlt />,
      title: "Nationwide Delivery",
      description:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48-72 hours.",
      isHighlighted: true, // This card gets the lime-green background
    },
    {
      id: 3,
      icon: <FaBoxes />,
      title: "Fulfillment Solution",
      description:
        "We also offer customized service with inventory management support, online order processing, packaging, and after-sales support.",
      isHighlighted: false,
    },
    {
      id: 4,
      icon: <FaHome />,
      title: "Cash on Home Delivery",
      description:
        "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
      isHighlighted: false,
    },
    {
      id: 5,
      icon: <FaBriefcase />,
      title: "Corporate Service / Contract In Logistics",
      description:
        "Customized corporate services which includes warehouse and inventory management support.",
      isHighlighted: false,
    },
    {
      id: 6,
      icon: <FaUndo />,
      title: "Parcel Return",
      description:
        "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
      isHighlighted: false,
    },
  ];

  return (
    <section
      id="services"
      className="w-full bg-[#F9FAFB] py-20 px-4 md:px-6 antialiased"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mb-16 space-y-3">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#002B36] tracking-tighter">
            Our Services
          </h2>
          <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {services.map((service) => (
            <div
              key={service.id}
              className={`flex flex-col items-center text-center p-10 rounded-[40px] shadow-sm border ${
                service.isHighlighted
                  ? "bg-[#C6EB71] border-[#C6EB71] hover:bg-[#b5da56]" // Lime green card
                  : "bg-white border-gray-100 hover:border-[#C6EB71]/50 hover:shadow-lg" // Default white card
              } transition-all duration-300 group`}
            >
              {/* Icon Container with subtle gradient pulse */}
              <div
                className={`relative mb-8 flex h-16 w-16 items-center justify-center rounded-full ${
                  service.isHighlighted
                    ? "bg-[#002B36]/10 text-[#002B36]" // Darker teal icons on green card
                    : "bg-[#F9FAFB] text-[#002B36]" // Dark teal icons on white card
                }`}
              >
                {/* Ping/Pulse effect on icons (only on white cards) */}
                {!service.isHighlighted && (
                  <div className="absolute inset-0 animate-ping rounded-full bg-[#C6EB71]/10 duration-1000"></div>
                )}

                {/* Actual Icon with Hover Scaling */}
                <div
                  className={`relative z-10 text-3xl transition-transform duration-300 ${!service.isHighlighted ? "group-hover:scale-110" : ""}`}
                >
                  {service.icon}
                </div>
              </div>

              {/* Service Title */}
              <h3
                className={`mb-4 text-xl font-bold leading-tight ${
                  service.isHighlighted ? "text-[#002B36]" : "text-[#002B36]"
                }`}
              >
                {service.title}
              </h3>

              {/* Service Description */}
              <p
                className={`text-sm leading-relaxed ${
                  service.isHighlighted
                    ? "text-[#002B36]/80 font-medium"
                    : "text-gray-500 font-normal"
                }`}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
