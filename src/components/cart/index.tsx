"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "../common/Breadcrumb";
import CartItem from "./components/CartItem";
import OrderSummary from "./components/OrderSummary";
import EmptyCart from "./components/EmptyCart";
import { useCartStore } from "@/src/store/cartStore";
import { useUserStore } from "@/src/store/userStore";
import { useLocale } from "next-intl";

const Cart = () => {
  const { items, summary, updateQuantity, removeItem, getTotalPrice, isLoading, loadCartFromServer } =
    useCartStore();
  const { isAuthenticated } = useUserStore();
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [isInitialLoading, setIsInitialLoading] = useState(true);

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

  // Use summary from API for authenticated users, calculate locally for guests
  const isUserAuthenticated = isAuthenticated();
  const subtotal = isUserAuthenticated ? summary.subTotal : getTotalPrice();
  const shippingEstimate = isUserAuthenticated ? summary.shippingEstimate : 0;
  const taxEstimate = isUserAuthenticated ? summary.taxEstimate : 0;
  const totalEstimate = isUserAuthenticated
    ? summary.totalEstimate
    : subtotal + shippingEstimate + taxEstimate;

  // Loading state
  if (isInitialLoading) {
    return (
      <section className="pb-px bg-white dark:bg-gray-900">
        <Breadcrumb />
        <div className="container">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading cart...</p>
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
    <section className="pb-8 bg-white dark:bg-gray-900">
      <Breadcrumb />

      <div className="container">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          {locale === "ar" ? "السلة" : "Your Cart"}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                image={`${process.env.NEXT_PUBLIC_DOMAIN}/${item.image}`}
                title={isArabic ? (item.nameAr || item.name) : (item.nameEn || item.name)}
                price={item.price}
                quantity={item.quantity}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <OrderSummary
                subtotal={subtotal}
                shippingEstimate={shippingEstimate}
                taxEstimate={taxEstimate}
                totalEstimate={totalEstimate}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
