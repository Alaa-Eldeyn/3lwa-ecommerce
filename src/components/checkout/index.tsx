"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ShippingAddress from "./components/ShippingAddress";
import PaymentMethod from "./components/PaymentMethod";
import CheckoutSummary from "./components/CheckoutSummary";
import { useUserStore } from "@/src/store/userStore";
import { useLocale, useTranslations } from "next-intl";
import { useCartStore } from "@/src/store/cartStore";
import { Tag, X } from "lucide-react";
import { customAxios } from "@/src/auth/customAxios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const { handleSubmit } = useForm();
  const router = useRouter();

  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [checkoutData, setCheckoutData] = useState<any>(null);
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { items, isLoading, loadCartFromServer, getTotalPrice, clearCart } = useCartStore();
  const { isAuthenticated } = useUserStore();
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("checkout");
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

  // Fetch payment methods to get methodType
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await customAxios.get("/PaymentMethod");
        if (response.data?.success && response.data?.data) {
          const activeMethods = response.data.data.filter((method: any) => method.isActive);
          setPaymentMethods(activeMethods);
          // Auto-select first method if none selected
          if (!paymentMethodId && activeMethods.length > 0) {
            setPaymentMethodId(activeMethods[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    };

    if (isAuthenticated()) {
      fetchPaymentMethods();
    }
  }, [isAuthenticated]);

  const onSubmit = async (data: any) => {
    if (!selectedAddress?.id) {
      toast.error(t("errors.selectAddress"));
      return;
    }

    if (!paymentMethodId) {
      toast.error(t("errors.selectPaymentMethod"));
      return;
    }

    // Find the selected payment method to get methodType
    const selectedPaymentMethod = paymentMethods.find((method) => method.id === paymentMethodId);

    if (!selectedPaymentMethod) {
      toast.error(t("errors.invalidPaymentMethod"));
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        deliveryAddressId: selectedAddress.id,
        paymentMethod: selectedPaymentMethod.methodType,
        paymentMethodId: paymentMethodId,
        couponCode: appliedPromoCode || null,
        notes: deliveryNotes || null,
      };

      const response = await customAxios.post("/customer/orders/create", orderData);

      if (response.data?.success && response.data?.data?.orderId) {
        // Handle success - redirect to order confirmation page
        toast.success(t("success.orderCreated"));

        // Clear the cart after successful order
        await clearCart(true);

        // Redirect to order status page with orderId
        router.push(`/${locale}/order-status/${response.data.data.orderId}`);
      } else {
        throw new Error(response.data?.message || t("error.orderFailed"));
      }
    } catch (error: any) {
      console.error("Failed to create order:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0] ||
        t("error.orderFailed");
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Use pricing from API response, fallback to cart store calculations
  const subtotal = checkoutData?.priceBreakdown?.subtotal ?? getTotalPrice();
  const tax = checkoutData?.priceBreakdown?.taxAmount ?? subtotal * 0.14;
  const shipping = checkoutData?.priceBreakdown?.shippingCost ?? 0;
  const total = checkoutData?.priceBreakdown?.grandTotal ?? subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 dark:bg-gray-950 py-8">
      <div className="container">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t("title")}</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Forms */}
            <div className="lg:col-span-2 space-y-6">
              <ShippingAddress onAddressChange={setSelectedAddress} />

              {/* Coupon Code */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Tag size={24} className="text-primary" />
                  {t("couponCode")}
                </h2>

                {appliedPromoCode ? (
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Tag className="text-green-600 dark:text-green-400" size={20} />
                      <span className="font-medium text-green-700 dark:text-green-300">
                        {appliedPromoCode}
                      </span>
                      <span className="text-sm text-green-600 dark:text-green-400">
                        {t("applied")}
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
                      placeholder={t("couponCodePlaceholder")}
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
                      {isApplyingPromo ? t("applying") : t("apply")}
                    </button>
                  </div>
                )}
              </div>

              <PaymentMethod
                selectedMethod={paymentMethodId}
                onChange={(methodId) => setPaymentMethodId(methodId)}
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
                onDeliveryNotesChange={setDeliveryNotes}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
