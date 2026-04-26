"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ArrowUpRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      title: "We Make Sure Your",
      highlight: "Parcel Arrives",
      subtitle: "On Time - No Fuss.",
      desc: "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.",
      img: "/hero-1.png", // Replace with your image 3c1ff0
    },
    {
      id: 2,
      title: "Fastest",
      highlight: "Delivery & Easy",
      subtitle: "Pickup",
      desc: "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.",
      img: "/hero-2.png", // Replace with your image 3c1f93
    },
    {
      id: 3,
      title: "Delivery in",
      highlight: "30 Minutes",
      subtitle: "at your doorstep",
      desc: "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.",
      img: "/hero-3.png", // Replace with your image 3c1f52
    },
  ];

  return (
    <section className="w-full bg-[#f3f4f6] py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="hero-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-20 min-h-[500px] gap-10">
                {/* Text Content */}
                <div className="flex-1 space-y-6 text-center md:text-left">
                  <h1 className="text-4xl md:text-6xl font-bold text-[#002B36] leading-tight">
                    {slide.title} <br />
                    <span className="text-[#C6EB71]">
                      {slide.highlight}
                    </span>{" "}
                    <br />
                    {slide.subtitle}
                  </h1>
                  <p className="text-gray-500 text-sm md:text-base max-w-lg leading-relaxed">
                    {slide.desc}
                  </p>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
                    <Link
                      href="/track"
                      className="flex items-center gap-2 bg-[#C6EB71] hover:bg-[#b5da56] text-black px-6 py-3 rounded-xl font-bold transition-all group"
                    >
                      Track Your Parcel
                      <div className="bg-[#1a1a1a] p-1 rounded-full text-[#C6EB71]">
                        <ArrowUpRight size={16} />
                      </div>
                    </Link>
                    <Link
                      href="/be-a-rider"
                      className="px-8 py-3 rounded-xl border border-gray-200 font-bold text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      Be A Rider
                    </Link>
                  </div>
                </div>

                {/* Image Section */}
                <div className="flex-1 flex justify-center items-center">
                  <div className="relative w-full h-[300px] md:h-[450px]">
                    <Image
                      src={slide.img}
                      alt="ZapShift Hero"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Pagination Styling */}
      <style jsx global>{`
        .hero-swiper .swiper-pagination-bullet {
          width: 30px;
          height: 4px;
          border-radius: 2px;
          background: #d1d5db;
          opacity: 1;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          background: #002b36;
          width: 40px;
        }
        .hero-swiper .swiper-pagination {
          bottom: 30px !important;
          left: 80px !important;
          text-align: left;
        }
        @media (max-width: 768px) {
          .hero-swiper .swiper-pagination {
            left: 0 !important;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;
