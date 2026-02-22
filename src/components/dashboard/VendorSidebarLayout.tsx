"use client";

import { ReactNode } from "react";

interface VendorSidebarLayoutProps {
  children: ReactNode;
  activeNav?: string;
}

/**
 * Content wrapper for vendor pages. Navigation is provided by VendorHeader in (vendor) layout.
 * activeNav is kept for potential future use (e.g. highlighting in breadcrumbs).
 */
export function VendorSidebarLayout({ children }: VendorSidebarLayoutProps) {
  return <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)]">{children}</div>;
}
