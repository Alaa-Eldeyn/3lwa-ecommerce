import { FilterItem } from "./types";
import { useLocale, useTranslations } from "next-intl";

interface CategoriesFilterProps {
  categories: FilterItem[];
  selectedCategories: string[];
  onChange: (selected: string[]) => void;
}

const CategoriesFilter = ({
  categories,
  selectedCategories,
  onChange,
}: CategoriesFilterProps) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("filters");
  const handleToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onChange(selectedCategories.filter((id) => id !== categoryId));
    } else {
      onChange([...selectedCategories, categoryId]);
    }
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
        {t("allCategories")}
      </h3>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {categories.map((category) => (
          <label
            key={category.id}
            className="flex items-center space-x-2 space-x-reverse cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded transition"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.id)}
              onChange={() => handleToggle(category.id)}
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">
              {isArabic ? category.nameAr : category.nameEn}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({category.count})
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategoriesFilter;
