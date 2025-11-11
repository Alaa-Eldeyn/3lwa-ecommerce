"use client"
import { useState } from "react";

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: string[];
  onChange: (selected: string[]) => void;
}

const CategoryFilter = ({ categories, selectedCategories, onChange }: CategoryFilterProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleCategoryToggle = (categoryId: string) => {
    const newSelected = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    onChange(newSelected);
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-lg font-bold text-gray-900 dark:text-white mb-3"
      >
        Categories
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
        <ul className="pb-4">
          {categories.map((category) => (
            <li key={category.id} className="flex items-center justify-between group hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              <label className="flex items-center cursor-pointer flex-1 p-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryToggle(category.id)}
                  className="w-4 h-4 text-gray-900 dark:text-white bg-gray-100 border-gray-300 rounded focus:ring-0"
                />
                <span className="ms-2 text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                  {category.name}
                </span>
              </label>
              <svg
                className="w-4 h-4 text-gray-400 rtl:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryFilter;
