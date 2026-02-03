"use client";

import Link from "next/link";
import { ArrowLeft, ChevronRight, Search, Bell, HelpCircle } from "lucide-react";

interface VendorHeaderProps {
  title: string;
  showBackButton?: boolean;
  breadcrumbs?: { label: string; href?: string }[];
  variant?: "default" | "gradient";
}

const VendorHeader = ({
  title,
  showBackButton = false,
  breadcrumbs,
  variant = "default",
}: VendorHeaderProps) => {
  const isGradient = variant === "gradient";

  return (
    <header
      className={`px-8 py-4 shadow-lg ${
        isGradient
          ? "bg-gradient-to-r from-header to-header-hover"
          : "bg-white border-b border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showBackButton && (
            <button
              onClick={() => window.history.back()}
              className={
                isGradient
                  ? "text-white/90 hover:text-white"
                  : "text-gray-600 hover:text-gray-800"
              }
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          {breadcrumbs ? (
            <nav
              className={`flex items-center text-sm ${
                isGradient ? "text-white/80" : "text-gray-500"
              }`}
            >
              {breadcrumbs.map((crumb, index) => (
                <span key={index} className="flex items-center">
                  {index > 0 && <ChevronRight className="w-3 h-3 mx-2" />}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className={
                        isGradient
                          ? "hover:text-white transition-colors"
                          : "hover:text-primary"
                      }
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span
                      className={
                        isGradient
                          ? "text-white font-medium"
                          : "text-gray-800 font-medium"
                      }
                    >
                      {crumb.label}
                    </span>
                  )}
                </span>
              ))}
            </nav>
          ) : (
            <h2
              className={`text-2xl font-semibold ${
                isGradient ? "text-white" : "text-gray-800"
              }`}
            >
              {title}
            </h2>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className={`w-64 pl-10 pr-4 py-2 rounded-lg focus:outline-none ${
                isGradient
                  ? "bg-white/20 border border-white/30 text-white placeholder-white/70 focus:bg-white/30 backdrop-blur-sm"
                  : "border border-gray-300 focus:border-primary"
              }`}
            />
            <Search
              className={`w-4 h-4 absolute left-3 top-3 ${
                isGradient ? "text-white/70" : "text-gray-400"
              }`}
            />
          </div>
          <Link
            href="/notifications"
            className={`relative p-2 ${
              isGradient
                ? "text-white/90 hover:text-white"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 bg-accent text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              3
            </span>
          </Link>
          <button
            className={`p-2 ${
              isGradient
                ? "text-white/90 hover:text-white"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default VendorHeader;
