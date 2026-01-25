"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { customAxios } from "@/src/utils/customAxios";
import { Package, Loader2, ArrowLeft, ArrowRight, XCircle, Truck, X } from "lucide-react";
import { OrderData } from "@/src/types/order-details.types";

interface OrderProps {
  id: string;
}

const Order = ({ id }: OrderProps) => {
  const locale = useLocale();
  const isArabic = locale === "ar";

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
        setError(isArabic ? "فشل في تحميل تفاصيل الطلب" : "Failed to load order details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderData();
  }, [id, isArabic]);

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

  // 1=Pending, 2=Processing, 3=Completed, 4=Failed, 5=Cancelled, 6=Refunded, 7=PartiallyRefunded, 8=PartiallyPaid
  const getPaymentStatusInfo = (status: string | number) => {
    const statusKey = typeof status === "number" ? status : parseInt(status) || status;

    const statusConfig: Record<
      string | number,
      { label: string; labelAr: string; bgColor: string }
    > = {
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-gray-600">
            {isArabic ? "جاري تحميل تفاصيل الطلب..." : "Loading order details..."}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-lg text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
            {isArabic ? "حاول مرة أخرى" : "Try Again"}
          </button>
        </div>
      </div>
    );
  }

  const paymentStatusInfo = getPaymentStatusInfo(orderData?.paymentStatus || "");

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      {/* Breadcrumb / Back Button */}
      <div className="mb-6">
        <Link
          href={`/${locale}/profile?tab=orders`}
          className="flex items-center text-primary hover:opacity-80 transition-colors font-medium">
          {isArabic ? (
            <ArrowRight className="w-4 h-4 ms-2" />
          ) : (
            <ArrowLeft className="w-4 h-4 me-2" />
          )}
          {isArabic ? "العودة إلى الطلبات" : "Back to Orders"}
        </Link>
      </div>

      {/* Order Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-foreground">
            {isArabic ? "تفاصيل الطلب" : "Order Details"}
          </h1>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${paymentStatusInfo.bgColor}`}>
            {isArabic ? paymentStatusInfo.labelAr : paymentStatusInfo.label}
          </span>
        </div>
        <div className="flex gap-2 items-center text-gray-600">
          <span className="font-semibold text-foreground">{orderData?.orderNumber || "---"}</span>
          <span className="text-sm">•</span>
          <span className="text-sm">
            {isArabic ? "تم الطلب في " : "Placed on "}
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-foreground">
                {isArabic ? "عناصر الطلب" : "Order Items"}
              </h2>
            </div>

            {orderItems.length > 0 ? (
              orderItems.map((item, index) => (
                <div
                  key={item.orderDetailId}
                  className={`p-6 ${
                    index < orderItems.length - 1 ? "border-b border-gray-200" : ""
                  }`}>
                  <div className="flex items-start gap-4">
                    <div className="h-20 w-20 overflow-hidden rounded-lg bg-gray-100 shrink-0 relative">
                      {item.itemImage ? (
                        <Image
                          src={getImageUrl(item.itemImage)}
                          alt={item.itemName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-foreground mb-1">
                        {item.itemName}
                      </h3>
                      {item.vendorName && (
                        <p className="text-sm text-gray-600 mb-2">
                          {isArabic ? "البائع: " : "Seller: "}
                          {item.vendorName}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">
                            {isArabic ? "الكمية:" : "Qty:"} {item.quantity}
                          </span>
                          <span className="text-sm text-gray-600">×</span>
                          <span className="text-sm text-gray-600">
                            ${item.unitPrice.toFixed(2)}
                          </span>
                        </div>
                        <span className="font-semibold text-foreground">
                          ${item.subTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">{isArabic ? "لا توجد عناصر" : "No items found"}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 sticky top-36 h-fit">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {isArabic ? "ملخص الطلب" : "Order Summary"}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>{isArabic ? "المجموع الفرعي" : "Subtotal"}</span>
                <span>${itemsSubtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>{isArabic ? "الخصم" : "Discount"}</span>
                  <span className="text-green-600 font-medium">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              {taxAmount > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>{isArabic ? "الضريبة" : "Tax"}</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>{isArabic ? "الشحن" : "Shipping"}</span>
                <span className={shippingAmount === 0 ? "text-green-600 font-medium" : ""}>
                  {shippingAmount > 0
                    ? `$${shippingAmount.toFixed(2)}`
                    : isArabic
                    ? "مجاني"
                    : "Free"}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-semibold text-foreground">
                  <span>{isArabic ? "المجموع" : "Total"}</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Actions */}
          <div className="space-y-3">
            <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              <Truck className="w-5 h-5" />
              {isArabic ? "تتبع الطلب" : "Track Order"}
            </button>
            <button className="w-full border border-gray-300 text-foreground py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600">
              <X className="w-5 h-5" />
              {isArabic ? "إلغاء الطلب" : "Cancel Order"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Order;
