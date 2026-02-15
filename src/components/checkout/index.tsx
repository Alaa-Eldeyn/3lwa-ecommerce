"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ShippingAddress from "./components/ShippingAddress";
import PaymentMethod from "./components/PaymentMethod";
import CheckoutSummary from "./components/CheckoutSummary";
import { useUserStore } from "@/src/store/userStore";
import { useLocale, useTranslations } from "next-intl";
import { useCartStore } from "@/src/store/cartStore";
import { customAxios } from "@/src/auth/customAxios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const { handleSubmit } = useForm();
  const router = useRouter();

  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
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

  // Prepare checkout - call API when page loads, address changes, or coupon is removed
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

  // Apply coupon: call prepare with the code, update checkout data only when coupon is valid
  const applyCoupon = async (code: string): Promise<{ success: boolean }> => {
    const trimmedCode = code.trim();
    if (!trimmedCode) return { success: false };

    try {
      const response = await customAxios.post("/Checkout/prepare", {
        deliveryAddressId: selectedAddress?.id || null,
        couponCode: trimmedCode,
      });

      const data = response.data;

      // API can return 200 with couponInfo/couponId null when coupon is invalid
      if (trimmedCode && (data?.couponInfo == null && data?.couponId == null)) {
        toast.error(t("errors.invalidCoupon") || "Invalid or expired coupon");
        return { success: false };
      }

      if (data?.items || data?.priceBreakdown) {
        setCheckoutData(data);
        setAppliedPromoCode(trimmedCode);
        return { success: true };
      }

      toast.error(t("errors.invalidCoupon") || "Invalid coupon");
      return { success: false };
    } catch (error: any) {
      console.error("Failed to apply coupon:", error);
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0] ||
        t("errors.invalidCoupon") ||
        "Invalid or expired coupon";
      toast.error(message);
      return { success: false };
    }
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
        // paymentMethodId: paymentMethodId,
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
                
                appliedPromoCode={appliedPromoCode}
                couponInfo={checkoutData?.couponInfo ?? null}
                onApplyCoupon={applyCoupon}
                onRemoveCoupon={() => setAppliedPromoCode(null)}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
