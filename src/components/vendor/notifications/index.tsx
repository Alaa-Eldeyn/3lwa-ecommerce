"use client";

import { useState } from "react";
import Link from "next/link";
import VendorLayout from "../components/VendorLayout";
import {
  ShoppingCart,
  Star,
  AlertTriangle,
  RotateCcw,
  CreditCard,
  Bell,
  CheckCheck,
  Settings,
  LucideIcon,
} from "lucide-react";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "New Order Received",
    message: "You have received a new order #ORD-7829 from Sarah Ahmed.",
    time: "5 minutes ago",
    read: false,
    icon: ShoppingCart,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: "2",
    type: "review",
    title: "New Review",
    message:
      "Mohammed Ali left a 5-star review on Wireless Earbuds Pro Max.",
    time: "1 hour ago",
    read: false,
    icon: Star,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    id: "3",
    type: "stock",
    title: "Low Stock Alert",
    message:
      "Mechanical Keyboard RGB is running low on stock. Only 5 units remaining.",
    time: "2 hours ago",
    read: false,
    icon: AlertTriangle,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    id: "4",
    type: "refund",
    title: "Refund Request",
    message:
      "A refund request has been submitted for order #ORD-7820.",
    time: "3 hours ago",
    read: true,
    icon: RotateCcw,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: "5",
    type: "payment",
    title: "Payment Received",
    message:
      "Payment of SAR 1,250 has been deposited to your account.",
    time: "5 hours ago",
    read: true,
    icon: CreditCard,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: "6",
    type: "system",
    title: "System Update",
    message:
      "New features have been added to your vendor dashboard. Check them out!",
    time: "1 day ago",
    read: true,
    icon: Bell,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
  },
];

const NotificationsList = () => {
  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <VendorLayout title="Notifications">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === "all"
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 rounded-lg font-medium flex items-center ${
              filter === "unread"
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Unread
            {unreadCount > 0 && (
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  filter === "unread"
                    ? "bg-white text-primary"
                    : "bg-red-500 text-white"
                }`}
              >
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setFilter("orders")}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === "orders"
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setFilter("reviews")}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === "reviews"
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Reviews
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-primary hover:bg-primary/5 rounded-lg font-medium flex items-center">
            <CheckCheck className="w-4 h-4 mr-2" />
            Mark All as Read
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {notifications.map((notification, index) => {
          const Icon = notification.icon;
          return (
            <Link
              key={notification.id}
              href={`/notifications/${notification.id}`}
              className={`flex items-start p-6 hover:bg-gray-50 transition-colors ${
                index !== notifications.length - 1
                  ? "border-b border-gray-200"
                  : ""
              } ${!notification.read ? "bg-primary/5" : ""}`}
            >
              <div
                className={`w-12 h-12 ${notification.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}
              >
                <Icon className={`w-5 h-5 ${notification.iconColor}`} />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p
                      className={`font-medium ${
                        !notification.read ? "text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {notification.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500">
                      {notification.time}
                    </span>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-6">
        <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
          Load More
        </button>
      </div>
    </VendorLayout>
  );
};

export default NotificationsList;
