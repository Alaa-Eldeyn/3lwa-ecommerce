"use client";

import { X, TextAlignJustify, ChevronLeft, ChevronRight } from "lucide-react";
import { useHeaderStore } from "@/src/store/headerStore";
import { getCategoriesData } from "@/src/data/categoriesData";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { useState } from "react";

interface Category {
  id: number;
  title: string;
  slug: string;
  subcategories: {
    id: number;
    title: string;
    items: {
      id: number;
      title: string;
      path: string;
    }[];
  }[];
}

const CategoriesSidebar = () => {
  const { isCategoriesOpen, closeCategories } = useHeaderStore();
  const t = useTranslations("categories");
  const categories = getCategoriesData(t);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  const handleClose = () => {
    setSelectedCategory(null);
    closeCategories();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${
          isCategoriesOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 start-0 h-full w-[85vw] sm:w-96 bg-white dark:bg-gray-900 shadow-2xl z-[70] flex flex-col transition-transform duration-300 ${
          isCategoriesOpen
            ? "translate-x-0"
            : "-translate-x-full rtl:translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 bg-[#0a5c4f] dark:bg-primary text-white">
          <div className="flex items-center gap-2">
            {selectedCategory && (
              <button
                onClick={handleBack}
                className="p-1 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Back"
              >
                <ChevronRight size={20} className="" />
              </button>
            )}
            <TextAlignJustify size={20} />
            <h2 className="text-lg font-bold">
              {selectedCategory ? selectedCategory.title : t("all")}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden relative">
          {/* Main Categories List */}
          <div
            className={`absolute inset-0 overflow-y-auto transition-transform duration-300 ${
              !selectedCategory ? "translate-x-0" : "-translate-x-full rtl:translate-x-full"
            }`}
          >
            <div className="p-4">
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category)}
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {category.title}
                    </span>
                    <ChevronLeft
                      size={18}
                      className="text-gray-400 group-hover:text-[#0a5c4f] dark:group-hover:text-primary transition-colors "
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Subcategories List */}
          <div
            className={`absolute inset-0 overflow-y-auto transition-transform duration-300 ${
              selectedCategory ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
            }`}
          >
            {selectedCategory && (
              <div className="p-4">
                {/* View All Link */}
                <Link
                  href={`/products?cat=${selectedCategory.slug}`}
                  onClick={handleClose}
                  className="block mb-4 p-3 bg-[#0a5c4f] dark:bg-primary text-white font-semibold text-center rounded-lg hover:opacity-90 transition-opacity"
                >
                  عرض جميع {selectedCategory.title}
                </Link>

                {/* Subcategories */}
                <div className="space-y-6">
                  {selectedCategory.subcategories.map((subcategory) => (
                    <div key={subcategory.id} className="space-y-3">
                      <h3 className="font-bold text-[#0a5c4f] dark:text-primary text-sm uppercase tracking-wide border-b border-gray-200 dark:border-gray-700 pb-2">
                        {subcategory.title}
                      </h3>
                      <ul className="space-y-2">
                        {subcategory.items.map((item) => (
                          <li key={item.id}>
                            <Link
                              href={item.path}
                              onClick={handleClose}
                              className="block text-sm text-gray-700 dark:text-gray-300 hover:text-[#0a5c4f] dark:hover:text-primary transition-colors py-1.5 px-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
                            >
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesSidebar;
