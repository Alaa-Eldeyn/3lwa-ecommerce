"use client"
import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useTranslations } from "next-intl";

interface PriceRangeFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const PriceRangeFilter = ({ min, max, value, onChange }: PriceRangeFilterProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const t = useTranslations("filters");

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-lg font-bold text-gray-900 dark:text-white mb-3"
      >
        {t("price")}
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
        <div dir="ltr" className="px-2 pb-4">
          <div className="mb-6">
            <RangeSlider
              min={min}
              max={max}
              value={value}
              onInput={(nextValue: number[] | [number, number]) => {
                // normalize to tuple [number, number]
                const v = Array.isArray(nextValue) ? nextValue : [nextValue[0], nextValue[1]];
                onChange([Math.max(min, Math.min(v[0], v[1])), Math.min(max, Math.max(v[0], v[1]))]);
              }}
              step={1}
            />
          </div>

          {/* Price Display */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              ${value[0]}
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              ${value[1]}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceRangeFilter;
