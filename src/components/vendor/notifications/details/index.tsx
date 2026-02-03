"use client";

import Link from "next/link";
import VendorLayout from "../../components/VendorLayout";
import { ShoppingCart, ArrowRight, Trash2 } from "lucide-react";

const NotificationDetails = () => {
  const notification = {
    id: "1",
    type: "order",
    title: "New Order Received",
    message:
      "You have received a new order #ORD-7829 from Sarah Ahmed. The order contains 3 items with a total value of SAR 459. Please review and process the order promptly to ensure timely delivery.",
    time: "5 minutes ago",
    date: "Jan 20, 2026 at 10:30 AM",
    read: false,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    relatedOrder: {
      id: "ORD-7829",
      customer: "Sarah Ahmed",
      total: "SAR 459",
      items: 3,
    },
  };

  return (
    <VendorLayout
      title="Notification"
      showBackButton
      breadcrumbs={[
        { label: "Notifications", href: "/notifications" },
        { label: notification.title },
      ]}
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex items-start space-x-6">
            <div
              className={`w-16 h-16 ${notification.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}
            >
              <ShoppingCart className={`w-8 h-8 ${notification.iconColor}`} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-800">
                {notification.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{notification.date}</p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-gray-600 leading-relaxed">{notification.message}</p>
          </div>

          {notification.relatedOrder && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Order Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-medium text-primary">
                    #{notification.relatedOrder.id}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium text-gray-800">
                    {notification.relatedOrder.customer}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Items</p>
                  <p className="font-medium text-gray-800">
                    {notification.relatedOrder.items}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-medium text-gray-800">
                    {notification.relatedOrder.total}
                  </p>
                </div>
              </div>
              <Link
                href={`/orders/${notification.relatedOrder.id}`}
                className="mt-4 inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium"
              >
                View Order
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
            <button className="text-gray-500 hover:text-gray-700 flex items-center">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Notification
            </button>
            <div className="flex items-center space-x-4">
              <Link
                href="/notifications"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Back to Notifications
              </Link>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default NotificationDetails;
