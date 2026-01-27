"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import Image from "next/image";
import { customAxios } from "@/src/auth/customAxios";
import { Package, Loader2, ArrowLeft, ArrowRight, XCircle, Truck, X } from "lucide-react";
import { OrderData } from "@/src/types/order-details.types";
import { getOrderStatusInfo } from "@/src/utils/orderStatus";

interface OrderProps {
  id: string;
}

const Order = ({ id }: OrderProps) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("order");

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t("loading")}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4" />
          <p className="text-lg text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
            {t("tryAgain")}
          </button>
        </div>
      </div>
    );
  }

  const orderStatusInfo = getOrderStatusInfo(orderData?.orderStatus ?? "");

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb / Back Button */}
      <div className="mb-6">
        <Link
          href={`/profile?tab=orders`}
          className="flex items-center text-primary hover:opacity-80 transition-colors font-medium">
          {isArabic ? (
            <ArrowRight className="w-4 h-4 ms-2" />
          ) : (
            <ArrowLeft className="w-4 h-4 me-2" />
          )}
          {t("backToOrders")}
        </Link>
      </div>

      {/* Order Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("orderDetails")}
          </h1>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${orderStatusInfo.bgColor}`}>
            {isArabic ? orderStatusInfo.labelAr : orderStatusInfo.label}
          </span>
        </div>
        <div className="flex gap-2 items-center text-gray-600 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-white">{orderData?.orderNumber || "---"}</span>
          <span className="text-sm">•</span>
          <span className="text-sm">
            {t("placedOn")}
            {orderData?.orderDate
              ? new Date(orderData.orderDate).toLocaleDateString(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "---"}
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t("orderItems")}
              </h2>
            </div>

            {orderItems.length > 0 ? (
              orderItems.map((item, index) => (
                <div
                  key={item.orderDetailId}
                  className={`p-6 ${
                    index < orderItems.length - 1 ? "border-b border-gray-200 dark:border-gray-700" : ""
                  }`}>
                  <div className="flex items-start gap-4">
                    <div className="h-20 w-20 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 shrink-0 relative">
                      {item.itemImage ? (
                        <Image
                          src={getImageUrl(item.itemImage)}
                          alt={item.itemName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-1">
                        {item.itemName}
                      </h3>
                      {item.vendorName && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {t("seller")}
                          {item.vendorName}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {t("qty")} {item.quantity}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">×</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            ${item.unitPrice.toFixed(2)}
                          </span>
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          ${item.subTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center">
                <Package className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">{t("noItems")}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 sticky top-36 h-fit">
          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t("orderSummary")}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>{t("subtotal")}</span>
                <span className="text-gray-900 dark:text-white">${itemsSubtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>{t("discount")}</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              {taxAmount > 0 && (
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>{t("tax")}</span>
                  <span className="text-gray-900 dark:text-white">${taxAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>{t("shipping")}</span>
                <span className={shippingAmount === 0 ? "text-green-600 dark:text-green-400 font-medium" : "text-gray-900 dark:text-white"}>
                  {shippingAmount > 0
                    ? `$${shippingAmount.toFixed(2)}`
                    : t("shippingFree")}
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                  <span>{t("total")}</span>
                  <span className="text-gray-900 dark:text-white">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Actions */}
          <div className="space-y-3">
            <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              <Truck className="w-5 h-5" />
              {t("trackOrder")}
            </button>
            <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/30 hover:border-red-300 dark:hover:border-red-700 hover:text-red-600 dark:hover:text-red-400">
              <X className="w-5 h-5" />
              {t("cancelOrder")}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Order;
