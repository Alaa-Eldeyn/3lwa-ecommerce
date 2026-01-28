"use client";

import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";

interface OrderSummaryProps {
  subtotal: number;
}

const OrderSummary = ({
  subtotal,
}: OrderSummaryProps) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("cart.orderSummary");

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {t("title")}
      </h2>

      {/* Summary Items */}
      <div className="space-y-4 mb-6">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            {t("subtotal")}
          </span>
          <span className="text-base md:text-lg font-bold text-gray-900 dark:text-white">
            ${subtotal.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />

      {/* Total */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-base md:text-lg text-gray-900 dark:text-white">
          {t("total")}
        </span>
        <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
          ${subtotal.toFixed(2)}
        </span>
      </div>

      {/* Checkout Button */}
      <Link
        href="/checkout"
        className="w-full px-6 py-3 bg-primary dark:bg-white text-white dark:text-primary rounded-full text-sm md:text-base font-medium hover:bg-secondary dark:hover:bg-gray-200 soft flex items-center justify-center gap-2">
        {t("goToCheckout")}
        <ArrowRight className={isArabic ? "rotate-180" : ""} size={20} />
      </Link>
    </div>
  );
};

export default OrderSummary;
