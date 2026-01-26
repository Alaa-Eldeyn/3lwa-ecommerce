"use client";
import { ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

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
  onDeliveryNotesChange?: (notes: string) => void;
  isSubmitting?: boolean;
}

const CheckoutSummary = ({
  items,
  subtotal,
  shipping,
  tax,
  total,
  discountAmount = 0,
  isLoading = false,
  onDeliveryNotesChange,
  isSubmitting = false,
}: CheckoutSummaryProps) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("checkout.orderSummary");
  const [deliveryNotes, setDeliveryNotes] = useState("");

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const notes = e.target.value;
    setDeliveryNotes(notes);
    onDeliveryNotesChange?.(notes);
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 sticky top-36">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          {t("title")}
        </h2>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          {t("loading")}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 sticky top-36">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          {t("title")}
        </h2>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          {t("empty")}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 sticky top-36">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        {t("title")}
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
                    {t("seller")}: {item.sellerName}
                  </p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {t("qty")}: {item.quantity}
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
          <span>{t("subtotal")}</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-green-600 dark:text-green-400">
            <span>{t("discount")}</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}
        {shipping > 0 && (
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>{t("shipping")}</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
        )}
        {tax > 0 && (
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>{t("tax")}</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-semibold text-gray-900 dark:text-white">
          {t("total")}
        </span>
        <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
      </div>

      {/* Delivery Notes */}
      <div className="mb-6">
        <label
          htmlFor="delivery-notes"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t("deliveryNotes")}
        </label>
        <textarea
          id="delivery-notes"
          value={deliveryNotes}
          onChange={handleNotesChange}
          placeholder={t("deliveryNotesPlaceholder")}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
        />
      </div>

      {/* Place Order Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-secondary text-white font-semibold py-4 rounded-full transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed">
        {isSubmitting ? t("creatingOrder") : t("placeOrder")}
        {!isSubmitting && (
          <ChevronRight
            size={20}
            className={`ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform ${
              isArabic ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {/* Security Note */}
      <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
        {t("securityNote")}
      </p>
    </div>
  );
};

export default CheckoutSummary;
