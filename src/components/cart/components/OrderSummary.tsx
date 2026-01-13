"use client";

import { useState } from "react";
import { Tag, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  deliveryFee: number;
}

const OrderSummary = ({ subtotal, discount, deliveryFee }: OrderSummaryProps) => {
  const locale = useLocale();
  const total = subtotal - discount + deliveryFee;
  const discountPercentage = Math.round((discount / subtotal) * 100);

 

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {locale === "ar" ? "ملخص الطلب" : "Order Summary"}
      </h2>

      {/* Summary Items */}
      <div className="space-y-4 mb-6">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">
            {locale === "ar" ? "المجموع" : "Subtotal"}
          </span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">${subtotal}</span>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              {locale === "ar"
                ? `خصم ${discountPercentage}%`
                : `Discount ${discountPercentage}%`}
            </span>
            <span className="text-lg font-bold text-red-500">-${discount}</span>
          </div>
        )}

        {/* Delivery Fee */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">
            {locale === "ar" ? "رسوم التوصيل" : "Delivery Fee"}
          </span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">${deliveryFee}</span>
        </div>
      </div>

      <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />

      {/* Total */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg text-gray-900 dark:text-white">
          {locale === "ar" ? "المجموع" : "Total"}
        </span>
        <span className="text-2xl font-bold text-gray-900 dark:text-white">${total}</span>
      </div>

      
      {/* Checkout Button */}
      <Link
        href="/checkout"
        className="w-full px-6 py-3 bg-primary dark:bg-white text-white dark:text-primary rounded-full font-medium hover:bg-secondary dark:hover:bg-gray-200 soft flex items-center justify-center gap-2">
        {locale === "ar" ? "التالي" : "Go to Checkout"}
        <ArrowRight className={locale === "ar" ? "rotate-180" : ""} size={20} />
      </Link>
    </div>
  );
};

export default OrderSummary;
