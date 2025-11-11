"use client"
import { useState } from "react";

interface Size {
  id: string;
  name: string;
}

interface SizeFilterProps {
  sizes: Size[];
  selectedSizes: string[];
  onChange: (selected: string[]) => void;
}

const SizeFilter = ({ sizes, selectedSizes, onChange }: SizeFilterProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleSizeToggle = (sizeId: string) => {
    const newSelected = selectedSizes.includes(sizeId)
      ? selectedSizes.filter((id) => id !== sizeId)
      : [...selectedSizes, sizeId];
    onChange(newSelected);
  };

  return (
    <div className="pb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-lg font-bold text-gray-900 dark:text-white mb-3"
      >
        Size
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
        <div className="flex flex-wrap gap-2 pb-4">
          {sizes.map((size) => {
            const isSelected = selectedSizes.includes(size.id);
            return (
              <button
                key={size.id}
                onClick={() => handleSizeToggle(size.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  isSelected
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {size.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SizeFilter;
