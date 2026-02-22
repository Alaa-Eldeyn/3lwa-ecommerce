"use client";

import { Link } from "@/src/i18n/routing";
import { ReactNode } from "react";

interface VendorPageShellProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function VendorPageShell({ title, subtitle, backHref, actions, children }: VendorPageShellProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {backHref && (
              <Link href={backHref} className="text-gray-600 hover:text-gray-800" aria-label="Back">
                <i className="fa-solid fa-arrow-left text-lg" aria-hidden />
              </Link>
            )}
            <div>
              <h1 className="text-3xl font-bold text-foreground">{title}</h1>
              {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
            </div>
          </div>
          {actions}
        </div>
      {children}
    </div>
  );
}
