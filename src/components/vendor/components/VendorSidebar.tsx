"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/src/components/common/Logo";
import {
  LayoutDashboard,
  Package,
  Warehouse,
  ShoppingCart,
  RotateCcw,
  Megaphone,
  Star,
  Bell,
  Settings,
  MoreVertical,
  LucideIcon,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Items & Offers",
    href: "/items",
    icon: Package,
  },
  {
    label: "Inventory",
    href: "/inventory",
    icon: Warehouse,
  },
  {
    label: "Orders",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    label: "Refund Requests",
    href: "/refunds",
    icon: RotateCcw,
  },
  {
    label: "Campaigns",
    href: "/campaigns",
    icon: Megaphone,
  },
  {
    label: "Reviews",
    href: "/reviews/items",
    icon: Star,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
    badge: 3,
  },
  {
    label: "Settings",
    href: "/profile",
    icon: Settings,
  },
];

const VendorSidebar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    const cleanPath = pathname.replace(/^\/[a-z]{2}/, "");
    return cleanPath.startsWith(href);
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-4 py-5 border-b border-gray-200">
        <Logo type="dark" />
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4 mr-3" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-white text-sm font-bold">AS</span>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-800">Ahmed Store</p>
            <p className="text-xs text-gray-500">Verified Vendor</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default VendorSidebar;
