"use client";

import { VendorSidebarLayout } from "../VendorSidebarLayout";

export function OrderDetailsOtherVendors() {
  return (
    <VendorSidebarLayout activeNav="Orders">
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Order Details — Other Vendors Section</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-foreground mb-4">Other vendors in this order</h3>
          <p className="text-sm text-gray-600">This order includes items from other vendors. Your items are listed above.</p>
        </div>
      </main>
    </VendorSidebarLayout>
  );
}
