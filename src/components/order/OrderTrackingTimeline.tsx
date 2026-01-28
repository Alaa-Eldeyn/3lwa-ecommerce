"use client";

import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, Package, Truck, Plane, Building, House, CircleDashed } from "lucide-react";
import { OrderStatusData } from "@/src/types/order-status.types";

interface OrderTrackingTimelineProps {
  timeline: OrderStatusData["trackingTimeline"];
}

const OrderTrackingTimeline = ({ timeline }: OrderTrackingTimelineProps) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("order.orderTracking");

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "circle-dashed":
        return <CircleDashed className="text-white text-xl" />;
      case "check":
        return <CheckCircle2 className="text-white text-xl" />;
      case "box":
        return <Package className="text-white text-xl" />;
      case "truck":
        return <Truck className="text-white text-xl" />;
      case "plane":
        return <Plane className="text-white text-xl" />;
      case "building":
        return <Building className="text-white text-xl" />;
      case "house":
        return <House className="text-white text-xl" />;
      default:
        return <Package className="text-white text-xl" />;
    }
  };

  return (
    <section className="py-4 md:py-8 bg-gray-50 dark:bg-gray-900 max-w-7xl mx-auto px-4 md:px-6">
      {/* Container */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-10">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">{t("title")}</h2>

        <div className="relative space-y-4 md:space-y-6" dir={isArabic ? "rtl" : "ltr"}>
          {timeline.map((step: OrderStatusData["trackingTimeline"][0], index: number) => {
            const isCompleted = step.completed;

            // Find the current step
            const currentStepIndex = timeline.findIndex(
              (s: OrderStatusData["trackingTimeline"][0], i: number) =>
                s.completed && (i === timeline.length - 1 || !timeline[i + 1].completed)
            );
            const isCurrentStep = index === currentStepIndex;
            const isLineToCurrentStep = index <= currentStepIndex;

            return (
              <div key={index} className="relative flex items-center gap-4 md:gap-6">
                {/* Connecting Line*/}
                {index > 0 && (
                  <div
                    className={`absolute ${
                      isArabic ? "right-8" : "left-8"
                    } w-0.5 h-24 -top-12 transition-all duration-300 ${
                      isLineToCurrentStep ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                )}

                {/* Icon */}
                <div
                  className={`relative z-10 shrink-0 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                    isCompleted
                      ? "bg-primary ring-4 ring-primary/20 dark:ring-primary/30"
                      : "bg-gray-300 dark:bg-gray-600 ring-4 ring-gray-200 dark:ring-gray-700"
                  }`}>
                  {getIcon(step.icon)}
                  {isCurrentStep && (
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                  )}
                </div>

                {/* Content Card */}
                <div
                  className={`flex-1 rounded-xl p-6 transition-all duration-300 ${
                    isCompleted
                      ? "bg-primary/5 dark:bg-primary/10 border-2 border-primary/20 dark:border-primary/30 shadow-sm"
                      : "bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700"
                  }`}>
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 md:mb-1">
                    {/* Status */}
                    <h3
                      className={`text-lg md:text-xl font-bold transition-colors ${
                        isCompleted
                          ? "text-primary dark:text-primary"
                          : "text-gray-400 dark:text-gray-500"
                      }`}>
                      {step.status}
                    </h3>

                    {/* Date */}
                    {/* {step.date && (
                      <span
                        className={`text-sm font-medium whitespace-nowrap ${
                          isCompleted
                            ? "text-primary/70 dark:text-primary/80"
                            : "text-gray-400 dark:text-gray-500"
                        }`}>
                        {step.date}
                      </span>
                    )} */}
                  </div>

                  {/* Description */}
                  <p
                    className={`text-sm md:text-base leading-relaxed ${
                      isCompleted
                        ? "text-gray-700 dark:text-gray-300"
                        : "text-gray-500 dark:text-gray-400"
                    }`}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OrderTrackingTimeline;
