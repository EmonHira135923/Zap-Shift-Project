"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Testimonials = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const reviews = [
    { id: 1, name: "Awlad Hossin", role: "Senior Designer", text: "A posture corrector works by providing support and gentle alignment..." },
    { id: 2, name: "Rasel Ahmed", role: "CTO", text: "The delivery service has been exceptionally reliable. Real-time tracking is great." },
    { id: 3, name: "Nasir Uddin", role: "CEO", text: "We've seen a significant increase in customer satisfaction since switching." },
    { id: 4, name: "Alamin Rice", role: "Merchant", text: "The easiest platform to manage SME shipments. Saves us hours every day." },
    { id: 5, name: "Emon Hossain", role: "Full Stack Developer", text: "ZapShift provides the most robust API for logistics I have ever integrated." },
  ];

  // Swiper Loop Warning সমাধান করতে স্লাইড ডুপ্লিকেট করা (কমপক্ষে ৮-১০টি স্লাইড লুপের জন্য ভালো)
  const duplicatedReviews = [...reviews, ...reviews];

  if (!mounted) return null;

  return (
    <section className="w-full bg-[#f3f4f6] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#002B36] mb-4">
            What our customers are saying
          </h2>
        </div>

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true} // এখন ডুপ্লিকেট ডাটা থাকায় এরর দেবে না
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 20, // একটু কমিয়ে দেয়া হয়েছে cleaner লুকের জন্য
            stretch: 0,
            depth: 150,
            modifier: 1.5,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="reviewSwiper !pb-20"
        >
          {duplicatedReviews.map((review, index) => (
            <SwiperSlide key={`${review.id}-${index}`} className="max-w-[350px] md:max-w-[400px]">
              <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-xl border border-gray-100 flex flex-col h-[420px] md:h-[450px]">
                <div className="text-[#C6EB71] mb-6">
                  <FaQuoteLeft size={35} />
                </div>
                <p className="text-gray-600 text-base leading-relaxed flex-grow italic">
                  "{review.text}"
                </p>
                <div className="w-full border-t border-dashed border-gray-200 my-6"></div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#002B36] flex-shrink-0 flex items-center justify-center text-[#C6EB71] font-bold shadow-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#002B36]">{review.name}</h4>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">{review.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .reviewSwiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #d1d5db;
          opacity: 1;
        }
        .reviewSwiper .swiper-pagination-bullet-active {
          background: #002b36;
          width: 25px;
          border-radius: 5px;
        }
        .swiper-slide:not(.swiper-slide-active) {
          opacity: 0.5;
          transform: scale(0.9);
        }
      `}</style>
    </section>
  );
};

export default Testimonials;