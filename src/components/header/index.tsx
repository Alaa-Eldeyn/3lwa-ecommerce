import HeaderActions from "./HeaderActions"
import Logo from "../common/Logo"
import CartSidebar from "../cart/CartSidebar"
import CategoriesNav from "./CategoriesNav"

const Header = () => {
  return (
    <>
      <header className="text-primary dark:text-white w-full shadow-md sticky top-0 z-50 bg-white dark:bg-gray-900">
        {/* Top Row - Logo, Search, Actions */}
        <div className="border-b border-gray-200 dark:border-gray-700 bg-header">
          <div className="container min-h-20 flex items-center justify-between gap-6">
            
            {/* Logo */}
            <Logo />

            {/* Actions (Search, Cart, Account, etc.) */}
            <HeaderActions />

          </div>
        </div>

        {/* Bottom Row - Categories Navigation */}
        <div className="hidden lg:block">
          <div className="container">
            <CategoriesNav />
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar />
    </>
  )
}

export default  Header
