"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/src/components/common/Logo";
import {
  TrendingUp,
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
    icon: TrendingUp,
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

interface VendorSidebarGradientProps {
  vendorName?: string;
  vendorStatus?: string;
  vendorAvatar?: string;
}

const VendorSidebarGradient = ({
  vendorName = "Ahmed Store",
  vendorStatus = "Verified Vendor",
  vendorAvatar,
}: VendorSidebarGradientProps) => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    const cleanPath = pathname.replace(/^\/[a-z]{2}/, "");
    return cleanPath.startsWith(href);
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-header to-header flex flex-col">
      {/* Logo Section */}
      <div className="px-4 py-5 bg-header-hover border-white/20">
        <Logo />
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                  active
                    ? "bg-white/20 text-white font-medium backdrop-blur-sm"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                <Icon className="w-4 h-4 mr-3" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-accent text-primary text-xs rounded-full px-2 py-0.5 font-semibold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile Section */}
      <div className="border-t border-white/20 p-4">
        <div className="flex items-center">
          {vendorAvatar ? (
            <Image
              src={vendorAvatar}
              alt={vendorName}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {vendorName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </span>
            </div>
          )}
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-white">{vendorName}</p>
            <p className="text-xs text-white/70">{vendorStatus}</p>
          </div>
          <button className="text-white/70 hover:text-white transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default VendorSidebarGradient;
