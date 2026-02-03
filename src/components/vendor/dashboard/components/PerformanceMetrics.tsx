"use client";

import { Truck, Star, RotateCcw, MessageSquare, LucideIcon } from "lucide-react";

interface Metric {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

const metrics: Metric[] = [
  {
    label: "Order Fulfillment Rate",
    value: "98.5%",
    description: "Orders shipped on time",
    icon: Truck,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    label: "Customer Satisfaction",
    value: "4.8/5",
    description: "Based on 1,247 reviews",
    icon: Star,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    label: "Return Rate",
    value: "2.3%",
    description: "Below industry average",
    icon: RotateCcw,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    label: "Response Time",
    value: "< 2hrs",
    description: "Average message response",
    icon: MessageSquare,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

const PerformanceMetrics = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Performance Metrics
      </h3>
      <div className="grid grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="text-center">
              <div
                className={`w-16 h-16 ${metric.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}
              >
                <Icon className={`w-7 h-7 ${metric.color}`} />
              </div>
              <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
              <p className="text-sm font-medium text-gray-700 mt-1">
                {metric.label}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{metric.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerformanceMetrics;
