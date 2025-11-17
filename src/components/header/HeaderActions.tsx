"use client"
import { ShoppingCart, User, Menu, X } from "lucide-react"
import { useHeaderStore } from "@/src/store/headerStore"
import { useCartStore } from "@/src/store/cartStore"
import SearchBar from "./SearchBar"
import LangSwitch from "./LangSwitch"
import MobileMenu from "./MobileMenu"
import ThemeSwitcher from "./ThemeSwitcher"
import AccountDropdown from "./AccountDropdown"

const HeaderActions = () => {
  const { isMobileOpen, toggleMobile, isAccountOpen, toggleAccount, toggleCart } =
    useHeaderStore()
  const totalItems = useCartStore((state) => 
    state.items.reduce((total, item) => total + item.quantity, 0)
  )

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
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[11px] rounded-full h-4 w-4 center">
              {totalItems}
            </span>
          )}
        </button>

        {/* Account */}
        <div className="relative">
          <button 
            onClick={toggleAccount} 
            className="p-1 soft text-gray-800 dark:text-white hover:text-primary"
          >
            <User size={24} />
          </button>

          {isAccountOpen && (
            <AccountDropdown 
              onClose={toggleAccount}
            />
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
      <MobileMenu />
    </>
  )
}

export default HeaderActions
