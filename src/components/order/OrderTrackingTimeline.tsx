"use client";

import { useLocale, useTranslations } from "next-intl";
import { Check, Package, Truck, Home, CircleDashed } from "lucide-react";
import { OrderData } from "@/src/types/order-details.types";
import { OrderStatusData } from "@/src/types/order-status.types";
import { generateOrderTimeline } from "@/src/utils/orderTrackingTimeline";

interface OrderTrackingTimelineProps {
  orderData: OrderData | null;
}

const OrderTrackingTimeline = ({ orderData }: OrderTrackingTimelineProps) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("order");
  const tTracking = useTranslations("order.orderTracking");

  const timeline = generateOrderTimeline(orderData, locale, tTracking);

  const getIcon = (iconName: string, completed: boolean, isCurrent: boolean) => {
    const iconClass = "w-5 h-5 shrink-0";
    const colorClass = completed ? "text-white" : "text-gray-400 dark:text-gray-500";
    return renderIcon(iconName, iconClass, colorClass);
  };

  const renderIcon = (iconName: string, iconClass: string, colorClass: string) => {
    switch (iconName) {
      case "circle-dashed":
        return <CircleDashed className={`${iconClass} ${colorClass}`} />;
      case "check":
        return <Check className={`${iconClass} ${colorClass}`} />;
      case "box":
        return <Package className={`${iconClass} ${colorClass}`} />;
      case "truck":
        return <Truck className={`${iconClass} ${colorClass}`} />;
      case "house":
        return <Home className={`${iconClass} ${colorClass}`} />;
      default:
        return <Package className={`${iconClass} ${colorClass}`} />;
    }
  };

  if (!orderData || timeline.length === 0) return null;

  const currentStepIndex = timeline.findIndex(
    (step, i) => step.completed && (i === timeline.length - 1 || !timeline[i + 1]?.completed)
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        {tTracking("title")}
      </h2>

      {/* Timeline */}
      <div className="flex items-center justify-between gap-0 overflow-x-auto pb-2 md:px-4">
        {timeline.map((step: OrderStatusData["trackingTimeline"][0], index: number) => {
          const isCompleted = step.completed;
          const isCurrentStep = index === currentStepIndex;
          const isLast = index === timeline.length - 1;
          const lineToNext = !isLast;
          const nextCompleted = !isLast && timeline[index + 1].completed;
          const nextIsCurrent = !isLast && timeline[index + 1] && index + 1 === currentStepIndex;

          const circleBg = isCompleted
            ? isCurrentStep
              ? "bg-amber-500 dark:bg-amber-500"
              : "bg-primary"
            : "bg-gray-200 dark:bg-gray-600";
          const lineBg = !lineToNext
            ? ""
            : nextCompleted
            ? "bg-primary"
            : nextIsCurrent
            ? "bg-amber-500 dark:bg-amber-500"
            : "bg-gray-200 dark:bg-gray-600";

          return (
            <div
              key={index}
              className={`flex items-center shrink-0 ${isLast ? "" : "flex-1 min-w-0"}`}>
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${circleBg} transition-colors shrink-0`}>
                  {getIcon(step.icon, isCompleted, isCurrentStep)}
                </div>
                <div className="text-center min-w-0 max-w-[80px] sm:max-w-[100px]">
                  <p
                    className={`font-medium text-xs truncate block ${
                      isCompleted
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-400 dark:text-gray-500"
                    }`}>
                    {step.status}
                  </p>
                </div>
              </div>

              {lineToNext && (
                <div
                  className={`flex-1 mb-3 min-w-[12px] sm:min-w-[24px] h-1 mx-1 sm:mx-2 rounded ${lineBg} transition-colors shrink-0`}
                  aria-hidden
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Callout */}
      {currentStepIndex >= 0 && (
        <div className="mt-4 rounded-lg p-4 border bg-primary/10 dark:bg-primary/20 border-primary/30 dark:border-primary/40 flex items-center gap-3">
          <div className="shrink-0 w-10 h-10 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center">
            {renderIcon(timeline[currentStepIndex].icon, "w-5 h-5 shrink-0", "text-primary")}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-gray-900 dark:text-white">
              {timeline[currentStepIndex].status}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {timeline[currentStepIndex].description} - {timeline[currentStepIndex].date}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTrackingTimeline;
