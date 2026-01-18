"use client";

import { useLocale } from "next-intl";
import { Package, Home, Truck, Tag } from "lucide-react";
import Link from "next/link";
import { OrderStatusData } from "../types";

interface OrderSummaryProps {
  orderData: OrderStatusData;
}

const OrderSummary = ({ orderData }: OrderSummaryProps) => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 sticky top-24">
      <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6 pb-4 border-b-2 border-gray-100 dark:border-gray-800">
        {isArabic ? "ملخص الطلب" : "Order Summary"}
      </h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">
            {isArabic
              ? `المجموع الفرعي (${orderData.items.reduce((sum, item) => sum + item.quantity, 0)} عناصر)`
              : `Subtotal (${orderData.items.reduce((sum, item) => sum + item.quantity, 0)} items)`}
          </span>
          <span className="text-lg font-semibold text-foreground dark:text-white">
            ${orderData.subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">
            {isArabic ? "الشحن" : "Shipping"}
          </span>
          <span className="text-lg font-semibold text-primary">
            ${orderData.shipping.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">
            {isArabic ? "الضريبة (5%)" : "Tax (5%)"}
          </span>
          <span className="text-lg font-semibold text-foreground dark:text-white">
            ${orderData.tax.toFixed(2)}
          </span>
        </div>
        {orderData.discount > 0 && (
          <div className="flex justify-between items-center text-green-600 dark:text-green-400">
            <span className="flex items-center">
              <Tag className="mr-2" size={16} />
              {isArabic ? "الخصم" : "Discount"}
            </span>
            <span className="text-lg font-semibold">-${orderData.discount.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-foreground dark:text-white">
            {isArabic ? "المبلغ الإجمالي" : "Total Amount"}
          </span>
          <span className="text-3xl font-bold text-primary">
            ${orderData.total.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="bg-accent bg-opacity-50 dark:bg-accent/20 rounded-xl p-4 mb-6">
        <div className="flex items-start">
          <Truck className="text-primary text-2xl mr-3 mt-1" />
          <div>
            <p className="font-semibold text-foreground dark:text-white mb-1">
              {isArabic ? "التوصيل المتوقع" : "Estimated Delivery"}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {orderData.estimatedDelivery}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              {isArabic
                ? "الشحن القياسي (3-5 أيام عمل)"
                : "Standard shipping (3-5 business days)"}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          href={`/order-status/${orderData.orderNumber}`}
          className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-headerPrimary transition-colors duration-200 shadow-md flex items-center justify-center gap-2">
          <Package className="mr-2" size={20} />
          {isArabic ? "تتبع الطلب" : "Track Order"}
        </Link>
        <Link
          href="/"
          className="w-full bg-white dark:bg-gray-800 border-2 border-primary text-primary dark:text-primary py-4 rounded-xl font-bold text-lg hover:bg-primary hover:text-white transition-colors duration-200 flex items-center justify-center gap-2">
          <Home className="mr-2" size={20} />
          {isArabic ? "متابعة التسوق" : "Continue Shopping"}
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
