"use client";

import { X, TextAlignJustify, ChevronLeft, ChevronRight } from "lucide-react";
import { useHeaderStore } from "@/src/store/headerStore";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Category {
  id: string;
  titleAr: string;
  titleEn: string;
  children: Category[];
  parentId: string;
  isMainCategory: boolean;
}

const CategoriesSidebar = () => {
  const { isCategoriesOpen, closeCategories } = useHeaderStore();
  const t = useTranslations("categories");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  const { data: categories } = useQuery({
    queryKey: ["categoriesTree"],
    queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Category/tree`),
    refetchOnWindowFocus: false,
  });

  // فلترة الـ Main Categories فقط
  const mainCategories = categories?.data?.data?.filter(
    (cat: Category) => cat.isMainCategory
  ) || [];

  const handleCategoryClick = (category: Category) => {
    if (category.children && category.children.length > 0) {
      setSelectedCategory(category);
    }
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
        className={`fixed top-0 start-0 h-full w-[95vw] max-w-80 bg-white dark:bg-gray-900 shadow-2xl z-[70] flex flex-col transition-transform duration-300 ${
          isCategoriesOpen
            ? "translate-x-0"
            : "-translate-x-full rtl:translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 bg-primary dark:bg-primary text-white">
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
              {selectedCategory ? selectedCategory.titleAr : t("all")}
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
                {mainCategories.map((category: Category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category)}
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {category.titleAr}
                    </span>
                    {category.children && category.children.length > 0 && (
                      <ChevronLeft
                        size={18}
                        className="text-gray-400 group-hover:text-primary dark:group-hover:text-primary transition-colors"
                      />
                    )}
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
                  href={`/products?c=${selectedCategory.id}`}
                  onClick={handleClose}
                  className="block mb-4 p-3 bg-primary dark:bg-primary text-white font-semibold text-center rounded-lg hover:opacity-90 transition-opacity"
                >
                  عرض جميع {selectedCategory.titleAr}
                </Link>

                {/* Subcategories */}
                <div className="space-y-3">
                  {selectedCategory.children.map((subcategory) => (
                    <div key={subcategory.id}>
                      <Link
                        href={`/products?c=${subcategory.id}`}
                        onClick={handleClose}
                        className="block text-sm font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
                      >
                        {subcategory.titleAr}
                      </Link>
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