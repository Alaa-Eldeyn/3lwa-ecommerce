/**
 * OrderProgressStatus enum (order-level)
 * Pending=0, Confirmed=1, Processing=2, Shipped=3, Delivered=4,
 * Completed=5, Cancelled=6, PaymentFailed=7, RefundRequested=8, Refunded=9, Returned=10
 */
export const getOrderStatusInfo = (status: string | number) => {
  const statusKey = typeof status === "number" ? status : parseInt(status) || status;

  const statusConfig: Record<string | number, { label: string; labelAr: string; bgColor: string }> =
    {
      0: {
        label: "Pending",
        labelAr: "قيد الانتظار",
        bgColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      },
      1: {
        label: "Confirmed",
        labelAr: "مؤكد",
        bgColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      },
      2: {
        label: "Processing",
        labelAr: "جاري المعالجة",
        bgColor: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
      },
      3: {
        label: "Shipped",
        labelAr: "تم الشحن",
        bgColor: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      },
      4: {
        label: "Delivered",
        labelAr: "تم التسليم",
        bgColor: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      },
      5: {
        label: "Completed",
        labelAr: "مكتمل",
        bgColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
      },
      6: {
        label: "Cancelled",
        labelAr: "ملغي",
        bgColor: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      },
      7: {
        label: "Payment Failed",
        labelAr: "فشل الدفع",
        bgColor: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      },
      8: {
        label: "Refund Requested",
        labelAr: "طلب استرداد",
        bgColor: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      },
      9: {
        label: "Refunded",
        labelAr: "مسترد",
        bgColor: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
      },
      10: {
        label: "Returned",
        labelAr: "مرتجع",
        bgColor: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
      },
    };

  const normalizedKey =
    typeof statusKey === "number"
      ? statusKey
      : typeof statusKey === "string"
      ? statusKey.toLowerCase()
      : "";

  return (
    statusConfig[normalizedKey] || {
      label: String(status),
      labelAr: String(status),
      bgColor: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    }
  );
};

/**
 * ShipmentStatus enum (order-item / shipment-level)
 * PendingProcessing=1, PreparingForShipment=2, PickedUpByCarrier=3,
 * InTransitToCustomer=4, DeliveredToCustomer=5, ReturnedToSender=6,
 * CancelledByCustomer=7, CancelledByMarketplace=8, DeliveryAttemptFailed=9
 */
export const getShipmentStatusInfo = (status: string | number) => {
  const statusKey = typeof status === "number" ? status : parseInt(status) || status;

  const statusConfig: Record<string | number, { label: string; labelAr: string; bgColor: string }> =
    {
      1: {
        label: "Pending processing",
        labelAr: "في انتظار المعالجة",
        bgColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      },
      2: {
        label: "Preparing for shipment",
        labelAr: "جاري تجهيز الشحن",
        bgColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      },
      3: {
        label: "Picked up by carrier",
        labelAr: "تم التسليم لشركة الشحن",
        bgColor: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
      },
      4: {
        label: "In transit",
        labelAr: "في الطريق",
        bgColor: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      },
      5: {
        label: "Delivered",
        labelAr: "تم التسليم",
        bgColor: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      },
      6: {
        label: "Returned to sender",
        labelAr: "تم إرجاع الشحنة",
        bgColor: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
      },
      7: {
        label: "Cancelled by customer",
        labelAr: "ملغي من قبل العميل",
        bgColor: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      },
      8: {
        label: "Cancelled by marketplace",
        labelAr: "ملغي من قبل المتجر",
        bgColor: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      },
      9: {
        label: "Delivery attempt failed",
        labelAr: "فشل محاولة التسليم",
        bgColor: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      },
    };

  return (
    statusConfig[statusKey] || {
      label: String(status),
      labelAr: String(status),
      bgColor: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    }
  );
};

/** Map ShipmentStatus (1–5) to timeline step index (0–4). Returns -1 for cancelled/returned/failed (6–9). */
export const shipmentStatusToTimelineStep = (shipmentStatus: number): number => {
  if (shipmentStatus >= 1 && shipmentStatus <= 5) return shipmentStatus - 1;
  return -1;
};

/**
 * RefundStatus enum (item-level refund request)
 * Open=1, UnderReview=2, NeedMoreInfo=3, InfoApproved=4, ItemShippedBack=5,
 * ItemReceived=6, Inspecting=7, Approved=8, Rejected=9, Refunded=10, Closed=11
 */
export const getRefundStatusInfo = (status: string | number) => {
  const statusKey = typeof status === "number" ? status : parseInt(status) || status;

  const statusConfig: Record<string | number, { label: string; labelAr: string; bgColor: string }> =
    {
      1: {
        label: "Refund open",
        labelAr: "طلب استرداد مفتوح",
        bgColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      },
      2: {
        label: "Under review",
        labelAr: "قيد المراجعة",
        bgColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      },
      3: {
        label: "More info needed",
        labelAr: "معلومات إضافية مطلوبة",
        bgColor: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      },
      4: {
        label: "Info approved",
        labelAr: "تم اعتماد المعلومات",
        bgColor: "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300",
      },
      5: {
        label: "Item shipped back",
        labelAr: "تم إرجاع المنتج",
        bgColor: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
      },
      6: {
        label: "Item received",
        labelAr: "تم استلام المنتج",
        bgColor: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
      },
      7: {
        label: "Inspecting",
        labelAr: "قيد الفحص",
        bgColor: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
      },
      8: {
        label: "Approved",
        labelAr: "موافق عليه",
        bgColor: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      },
      9: {
        label: "Rejected",
        labelAr: "مرفوض",
        bgColor: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      },
      10: {
        label: "Refunded",
        labelAr: "تم الاسترداد",
        bgColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
      },
      11: {
        label: "Refunded",
        labelAr: "تم الاسترداد",
        bgColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
      },
      // 11: {
      //   label: "Closed",
      //   labelAr: "مغلق",
      //   bgColor: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      // },
    };

  return (
    statusConfig[statusKey] || {
      label: String(status),
      labelAr: String(status),
      bgColor: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    }
  );
};
