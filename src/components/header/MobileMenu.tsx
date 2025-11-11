"use client"

import { useHeaderStore } from "@/src/store/headerStore"
import { useTranslations } from "next-intl"
import { ShoppingCart, User, LogIn, LogOut } from "lucide-react"
import SearchBar from "./SearchBar"
import LangSwitch from "./LangSwitch"
import ThemeSwitcher from "./ThemeSwitcher"
import { getMenuData } from "@/src/data/menuData"
import Link from "next/link"

interface MobileMenuProps {
  isLoggedIn: boolean
}

const MobileMenu = ({ isLoggedIn }: MobileMenuProps) => {
  const t = useTranslations("header")
  const { isMobileOpen } = useHeaderStore()
  const menuData = getMenuData(t);

  return (
    <div
      className={`lg:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700 z-40 overflow-hidden transition-all duration-300 ease-in-out ${isMobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 border-t-0'
        }`}
    >
      <div className="container py-4">
        {/* Search Bar */}
        <div className="mb-4">
          <SearchBar />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-1 mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
          {menuData.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              target={item.newTab ? "_blank" : "_self"}
              className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Cart */}
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
          <button className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition">
            <span className="flex items-center gap-3">
              <ShoppingCart size={20} />
              {t("cart")}
            </span>
            <span className="bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              2
            </span>
          </button>
        </div>

        {/* Account Section */}
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
          {isLoggedIn ? (
            <div className="flex flex-col space-y-1">
              <Link href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition">
                <User size={20} />
                {t("myAccount")}
              </Link>
              <Link href="#" className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition">
                {t("orders")}
              </Link>
              <button className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition text-left text-red-600 dark:text-red-400">
                <LogOut size={20} />
                {t("logout")}
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-1">
              <button className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition text-left">
                <LogIn size={20} />
                {t("login")}
              </button>
              <button className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition text-left">
                <User size={20} />
                {t("register")}
              </button>
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
