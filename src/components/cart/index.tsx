"use client";

import { useState } from "react";
import Breadcrumb from "../common/Breadcrumb";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import EmptyCart from "./EmptyCart";

// Mock cart data - replace with real data from state management
const initialCartItems = [
  {
    id: "1",
    image: "/images/products/Frame 32.png",
    title: "Gradient Graphic T-shirt",
    size: "Large",
    color: "White",
    price: 145,
    quantity: 1,
  },
  {
    id: "2",
    image: "/images/products/Frame 33.png",
    title: "Checkered Shirt",
    size: "Medium",
    color: "Red",
    price: 180,
    quantity: 1,
  },
  {
    id: "3",
    image: "/images/products/Frame 34.png",
    title: "Skinny Fit Jeans",
    size: "Large",
    color: "Blue",
    price: 240,
    quantity: 1,
  },
  {
    id: "12",
    image: "/images/products/Frame 32.png",
    title: "Gradient Graphic T-shirt",
    size: "Large",
    color: "White",
    price: 145,
    quantity: 1,
  },
  {
    id: "22",
    image: "/images/products/Frame 33.png",
    title: "Checkered Shirt",
    size: "Medium",
    color: "Red",
    price: 180,
    quantity: 1,
  },
  {
    id: "32",
    image: "/images/products/Frame 34.png",
    title: "Skinny Fit Jeans",
    size: "Large",
    color: "Blue",
    price: 240,
    quantity: 1,
  },
  {
    id: "13",
    image: "/images/products/Frame 32.png",
    title: "Gradient Graphic T-shirt",
    size: "Large",
    color: "White",
    price: 145,
    quantity: 1,
  },
  {
    id: "23",
    image: "/images/products/Frame 33.png",
    title: "Checkered Shirt",
    size: "Medium",
    color: "Red",
    price: 180,
    quantity: 1,
  },
  {
    id: "33",
    image: "/images/products/Frame 34.png",
    title: "Skinny Fit Jeans",
    size: "Large",
    color: "Blue",
    price: 240,
    quantity: 1,
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
    // Add checkout logic here
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = Math.round(subtotal * 0.2); // 20% discount
  const deliveryFee = 15;

  // Show empty cart if no items
  if (cartItems.length === 0) {
    return (
      <section className="pt-20 pb-px bg-white dark:bg-gray-900">
        <Breadcrumb className="my-4" />
        <div className="container">
          <EmptyCart />
        </div>
      </section>
    );
  }

  return (
    <section className="pt-20 pb-px bg-white dark:bg-gray-900">
      <Breadcrumb className="my-4" />
      
      <div className="container">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8">
          YOUR CART
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                {...item}
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