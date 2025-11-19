import React, { useState } from "react";

const PostureProFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How does this posture corrector work?",
      answer:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here's how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
    },
    {
      question: "Is it suitable for all ages and body types?",
      answer:
        "Yes, our posture corrector is designed to be adjustable and suitable for a wide range of ages and body types. It features multiple sizing options and adjustable straps to ensure a comfortable fit for most users.",
    },
    {
      question: "Does it really help with back pain and posture improvement?",
      answer:
        "Absolutely. Clinical studies and user testimonials show significant improvement in posture and reduction in back pain after consistent use. The device helps retrain your muscles to maintain proper alignment.",
    },
    {
      question: "Does it have smart features like vibration alerts?",
      answer:
        "Yes, our premium model includes smart vibration alerts that notify you when you're slouching, helping you build better posture habits throughout the day.",
    },
    {
      question: "How will I be notified when the product is back in stock?",
      answer:
        "You can sign up for our restock notifications by entering your email on the product page. We'll send you an immediate notification when the item becomes available again.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden my-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Frequently Asked Questions (FAQ)
        </h1>
        <p className="text-lg opacity-90 mb-4">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
        <div className="flex justify-between items-center">
          <div className="text-4xl font-bold">40</div>
          <div className="text-right">
            <div className="text-lg font-semibold">Sea Mora FAQ's</div>
            <div className="text-sm opacity-80">2/1</div>
          </div>
        </div>
      </div>

      {/* FAQ Items */}
      <div className="divide-y divide-gray-200">
        {faqItems.map((item, index) => (
          <div key={index} className="p-6">
            <button
              className="flex justify-between items-center w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-medium text-gray-900 pr-4">
                {item.question}
              </h3>
              <svg
                className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {activeIndex === index && (
              <div className="mt-4 text-gray-600 transition-all duration-300 ease-in-out">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-4 text-center text-gray-500 text-sm">
        <p>
          Have more questions? Contact our support team at
          support@posturepro.com
        </p>
      </div>
    </div>
  );
};

export default PostureProFAQ;
