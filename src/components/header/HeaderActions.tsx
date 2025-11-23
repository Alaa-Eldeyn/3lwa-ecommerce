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
      <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
        {/* Search - Takes more space */}
        <div className="flex-1">
          <SearchBar />
        </div>

        {/* Language Switch */}
        <LangSwitch />

        {/* Cart */}
        <button 
          onClick={toggleCart}
          className="relative text-white soft hover:text-secondary flex items-center gap-2"
        >
          <div className="relative">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-secondary text-white text-[11px] rounded-full h-4 w-4 center">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-sm">العربة</span>
        </button>

        {/* Account */}
        <div className="relative">
          <button 
            onClick={toggleAccount} 
            className="p-1 soft text-white hover:text-secondary flex items-center gap-2"
          >
            <User size={24} />
            <span className="text-sm">حسابي</span>
          </button>

          {isAccountOpen && (
            <AccountDropdown 
              onClose={toggleAccount}
            />
          )}
        </div>
        
        {/* Theme Switch */}
        <ThemeSwitcher />
      </div>

      {/* Mobile Toggle Button */}
      <button 
        onClick={toggleMobile} 
        className="lg:hidden p-2 text-white"
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
