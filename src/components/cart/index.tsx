"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "../common/Breadcrumb";
import EmptyCart from "./components/EmptyCart";
import ClearCartModal from "./components/ClearCartModal";
import { useCartStore } from "@/src/store/cartStore";
import { useUserStore } from "@/src/store/userStore";
import { Link } from "@/src/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { Trash2, Minus, Plus, ArrowLeft, ArrowRight, CreditCard, Lock } from "lucide-react";
import Image from "next/image";

const Cart = () => {
  const {
    items,
    summary,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalPrice,
    isLoading,
    loadCartFromServer,
  } = useCartStore();
  const { isAuthenticated } = useUserStore();
  const locale = useLocale();
  const isArabic = locale === "ar";
  const tCart = useTranslations("cart");
  const tOrderSummary = useTranslations("cart.orderSummary");
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  // تحميل الـ cart من الـ server لو اليوزر مسجل
  useEffect(() => {
    const initializeCart = async () => {
      if (isAuthenticated()) {
        try {
          await loadCartFromServer();
        } catch (error) {
          console.error("Failed to load cart:", error);
        }
      }
      setIsInitialLoading(false);
    };

    initializeCart();
  }, [isAuthenticated, loadCartFromServer]);

  const handleQuantityChange = async (id: string, newQuantity: number) => {
    try {
      await updateQuantity(id, newQuantity, isAuthenticated());
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleRemoveItem = async (id: string) => {
    try {
      await removeItem(id, isAuthenticated());
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const askToClearCart = () => {
    setIsClearModalOpen(true);
  };

  const confirmClearCart = async () => {
    try {
      await clearCart(isAuthenticated());
      setIsClearModalOpen(false);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  // Use summary from API for authenticated users, calculate locally for guests
  const isUserAuthenticated = isAuthenticated();
  const subtotal = isUserAuthenticated ? summary.subTotal : getTotalPrice();

  // Loading state
  if (isInitialLoading) {
    return (
      <section className="pb-px bg-white dark:bg-gray-900">
        <Breadcrumb />
        <div className="container">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">{tCart("loading")}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show empty cart if no items
  if (items.length === 0) {
    return (
      <section className="pb-px bg-white dark:bg-gray-900">
        <Breadcrumb />
        <div className="container">
          <EmptyCart />
        </div>
      </section>
    );
  }

  return (
    <>
      <ClearCartModal
        isOpen={isClearModalOpen}
        onCancel={() => setIsClearModalOpen(false)}
        onConfirm={confirmClearCart}
      />
      <section className="pb-8 bg-white dark:bg-gray-900">
        <Breadcrumb />

        <div className="container">
          <h1 className="text-3xl font-bold text-secondary mb-8">{tCart("title")}</h1>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Cart Items List */}
            <section id="cart-items" className="flex-1 w-full space-y-4">
              {items.map((item) => {
                const title = isArabic ? item.nameAr || item.name : item.nameEn || item.name;

                return (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shrink-0 border border-gray-100 dark:border-gray-700">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_DOMAIN}/${item.image}`}
                          alt={title}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {title}
                        </h3>
                        {/* //TODO: Variant/details */}
                        {/* <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        Natural Titanium, 256GB
                      </p> */}
                        <div className="text-xl font-bold text-secondary">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-6">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20">
                        <Trash2 size={18} />
                      </button>

                      <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-l-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                          <Minus size={12} />
                        </button>
                        <input
                          type="text"
                          readOnly
                          value={item.quantity}
                          className="w-10 h-8 text-center bg-transparent border-none text-sm font-semibold focus:outline-none text-gray-900 dark:text-white"
                        />
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-lg transition-colors">
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="flex justify-between items-center">
                <Link
                  href="/"
                  className="text-primary hover:text-headerInteractive font-semibold flex items-center gap-2 transition-colors">
                  <ArrowLeft size={18} className={isArabic ? "rotate-180" : ""} />
                  <span>{tCart("empty.continueShopping")}</span>
                </Link>

                <button
                  onClick={askToClearCart}
                  className="text-gray-500 hover:text-red-500 font-medium transition-colors">
                  {tCart("sidebar.clearCart")}
                </button>
              </div>
            </section>

            {/* Order Summary */}
            <aside id="order-summary" className="w-full lg:w-[400px] shrink-0">
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-xs sticky top-32">
                <h2 className="text-xl font-bold text-secondary mb-6">{tOrderSummary("title")}</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                    <span>{tOrderSummary("subtotal")}</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-gray-400 text-sm">
                    <span>{tOrderSummary("shipping")}</span>
                    <span className="italic">{tOrderSummary("shippingCalculated")}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-400 text-sm">
                    <span>{tOrderSummary("tax")}</span>
                    <span className="italic">{tOrderSummary("taxCalculated")}</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-6 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-medium text-gray-700 dark:text-gray-200">
                      {tOrderSummary("total")}
                    </span>
                    <span className="text-2xl font-bold text-secondary">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-lg transition-all transform active:scale-[0.98] shadow-sm shadow-primary/20 flex items-center justify-center gap-3">
                  {tOrderSummary("goToCheckout")}
                  <ArrowRight size={18} className={isArabic ? "rotate-180" : ""} />
                </Link>

                <p className="mt-6 text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                  <Lock size={12} />
                  {tOrderSummary("secureCheckout")}
                </p>
              </div>

              {/* // TODO: Coupon Code */}
              {/* <div className="mt-6 bg-accent/20 rounded-xl border border-accent/50 p-6">
              <h3 className="font-bold text-secondary text-sm mb-3">Have a coupon code?</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <button className="bg-secondary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-secondary/90 transition-colors">
                  Apply
                </button>
              </div>
            </div> */}
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
