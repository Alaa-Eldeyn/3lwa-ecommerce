"use client";

import { LogIn, LogOut, User, ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "@/src/store/userStore";
import { logoutUser } from "@/src/utils/auth";

interface AccountDropdownProps {
  onClose?: () => void;
}

const AccountDropdown = ({ onClose }: AccountDropdownProps) => {
  const t = useTranslations("header");
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const { user, initUser } = useUserStore();

  useEffect(() => {
    initUser();
  }, [initUser]);

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  const handleLogout = async () => {
    await logoutUser();
    if (onClose) onClose();
  };

  const isLoggedIn = !!user;

  if (isLoggedIn) {
    return (
      <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-fadeIn">
        {/* User Info Section */}
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {user?.email}
          </p>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          <Link
            href={`/${locale}/profile`}
            onClick={handleLinkClick}
            className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition-colors"
          >
            <User size={18} />
            <span className="text-sm font-medium">{t("myAccount")}</span>
          </Link>

          <Link
            href={`/${locale}/profile?tab=orders`}
            onClick={handleLinkClick}
            className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition-colors"
          >
            <ShoppingBag size={18} />
            <span className="text-sm font-medium">{t("orders")}</span>
          </Link>

        </div>

        {/* Logout Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 py-2">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">{t("logout")}</span>
          </button>
        </div>
      </div>
    );
  }

  // Not Logged In
  return (
    <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-fadeIn">
      <div className="py-2">
        <Link
          href={`/${locale}/login`}
          onClick={handleLinkClick}
          className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition-colors rounded-t-xl"
        >
          <LogIn size={18} />
          <span className="text-sm font-medium">{t("login")}</span>
        </Link>

        <Link
          href={`/${locale}/register`}
          onClick={handleLinkClick}
          className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition-colors rounded-b-xl"
        >
          <User size={18} />
          <span className="text-sm font-medium">{t("register")}</span>
        </Link>
      </div>
    </div>
  );
};

export default AccountDropdown;
