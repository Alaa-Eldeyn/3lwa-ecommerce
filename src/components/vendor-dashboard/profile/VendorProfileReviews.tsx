"use client";

import { VendorSidebarLayout } from "../VendorSidebarLayout";

export function VendorProfileReviews() {
  return (
    <VendorSidebarLayout activeNav="Reviews">
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Vendor Profile & Reviews</h1>
        <p className="text-sm text-gray-500 mt-1">Ahmed Store · 4.8 rating</p>
      </header>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4">
            <img src="/placeholder-avatar.png" alt="Vendor" className="w-20 h-20 rounded-full object-cover" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">Ahmed Store</h2>
              <p className="text-amber-500 text-sm">★★★★★ 4.8 (284 reviews)</p>
            </div>
          </div>
        </div>
        <h3 className="font-semibold text-foreground mb-4">Recent reviews</h3>
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Great seller! Fast shipping.</p>
            <p className="text-xs text-gray-500 mt-2">— Customer · Jan 18, 2026</p>
          </div>
        </div>
      </main>
    </VendorSidebarLayout>
  );
}
