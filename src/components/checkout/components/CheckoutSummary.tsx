"use client";
import { ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";

interface CheckoutItem {
  itemId: string;
  itemCombinationId: string;
  offerCombinationPricingId: string;
  vendorId: string;
  itemName: string;
  sellerName: string;
  quantity: number;
  unitPrice: number;
  subTotal: number;
  discountAmount: number;
  taxAmount: number;
  isAvailable: boolean;
}

interface CheckoutSummaryProps {
  items: CheckoutItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  discountAmount?: number;
  isLoading?: boolean;
}

const CheckoutSummary = ({
  items,
  subtotal,
  shipping,
  tax,
  total,
  discountAmount = 0,
  isLoading = false,
}: CheckoutSummaryProps) => {
  const locale = useLocale();

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 sticky top-36">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          {locale === "ar" ? "ملخص الطلب" : "Order Summary"}
        </h2>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          {locale === "ar" ? "جاري التحميل..." : "Loading..."}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 sticky top-36">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          {locale === "ar" ? "ملخص الطلب" : "Order Summary"}
        </h2>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          {locale === "ar" ? "السلة فارغة" : "Cart is empty"}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 sticky top-36">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        {locale === "ar" ? "ملخص الطلب" : "Order Summary"}
      </h2>

      {/* Order Items */}
      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
        {items.map((item) => {
          return (
            <div key={`${item.itemId}-${item.itemCombinationId}`} className="flex gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">
                  {item.itemName}
                </p>
                {item.sellerName && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {locale === "ar" ? "البائع" : "Seller"}: {item.sellerName}
                  </p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {locale === "ar" ? "الكمية" : "Qty"}: {item.quantity}
                </p>
              </div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">
                ${item.subTotal.toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>{locale === "ar" ? "المجموع" : "Subtotal"}</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-green-600 dark:text-green-400">
            <span>{locale === "ar" ? "الخصم" : "Discount"}</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}
        {shipping > 0 && (
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>{locale === "ar" ? "الشحن" : "Shipping"}</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
        )}
        {tax > 0 && (
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>{locale === "ar" ? "الضريبة" : "Tax"}</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ar" ? "المجموع الكلي" : "Total"}
        </span>
        <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
      </div>

      {/* Place Order Button */}
      <button
        type="submit"
        className="w-full bg-primary hover:bg-secondary text-white font-semibold py-4 rounded-full transition-colors flex items-center justify-center gap-2 group">
        {locale === "ar" ? "تأكيد الطلب" : "Place Order"}
        <ChevronRight
          size={20}
          className={`ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform ${
            locale === "ar" ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Security Note */}
      <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
        {locale === "ar"
          ? "🔒 معلومات الدفع الخاصة بك آمنة ومشفرة"
          : "🔒 Your payment information is secure and encrypted"}
      </p>
    </div>
  );
};

export default CheckoutSummary;
