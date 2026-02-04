"use client";

import { VendorSidebarLayout } from "../VendorSidebarLayout";

export function VendorReviewsCards() {
  return (
    <VendorSidebarLayout activeNav="Reviews">
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Vendor Reviews (positive + needs attention cards)</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <i className="fa-solid fa-thumbs-up text-green-600 text-xl" aria-hidden />
              <h3 className="font-semibold text-green-800">Positive</h3>
            </div>
            <p className="text-sm text-green-700">284 positive reviews this month</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <i className="fa-solid fa-exclamation-triangle text-amber-600 text-xl" aria-hidden />
              <h3 className="font-semibold text-amber-800">Needs attention</h3>
            </div>
            <p className="text-sm text-amber-700">3 reviews need your response</p>
          </div>
        </div>
      </main>
    </VendorSidebarLayout>
  );
}
