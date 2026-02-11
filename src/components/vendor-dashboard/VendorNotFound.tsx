"use client";

import { Link } from "@/src/i18n/routing";

export function VendorNotFound() {
  return (
    <div className="text-foreground">
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16">
        <div className="text-center">
          <div className="mb-8">
            <div className="mx-auto w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <i className="fa-solid fa-exclamation-triangle text-red-500 text-5xl" aria-hidden />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-foreground mb-6">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <p className="text-base text-gray-500 max-w-xl mx-auto">
            Please check the URL or navigate back to a safe location using the buttons below.
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link href="/vendor/dashboard" className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-secondary transition-colors flex items-center">
                <i className="fa-solid fa-chart-line mr-2" aria-hidden />Go to Dashboard
              </Link>
              <button type="button" onClick={() => window.history.back()} className="bg-white border border-gray-300 text-foreground px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
                <i className="fa-solid fa-arrow-left mr-2" aria-hidden />Go Back
              </button>
            </div>
          </div>
          <div className="mt-16 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">Need Help?</h3>
            <p className="text-gray-600 mb-6">
              If you believe this is an error or you should have access to this page, please contact support.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border border-gray-100 rounded-lg hover:border-primary/20 transition-colors">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fa-solid fa-headset text-blue-600 text-xl" aria-hidden />
                </div>
                <h4 className="font-medium text-foreground mb-2">Contact Support</h4>
                <p className="text-sm text-gray-600">Get help from our support team</p>
              </div>
              <div className="text-center p-4 border border-gray-100 rounded-lg hover:border-primary/20 transition-colors">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fa-solid fa-book text-green-600 text-xl" aria-hidden />
                </div>
                <h4 className="font-medium text-foreground mb-2">Documentation</h4>
                <p className="text-sm text-gray-600">Browse our help documentation</p>
              </div>
              <div className="text-center p-4 border border-gray-100 rounded-lg hover:border-primary/20 transition-colors">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fa-solid fa-comments text-purple-600 text-xl" aria-hidden />
                </div>
                <h4 className="font-medium text-foreground mb-2">Community</h4>
                <p className="text-sm text-gray-600">Ask questions in our forum</p>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-foreground mb-6">Quick Navigation</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/vendor/dashboard" className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-primary/20 transition-colors group">
                <i className="fa-solid fa-chart-line text-2xl text-gray-400 group-hover:text-primary transition-colors mb-2" aria-hidden />
                <p className="text-sm font-medium text-foreground">Dashboard</p>
              </Link>
              <Link href="/vendor/orders" className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-primary/20 transition-colors group">
                <i className="fa-solid fa-box text-2xl text-gray-400 group-hover:text-primary transition-colors mb-2" aria-hidden />
                <p className="text-sm font-medium text-foreground">Orders</p>
              </Link>
              <Link href="/vendor/items" className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-primary/20 transition-colors group">
                <i className="fa-solid fa-tags text-2xl text-gray-400 group-hover:text-primary transition-colors mb-2" aria-hidden />
                <p className="text-sm font-medium text-foreground">Items</p>
              </Link>
              <Link href="/vendor/profile-edit" className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-primary/20 transition-colors group">
                <i className="fa-solid fa-user text-2xl text-gray-400 group-hover:text-primary transition-colors mb-2" aria-hidden />
                <p className="text-sm font-medium text-foreground">Profile</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
