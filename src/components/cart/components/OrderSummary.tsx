"use client";

import { useState } from "react";
import { Tag, ArrowRight } from "lucide-react";

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  onCheckout: () => void;
}

const OrderSummary = ({ subtotal, discount, deliveryFee, onCheckout }: OrderSummaryProps) => {
  const [promoCode, setPromoCode] = useState("");
  const total = subtotal - discount + deliveryFee;
  const discountPercentage = Math.round((discount / subtotal) * 100);

  const handleApplyPromo = () => {
    console.log("Applying promo code:", promoCode);
    // Add promo code logic here
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

      {/* Summary Items */}
      <div className="space-y-4 mb-6">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">${subtotal}</span>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Discount (-{discountPercentage}%)
            </span>
            <span className="text-lg font-bold text-red-500">-${discount}</span>
          </div>
        )}

        {/* Delivery Fee */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">Delivery Fee</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">${deliveryFee}</span>
        </div>
      </div>

      <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />

      {/* Total */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg text-gray-900 dark:text-white">Total</span>
        <span className="text-2xl font-bold text-gray-900 dark:text-white">${total}</span>
      </div>

      {/* Promo Code */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Tag size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Add promo code"
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary soft"
          />
        </div>
        <button
          onClick={handleApplyPromo}
          className="px-6 py-2 bg-primary dark:bg-white text-white dark:text-primary rounded-full font-medium hover:bg-secondary dark:hover:bg-gray-200 soft">
          Apply
        </button>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        className="w-full px-6 py-3 bg-primary dark:bg-white text-white dark:text-primary rounded-full font-medium hover:bg-secondary dark:hover:bg-gray-200 soft flex items-center justify-center gap-2">
        Go to Checkout
        <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default OrderSummary;
