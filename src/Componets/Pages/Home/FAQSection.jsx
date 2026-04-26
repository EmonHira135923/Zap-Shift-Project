"use client";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const FAQSection = () => {
  const [activeId, setActiveId] = useState(1);

  const faqs = [
    {
      id: 1,
      question: "How does ZapShift delivery work?",
      answer:
        "A posture-perfect delivery works by providing support and gentle alignment to your logistics needs. We coordinate pickup, processing at our hubs, and final doorstep delivery with real-time tracking.",
    },
    {
      id: 2,
      question: "Is it suitable for all business sizes?",
      answer:
        "Yes, ZapShift is designed for everyone from individual sellers to large-scale corporate enterprises with customized logistics solutions.",
    },
    {
      id: 3,
      question: "Does it really help with delivery speed?",
      answer:
        "Our optimized route planning and local delivery hubs ensure that your parcels reach their destination in record time, including 30-minute local delivery.",
    },
    {
      id: 4,
      question: "Does it have smart features like live tracking?",
      answer:
        "Absolutely. Every parcel comes with a unique tracking ID that provides live GPS updates and status notifications until it reaches your doorstep.",
    },
    {
      id: 5,
      question: "How will I be notified when the product is delivered?",
      answer:
        "You will receive real-time SMS notifications and app alerts at every stage of the journey, including a final confirmation once delivered.",
    },
  ];

  return (
    <section className="w-full bg-[#F3F4F6] py-24 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-[#002B36]">
            Frequently Asked Question (FAQ)
          </h2>
          <p className="max-w-2xl text-gray-500 mx-auto text-sm md:text-base leading-relaxed">
            Enhance posture, mobility, and well-being effortlessly with
            ZapShift. Achieve proper alignment, reduce pain, and strengthen your
            body with ease!
          </p>
        </div>

        {/* Accordion List */}
        <div className="w-full space-y-4 mb-12">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`rounded-[20px] overflow-hidden transition-all duration-300 ${
                activeId === faq.id
                  ? "bg-[#E6F4F1] border border-[#B2DFD6]"
                  : "bg-white border border-transparent"
              }`}
            >
              <button
                onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span
                  className={`font-bold text-sm md:text-base ${
                    activeId === faq.id ? "text-[#002B36]" : "text-[#002B36]/80"
                  }`}
                >
                  {faq.question}
                </span>
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    activeId === faq.id
                      ? "rotate-180 text-[#002B36]"
                      : "text-gray-400"
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-[#B2DFD6]/30 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button className="flex items-center gap-2 bg-[#C6EB71] hover:bg-[#b5da56] text-black px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-lime-200/50 group">
          See More FAQ's
          <div className="bg-[#1a1a1a] p-1.5 rounded-full text-[#C6EB71]">
            <FiArrowUpRight size={18} />
          </div>
        </button>
      </div>
    </section>
  );
};

export default FAQSection;
