"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/src/i18n/routing";
import { customAxios } from "@/src/auth/customAxios";
import { Loader2, ArrowLeft, ArrowRight, XCircle } from "lucide-react";
import { OrderData } from "@/src/types/order-details.types";
import { getOrderStatusInfo } from "@/src/utils/orderStatus";
import { OrderStatusData } from "@/src/types/order-status.types";
import OrderTrackingTimeline from "./OrderTrackingTimeline";

interface OrderTrackingProps {
  id: string;
}

const OrderTracking = ({ id }: OrderTrackingProps) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("order");
  const tTracking = useTranslations("order.orderTracking");
  const router = useRouter();

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

  // Generate timeline from order data
  const generateTimeline = (): OrderStatusData["trackingTimeline"] => {
    if (!orderData) return [];

    const orderStatus = orderData.orderStatus;
    const orderDate = orderData.orderDate
      ? new Date(orderData.orderDate).toLocaleDateString(locale, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

    const deliveryDate = orderData.deliveryDate
      ? new Date(orderData.deliveryDate).toLocaleDateString(locale, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null;

    // Get status info for each status using orderStatus.ts
    const pendingInfo = getOrderStatusInfo(0);
    const confirmedInfo = getOrderStatusInfo(1);
    const processingInfo = getOrderStatusInfo(2);
    const shippedInfo = getOrderStatusInfo(3);
    const deliveredInfo = getOrderStatusInfo(4);

    // Define timeline steps based
    const timelineSteps = [
      {
        status: isArabic ? pendingInfo.labelAr : pendingInfo.label,
        date: orderDate,
        description: tTracking("orderPlacedDesc"),
        icon: "circle-dashed",
        completed: orderStatus >= 0,
      },
      {
        status: isArabic ? confirmedInfo.labelAr : confirmedInfo.label,
        date: orderStatus >= 1 ? orderDate : "",
        description: tTracking("processingDesc"),
        icon: "check",
        completed: orderStatus >= 1,
      },
      {
        status: isArabic ? processingInfo.labelAr : processingInfo.label,
        date: orderStatus >= 2 ? orderDate : "",
        description: tTracking("processingDesc"),
        icon: "box",
        completed: orderStatus >= 2,
      },
      {
        status: isArabic ? shippedInfo.labelAr : shippedInfo.label,
        date: orderStatus >= 3 ? orderDate : "",
        description: tTracking("shippedDesc"),
        icon: "truck",
        completed: orderStatus >= 3,
      },
      {
        status: isArabic ? deliveredInfo.labelAr : deliveredInfo.label,
        date: deliveryDate || (orderStatus >= 4 ? orderDate : ""),
        description: tTracking("deliveredDesc"),
        icon: "house",
        completed: orderStatus >= 4,
      },
    ];

    return timelineSteps;
  };

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

  if (error || !orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4" />
          <p className="text-lg text-red-600 dark:text-red-400 mb-4">{error || t("error")}</p>
          <button
            onClick={() => router.push(`/order/${id}`)}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
            {t("backToOrders")}
          </button>
        </div>
      </div>
    );
  }

  const timeline = generateTimeline();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-2">
        <div className="container mx-auto flex items-center justify-between min-h-10">
          <Link
            href={`/order/${id}`}
            className="flex items-center text-primary hover:opacity-80 transition-colors font-medium">
            {isArabic ? (
              <ArrowRight className="w-4 h-4 ms-2" />
            ) : (
              <ArrowLeft className="w-4 h-4 me-2" />
            )}
            {t("backToOrders")}
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {tTracking("orderNumber")}
              </p>
              <p className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">
                {orderData.orderNumber || "---"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tracking Timeline */}
      <OrderTrackingTimeline timeline={timeline} />
    </div>
  );
};

export default OrderTracking;
