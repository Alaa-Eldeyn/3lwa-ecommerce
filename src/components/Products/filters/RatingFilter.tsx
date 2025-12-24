"use client"
import { useState } from "react";
import { useTranslations } from "next-intl";

interface RatingFilterProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

const RatingFilter = ({ label, value, onChange, max = 5 }: RatingFilterProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const t = useTranslations("filters");

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(max)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${
              index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-lg font-bold text-gray-900 dark:text-white mb-3"
      >
        {label}
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="pb-4 space-y-1">
          {[...Array(max + 1)].map((_, index) => {
            const rating = max - index;
            return (
              <label
                key={rating}
                className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <input
                  type="radio"
                  name={`${label}-rating`}
                  checked={value === rating}
                  onChange={() => onChange(rating)}
                  className="w-4 h-4 text-gray-900 dark:text-white bg-gray-100 border-gray-300 focus:ring-0"
                />
                <div className="flex items-center gap-2">
                  {renderStars(rating)}
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {rating === 0 ? t("all") : `${rating}+ ${t("stars")}`}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RatingFilter;
