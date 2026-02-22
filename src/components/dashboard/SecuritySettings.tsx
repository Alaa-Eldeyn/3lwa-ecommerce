"use client";

import { VendorSidebarLayout } from "./VendorSidebarLayout";

export function SecuritySettings() {
  return (
    <VendorSidebarLayout activeNav="Settings">
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Security Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Password and security options</p>
      </header>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-xl">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Current password</label>
              <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">New password</label>
              <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />
            </div>
            <button type="button" className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-secondary">Update password</button>
          </div>
        </div>
      </main>
    </VendorSidebarLayout>
  );
}
