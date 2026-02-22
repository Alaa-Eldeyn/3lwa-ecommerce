"use client";
import { ChevronRight, Tag, X } from "lucide-react";
import { formatPrice } from "@/src/config/currency";
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

export interface CouponInfo {
  code: string;
  discountAmount: number;
  discountPercentage?: number;
  discountType: string;
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
  appliedPromoCode?: string | null;
  couponInfo?: CouponInfo | null;
  onApplyCoupon?: (code: string) => Promise<{ success: boolean }>;
  onRemoveCoupon?: () => void;
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
  appliedPromoCode = null,
  couponInfo = null,
  onApplyCoupon,
  onRemoveCoupon,
}: CheckoutSummaryProps) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("checkout.orderSummary");
  const tCheckout = useTranslations("checkout");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const notes = e.target.value;
    setDeliveryNotes(notes);
    onDeliveryNotesChange?.(notes);
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim() || !onApplyCoupon) return;
    setIsApplyingPromo(true);
    try {
      const result = await onApplyCoupon(promoCode.trim());
      if (result.success) {
        setPromoCode("");
      }
    } catch (error) {
      console.error("Failed to apply promo code:", error);
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleRemovePromo = () => {
    onRemoveCoupon?.();
    setPromoCode("");
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t("title")}</h2>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">{t("loading")}</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t("title")}</h2>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">{t("empty")}</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t("title")}</h2>

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
                {item.discountAmount > 0 && (
                  <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">
                    {t("itemDiscount")}: -{formatPrice(item.discountAmount)}
                  </p>
                )}
              </div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm shrink-0">
                {formatPrice(item.subTotal)}
              </p>
            </div>
          );
        })}
      </div>

      {/* Coupon Code */}
      {onApplyCoupon && onRemoveCoupon && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <Tag size={18} className="text-primary" />
            {tCheckout("couponCode")}
          </h3>
          {appliedPromoCode ? (
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <Tag className="text-green-600 dark:text-green-400 shrink-0" size={18} />
                  <span className="font-medium text-green-700 dark:text-green-300 text-sm">
                    {couponInfo?.code ?? appliedPromoCode}
                  </span>
                  <span className="text-xs text-green-600 dark:text-green-400">
                    {tCheckout("applied")}
                  </span>
                </div>
                {couponInfo && couponInfo.discountAmount > 0 && (
                  <span className="text-xs text-green-600 dark:text-green-400 mt-0.5">
                    {couponInfo.discountType === "Percentage" && couponInfo.discountPercentage != null
                      ? `${couponInfo.discountPercentage}% off`
                      : `-${formatPrice(couponInfo.discountAmount / 100)}`}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={handleRemovePromo}
                className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors p-1 shrink-0"
                aria-label="Remove coupon">
                <X size={18} />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                placeholder={tCheckout("couponCodePlaceholder")}
                className="flex-1 px-3 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleApplyPromo();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                disabled={!promoCode.trim() || isApplyingPromo}
                className="px-4 py-2.5 bg-primary hover:bg-secondary text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap">
                {isApplyingPromo ? tCheckout("applying") : tCheckout("apply")}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>{t("subtotal")}</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-green-600 dark:text-green-400">
            <span>{t("discount")}</span>
            <span>-{formatPrice(discountAmount)}</span>
          </div>
        )}
        {shipping > 0 && (
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>{t("shipping")}</span>
            <span>{formatPrice(shipping)}</span>
          </div>
        )}
        {tax > 0 && (
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>{t("tax")}</span>
            <span>{formatPrice(tax)}</span>
          </div>
        )}
      </div>

      <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-semibold text-gray-900 dark:text-white">{t("total")}</span>
        <span className="text-2xl font-bold text-primary">{formatPrice(total)}</span>
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
        className="w-full bg-primary hover:bg-secondary text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed">
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
