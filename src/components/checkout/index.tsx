"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ShippingAddress from "./components/ShippingAddress";
import PaymentMethod from "./components/PaymentMethod";
import CheckoutSummary from "./components/CheckoutSummary";
import { useUserStore } from "@/src/store/userStore";
import { useLocale } from "next-intl";
import { useCartStore } from "@/src/store/cartStore";

const Checkout = () => {
  const { handleSubmit } = useForm();

  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [promoCode, setPromoCode] = useState("");

  const { items, isLoading, loadCartFromServer, getTotalPrice } = useCartStore();
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

  const handleApplyPromo = () => {
    console.log("Applying promo code:", promoCode);
    // Add promo code logic here
  };

  const onSubmit = (data: any) => {
    const orderData = {
      contactInfo: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      },
      shippingAddress: selectedAddress || {
        streetAddress: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
      },
      paymentMethod,
      notes: data.notes,
    };
    console.log("Order submitted:", orderData);
    // Handle form submission - send to backend
  };

  // Calculate pricing from cart store
  const subtotal = getTotalPrice();
  const shipping = 0; // TODO: Get from server or calculate based on address
  const tax = 0; // TODO: Get from server or calculate
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 dark:bg-gray-950 py-8">
      <div className="container">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Forms */}
            <div className="lg:col-span-2 space-y-6">
              <ShippingAddress onAddressChange={setSelectedAddress} />

              <PaymentMethod
                selectedMethod={paymentMethod}
                onChange={(methodId) => setPaymentMethod(methodId)}
              />
            </div>

            {/* Right Side - Order Summary */}
            <div className="lg:col-span-1">
              <CheckoutSummary
                items={items}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
                isLoading={isLoading || isInitialLoading}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
