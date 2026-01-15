"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ShippingAddress from "./components/ShippingAddress";
import PaymentMethod from "./components/PaymentMethod";
import CheckoutSummary from "./components/CheckoutSummary";
import { useUserStore } from "@/src/store/userStore";
import { useLocale } from "next-intl";
import { useCartStore } from "@/src/store/cartStore";
import { Tag, X } from "lucide-react";
import { customAxios } from "@/src/utils/customAxios";

const Checkout = () => {
  const { handleSubmit } = useForm();

  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [checkoutData, setCheckoutData] = useState<any>(null);

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

  // Prepare checkout - call API when page loads, address changes, or coupon is applied
  useEffect(() => {
    const prepareCheckout = async () => {
      if (!isAuthenticated() || items.length === 0 || isInitialLoading) return;

      try {
        const response = await customAxios.post("/Checkout/prepare", {
          deliveryAddressId: selectedAddress?.id || null,
          couponCode: appliedPromoCode || null,
        });

        const data = response.data;
        if (data?.items || data?.priceBreakdown) {
          setCheckoutData(data);
        }
      } catch (error) {
        console.error("Failed to prepare checkout:", error);
        setCheckoutData(null);
      }
    };

    prepareCheckout();
  }, [isInitialLoading, items.length, selectedAddress?.id, appliedPromoCode, isAuthenticated]);

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;

    setIsApplyingPromo(true);
    try {
      // TODO: Call API to validate and apply promo code
      // const response = await applyPromoCode(promoCode);
      // if (response.success) {
      //   setAppliedPromoCode(promoCode);
      //   setPromoCode("");
      // }
      console.log("Applying promo code:", promoCode);
      setAppliedPromoCode(promoCode);
      setPromoCode("");
    } catch (error) {
      console.error("Failed to apply promo code:", error);
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromoCode(null);
    setPromoCode("");
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

  // Use pricing from API response, fallback to cart store calculations
  const subtotal = checkoutData?.priceBreakdown?.subtotal ?? getTotalPrice();
  const tax = checkoutData?.priceBreakdown?.taxAmount ?? subtotal * 0.14;
  const shipping = checkoutData?.priceBreakdown?.shippingCost ?? 0;
  const total = checkoutData?.priceBreakdown?.grandTotal ?? subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 dark:bg-gray-950 py-8">
      <div className="container">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Forms */}
            <div className="lg:col-span-2 space-y-6">
              <ShippingAddress onAddressChange={setSelectedAddress} />

              {/* Coupon Code */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Tag size={24} className="text-primary" />
                  {locale === "ar" ? "كود الخصم" : "Coupon Code"}
                </h2>

                {appliedPromoCode ? (
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Tag className="text-green-600 dark:text-green-400" size={20} />
                      <span className="font-medium text-green-700 dark:text-green-300">
                        {appliedPromoCode}
                      </span>
                      <span className="text-sm text-green-600 dark:text-green-400">
                        {locale === "ar" ? "مطبق" : "Applied"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemovePromo}
                      className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors">
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder={locale === "ar" ? "أدخل كود الخصم" : "Enter coupon code"}
                      className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                      className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      {isApplyingPromo
                        ? locale === "ar"
                          ? "جاري التطبيق..."
                          : "Applying..."
                        : locale === "ar"
                        ? "تطبيق"
                        : "Apply"}
                    </button>
                  </div>
                )}
              </div>

              <PaymentMethod
                selectedMethod={paymentMethod}
                onChange={(methodId) => setPaymentMethod(methodId)}
              />
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <CheckoutSummary
                items={checkoutData?.items ?? []}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
                discountAmount={checkoutData?.priceBreakdown?.discountAmount ?? 0}
                isLoading={isLoading || isInitialLoading || !checkoutData}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
