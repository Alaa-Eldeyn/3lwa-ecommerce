"use client";

import Link from "next/link";
import { Plus, Megaphone, BarChart3, Warehouse, LucideIcon } from "lucide-react";

interface Action {
  label: string;
  href: string;
  icon: LucideIcon;
  color: string;
}

const actions: Action[] = [
  {
    label: "Add New Item",
    href: "/items/add",
    icon: Plus,
    color: "bg-primary text-white",
  },
  {
    label: "Create Campaign",
    href: "/campaigns/promo-codes/create",
    icon: Megaphone,
    color: "bg-secondary text-white",
  },
  {
    label: "View Reports",
    href: "/dashboard",
    icon: BarChart3,
    color: "bg-purple-600 text-white",
  },
  {
    label: "Manage Inventory",
    href: "/inventory",
    icon: Warehouse,
    color: "bg-orange-500 text-white",
  },
];

const QuickActions = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              href={action.href}
              className={`${action.color} rounded-lg p-4 text-center hover:opacity-90 transition-opacity`}
            >
              <Icon className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-medium">{action.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
