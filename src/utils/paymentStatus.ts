// 1=Pending, 2=Processing, 3=Completed, 4=Failed, 5=Cancelled, 6=Refunded, 7=PartiallyRefunded, 8=PartiallyPaid
export const getPaymentStatusInfo = (status: string | number) => {
  const statusKey = typeof status === "number" ? status : parseInt(status) || status;

  const statusConfig: Record<string | number, { label: string; labelAr: string; bgColor: string }> =
    {
      1: {
        label: "Pending",
        labelAr: "قيد الانتظار",
        bgColor: "bg-yellow-100 text-yellow-800",
      },
      2: {
        label: "Processing",
        labelAr: "جاري المعالجة",
        bgColor: "bg-blue-100 text-blue-800",
      },
      3: {
        label: "Completed",
        labelAr: "مكتمل",
        bgColor: "bg-green-100 text-green-800",
      },
      4: {
        label: "Failed",
        labelAr: "فشل",
        bgColor: "bg-red-100 text-red-800",
      },
      5: {
        label: "Cancelled",
        labelAr: "ملغي",
        bgColor: "bg-gray-100 text-gray-800",
      },
      6: {
        label: "Refunded",
        labelAr: "مسترد",
        bgColor: "bg-purple-100 text-purple-800",
      },
      7: {
        label: "Partially Refunded",
        labelAr: "مسترد جزئياً",
        bgColor: "bg-purple-100 text-purple-800",
      },
      8: {
        label: "Partially Paid",
        labelAr: "مدفوع جزئياً",
        bgColor: "bg-orange-100 text-orange-800",
      },
      pending: {
        label: "Pending",
        labelAr: "قيد الانتظار",
        bgColor: "bg-yellow-100 text-yellow-800",
      },
      processing: {
        label: "Processing",
        labelAr: "جاري المعالجة",
        bgColor: "bg-blue-100 text-blue-800",
      },
      completed: {
        label: "Completed",
        labelAr: "مكتمل",
        bgColor: "bg-green-100 text-green-800",
      },
      failed: {
        label: "Failed",
        labelAr: "فشل",
        bgColor: "bg-red-100 text-red-800",
      },
      cancelled: {
        label: "Cancelled",
        labelAr: "ملغي",
        bgColor: "bg-gray-100 text-gray-800",
      },
      refunded: {
        label: "Refunded",
        labelAr: "مسترد",
        bgColor: "bg-purple-100 text-purple-800",
      },
      partiallyrefunded: {
        label: "Partially Refunded",
        labelAr: "مسترد جزئياً",
        bgColor: "bg-purple-100 text-purple-800",
      },
      partiallypaid: {
        label: "Partially Paid",
        labelAr: "مدفوع جزئياً",
        bgColor: "bg-orange-100 text-orange-800",
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
      bgColor: "bg-gray-100 text-gray-800",
    }
  );
};
