import { OrderData } from "@/src/types/order-details.types";
import { OrderStatusData } from "@/src/types/order-status.types";
import { getOrderStatusInfo } from "./orderStatus";

export type TOrderTracking = (key: string) => string;

// Generates the tracking timeline steps from order data.
export function generateOrderTimeline(
  orderData: OrderData | null,
  locale: string,
  tTracking: TOrderTracking
): OrderStatusData["trackingTimeline"] {
  if (!orderData) return [];

  const orderStatus = orderData.orderStatus;
  const orderDate = orderData.orderDate
    ? new Date(orderData.orderDate).toLocaleDateString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  const orderDateTime = orderData.orderDate
    ? new Date(orderData.orderDate).toLocaleString(locale, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const deliveryDate = orderData.deliveryDate
    ? new Date(orderData.deliveryDate).toLocaleDateString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const isArabic = locale === "ar";
  const pendingInfo = getOrderStatusInfo(0);
  const confirmedInfo = getOrderStatusInfo(1);
  const processingInfo = getOrderStatusInfo(2);
  const shippedInfo = getOrderStatusInfo(3);
  const deliveredInfo = getOrderStatusInfo(4);

  const timelineSteps: OrderStatusData["trackingTimeline"] = [
    {
      status: isArabic ? pendingInfo.labelAr : pendingInfo.label,
      date: orderDateTime,
      description: tTracking("orderPlacedDesc"),
      icon: "circle-dashed",
      completed: orderStatus >= 0,
    },
    {
      status: isArabic ? confirmedInfo.labelAr : confirmedInfo.label,
      date: orderStatus >= 1 ? orderDateTime : "",
      description: tTracking("processingDesc"),
      icon: "check",
      completed: orderStatus >= 1,
    },
    {
      status: isArabic ? processingInfo.labelAr : processingInfo.label,
      date: orderStatus >= 2 ? orderDateTime : "",
      description: tTracking("processingDesc"),
      icon: "box",
      completed: orderStatus >= 2,
    },
    {
      status: isArabic ? shippedInfo.labelAr : shippedInfo.label,
      date: orderStatus >= 3 ? orderDateTime : "",
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
}
