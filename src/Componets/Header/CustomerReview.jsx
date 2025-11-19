import React, { use } from "react";
import customerimg from "../../assets/customer-top.png";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import ReviewCard from "./ReviewCard";

const CustomerReview = ({ ReviewPromise }) => {
  const reviewdata = use(ReviewPromise);

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Enhanced Image Container */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              {/* Main Image with Enhanced Size */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56  rounded-3xl shadow-2xl flex items-center justify-center transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 ease-out">
                <img
                  src={customerimg}
                  alt="Happy Customers"
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-s28 md:h-28 lg:w-32 lg:h-32 object-contain filter drop-shadow-lg"
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">★</span>
              </div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs">❤</span>
              </div>

              {/* Animated Ring */}
              <div className="absolute inset-0 border-4 border-blue-300 rounded-3xl opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-500"></div>
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            What Our Customers Are Saying
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied users who have transformed their posture
            and enhanced their well-being with Posture Pro. Real results, real
            stories.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 mt-8">
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-100 min-w-[120px]">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600">
                4.9/5
              </div>
              <div className="text-gray-500 text-sm sm:text-base">
                Average Rating
              </div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-100 min-w-[120px]">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600">
                10K+
              </div>
              <div className="text-gray-500 text-sm sm:text-base">
                Happy Customers
              </div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-100 min-w-[120px]">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600">
                98%
              </div>
              <div className="text-gray-500 text-sm sm:text-base">
                Would Recommend
              </div>
            </div>
          </div>
        </div>

        {/* Swiper Section */}
        <div className="relative">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 5,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="customerReviewSwiperPremium"
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 25,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
          >
            {reviewdata.map((reviews, index) => (
              <SwiperSlide
                key={reviews.id}
                className="max-w-sm sm:max-w-md !h-auto transform transition-all duration-500 hover:scale-105"
              >
                <ReviewCard reviews={reviews} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .customerReviewSwiperPremium {
          padding: 60px 20px 80px;
        }
        .customerReviewSwiperPremium :global(.swiper-slide) {
          background: transparent;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s ease;
        }
        .customerReviewSwiperPremium :global(.swiper-slide-active) {
          transform: scale(1.05);
        }
        .customerReviewSwiperPremium :global(.swiper-pagination) {
          bottom: 10px;
        }
        .customerReviewSwiperPremium :global(.swiper-pagination-bullet) {
          background: #3b82f6;
          width: 12px;
          height: 12px;
          opacity: 0.3;
          transition: all 0.3s ease;
        }
        .customerReviewSwiperPremium :global(.swiper-pagination-bullet-active) {
          background: #3b82f6;
          opacity: 1;
          transform: scale(1.3);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
        }

        /* Responsive image adjustments */
        @media (max-width: 640px) {
          .customerReviewSwiperPremium {
            padding: 40px 15px 60px;
          }
        }
      `}</style>
    </section>
  );
};

export default CustomerReview;
