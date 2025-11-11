"use client"
import { useState } from "react";

interface Color {
  id: string;
  name: string;
  hex: string;
}

interface ColorFilterProps {
  colors: Color[];
  selectedColors: string[];
  onChange: (selected: string[]) => void;
}

const ColorFilter = ({ colors, selectedColors, onChange }: ColorFilterProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleColorToggle = (colorId: string) => {
    const newSelected = selectedColors.includes(colorId)
      ? selectedColors.filter((id) => id !== colorId)
      : [...selectedColors, colorId];
    onChange(newSelected);
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-lg font-bold text-gray-900 dark:text-white mb-3"
      >
        Colors
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
        <div className="grid grid-cols-5 gap-3 pb-4">
          {colors.map((color) => {
            const isSelected = selectedColors.includes(color.id);
            return (
              <button
                key={color.id}
                onClick={() => handleColorToggle(color.id)}
                className={`w-10 h-10 rounded-full relative transition-all ${
                  isSelected ? "ring-2 ring-offset-2 ring-gray-900 dark:ring-white" : ""
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {isSelected && (
                  <svg
                    className="w-5 h-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ColorFilter;
