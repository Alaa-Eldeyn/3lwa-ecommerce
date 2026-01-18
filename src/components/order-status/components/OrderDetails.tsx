"use client";

import { useLocale } from "next-intl";
import { Printer, Tag, Info } from "lucide-react";
import { OrderStatusData } from "../types";

interface OrderDetailsProps {
  orderData: OrderStatusData;
}

const OrderDetails = ({ orderData }: OrderDetailsProps) => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  const handlePrintInvoice = () => {
    window.print();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-primary text-white";
      case "shipped":
        return "bg-blue-500 text-white";
      case "delivered":
        return "bg-green-500 text-white";
      case "cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-yellow-500 text-white";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-8">
      <div className="flex items-center justify-between mb-6 pb-6 border-b-2 border-gray-100 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-foreground dark:text-white">
          {isArabic ? "تفاصيل الطلب" : "Order Details"}
        </h2>
        <button
          onClick={handlePrintInvoice}
          className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-headerPrimary transition-colors duration-200 shadow-md flex items-center gap-2">
          <Printer size={20} />
          {isArabic ? "طباعة الفاتورة" : "Print Invoice"}
        </button>
      </div>

      <div className="space-y-6">
        {/* Order Information */}
        <div className="flex items-start justify-between p-6 bg-accent bg-opacity-30 dark:bg-accent/10 rounded-xl">
          <div className="flex-1">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
              <h3 className="text-xl font-bold text-foreground dark:text-white">
                {isArabic ? "معلومات الطلب" : "Order Information"}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4 ml-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {isArabic ? "رقم الطلب" : "Order Number"}
                </p>
                <p className="text-lg font-semibold text-foreground dark:text-white">
                  {orderData.orderNumber}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {isArabic ? "تاريخ الطلب" : "Order Date"}
                </p>
                <p className="text-lg font-semibold text-foreground dark:text-white">
                  {orderData.orderDate}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {isArabic ? "حالة الطلب" : "Order Status"}
                </p>
                <span
                  className={`inline-block ${getStatusColor(
                    orderData.orderStatus
                  )} px-4 py-1 rounded-full text-sm font-semibold`}>
                  {orderData.orderStatus.charAt(0).toUpperCase() +
                    orderData.orderStatus.slice(1)}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {isArabic ? "التوصيل المتوقع" : "Estimated Delivery"}
                </p>
                <p className="text-lg font-semibold text-foreground dark:text-white">
                  {orderData.estimatedDelivery}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="p-6 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-xl">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-secondary rounded-full mr-3"></div>
            <h3 className="text-xl font-bold text-foreground dark:text-white">
              {isArabic ? "معلومات الدفع" : "Payment Information"}
            </h3>
          </div>
          <div className="ml-6 space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center">
                <Tag className="text-2xl text-primary mr-4" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isArabic ? "طريقة الدفع" : "Payment Method"}
                  </p>
                  <p className="text-lg font-semibold text-foreground dark:text-white">
                    {orderData.paymentMethod}
                  </p>
                </div>
              </div>
              <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-4 py-2 rounded-full text-sm font-semibold">
                {orderData.paymentStatus === "pending"
                  ? isArabic
                    ? "قيد الانتظار"
                    : "Pending"
                  : orderData.paymentStatus === "paid"
                  ? isArabic
                    ? "مدفوع"
                    : "Paid"
                  : isArabic
                  ? "فشل"
                  : "Failed"}
              </span>
            </div>
            {orderData.paymentStatusMessage && (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 rounded-lg">
                <div className="flex items-start">
                  <Info className="text-yellow-600 dark:text-yellow-400 text-xl mr-3 mt-1" />
                  <div>
                    <p className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                      {isArabic ? "حالة الدفع" : "Payment Status"}
                    </p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      {orderData.paymentStatusMessage}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
