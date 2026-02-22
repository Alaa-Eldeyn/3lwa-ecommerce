"use client";

import { Link } from "@/src/i18n/routing";

const thumbSrc = "/placeholder.png";

export function ItemDetailsV2() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/vendor/items" className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors" aria-label="Back">
              <i className="fa-solid fa-arrow-left text-gray-600" aria-hidden />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Wireless Bluetooth Headphones</h1>
              <p className="text-sm text-gray-500 mt-1">SKU: WBH-2024-001</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" className="px-5 py-2.5 text-primary bg-white border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-medium">
              <i className="fa-solid fa-star mr-2" aria-hidden />View Item Reviews
            </button>
            <Link href="/vendor/edit-item" className="px-5 py-2.5 text-white bg-primary rounded-lg hover:bg-secondary transition-colors font-medium inline-flex items-center">
              <i className="fa-solid fa-edit mr-2" aria-hidden />Edit Item
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="relative h-96 bg-gray-100">
                <img className="w-full h-full object-contain p-8" src={thumbSrc} alt="Wireless Bluetooth Headphones" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className="px-3 py-1.5 bg-green-500 text-white text-sm font-medium rounded-lg shadow-lg">Active</span>
                  <span className="px-3 py-1.5 bg-primary text-white text-sm font-medium rounded-lg shadow-lg flex items-center">
                    <i className="fa-solid fa-bullhorn text-sm mr-1.5" aria-hidden />In Campaign
                  </span>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-gray-50 border-t border-gray-200">
                <button type="button" className="w-20 h-20 rounded-lg border-2 border-primary bg-white overflow-hidden shrink-0">
                  <img className="w-full h-full object-cover" src={thumbSrc} alt="" />
                </button>
                {[1, 2, 3].map((i) => (
                  <button key={i} type="button" className="w-20 h-20 rounded-lg border-2 border-gray-200 bg-white overflow-hidden hover:border-primary transition-colors shrink-0">
                    <img className="w-full h-full object-cover" src={thumbSrc} alt="" />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Item Information</h2>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Item Name", value: "Wireless Bluetooth Headphones" },
                  { label: "SKU", value: "WBH-2024-001" },
                  { label: "Category", value: "Electronics & Audio" },
                  { label: "Brand", value: "AudioTech Pro" },
                  { label: "Weight", value: "0.25 kg" },
                  { label: "Dimensions", value: "18 x 16 x 8 cm" },
                ].map((f) => (
                  <div key={f.label}>
                    <p className="text-sm text-gray-500 mb-2">{f.label}</p>
                    <p className="text-base font-semibold text-gray-900">{f.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-2">Description</p>
                <p className="text-base text-gray-700 leading-relaxed">Premium wireless Bluetooth headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Featuring soft memory foam ear cushions and foldable design for easy portability. Perfect for music lovers, travelers, and professionals.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Pricing Details</h2>
              <div className="flex items-center justify-between mb-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                    <i className="fa-solid fa-dollar-sign text-white text-xl" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Pricing Type</p>
                    <p className="text-lg font-bold text-primary">Basic Pricing</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Retail Price</p>
                  <p className="text-3xl font-bold text-gray-900">$89.99</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">Cost Price</p>
                  <p className="text-xl font-bold text-gray-900">$45.00</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">Profit Margin</p>
                  <p className="text-xl font-bold text-green-600">50%</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">Commission</p>
                  <p className="text-xl font-bold text-gray-900">$8.99</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start">
                  <i className="fa-solid fa-info-circle text-blue-600 mt-0.5 mr-3" aria-hidden />
                  <p className="text-sm text-blue-900">This item uses basic pricing. All variants share the same price. To set individual prices per variant, switch to combination pricing.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Inventory Summary</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <i className="fa-solid fa-check-circle text-white" aria-hidden />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <p className="text-base font-bold text-green-700">In Stock</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Total Available</p>
                  <p className="text-3xl font-bold text-gray-900">486</p>
                  <p className="text-xs text-gray-500 mt-1">units across all warehouses</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Reserved</p>
                  <p className="text-2xl font-bold text-orange-600">24</p>
                  <p className="text-xs text-gray-500 mt-1">units in pending orders</p>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-3">Warehouse Distribution</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Main Warehouse</p>
                      <p className="text-sm font-semibold text-gray-900">320 units</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">North Branch</p>
                      <p className="text-sm font-semibold text-gray-900">98 units</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">South Branch</p>
                      <p className="text-sm font-semibold text-gray-900">68 units</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Campaign Participation</h2>
              <div className="p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg border border-primary">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
                    <i className="fa-solid fa-bullhorn text-white" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Active Campaign</p>
                    <p className="text-base font-bold text-primary">Summer Electronics Sale</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-semibold text-red-600">15% OFF</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Campaign Price</span>
                    <span className="font-bold text-gray-900">$76.49</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold text-gray-900">15 days left</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Sales in Campaign</span>
                    <span className="font-semibold text-green-600">142 units</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-teal-200">
                  <p className="text-xs text-gray-600 mb-2">Campaign Progress</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "68%" }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">68% of target reached</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Performance Metrics</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center">
                    <i className="fa-solid fa-star text-yellow-400 text-2xl mr-3" aria-hidden />
                    <div>
                      <p className="text-sm text-gray-600">Average Rating</p>
                      <p className="text-xl font-bold text-gray-900">4.8</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">124 reviews</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Total Sales</p>
                  <p className="text-2xl font-bold text-gray-900">1,847</p>
                  <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-up mr-1" aria-hidden />+12% this month</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">8,524</p>
                  <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Conversion Rate</p>
                  <p className="text-2xl font-bold text-primary">21.7%</p>
                  <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-up mr-1" aria-hidden />Above average</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
