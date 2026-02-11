"use client";
import { ShoppingCart, ChevronDown, MapPin, User2Icon, Heart } from "lucide-react";
import { useHeaderStore } from "@/src/store/headerStore";
import { useCartStore } from "@/src/store/cartStore";
import { useWishlistStore } from "@/src/store/wishlistStore";
import { useTranslations } from "next-intl";
import SearchBar from "./SearchBar";
import LangSwitch from "./LangSwitch";
import ThemeSwitcher from "./ThemeSwitcher";
import AccountDropdown from "./AccountDropdown";
import { useUserStore } from "@/src/store/userStore";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/src/i18n/routing";

const HeaderActions = () => {
  const t = useTranslations("header");
  const { isAccountOpen, toggleAccount, toggleCart } = useHeaderStore();
  const totalItems = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );
  const wishlistItems = useWishlistStore((state) => state.getTotalItems());
  const { user, initUser } = useUserStore();
  const desktopAccountRef = useRef<HTMLDivElement>(null);
  const mobileAccountRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    initUser();
  }, [initUser]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isAccountOpen) return;

      const target = event.target as Node;
      const desktopEl = desktopAccountRef.current;
      const mobileEl = mobileAccountRef.current;

      // If click is inside either desktop or mobile account area, do nothing
      if (
        (desktopEl && desktopEl.contains(target)) ||
        (mobileEl && mobileEl.contains(target))
      ) {
        return;
      }

      // Otherwise, close the dropdown
      toggleAccount();
    };

    if (isAccountOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAccountOpen, toggleAccount]);

  return (
    <>
      {/* Desktop Actions */}
      <div className="hidden lg:flex items-center gap-4 flex-1 justify-end">
        <button className="text-white hover:ring-1 hover:ring-white/50 rounded-sm px-2 py-1 transition-all">
          <span className="text-sm">{t("deliveryTo")}</span>
          <span className="font-semibold text-sm flex items-center gap-1">
            <MapPin size={14} />
            {t("egypt")}
          </span>
        </button>

        {/* Search - Takes more space */}
        <div className="flex-1">
          <SearchBar />
        </div>
        
        {/* Language Switch with Flag */}
        <LangSwitch />

        {/* Account Dropdown - Amazon Style */}
        <div className="relative" ref={desktopAccountRef}>
          <button
            onClick={toggleAccount}
            className="text-white hover:ring-1 hover:ring-white/50 rounded-sm px-2 py-1 transition-all"
          >
            <div className="text-[11px] leading-tight">{user ? `${t("hello")} ${user.firstName}` : t("login")}</div>
            <div className="flex items-center gap-1 font-semibold text-sm">
              <span>{t("accountAndLists")}</span>
              <ChevronDown size={14} className="mt-0.5" />
            </div>
          </button>

          {isAccountOpen && <AccountDropdown onClose={toggleAccount} />}
        </div>

        {/* Wishlist with counter */}
        <Link
          href="/wishlist"
          className="relative text-white hover:ring-1 hover:ring-white/50 rounded-sm px-2 py-1 transition-all flex items-end gap-1"
        >
          <div className="relative">
            <Heart size={28} strokeWidth={1.5} />
            {mounted && wishlistItems > 0 && (
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                {wishlistItems}
              </span>
            )}
          </div>
          <span className="text-sm font-semibold pb-1">{t("wishlist")}</span>
        </Link>

        {/* Cart with counter */}
        <button
          onClick={toggleCart}
          className="relative text-white hover:ring-1 hover:ring-white/50 rounded-sm px-2 py-1 transition-all flex items-end gap-2"
        >
          <div className="relative">
            <ShoppingCart size={32} strokeWidth={1.5} />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-sm font-semibold pb-1">{t("cart")}</span>
        </button>


        {/* Theme Switch */}
        <ThemeSwitcher />
      </div>

      {/* Mobile Categories Toggle Button */}
      <div className="lg:hidden flex items-center ">
        <div className="relative" ref={mobileAccountRef}>
          <button
            onClick={toggleAccount}
            className="text-white flex items-center gap-1 hover:ring-1 hover:ring-white/50 rounded-sm px-2 py-1 transition-all"
          >
            <div className="text-xs leading-tight">{user ? `${t("hello")} ${user.firstName}` : `${t('login')}`}</div>
            <User2Icon size={20} />
          </button>

          {isAccountOpen && <AccountDropdown onClose={toggleAccount} />}
        </div>
        
        <Link
          href="/wishlist"
          className="relative text-white hover:ring-1 hover:ring-white/50 rounded-sm px-2 py-1 transition-all"
        >
          <div className="relative">
            <Heart size={24} strokeWidth={1.5} />
            {mounted && wishlistItems > 0 && (
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {wishlistItems}
              </span>
            )}
          </div>
        </Link>

        <button
          onClick={toggleCart}
          className="relative text-white hover:ring-1 hover:ring-white/50 rounded-sm px-2 py-1 transition-all flex items-end gap-2"
        >
          <div className="relative">
            <ShoppingCart size={28} strokeWidth={1.5} />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                {totalItems}
              </span>
            )}
          </div>
        </button>

      </div>
      
      
    </>
  );
};

export default HeaderActions;
