"use client";

import { useState } from "react";
import { X, ShoppingBag, Trash2, AlertTriangle } from "lucide-react";
import { useHeaderStore } from "@/src/store/headerStore";
import { useCartStore } from "@/src/store/cartStore";
import { Link } from "@/src/i18n/routing";
import Image from "next/image";
import QuantityController from "../common/QuantityController";
import { isAuthenticated } from "@/src/auth/auth";
import { useLocale, useTranslations } from "next-intl";

const CartSidebar = () => {
  const { isCartOpen, closeCart } = useHeaderStore();
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore();
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("cart.sidebar");
  const tOrderSummary = useTranslations("cart.orderSummary");

  // State to control the Clear Confirmation Modal
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const handleIncrement = (id: string) => async (e: React.MouseEvent) => {
    e.stopPropagation();
    const item = items.find((i) => i.id === id);
    if (item) {
      await updateQuantity(id, item.quantity + 1, isAuthenticated());
    }
  };

  const handleDecrement = (id: string) => async (e: React.MouseEvent) => {
    e.stopPropagation();
    const item = items.find((i) => i.id === id);
    if (item) {
      if (item.quantity === 1) {
        await removeItem(id, isAuthenticated());
      } else {
        await updateQuantity(id, item.quantity - 1, isAuthenticated());
      }
    }
  };

  // Function to open the modal
  const askToClearCart = () => {
    setIsClearModalOpen(true);
  };

  // Function to confirm clearing the cart
  const confirmClearCart = async () => {
    try {
      await clearCart(isAuthenticated());
      setIsClearModalOpen(false);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  return (
    <>
      {/* 1. Main Overlay for Cart Sidebar (z-50) */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {isClearModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity opacity-100"
            onClick={() => setIsClearModalOpen(false)}
          />

          {/* Modal Content Box */}
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all duration-300 scale-100 opacity-100">
            {/* Header */}
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4 animate-bounce-short">
                <AlertTriangle className="text-red-600 dark:text-red-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {t("clearModal.title")}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {t("clearModal.description")}
              </p>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 p-4 pt-0 bg-gray-50 dark:bg-gray-800/50">
              <button
                onClick={() => setIsClearModalOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                {t("clearModal.cancel")}
              </button>
              <button
                onClick={confirmClearCart}
                className="w-full py-2.5 px-4 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/30 transition-all">
                {t("clearModal.confirm")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Sidebar (z-50 - Lower than Modal) */}
      <div
        className={`fixed top-0 right-0 rtl:right-auto rtl:left-0 h-full w-[85vw] sm:w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
        }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-2">
            <ShoppingBag size={24} className="text-primary" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("titleWithCount", { count: items.length })}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition">
            <X size={24} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={64} className="text-gray-300 dark:text-gray-700 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">{t("empty")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  {/* Image */}
                  <div className="relative w-20 h-20 shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DOMAIN}/${item.image}`}
                      alt={isArabic ? item.nameAr || item.name : item.nameEn || item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                      {isArabic ? item.nameAr || item.name : item.nameEn || item.name}
                    </h3>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <QuantityController
                        quantity={item.quantity}
                        onIncrement={handleIncrement(item.id)}
                        onDecrement={handleDecrement(item.id)}
                        variant="default"
                        className="bg-white! dark:bg-gray-700! text-gray-900! "
                        showDeleteIcon={false}
                      />

                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 dark:text-white">
                          ${item.price * item.quantity}
                        </span>
                        <button
                          onClick={() => removeItem(item.id, isAuthenticated())}
                          className="text-red-500 hover:text-red-600 p-1">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t dark:border-gray-700 p-4 space-y-3">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-lg">
              <span className="text-gray-600 dark:text-gray-400">
                {tOrderSummary("subtotal")}:
              </span>
              <span className="font-bold text-gray-900 dark:text-white">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>

            {/* Buttons */}
            <div className="space-y-2">
              <button
                onClick={askToClearCart}
                className="w-full flex items-center justify-center gap-2 bg-error text-white py-3 rounded-lg font-semibold hover:bg-error-hover transition">
                <Trash2 size={18} />
                {t("clearCart")}
              </button>
              <Link
                href="/cart"
                onClick={closeCart}
                className="block w-full text-center bg-primary dark:bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition">
                {t("viewCart")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
