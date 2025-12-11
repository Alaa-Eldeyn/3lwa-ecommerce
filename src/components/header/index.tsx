import HeaderActions from "./HeaderActions";
import Logo from "../common/Logo";
import CartSidebar from "../cart/CartSidebar";
import CategoriesSidebar from "../common/CategoriesSidebar";
import CategoriesNav from "./CategoriesNav";
import SearchBar from "./SearchBar";
import CategoriesToggle from "../common/CategoriesToggle";

const Header = () => {
  return (
    <>
      <header className="text-primary dark:text-white w-full shadow-md sticky top-0 z-50">
        {/* Top Row - Logo, Search, Actions */}
        <div className=" dark:border-gray-700 bg-header">
          <div className="container min-h-16 lg:min-h-18 flex items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-1">
              <CategoriesToggle />
              <Logo />
            </div>

            {/* Actions (Search, Cart, Account, etc.) */}
            <HeaderActions />
          </div>
        </div>

        <div className="lg:hidden bg-header">
          <div className="container py-1">
            <SearchBar />
          </div>
        </div>

        {/* Bottom Row - Categories Navigation */}
        <div className=" bg-[#131521]">
          <div className="container relative overflow-auto">
            <CategoriesNav />
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar />

      {/* Categories Sidebar */}
      <CategoriesSidebar />
    </>
  );
};

export default Header;
