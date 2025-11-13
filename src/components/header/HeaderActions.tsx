"use client"
import { ShoppingCart, User, Menu, X, LogIn, LogOut } from "lucide-react"
import { useTranslations } from "next-intl"
import { useHeaderStore } from "@/src/store/headerStore"
import SearchBar from "./SearchBar"
import LangSwitch from "./LangSwitch"
import MobileMenu from "./MobileMenu"
import ThemeSwitcher from "./ThemeSwitcher"
import Link from "next/link"

const HeaderActions = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const t = useTranslations("header")
  const { isMobileOpen, toggleMobile, isAccountOpen, toggleAccount, toggleCart } =
    useHeaderStore()

  return (
    <>
      {/* Desktop Actions */}
      <div className="hidden lg:flex items-center space-x-4">
        {/* Search */}
        <SearchBar />

        {/* Cart */}
        <button 
          onClick={toggleCart}
          className="relative text-gray-700 dark:text-gray-300 soft hover:text-primary"
        >
          <ShoppingCart size={24} />
          <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[11px] rounded-full h-4 w-4 center">
            2
          </span>
        </button>

        {/* Account */}
        <div className="relative">
          <button onClick={toggleAccount} className="p-1 soft text-gray-800 dark:text-white hover:text-primary">
            <User size={24} />
          </button>

          {isAccountOpen && (
            <div className="absolute right-0 w-48 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg z-50">
              {isLoggedIn ? (
                <>
                  <Link href="/account" className="block px-4 py-2 hover:bg-gray-200 rounded-xl dark:hover:bg-gray-700 cursor-pointer">
                    {t("myAccount")}
                  </Link>
                  <Link href="/orders" className="block px-4 py-2 hover:bg-gray-200 rounded-xl dark:hover:bg-gray-700 cursor-pointer">
                    {t("orders")}
                  </Link>
                  <button className="w-full px-4 py-2 flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-left">
                    <LogOut size={16} />
                    {t("logout")}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="flex items-center gap-2 w-full rounded-t-xl px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-left">
                    <LogIn size={16} />
                    {t("login")}
                  </Link>
                  <Link href="/register" className="flex items-center gap-2 w-full rounded-b-xl px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-left">
                    <User size={16} />
                    {t("register")}
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

        {/* Lang Switch */}
        <LangSwitch />
        
        {/* Theme Switch */}
        <ThemeSwitcher />
      </div>

      {/* Mobile Toggle Button */}
      <button 
        onClick={toggleMobile} 
        className="lg:hidden p-2 text-gray-700 dark:text-gray-300"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <MobileMenu isLoggedIn={isLoggedIn} />
    </>
  )
}

export default HeaderActions
