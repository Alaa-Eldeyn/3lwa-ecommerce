"use client";

import { useLocale } from "next-intl";
import {
  CheckCircle2,
  Package,
  Truck,
  Plane,
  Building,
  House,
} from "lucide-react";
import { OrderStatusData } from "../types";

interface OrderTrackingTimelineProps {
  timeline: OrderStatusData["trackingTimeline"];
}

const OrderTrackingTimeline = ({ timeline }: OrderTrackingTimelineProps) => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "check":
        return <CheckCircle2 className="text-white text-2xl" />;
      case "box":
        return <Package className="text-white text-2xl" />;
      case "truck":
        return <Truck className="text-white text-2xl" />;
      case "plane":
        return <Plane className="text-white text-2xl" />;
      case "building":
        return <Building className="text-white text-2xl" />;
      case "house":
        return <House className="text-white text-2xl" />;
      default:
        return <Package className="text-white text-2xl" />;
    }
  };

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-foreground dark:text-white mb-8">
            {isArabic ? "خط زمني لتتبع الطلب" : "Order Tracking Timeline"}
          </h2>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-700"></div>

            <div className="space-y-8">
              {timeline.map((step, index) => {
                const isCompleted = step.completed;
                const isLastCompleted = timeline
                  .slice(0, index + 1)
                  .every((s) => s.completed);

                return (
                  <div key={index} className="relative flex items-start">
                    {isLastCompleted && index < timeline.length - 1 && (
                      <div className="absolute left-8 w-1 h-full bg-primary top-8"></div>
                    )}
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mr-6 relative z-10 shadow-lg ${
                        isCompleted
                          ? "bg-primary"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}>
                      {getIcon(step.icon)}
                    </div>
                    <div
                      className={`flex-1 rounded-xl p-6 ${
                        isCompleted
                          ? "bg-accent bg-opacity-30 dark:bg-accent/10"
                          : "bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700"
                      }`}>
                      <div className="flex justify-between items-start mb-2">
                        <h3
                          className={`text-xl font-bold ${
                            isCompleted
                              ? "text-foreground dark:text-white"
                              : "text-gray-400 dark:text-gray-500"
                          }`}>
                          {step.status}
                        </h3>
                        <span
                          className={`text-sm ${
                            isCompleted
                              ? "text-gray-500 dark:text-gray-400"
                              : "text-gray-400 dark:text-gray-500"
                          }`}>
                          {step.date}
                        </span>
                      </div>
                      <p
                        className={
                          isCompleted
                            ? "text-gray-600 dark:text-gray-400"
                            : "text-gray-400 dark:text-gray-500"
                        }>
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderTrackingTimeline;
