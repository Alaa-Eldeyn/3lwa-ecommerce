"use client";
import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, TextAlignJustify } from "lucide-react";
import { getCategoriesData } from "@/src/data/categoriesData";
import { Link } from "@/src/i18n/routing";
import { usePathname } from "next/navigation";
import { useHeaderStore } from "@/src/store/headerStore";

const CategoriesNav = () => {
  const t = useTranslations("categories");
  const pathname = usePathname();
  const categories = getCategoriesData(t);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const { toggleCategories } = useHeaderStore();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (categoryId: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveCategory(categoryId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 50);
  };

  if (pathname?.includes("/login") || pathname?.includes("/register")) {
    return null;
  }
  return (
    <>
      <nav
        onMouseLeave={handleMouseLeave}
        className="flex items-center gap-1 py-2 w-full justify-start relative "
      >
        {/* All Categories Button - Hidden on mobile */}
        <button
          onClick={toggleCategories}
          className="hidden md:flex text-nowrap items-center gap-1 px-4 py-2 text-white hover:text-white transition-all duration-200 rounded-md font-medium text-sm hover:bg-white/10"
        >
          <TextAlignJustify className="me-2" />
          {t("all")}
        </button>
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative group"
            onMouseEnter={() => handleMouseEnter(category.id)}
          >
            {/* Category Link */}
            <Link
              href={`/products?cat=${category.slug}`}
              className="flex text-nowrap items-center gap-1 px-2 lg:px-4 py-2 text-white hover:text-white transition-all duration-200 rounded-md font-medium text-sm hover:bg-white/10"
            >
              {category.title}
              
            </Link>
          </div>
        ))}
        {/* Dropdown Menu - Full Width */}
        {/* {activeCategory !== null && (
          <div
            className="absolute left-0 right-0 top-full z-50 mt-0"
            onMouseEnter={() => handleMouseEnter(activeCategory)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="container mx-auto px-4">
              <div className="mt-2">
                <div className="grid grid-cols-3 gap-8 bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-8 border border-gray-200 dark:border-gray-700">
                  {categories
                    .find((cat) => cat.id === activeCategory)
                    ?.subcategories.map((subcategory) => (
                      <div key={subcategory.id} className="space-y-3">
                        <h3 className="font-bold text-[#0a5c4f] dark:text-primary mb-4 text-base uppercase tracking-wide border-b border-gray-200 dark:border-gray-700 pb-2">
                          {subcategory.title}
                        </h3>
                        <ul className="space-y-2.5">
                          {subcategory.items.map((item) => (
                            <li key={item.id}>
                              <Link
                                href={item.path}
                                className="text-sm text-gray-700 dark:text-gray-300 hover:text-[#0a5c4f] dark:hover:text-primary transition-all duration-150 block py-1.5 hover:-translate-x-1 transform "
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
            </div>
          </div>
        )} */}
      </nav>
    </>
  );
};

export default CategoriesNav;
