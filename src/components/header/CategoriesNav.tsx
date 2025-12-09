"use client";
import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { getCategoriesData } from "@/src/data/categoriesData";
import { Link } from "@/src/i18n/routing";
import { usePathname } from "next/navigation";

const CategoriesNav = () => {
  const t = useTranslations("categories");
  const pathname = usePathname();
  const categories = getCategoriesData(t);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
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
      <nav onMouseLeave={handleMouseLeave} className="hidden lg:flex items-center gap- py-4 w-full justify-between relative ">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative group"
            onMouseEnter={() => handleMouseEnter(category.id)}
          >
            {/* Category Link */}
            <Link
              href={`/products?cat=${category.slug}`}
              className="flex text-nowrap items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition font-bold"
            >
              {category.title}
              <ChevronDown
                size={16}
                className={`soft ${
                  activeCategory === category.id ? "rotate-180" : ""
                }`}
              />
            </Link>
          </div>
        ))}
        {/* Dropdown Menu - Full Width */}
        {activeCategory !== null && (
          <div
            className="absolute mx-auto w-full p-0! m-0! top-full z-50"
            onMouseEnter={() => handleMouseEnter(activeCategory)}
            onMouseLeave={handleMouseLeave}
          >
            <div className=" mx-auto p-0! m-0!">
              <div className="">
                <div className="grid grid-cols-3 gap-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 border border-gray-100 dark:border-gray-700">
                  {categories
                    .find((cat) => cat.id === activeCategory)
                    ?.subcategories.map((subcategory) => (
                      <div key={subcategory.id}>
                        <h3 className="font-bold text-primary mb-3 text-sm uppercase tracking-wide">
                          {subcategory.title}
                        </h3>
                        <ul className="space-y-2">
                          {subcategory.items.map((item) => (
                            <li key={item.id}>
                              <Link
                                href={item.path}
                                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition block py-1"
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
        )}
      </nav>
    </>
  );
};

export default CategoriesNav;
