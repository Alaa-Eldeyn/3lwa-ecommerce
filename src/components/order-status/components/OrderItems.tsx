"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import { OrderStatusItem } from "../types";

interface OrderItemsProps {
  items: OrderStatusItem[];
}

const OrderItems = ({ items }: OrderItemsProps) => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
      <div className="flex items-center mb-6 pb-6 border-b-2 border-gray-100 dark:border-gray-800">
        <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
        <h2 className="text-3xl font-bold text-foreground dark:text-white">
          {isArabic ? "عناصر الطلب" : "Order Items"}
        </h2>
      </div>

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-200">
            <div className="w-32 h-32 bg-white dark:bg-gray-900 rounded-xl overflow-hidden mr-6 shrink-0 shadow-md relative">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-foreground dark:text-white">
                  {item.name}
                </h3>
                <p className="text-2xl font-bold text-primary">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              {item.description && (
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {item.description}
                </p>
              )}
              <div className="flex items-center space-x-6 text-sm">
                {item.color && (
                  <div className="flex items-center">
                    <span className="text-gray-500 dark:text-gray-400 mr-2">
                      {isArabic ? "اللون:" : "Color:"}
                    </span>
                    <span className="font-semibold text-foreground dark:text-white">
                      {item.color}
                    </span>
                  </div>
                )}
                <div className="flex items-center">
                  <span className="text-gray-500 dark:text-gray-400 mr-2">
                    {isArabic ? "الكمية:" : "Quantity:"}
                  </span>
                  <span className="font-semibold text-foreground dark:text-white">
                    {item.quantity}
                  </span>
                </div>
                {item.sku && (
                  <div className="flex items-center">
                    <span className="text-gray-500 dark:text-gray-400 mr-2">
                      {isArabic ? "SKU:" : "SKU:"}
                    </span>
                    <span className="font-semibold text-foreground dark:text-white">
                      {item.sku}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItems;
