"use client"

import { useHeaderStore } from "@/src/store/headerStore"
import { useUserStore } from "@/src/store/userStore"
import { useTranslations } from "next-intl"
import { ShoppingCart, User, LogIn, LogOut, ChevronDown } from "lucide-react"
import SearchBar from "./SearchBar"
import LangSwitch from "./LangSwitch"
import ThemeSwitcher from "./ThemeSwitcher"
import { getCategoriesData } from "@/src/data/categoriesData"
import { Link } from "@/src/i18n/routing"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { logoutUser } from "@/src/auth/auth"

const MobileMenu = () => {
  const t = useTranslations("header")
  const tCat = useTranslations("categories")
  const { isMobileOpen, toggleCart, toggleMobile } = useHeaderStore()
  const { user, initUser } = useUserStore()
  const categories = getCategoriesData(tCat)
  const pathname = usePathname()
  const locale = pathname.split("/")[1]
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null)

  useEffect(() => {
    initUser();
  }, [initUser]);

  const handleLogout = () => {
    logoutUser();
  };

  const isLoggedIn = !!user;

  return (
    <div
      className={`lg:hidden absolute top-full text-secondary left-0 w-full bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700 z-40 overflow-hidden soft ${isMobileOpen ? 'max-h-[80vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0 border-t-0'
        }`}
    >
      <div className="container py-4">
        {/* Search Bar */}
        <div className="mb-4">
          <SearchBar />
        </div>

        {/* Categories */}
        <nav className="flex flex-col space-y-1 mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
          {categories.map((category) => (
            <div key={category.id}>
              <button
                onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition"
              >
                <span>{category.title}</span>
                <ChevronDown 
                  size={18} 
                  className={`transition-transform ${expandedCategory === category.id ? 'rotate-180' : ''}`}
                />
              </button>
              
              {expandedCategory === category.id && (
                <div className="pl-4 mt-1 space-y-1">
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory.id} className="mb-2">
                      <h4 className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                        {subcategory.title}
                      </h4>
                      {subcategory.items.map((item) => (
                        <Link
                          key={item.id}
                          href={item.path}
                          onClick={toggleMobile}
                          className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Cart */}
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
          <button 
            onClick={()=>{
              toggleMobile()
              toggleCart()
            }}
            className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition"
          >
            <span className="flex items-center gap-3">
              <ShoppingCart size={20} />
              {t("cart")}
            </span>
            <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              2
            </span>
          </button>
        </div>

        {/* Account Section */}
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
          {isLoggedIn ? (
            <div className="flex flex-col space-y-1">
              <Link 
                href={`/profile`}
                onClick={toggleMobile}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition"
              >
                <User size={20} />
                {t("myAccount")}
              </Link>
              <Link 
                href={`/profile?tab=orders`}
                onClick={toggleMobile}
                className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition"
              >
                {t("orders")}
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition text-left text-red-600 dark:text-red-400"
              >
                <LogOut size={20} />
                {t("logout")}
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-1">
              <Link
                href={`/login`}
                onClick={toggleMobile}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition text-left"
              >
                <LogIn size={20} />
                {t("login")}
              </Link>
              <Link
                href={`/register`}
                onClick={toggleMobile}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition text-left"
              >
                <User size={20} />
                {t("register")}
              </Link>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t("language") || "Language"}
            </span>
            <LangSwitch />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t("theme") || "Theme"}
            </span>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
