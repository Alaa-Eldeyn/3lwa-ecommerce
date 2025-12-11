"use client";
import { ShoppingCart, Menu, ChevronDown, MapPin, User2Icon } from "lucide-react";
import { useHeaderStore } from "@/src/store/headerStore";
import { useCartStore } from "@/src/store/cartStore";
import { useTranslations } from "next-intl";
import SearchBar from "./SearchBar";
import LangSwitch from "./LangSwitch";
import ThemeSwitcher from "./ThemeSwitcher";
import AccountDropdown from "./AccountDropdown";
import { useUserStore } from "@/src/store/userStore";
import { useEffect } from "react";
import Link from "next/link";

const HeaderActions = () => {
  const t = useTranslations("header");
  const { isAccountOpen, toggleAccount, toggleCart } =
    useHeaderStore();
  const totalItems = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );
  const { user, initUser } = useUserStore();

  useEffect(() => {
    initUser();
  }, [initUser]);

  return (
    <>
      {/* Desktop Actions */}
      <div className="hidden lg:flex items-center gap-4 flex-1 justify-end">
        <button className="text-white hover:ring-1 hover:ring-white/50 rounded-sm px-2 py-1 transition-all">
          <span className="text-sm">التوصيل إلى</span>
          <span className="font-semibold text-sm flex items-center gap-1">
            <MapPin size={14} />
            مصر
          </span>
        </button>

        {/* Search - Takes more space */}
        <div className="flex-1">
          <SearchBar />
        </div>

        {/* Account Dropdown - Amazon Style */}
        <div className="relative">
          <button
            onClick={toggleAccount}
            className="text-white hover:ring-1 hover:ring-white/50 rounded-sm px-2 py-1 transition-all"
          >
            <div className="text-[11px] leading-tight">{t("hello")}</div>
            <div className="flex items-center gap-1 font-semibold text-sm">
              <span>{t("accountAndLists")}</span>
              <ChevronDown size={14} className="mt-0.5" />
            </div>
          </button>

          {isAccountOpen && <AccountDropdown onClose={toggleAccount} />}
        </div>

        {/* Cart with counter */}
        <button
          onClick={toggleCart}
          className="relative text-white hover:ring-1 hover:ring-white/50 rounded-sm px-2 py-1 transition-all flex items-end gap-2"
        >
          <div className="relative">
            <ShoppingCart size={32} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-sm font-semibold pb-1">{t("cart")}</span>
        </button>

        {/* Language Switch with Flag */}
        <LangSwitch />

        {/* Theme Switch */}
        <ThemeSwitcher />
      </div>

      {/* Mobile Categories Toggle Button */}
      <div className="lg:hidden flex items-center ">
        <div className="relative">
          <Link
            href={"/login"}
            className="text-white flex items-center gap-1 hover:ring-1 hover:ring-white/50 rounded-sm px-2 py-1 transition-all"
          >
            <div className="text-[11px] leading-tight">{t("hello")}</div>
            <User2Icon/>
          </Link>

          {isAccountOpen && <AccountDropdown onClose={toggleAccount} />}
        </div>
        <button
          onClick={toggleCart}
          className="relative text-white hover:ring-1 hover:ring-white/50 rounded-sm px-2 py-1 transition-all flex items-end gap-2"
        >
          <div className="relative">
            <ShoppingCart size={28} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
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
