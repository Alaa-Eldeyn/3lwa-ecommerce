"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const FAQsSection = () => {
  const t = useTranslations("productDetails.faq");
  const tMain = useTranslations("productDetails");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: t("sizeQuestion"),
      answer: t("sizeAnswer"),
    },
    {
      question: t("returnQuestion"),
      answer: t("returnAnswer"),
    },
    {
      question: t("shippingQuestion"),
      answer: t("shippingAnswer"),
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {tMain("faqs")}
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between py-4 px-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <h4 className="font-bold text-gray-900 dark:text-white pr-4">
                {faq.question}
              </h4>
              <svg
                className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                openIndex === index
                  ? "max-h-96 opacity-100 pt-3"
                  : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <p className="text-gray-600 dark:text-gray-400 px-6 pb-6">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQsSection;
