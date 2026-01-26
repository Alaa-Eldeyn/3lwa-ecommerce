"use client";

import { useEffect, useState, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import Image from "next/image";
import { customAxios } from "@/src/auth/customAxios";
import { Check, ShoppingCart } from "lucide-react";
import { Loader2 } from "lucide-react";
import { OrderData } from "@/src/types/order-details.types";

interface OrderStatusProps {
  id: string;
}

const OrderStatus = ({ id }: OrderStatusProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("orderStatus");

  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Fetch order data
        const response = await customAxios.get(`/customer/orders/${id}`);

        // Handle order data
        if (response.data?.success && response.data?.data) {
          setOrderData(response.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch order data:", err);
        setError(t("error"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderData();
  }, [id, t]);

  // Animation on load
  useEffect(() => {
    if (cardRef.current && !isLoading) {
      cardRef.current.classList.add("opacity-0", "translate-y-4");
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.classList.remove("opacity-0", "translate-y-4");
          cardRef.current.classList.add("transition-all", "duration-700", "ease-out");
        }
      }, 100);
    }
  }, [isLoading]);

  // Helper to get image URL
  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return "";
    if (imageUrl.startsWith("uploads/") || imageUrl.startsWith("uploads\\")) {
      return `${process.env.NEXT_PUBLIC_BASE_URL?.replace("/api/v1", "")}/${imageUrl.replace(
        /\\/g,
        "/"
      )}`;
    }
    return imageUrl;
  };

  // Get order items from orderData
  const orderItems = orderData?.items || [];

  // Calculate subtotal from items
  const itemsSubtotal =
    orderData?.subTotal || orderItems.reduce((sum, item) => sum + item.subTotal, 0);
  const shippingAmount = orderData?.shippingAmount || 0;
  const taxAmount = orderData?.taxAmount || 0;
  const discountAmount = orderData?.discountAmount || 0;
  const totalAmount =
    orderData?.totalAmount || itemsSubtotal + shippingAmount + taxAmount - discountAmount;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-gray-600">
            {t("loading")}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primaryDark transition-colors">
            {t("tryAgain")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="antialiased font-sans min-h-screen flex flex-col bg-gray-50 flex-grow items-center justify-center py-12 px-4">
      {/* Main Content */}
      <main
        ref={cardRef}
        className="bg-white w-full max-w-3xl rounded-xl shadow-sm border border-gray-100 p-8 md:p-12 text-center relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>

        {/* Success Icon */}
        <div className="relative mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Heading & Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {t("thankYou")}
        </h1>
        <p className="text-gray-500 max-w-md mx-auto text-lg mb-4">
          {t("orderReceived")}
        </p>

        {/* Order Number Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-200 mb-6">
          <span className="text-gray-500 text-sm font-medium">
            {t("orderNumber")}
          </span>
          <span className="text-primary font-bold tracking-wide">
            {orderData?.orderNumber || "---"}
          </span>
        </div>

        {/* Order Summary Section */}
        <div className="bg-gray-50/80 rounded-2xl p-6 md:p-8 max-w-xl mx-auto border border-gray-100 text-left">
          <h2 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-200 pb-4 text-start">
            {t("orderSummary")}
          </h2>

          {/* Items List */}
          <div className="space-y-6">
            {orderItems.length > 0 ? (
              orderItems.map((item) => (
                <div key={item.orderDetailId} className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-white flex-shrink-0 relative">
                    {item.itemImage ? (
                      <Image
                        src={getImageUrl(item.itemImage)}
                        alt={item.itemName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <ShoppingCart className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800 text-sm md:text-base text-start">
                      {item.itemName}
                    </h3>
                    <p className="text-gray-500 text-xs text-start">
                      {t("qty")} {item.quantity}
                      {item.vendorName &&
                        ` | ${t("seller")} ${item.vendorName}`}
                    </p>
                  </div>
                  <div className={`text-start}`}>
                    <p className="text-gray-500 text-xs">${item.unitPrice.toFixed(2)}</p>
                    <p className="font-bold text-gray-800">${item.subTotal.toFixed(2)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                {t("noItems")}
              </p>
            )}
          </div>

          {/* Subtotal, Shipping, Total */}
          <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
            {/* Subtotal */}
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">
                {t("subtotal")}
              </span>
              <span className="text-gray-800 font-medium">${itemsSubtotal.toFixed(2)}</span>
            </div>

            {/* Discount */}
            {discountAmount > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">{t("discount")}</span>
                <span className="text-green-600 font-medium">-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            {/* Tax */}
            {taxAmount > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">{t("tax")}</span>
                <span className="text-gray-800 font-medium">${taxAmount.toFixed(2)}</span>
              </div>
            )}

            {/* Shipping */}
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">{t("shipping")}</span>
              <span className="text-gray-800 font-medium">
                {shippingAmount > 0 ? `$${shippingAmount.toFixed(2)}` : t("shippingFree")}
              </span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-end pt-3 border-t border-gray-200">
              <div>
                <p className="text-gray-500 text-sm">
                  {t("totalAmount")}
                </p>
              </div>
              <div className="text-2xl font-bold text-primary">${totalAmount.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-xl text-white bg-primary hover:bg-primary/90 w-full sm:w-auto">
            {t("continueShopping")}
          </Link>
          <Link
            href={`/profile?tab=orders`}
            className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-200 text-base font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 w-full sm:w-auto">
            {t("viewMyOrders")}
          </Link>
        </div>
      </main>
    </div>
  );
};

export default OrderStatus;
