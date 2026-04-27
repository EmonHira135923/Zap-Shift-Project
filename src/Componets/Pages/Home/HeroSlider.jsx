"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ArrowUpRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const HeroSlider = () => {
  // Hydration error সমাধান করার জন্য মাউন্ট চেক
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const slides = [
    {
      id: 1,
      title: "We Make Sure Your",
      highlight: "Parcel Arrives",
      subtitle: "On Time - No Fuss.",
      desc: "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.",
      img: "/hero-1.png",
    },
    {
      id: 2,
      title: "Fastest",
      highlight: "Delivery & Easy",
      subtitle: "Pickup",
      desc: "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.",
      img: "/hero-2.png",
    },
    {
      id: 3,
      title: "Delivery in",
      highlight: "30 Minutes",
      subtitle: "at your doorstep",
      desc: "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.",
      img: "/hero-3.png",
    },
  ];

  // যদি মাউন্ট না হয়, তবে কিছু রিটার্ন করবে না (SSR mismatch এড়াতে)
  if (!mounted) return null;

  return (
    <section className="w-full bg-[#f3f4f6] py-6 md:py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-[30px] md:rounded-[40px] overflow-hidden shadow-sm border border-gray-100">
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
              <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-12 lg:p-20 min-h-[550px] md:min-h-[500px] gap-8 md:gap-10">
                <div className="flex-1 space-y-4 md:space-y-6 text-center md:text-left order-2 md:order-1">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#002B36] leading-[1.1] md:leading-tight">
                    {slide.title} <br />
                    <span className="text-[#C6EB71]">{slide.highlight}</span> <br />
                    {slide.subtitle}
                  </h1>
                  <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-md mx-auto md:mx-0 leading-relaxed">
                    {slide.desc}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 md:gap-4 pt-2 md:pt-4">
                    <Link
                      href="/track"
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#C6EB71] hover:bg-[#b5da56] text-black px-6 py-3 md:py-3.5 rounded-xl font-bold transition-all group"
                    >
                      Track Your Parcel
                      <div className="bg-[#1a1a1a] p-1 rounded-full text-[#C6EB71]">
                        <ArrowUpRight size={14} className="md:w-4 md:h-4" />
                      </div>
                    </Link>
                    <Link
                      href="/be-a-rider"
                      className="w-full sm:w-auto px-8 py-3 md:py-3.5 rounded-xl border border-gray-200 font-bold text-gray-700 hover:bg-gray-50 transition-all text-center"
                    >
                      Be A Rider
                    </Link>
                  </div>
                </div>

                <div className="flex-1 w-full flex justify-center items-center order-1 md:order-2">
                  <div className="relative w-full h-[220px] sm:h-[280px] md:h-[400px] lg:h-[450px]">
                    <Image
                      src={slide.img}
                      alt="ZapShift Hero"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Performance এরর ফিক্স করার জন্য
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

      <style jsx global>{`
        .hero-swiper .swiper-pagination-bullet {
          width: 20px;
          height: 4px;
          border-radius: 2px;
          background: #d1d5db;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          background: #002b36;
          width: 35px;
        }
        .hero-swiper .swiper-pagination {
          bottom: 20px !important;
          left: 0 !important;
          width: 100% !important;
          text-align: center;
        }
        @media (min-width: 768px) {
          .hero-swiper .swiper-pagination-bullet { width: 30px; }
          .hero-swiper .swiper-pagination-bullet-active { width: 50px; }
          .hero-swiper .swiper-pagination {
            bottom: 40px !important;
            left: 50px !important;
            padding-left: 3rem;
            width: auto !important;
            text-align: left;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;