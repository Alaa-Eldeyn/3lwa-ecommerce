"use client"
import { useState } from "react";
import { useTranslations } from "next-intl";

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchFilter = ({ value, onChange }: SearchFilterProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const t = useTranslations("filters");

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-lg font-bold text-gray-900 dark:text-white mb-3"
      >
        {t("search")}
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
        <div className="pb-4">
          <div className="relative">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
