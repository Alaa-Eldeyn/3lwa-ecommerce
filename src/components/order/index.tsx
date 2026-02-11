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
  Check,
  Truck,
  Home,
  MapPin,
  CircleDashed,
} from "lucide-react";
import { OrderData } from "@/src/types/order-details.types";
import {
  getOrderStatusInfo,
  getShipmentStatusInfo,
  getRefundStatusInfo,
  shipmentStatusToTimelineStep,
} from "@/src/utils/orderStatus";
import toast from "react-hot-toast";

interface OrderProps {
  id: string;
}

const Order = ({ id }: OrderProps) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("order");
  const tTracking = useTranslations("order.orderTracking");
  const router = useRouter();

  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cancel order modal
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [cancellationReason, setCancellationReason] = useState("");

  // Cancel single item modal
  const [cancelItemTarget, setCancelItemTarget] = useState<{
    orderDetailId: string;
    itemName: string;
    quantity: number;
    itemImage: string;
    unitPrice: number;
    subTotal: number;
  } | null>(null);
  const [cancelItemQuantity, setCancelItemQuantity] = useState(1);
  const [cancelItemReason, setCancelItemReason] = useState("");
  const [cancelItemError, setCancelItemError] = useState<string | null>(null);
  const [isCancellingItem, setIsCancellingItem] = useState(false);

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

  // Open cancel item modal
  const openCancelItemModal = (item: {
    orderDetailId: string;
    itemName: string;
    quantity: number;
    itemImage: string;
    unitPrice: number;
    subTotal: number;
  }) => {
    setCancelItemTarget(item);
    setCancelItemQuantity(item.quantity);
    setCancelItemReason("");
    setCancelItemError(null);
  };

  const closeCancelItemModal = () => {
    if (!isCancellingItem) {
      setCancelItemTarget(null);
      setCancelItemQuantity(1);
      setCancelItemReason("");
      setCancelItemError(null);
    }
  };

  // Cancel single order item (line)
  const handleCancelItem = async () => {
    if (!cancelItemTarget || cancelItemQuantity < 1) return;

    const trimmedReason = cancelItemReason.trim();
    if (!trimmedReason) {
      setCancelItemError(t("cancelItemModal.reasonRequired"));
      return;
    }

    try {
      setIsCancellingItem(true);
      setCancelItemError(null);

      await customAxios.post("/customer/orders/cancel", {
        orderDetailId: cancelItemTarget.orderDetailId,
        quantityToCancel: cancelItemQuantity,
        reason: trimmedReason,
      });

      closeCancelItemModal();
      toast.success(t("cancelItemModal.success"), { duration: 3000 });
      window.location.reload();
    } catch (err: any) {
      setCancelItemError(err?.response?.data?.message || t("cancelItemModal.error"));
    } finally {
      setIsCancellingItem(false);
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
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors">
            {t("tryAgain")}
          </button>
        </div>
      </div>
    );
  }

  // Order status info
  const orderStatusInfo = getOrderStatusInfo(orderData?.orderStatus ?? "");
  const orderDateFormatted = orderData?.orderDate
    ? new Date(orderData.orderDate).toLocaleDateString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "---";
  const deliveryAddress = orderData?.deliveryAddress;
  const deliveryAddressLines = deliveryAddress
    ? [
        deliveryAddress.recipientName,
        deliveryAddress.address,
        [deliveryAddress.cityNameAr, deliveryAddress.cityNameEn]
          .filter(Boolean)
          .join(isArabic ? "، " : ", "),
        [deliveryAddress.stateNameAr, deliveryAddress.stateNameEn]
          .filter(Boolean)
          .join(isArabic ? "، " : ", "),
        deliveryAddress.phoneCode && deliveryAddress.phoneNumber
          ? `${deliveryAddress.phoneCode} ${deliveryAddress.phoneNumber}`
          : null,
      ].filter(Boolean)
    : [];

  // Per-item timeline steps
  const itemTimelineSteps = [
    { key: "orderPlaced" as const, icon: CircleDashed },
    { key: "pickedUp" as const, icon: Check },
    { key: "inTransit" as const, icon: Truck },
    { key: "outForDelivery" as const, icon: Package },
    { key: "delivered" as const, icon: Home },
  ];

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
        {/* Order header: order number, status chip, date, total */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 px-4 py-4 md:px-6 md:py-5 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                {tTracking("orderNumber")} {orderData?.orderNumber ?? "---"}
              </h1>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${orderStatusInfo.bgColor}`}>
                {isArabic ? orderStatusInfo.labelAr : orderStatusInfo.label}
              </span>
            </div>
            <span>
              {t("placedOn")}
              {orderDateFormatted}
            </span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Item cards */}
          <div className="lg:col-span-2 space-y-3">
            {orderItems.length > 0 ? (
              orderItems.map((item, index) => {
                const imageSrc = item.itemImage?.startsWith("http")
                  ? item.itemImage
                  : `${process.env.NEXT_PUBLIC_DOMAIN}/${item.itemImage}`;
                const itemStatusInfo = getShipmentStatusInfo(item.shipmentStatus);
                const isItemCancelled = item.shipmentStatus === 7 || item.shipmentStatus === 8;
                const isItemCompleted = item.shipmentStatus === 5;
                const canCancelItem = orderData?.canCancel && !isItemCancelled;
                const itemTimelineStep = shipmentStatusToTimelineStep(item.shipmentStatus);
                const itemRefundStatus = item.refundStatus;
                const itemRefundStatusInfo =
                  itemRefundStatus != null && itemRefundStatus >= 1
                    ? getRefundStatusInfo(itemRefundStatus)
                    : null;
                const itemStatus = itemTimelineStep >= 0 ? itemTimelineStep : 0;
                const itemProgress =
                  itemTimelineStep >= 0 ? Math.min(100, ((itemTimelineStep + 1) / 5) * 100) : 0;
                return (
                  <div
                    key={item.orderDetailId}
                    id={index === 0 ? "order-items-section" : undefined}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden scroll-mt-4">
                    <div className="p-3 md:p-4">
                      {/* Item details row */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-start gap-3">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 shrink-0 relative">
                            {item.itemImage ? (
                              <Image
                                src={imageSrc}
                                alt={item.itemName}
                                fill
                                sizes="56px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-base text-gray-900 dark:text-white line-clamp-2">
                              {item.itemName}
                            </h3>
                            {item.vendorName && (
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                                {t("seller")}
                                {item.vendorName}
                              </p>
                            )}
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {t("qty")} {item.quantity} × ${item.unitPrice.toFixed(2)}
                              </p>
                              <p className="font-semibold text-gray-900 dark:text-white">
                                ${item.subTotal.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-end shrink-0">
                          {itemRefundStatusInfo ? (
                            <span
                              className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${itemRefundStatusInfo.bgColor}`}>
                              {isArabic ? itemRefundStatusInfo.labelAr : itemRefundStatusInfo.label}
                            </span>
                          ) : (
                            <span
                              className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${itemStatusInfo.bgColor}`}>
                              {isArabic ? itemStatusInfo.labelAr : itemStatusInfo.label}
                            </span>
                          )}
                          <div className="mt-1.5 flex flex-col items-end gap-1">
                            {canCancelItem && (
                              <button
                                type="button"
                                onClick={() =>
                                  openCancelItemModal({
                                    orderDetailId: item.orderDetailId,
                                    itemName: item.itemName,
                                    quantity: item.quantity,
                                    itemImage: item.itemImage,
                                    unitPrice: item.unitPrice,
                                    subTotal: item.subTotal,
                                  })
                                }
                                className="text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 flex items-center gap-1">
                                <X className="w-3.5 h-3.5" />
                                {t("cancelItem")}
                              </button>
                            )}
                            {orderData?.isWithinRefundPeriod &&
                              isItemCompleted &&
                              !isItemCancelled &&
                              !itemRefundStatusInfo && (
                                <Link
                                  href={`/order/${id}/refund?orderDetailId=${encodeURIComponent(
                                    item.orderDetailId
                                  )}`}
                                  className="text-xs font-medium text-primary hover:text-primary/80 dark:text-primary dark:hover:opacity-90 flex items-center gap-1">
                                  {t("requestRefund")}
                                </Link>
                              )}
                          </div>
                        </div>
                      </div>

                      {/* Per-item timeline */}
                      {!itemRefundStatus && (
                        <div className="relative pt-1">
                          <div className="absolute top-5 start-4 end-4 h-0.5 bg-gray-200 dark:bg-gray-600 rounded" />
                          <div
                            className="absolute top-5 start-4 h-0.5 bg-primary dark:bg-primary rounded transition-all duration-300"
                            style={{ width: `${itemProgress}%` }}
                          />
                          <div className="relative flex justify-between">
                            {itemTimelineSteps.map((step, index) => {
                              const completed = itemStatus >= index;
                              const circleBg = completed
                                ? "bg-primary text-white dark:bg-primary dark:text-white"
                                : "bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500";
                              const stepLabel = getShipmentStatusInfo(index + 1);
                              return (
                                <div
                                  key={step.key}
                                  className="flex flex-col items-center min-w-0 flex-1">
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 shrink-0 ${circleBg}`}>
                                    <step.icon className="w-4 h-4" />
                                  </div>
                                  <p
                                    className={`text-[10px] font-medium text-center leading-tight ${
                                      completed
                                        ? "text-gray-900 dark:text-white"
                                        : "text-gray-500 dark:text-gray-400"
                                    }`}>
                                    {isArabic ? stepLabel.labelAr : stepLabel.label}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
                <Package className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">{t("noItems")}</p>
              </div>
            )}
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

            {/* Delivery address card */}
            {deliveryAddressLines.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  {t("deliveryAddress")}
                </h3>
                <address className="text-sm text-gray-600 dark:text-gray-400 not-italic space-y-1">
                  {deliveryAddressLines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </address>
              </div>
            )}
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

        {/* Cancel Item Modal */}
        {cancelItemTarget && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
            onClick={closeCancelItemModal}
            dir={isArabic ? "rtl" : "ltr"}>
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Header with warning */}
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                    <AlertTriangle className="text-red-600 dark:text-red-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {t("cancelItemModal.title")}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t("cancelItemModal.description")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Item card */}
              <div className="px-6 pb-4">
                <div className="flex gap-3 p-2 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600">
                  <div className="h-20 w-20 rounded-xl overflow-hidden bg-white dark:bg-gray-700 shrink-0 relative border border-gray-200 dark:border-gray-600">
                    {cancelItemTarget.itemImage ? (
                      <Image
                        src={
                          cancelItemTarget.itemImage.startsWith("http")
                            ? cancelItemTarget.itemImage
                            : `${process.env.NEXT_PUBLIC_DOMAIN}/${cancelItemTarget.itemImage}`
                        }
                        alt={cancelItemTarget.itemName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2">
                      {cancelItemTarget.itemName}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                      {t("qty")} {cancelItemTarget.quantity} × $
                      {cancelItemTarget.unitPrice.toFixed(2)}
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                      ${cancelItemTarget.subTotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="px-6 pb-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    {t("cancelItemModal.quantityLabel")}
                  </label>
                  <select
                    value={cancelItemQuantity}
                    onChange={(e) => setCancelItemQuantity(Number(e.target.value))}
                    disabled={isCancellingItem}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 transition-colors">
                    {Array.from({ length: cancelItemTarget.quantity }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    {t("cancelItemModal.reasonLabel")} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={cancelItemReason}
                    onChange={(e) => {
                      setCancelItemReason(e.target.value);
                      if (cancelItemError) setCancelItemError(null);
                    }}
                    placeholder={t("cancelItemModal.reasonPlaceholder")}
                    disabled={isCancellingItem}
                    rows={3}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none disabled:opacity-50 transition-colors"
                  />
                </div>

                {cancelItemError && (
                  <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
                    {cancelItemError}
                  </p>
                )}

                <div className={`flex gap-3 pt-2 ${isArabic ? "flex-row-reverse" : ""}`}>
                  <button
                    type="button"
                    onClick={handleCancelItem}
                    disabled={isCancellingItem || !cancelItemReason.trim()}
                    className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-xl transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm">
                    {isCancellingItem ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t("cancelItemModal.cancelling")}
                      </>
                    ) : (
                      t("cancelItemModal.confirm")
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={closeCancelItemModal}
                    disabled={isCancellingItem}
                    className="flex-1 py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-600">
                    {t("cancelItemModal.cancel")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Order;
