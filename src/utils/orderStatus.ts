// OrderProgressStatus enum mapping
// Pending = 0, Confirmed = 1, Processing = 2, Shipped = 3, Delivered = 4, 
// Completed = 5, Cancelled = 6, PaymentFailed = 7, RefundRequested = 8, 
// Refunded = 9, Returned = 10

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
      // String fallbacks for backward compatibility
      pending: {
        label: "Pending",
        labelAr: "قيد الانتظار",
        bgColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      },
      confirmed: {
        label: "Confirmed",
        labelAr: "مؤكد",
        bgColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      },
      processing: {
        label: "Processing",
        labelAr: "جاري المعالجة",
        bgColor: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
      },
      shipped: {
        label: "Shipped",
        labelAr: "تم الشحن",
        bgColor: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      },
      delivered: {
        label: "Delivered",
        labelAr: "تم التسليم",
        bgColor: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      },
      completed: {
        label: "Completed",
        labelAr: "مكتمل",
        bgColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
      },
      cancelled: {
        label: "Cancelled",
        labelAr: "ملغي",
        bgColor: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      },
      paymentfailed: {
        label: "Payment Failed",
        labelAr: "فشل الدفع",
        bgColor: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      },
      refundrequested: {
        label: "Refund Requested",
        labelAr: "طلب استرداد",
        bgColor: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      },
      refunded: {
        label: "Refunded",
        labelAr: "مسترد",
        bgColor: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
      },
      returned: {
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
