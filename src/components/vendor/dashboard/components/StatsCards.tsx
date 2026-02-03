"use client";

import { DollarSign, ShoppingBag, Package, Clock, LucideIcon } from "lucide-react";

interface Stat {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "warning" | "negative";
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

const stats: Stat[] = [
  {
    title: "Total Revenue",
    value: "SAR 125,430",
    change: "+12.5%",
    changeType: "positive",
    icon: DollarSign,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Total Orders",
    value: "1,247",
    change: "+8.2%",
    changeType: "positive",
    icon: ShoppingBag,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Total Items",
    value: "127",
    change: "+3 new",
    changeType: "positive",
    icon: Package,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Pending Orders",
    value: "23",
    change: "5 urgent",
    changeType: "warning",
    icon: Clock,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {stat.value}
                </p>
                <p
                  className={`text-sm mt-2 ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : stat.changeType === "warning"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change}
                </p>
              </div>
              <div
                className={`w-12 h-12 ${stat.iconBg} rounded-lg flex items-center justify-center`}
              >
                <Icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
