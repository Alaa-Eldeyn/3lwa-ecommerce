"use client";

import { ShoppingBag } from "lucide-react";
import { Link } from "@/src/i18n/routing";
import { useTranslations } from "next-intl";

const EmptyCart = () => {
  const t = useTranslations("cart.empty");

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full center mb-6">
        <ShoppingBag size={64} className="text-gray-400 dark:text-gray-600" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{t("title")}</h2>

      <p className="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-md">
        {t("description")}
      </p>

      <Link
        href="/products"
        className="px-8 py-3 bg-primary dark:bg-white text-white dark:text-primary rounded-full font-medium hover:bg-secondary dark:hover:bg-gray-200 soft">
        {t("continueShopping")}
      </Link>
    </div>
  );
};

export default EmptyCart;
