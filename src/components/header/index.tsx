import NavLinks from "./NavLinks"
import HeaderActions from "./HeaderActions"
import Logo from "../common/Logo"
import CartSidebar from "../cart/CartSidebar"

const Header = () => {
  return (
    <>
      <header className="text-primary dark:text-white w-full shadow-md fixed top-0 z-50 bg-white dark:bg-gray-900">
        <div className="container min-h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Logo />

          {/* Desktop Links */}
          <NavLinks />

          {/* Actions (Client) */}
          <HeaderActions />

        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar />
    </>
  )
}

export default  Header
