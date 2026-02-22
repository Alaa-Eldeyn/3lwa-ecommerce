"use client";

import Image from "next/image";
import { Link } from "@/src/i18n/routing";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const navItems = [
  { href: "/dashboard", icon: "fa-chart-line", label: "Dashboard" },
  { href: "/dashboard/orders", icon: "fa-shopping-bag", label: "Orders" },
  { href: "/dashboard/items", icon: "fa-box", label: "Items" },
  { href: "/dashboard/refunds", icon: "fa-undo", label: "Refunds" },
  { href: "/dashboard/promo-codes", icon: "fa-tags", label: "Promo Codes" },
  { href: "/dashboard/campaigns", icon: "fa-bullhorn", label: "Campaigns" },
  { href: "/dashboard/wallet", icon: "fa-wallet", label: "Wallet" },
  { href: "/dashboard/vendor-reviews", icon: "fa-star", label: "Reviews" },
];

export function VendorHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    if (accountOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [accountOpen]);

  const isActive = (href: string) => {
    if (href === "/dashboard")
      return pathname === "/dashboard" || pathname?.endsWith("/dashboard");
    return pathname?.startsWith(href);
  };

  const navLinkClass = (href: string) =>
    `flex text-nowrap items-center gap-1 px-2 lg:px-4 py-2 text-white hover:text-white transition-all duration-200 rounded-md font-medium text-sm hover:bg-white/10 ${
      isActive(href) ? "bg-white/10" : ""
    }`;

  return (
    <header className="text-primary dark:text-white w-full shadow-md sticky top-0 z-50">
      {/* Top Row - Logo, Actions (same structure as default header) */}
      <div className=" dark:border-gray-700 bg-header-hover">
        <div className="px-4 lg:px-8 min-h-16 lg:min-h-18 flex items-center justify-between gap-6">
          {/* Logo - same as default header + "| Vendor" */}
          <div className="flex items-center gap-1">
            <Link
              href="/vendor/dashboard"
              className="flex items-center gap-2"
              aria-label="Vendor Dashboard">
              <Image
                src="/images/logo/logogt.png"
                alt="Basit"
                width={120}
                height={30}
                className="block"
              />
              {/* <span className="text-white font-medium text-sm md:text-base opacity-90">
                | Vendor
              </span> */}
            </Link>
          </div>

          {/* Actions - same layout as HeaderActions (hidden lg:flex items-center gap-4 flex-1 justify-end) */}
          <div className="hidden lg:flex items-center gap-4 flex-1 justify-end">
            <div className="relative" ref={accountRef}>
              <button
                type="button"
                onClick={() => setAccountOpen(!accountOpen)}
                className="text-white hover:ring-1 hover:ring-white/50 rounded-sm px-2 py-1 transition-all"
                aria-expanded={accountOpen}
                aria-label="Account menu">
                <div className="text-[11px] leading-tight">Vendor</div>
                <div className="flex items-center gap-1 font-semibold text-sm">
                  <span>Ahmed Store</span>
                  <i className="fa-solid fa-chevron-down text-xs mt-0.5" aria-hidden />
                </div>
              </button>
              {accountOpen && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-medium text-foreground">Ahmed Store</p>
                    <p className="text-xs text-gray-500">Verified Vendor</p>
                  </div>
                  <Link
                    href="/vendor/profile-edit"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                    onClick={() => setAccountOpen(false)}>
                    Profile
                  </Link>
                  <Link
                    href="/vendor/security-settings"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                    onClick={() => setAccountOpen(false)}>
                    Security
                  </Link>
                  <Link
                    href="/vendor/login"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                    onClick={() => setAccountOpen(false)}>
                    Sign out
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/vendor/notifications"
              className="relative text-white hover:ring-1 hover:ring-white/50 rounded-sm px-2 py-1 transition-all flex items-center gap-1"
              aria-label="Notifications">
              <i className="fa-regular fa-bell text-lg" aria-hidden />
              <span className="absolute -top-0.5 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </Link>
          </div>

          {/* Mobile: menu toggle + notifications + account */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/vendor/notifications"
              className="relative text-white p-2 hover:ring-1 hover:ring-white/50 rounded-sm transition-all"
              aria-label="Notifications">
              <i className="fa-regular fa-bell text-xl" aria-hidden />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:ring-1 hover:ring-white/50 rounded-sm px-2 py-1 transition-all"
              aria-label="Toggle menu">
              <i
                className={`fa-solid ${mobileMenuOpen ? "fa-times" : "fa-bars"} text-xl`}
                aria-hidden
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search row - same structure as default (lg:hidden bg-header-hover, px-4 lg:px-8 py-1) */}
      <div className="lg:hidden bg-header-hover">
        <div className="px-4 lg:px-8 py-1">
          {mobileMenuOpen ? (
            <nav className="flex flex-col gap-0.5 py-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={navLinkClass(item.href)}>
                  <i className={`fa-solid ${item.icon}`} aria-hidden />
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : (
            <div className="py-2" />
          )}
        </div>
      </div>

      {/* Bottom Row - Categories / Nav (same as default: bg-header, px-4 lg:px-8 relative overflow-auto) */}
      <div className="bg-header">
        <div className="px-4 lg:px-8 relative overflow-auto">
          <nav className="flex items-center gap-1 py-2 w-full justify-start relative">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClass(item.href)}>
                <i className={`fa-solid ${item.icon} me-2`} aria-hidden />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
