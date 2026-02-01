"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/src/i18n/routing";
import Image from "next/image";
import { customAxios } from "@/src/auth/customAxios";
import {
  Package,
  Loader2,
  ArrowLeft,
  ArrowRight,
  XCircle,
  X,
  AlertTriangle,
} from "lucide-react";
import { OrderData } from "@/src/types/order-details.types";
import { getOrderStatusInfo } from "@/src/utils/orderStatus";
import toast from "react-hot-toast";
import OrderTrackingTimeline from "./OrderTrackingTimeline";

interface OrderProps {
  id: string;
}

const Order = ({ id }: OrderProps) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("order");
  const router = useRouter();

  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [cancellationReason, setCancellationReason] = useState("");

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


  // Handle cancel order
  const handleCancelOrder = async () => {
    if (!orderData?.orderId) return;

    try {
      setIsCancelling(true);
      setCancelError(null);

      // Prepare request body with optional cancellation reason
      const requestBody: { reason?: string } = {};
      if (cancellationReason.trim()) {
        requestBody.reason = cancellationReason.trim();
      }

      await customAxios.post(`/customer/orders/${orderData.orderId}/cancel`, requestBody);

      // Refresh order data to get updated status
      const response = await customAxios.get(`/customer/orders/${id}`);
      if (response.data?.success && response.data?.data) {
        setOrderData(response.data.data);
      }

      setShowCancelModal(false);
      setCancellationReason(""); // Reset reason after successful cancellation

      // Show success toast
      toast.success(t("cancelOrderModal.success"), {
        duration: 3000,
      });
    } catch (err: any) {
      console.error("Failed to cancel order:", err);
      setCancelError(err?.response?.data?.message || t("cancelOrderModal.error"));
    } finally {
      setIsCancelling(false);
    }
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
          <p className="text-lg text-gray-600 dark:text-gray-400">{t("loading")}</p>
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
    <main className="bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb / Back Button */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-2">
        <div className="container mx-auto flex items-center justify-between min-h-10 md:min-h-[44px]">
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
      </div>

      <div className="container mx-auto px-4 md:px-6 py-4 md:py-8">
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
            <span className="font-semibold text-gray-900 dark:text-white">
              {orderData?.orderNumber || "---"}
            </span>
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

        {/* Tracking Timeline (inline) */}
        <OrderTrackingTimeline orderData={orderData} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t("orderItems")}
                </h2>
              </div>

              {orderItems.length > 0 ? (
                orderItems.map((item, index) => {
                  const imageSrc = item.itemImage?.startsWith("http")
                    ? item.itemImage
                    : `${process.env.NEXT_PUBLIC_DOMAIN}/${item.itemImage}`;
                  return (
                  <div
                    key={item.orderDetailId}
                    className={`p-6 ${
                      index < orderItems.length - 1
                        ? "border-b border-gray-200 dark:border-gray-700"
                        : ""
                    }`}>
                    <div className="flex items-start gap-4">
                      <div className="h-20 w-20 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 shrink-0 relative">
                        {item.itemImage ? (
                          <Image
                            src={imageSrc}
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
                  );
                })
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
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      -${discountAmount.toFixed(2)}
                    </span>
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
                  <span
                    className={
                      shippingAmount === 0
                        ? "text-green-600 dark:text-green-400 font-medium"
                        : "text-gray-900 dark:text-white"
                    }>
                    {shippingAmount > 0 ? `$${shippingAmount.toFixed(2)}` : t("shippingFree")}
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
              {orderData?.canCancel && (
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="w-full border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/30 hover:border-red-300 dark:hover:border-red-700 hover:text-red-600 dark:hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-gray-300">
                  <X className="w-5 h-5" />
                  {t("cancelOrder")}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Cancel Order Confirmation Modal */}
        {showCancelModal && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => !isCancelling && setShowCancelModal(false)}
            dir={isArabic ? "rtl" : "ltr"}>
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
              <div className="mb-6">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                  {t("cancelOrderModal.title")}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                  {t("cancelOrderModal.description")}
                </p>

                {/* Cancellation Reason Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t("cancelOrderModal.reasonLabel")}
                  </label>
                  <textarea
                    value={cancellationReason}
                    onChange={(e) => setCancellationReason(e.target.value)}
                    placeholder={t("cancelOrderModal.reasonPlaceholder")}
                    disabled={isCancelling}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                  />
                </div>

                {cancelError && (
                  <p className="text-sm text-red-600 dark:text-red-400 text-center mt-3">
                    {cancelError}
                  </p>
                )}
              </div>

              <div className={`flex gap-4 ${isArabic ? "flex-row-reverse" : ""}`}>
                <button
                  type="button"
                  onClick={handleCancelOrder}
                  disabled={isCancelling}
                  className="flex-1 py-3 bg-error hover:bg-error-hover text-white rounded-xl transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {isCancelling ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t("cancelOrderModal.cancelling")}
                    </>
                  ) : (
                    t("cancelOrderModal.confirm")
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCancelModal(false);
                    setCancelError(null);
                    setCancellationReason("");
                  }}
                  disabled={isCancelling}
                  className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                  {t("cancelOrderModal.cancel")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Order;