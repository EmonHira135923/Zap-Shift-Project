"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Awlad Hossin",
      role: "Senior Product Designer",
      text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    },
    {
      id: 2,
      name: "Rasel Ahmed",
      role: "CTO",
      text: "The delivery service has been exceptionally reliable. Real-time tracking and professional handling have made our logistics much smoother.",
    },
    {
      id: 3,
      name: "Nasir Uddin",
      role: "CEO",
      text: "We've seen a significant increase in customer satisfaction since switching to ZapShift. Their 30-minute delivery promise is a game changer.",
    },
    {
      id: 4,
      name: "Alamin Rice",
      role: "Merchant",
      text: "The easiest platform to manage SME shipments. The automated order processing saves us hours every single day.",
    },
    {
      id: 5,
      name: "Emon Hossain",
      role: "Full Stack Developer",
      text: "ZapShift provides the most robust API for logistics I have ever integrated. The speed and reliability are unmatched in the current market.",
    },
  ];

  return (
    <section className="w-full bg-[#f3f4f6] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#002B36] mb-4">
            What our customers are saying
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
            Real feedback from the people who rely on ZapShift every day for
            their logistics needs.
          </p>
        </div>

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 30, // Reduced rotation for cleaner text readability
            stretch: 0,
            depth: 100,
            modifier: 2.5, // Stronger depth effect
            slideShadows: false, // Turned off default shadows to use custom Tailwind shadows
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="reviewSwiper !pb-16"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className="max-w-[400px]">
              <div className="bg-white rounded-[40px] p-10 shadow-xl border border-gray-100 flex flex-col h-[450px] transition-all duration-300">
                {/* Quote Icon */}
                <div className="text-[#C6EB71] mb-6">
                  <FaQuoteLeft size={40} />
                </div>

                {/* Review Text */}
                <p className="text-gray-600 text-base md:text-lg leading-relaxed flex-grow italic">
                  "{review.text}"
                </p>

                {/* Branding Divider */}
                <div className="w-full border-t border-dashed border-gray-200 my-8"></div>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#002B36] flex-shrink-0 flex items-center justify-center text-[#C6EB71] font-bold text-xl shadow-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#002B36] text-lg">
                      {review.name}
                    </h4>
                    <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">
                      {review.role}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .reviewSwiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #d1d5db;
          opacity: 1;
        }
        .reviewSwiper .swiper-pagination-bullet-active {
          background: #002b36;
          width: 30px;
          border-radius: 6px;
        }
        /* Ensures the centered slide looks clear while others are slightly faded */
        .swiper-slide:not(.swiper-slide-active) {
          opacity: 0.6;
          filter: blur(1px);
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
