"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

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
    <section id="faq-section" className="py-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        {tMain("faqs")}
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-4 text-left rtl:text-right font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <span className="flex-1 pr-4">{faq.question}</span>
              <ChevronDown
                size={20}
                className={`text-gray-400 dark:text-gray-500 transition-transform duration-300 shrink-0 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}>
              <p className="text-gray-600 dark:text-gray-400 px-4 pt-2 pb-4">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQsSection;
