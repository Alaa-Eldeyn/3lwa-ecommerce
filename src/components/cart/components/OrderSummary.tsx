"use client";

import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";

interface OrderSummaryProps {
  subtotal: number;
  shippingEstimate: number;
  taxEstimate: number;
  totalEstimate: number;
}

const OrderSummary = ({
  subtotal,
  shippingEstimate,
  taxEstimate,
  totalEstimate,
}: OrderSummaryProps) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("cart.orderSummary");

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {t("title")}
      </h2>

      {/* Summary Items */}
      <div className="space-y-4 mb-6">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">
            {t("subtotal")}
          </span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">
            {t("shipping")}
          </span>
          <span
            className={`text-lg font-bold ${
              shippingEstimate === 0
                ? "text-green-600 dark:text-green-400"
                : "text-gray-900 dark:text-white"
            }`}>
            {shippingEstimate === 0
              ? t("shippingFree")
              : `$${shippingEstimate.toFixed(2)}`}
          </span>
        </div>

        {/* Tax */}
        {taxEstimate > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">{t("tax")}</span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ${taxEstimate.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />

      {/* Total */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg text-gray-900 dark:text-white">
          {t("total")}
        </span>
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          ${totalEstimate.toFixed(2)}
        </span>
      </div>

      {/* Checkout Button */}
      <Link
        href="/checkout"
        className="w-full px-6 py-3 bg-primary dark:bg-white text-white dark:text-primary rounded-full font-medium hover:bg-secondary dark:hover:bg-gray-200 soft flex items-center justify-center gap-2">
        {t("goToCheckout")}
        <ArrowRight className={isArabic ? "rotate-180" : ""} size={20} />
      </Link>
    </div>
  );
};

export default OrderSummary;
