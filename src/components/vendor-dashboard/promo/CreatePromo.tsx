"use client";

import { Link } from "@/src/i18n/routing";

export function CreatePromo() {
  return (
    <div className="px-8 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Promo Code</h1>
          <p className="text-gray-600">Set up promotional codes to boost sales and reward customers</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Promo Code Type</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-primary rounded-lg p-5 cursor-pointer bg-primary/5 transition-all hover:shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <i className="fa-solid fa-ticket text-primary text-xl" aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Single Code</h3>
                    <p className="text-xs text-gray-500">One code for all customers</p>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full border-2 border-primary bg-primary flex items-center justify-center">
                  <i className="fa-solid fa-check text-white text-xs" aria-hidden />
                </div>
              </div>
              <p className="text-sm text-gray-600">Create a single promotional code that can be shared publicly or with specific customer groups.</p>
            </div>
            <div className="border-2 border-gray-200 rounded-lg p-5 cursor-pointer transition-all hover:border-gray-300 hover:shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="fa-solid fa-layer-group text-gray-500 text-xl" aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Bulk Codes</h3>
                    <p className="text-xs text-gray-500">Unique codes per customer</p>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
              </div>
              <p className="text-sm text-gray-600">Generate multiple unique codes for individual distribution or one-time use campaigns.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Promo Code Details</h2>
          <div className="bg-accent/50 border border-accent rounded-lg p-4 mb-6 flex items-start">
            <i className="fa-solid fa-info-circle text-primary text-lg mr-3 mt-0.5 shrink-0" aria-hidden />
            <div>
              <p className="text-sm font-medium text-gray-800 mb-1">Important Note</p>
              <p className="text-sm text-gray-600">Promo code details cannot be changed once the code is created. Please review carefully before saving.</p>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Promo Code Name <span className="text-red-500">*</span>
              </label>
              <input type="text" placeholder="e.g., WINTER2026" defaultValue="WINTER25" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
              <p className="text-xs text-gray-500 mt-1.5">This is the code customers will enter at checkout. Use uppercase letters and numbers only.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Discount Type <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-primary rounded-lg cursor-pointer bg-primary/5">
                  <input type="radio" name="discountType" defaultChecked className="w-5 h-5 text-primary focus:ring-primary" />
                  <div className="ml-3 flex-1">
                    <span className="font-medium text-gray-800">Percentage Discount</span>
                    <p className="text-sm text-gray-600 mt-0.5">Reduce the price by a percentage (e.g., 20% off)</p>
                  </div>
                  <i className="fa-solid fa-percent text-primary text-xl shrink-0" aria-hidden />
                </label>
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                  <input type="radio" name="discountType" className="w-5 h-5 text-primary focus:ring-primary" />
                  <div className="ml-3 flex-1">
                    <span className="font-medium text-gray-800">Fixed Amount Discount</span>
                    <p className="text-sm text-gray-600 mt-0.5">Reduce the price by a fixed amount (e.g., $10 off)</p>
                  </div>
                  <i className="fa-solid fa-dollar-sign text-gray-400 text-xl shrink-0" aria-hidden />
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Value <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input type="number" placeholder="25" defaultValue={25} className="w-full border border-gray-300 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <span className="text-gray-500 font-medium">%</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Purchase Amount</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input type="number" placeholder="0" defaultValue={50} className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                </div>
                <p className="text-xs text-gray-500 mt-1.5">Leave empty for no minimum</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Usage Limit</label>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <input type="number" placeholder="Unlimited" defaultValue={100} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                  <p className="text-xs text-gray-500 mt-1.5">Total number of times this code can be used</p>
                </div>
                <div>
                  <input type="number" placeholder="1" defaultValue={1} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                  <p className="text-xs text-gray-500 mt-1.5">Max uses per customer</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input type="date" defaultValue="2026-01-20" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                  <i className="fa-regular fa-calendar absolute right-4 top-3.5 text-gray-400 pointer-events-none" aria-hidden />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input type="date" defaultValue="2026-03-31" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                  <i className="fa-regular fa-calendar absolute right-4 top-3.5 text-gray-400 pointer-events-none" aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Applicable Items</h2>
          <div className="space-y-4 mb-6">
            <label className="flex items-center p-4 border-2 border-primary rounded-lg cursor-pointer bg-primary/5">
              <input type="radio" name="itemScope" defaultChecked className="w-5 h-5 text-primary focus:ring-primary" />
              <div className="ml-3">
                <span className="font-medium text-gray-800">All Items</span>
                <p className="text-sm text-gray-600 mt-0.5">Apply this promo code to all items in your store</p>
              </div>
            </label>
            <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
              <input type="radio" name="itemScope" className="w-5 h-5 text-primary focus:ring-primary" />
              <div className="ml-3">
                <span className="font-medium text-gray-800">Specific Items</span>
                <p className="text-sm text-gray-600 mt-0.5">Choose which items this promo code applies to</p>
              </div>
            </label>
            <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
              <input type="radio" name="itemScope" className="w-5 h-5 text-primary focus:ring-primary" />
              <div className="ml-3">
                <span className="font-medium text-gray-800">Item Categories</span>
                <p className="text-sm text-gray-600 mt-0.5">Apply to all items within selected categories</p>
              </div>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Additional Settings</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <div>
                <span className="font-medium text-gray-800">Enable for first-time customers only</span>
                <p className="text-sm text-gray-600 mt-0.5">Restrict this code to customers who haven&apos;t purchased before</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-primary transition-colors" />
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6 shadow" />
              </div>
            </label>
            <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <div>
                <span className="font-medium text-gray-800">Combine with other promotions</span>
                <p className="text-sm text-gray-600 mt-0.5">Allow this code to be used with other active promotions</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-primary transition-colors" />
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6 shadow" />
              </div>
            </label>
            <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <div>
                <span className="font-medium text-gray-800">Show on website banner</span>
                <p className="text-sm text-gray-600 mt-0.5">Display this promo code in a banner on your store homepage</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-12 h-6 bg-primary rounded-full peer peer-checked:bg-primary transition-colors" />
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform translate-x-6 shadow" />
              </div>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Link href="/vendor/promo-codes" className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium inline-flex items-center">
            <i className="fa-solid fa-arrow-left mr-2" aria-hidden /> Back to Campaigns
          </Link>
          <div className="flex space-x-4">
            <button type="button" className="px-8 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              Save as Draft
            </button>
            <button type="button" className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-secondary transition-colors shadow-sm">
              Create Promo Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
