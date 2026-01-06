"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "../common/Breadcrumb";
import CartItem from "./components/CartItem";
import OrderSummary from "./components/OrderSummary";
import EmptyCart from "./components/EmptyCart";
import { useCartStore } from "@/src/store/cartStore";
import { useUserStore } from "@/src/store/userStore";

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotalPrice, isLoading, loadCartFromServer } =
    useCartStore();
  const { isAuthenticated } = useUserStore();
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

  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
    // Add checkout logic here
  };

  // Calculate totals
  const subtotal = getTotalPrice();
  const discount = Math.round(subtotal * 0.2); // 20% discount
  const deliveryFee = 15;

  // Loading state
  if (isInitialLoading) {
    return (
      <section className="pt-20 pb-px bg-white dark:bg-gray-900">
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
      <section className="pt-20 pb-px bg-white dark:bg-gray-900">
        <Breadcrumb />
        <div className="container">
          <EmptyCart />
        </div>
      </section>
    );
  }

  return (
    <section className="pt-20 pb-px bg-white dark:bg-gray-900">
      <Breadcrumb />

      <div className="container">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8">
          YOUR CART
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.name}
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
                discount={discount}
                deliveryFee={deliveryFee}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
