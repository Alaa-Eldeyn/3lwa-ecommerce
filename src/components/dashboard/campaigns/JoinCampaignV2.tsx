"use client";

import { Link } from "@/src/i18n/routing";

const items = [
  { name: "Dell XPS 15 Laptop", sku: "LAP-001", stock: 24, price: "$1,299.00", discount: "40%", final: "$779.40", img: "/placeholder.png", alt: "Laptop" },
  { name: "Sony WH-1000XM5 Headphones", sku: "AUD-002", stock: 45, price: "$399.99", discount: "30%", final: "$279.99", img: "/placeholder.png", alt: "Headphones" },
  { name: "iPhone 15 Pro Max", sku: "PHN-003", stock: 18, price: "$1,199.00", discount: "40%", final: "$719.40", img: "/placeholder.png", alt: "Smartphone" },
  { name: "Logitech MX Master 3S", sku: "ACC-004", stock: 67, price: "$99.99", discount: "30%", final: "$69.99", img: "/placeholder.png", alt: "Mouse" },
  { name: "Keychron K8 Pro Keyboard", sku: "ACC-005", stock: 52, price: "$89.99", discount: "30%", final: "$62.99", img: "/placeholder.png", alt: "Keyboard" },
  { name: "iPad Air 5th Gen", sku: "TAB-006", stock: 31, price: "$599.00", discount: "30%", final: "$419.30", img: "/placeholder.png", alt: "Tablet" },
];

export function JoinCampaignV2() {
  return (
    <div className="px-8 py-6">
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-3">
          <Link href="/dashboard/campaigns" className="text-primary hover:text-primary/80">
            <i className="fa-solid fa-arrow-left" aria-hidden />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Join Campaign</h1>
        </div>
        <p className="text-gray-600">Select eligible items to participate in this campaign and boost your product visibility.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h2 className="text-xl font-bold text-gray-900">Winter Flash Sale</h2>
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                </div>
                <p className="text-sm text-gray-600">Up to 40% off on electronics and accessories. Limited time offer for winter season.</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center shrink-0 ml-4">
                <i className="fa-solid fa-fire text-red-600 text-xl" aria-hidden />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-600 mb-1">Campaign Period</div>
                <div className="text-sm font-medium">Jan 15 - Jan 31, 2024</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-600 mb-1">Discount Range</div>
                <div className="text-sm font-medium text-primary">20% - 40%</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-600 mb-1">Target Category</div>
                <div className="text-sm font-medium">Electronics</div>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Eligibility Requirements</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <i className="fa-solid fa-check text-green-600" aria-hidden />
                  <span>Vendor rating ≥ 4.0 stars</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fa-solid fa-check text-green-600" aria-hidden />
                  <span>Electronics category products</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fa-solid fa-check text-green-600" aria-hidden />
                  <span>Minimum 10 products in stock</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fa-solid fa-check text-green-600" aria-hidden />
                  <span>Active vendor for 30+ days</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Select Eligible Items</h2>
                <span className="text-sm text-gray-600">42 eligible items</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="relative">
                  <input type="text" placeholder="Search items..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm" />
                  <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden />
                </div>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm">
                  <option>All Categories</option>
                  <option>Laptops</option>
                  <option>Smartphones</option>
                  <option>Accessories</option>
                </select>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm">
                  <option>All Prices</option>
                  <option>$0 - $50</option>
                  <option>$51 - $100</option>
                  <option>$100+</option>
                </select>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                  <span className="text-sm font-medium text-gray-700">Select All (42 items)</span>
                </label>
                <button type="button" className="text-sm text-primary hover:text-primary/80 font-medium">Clear Selection</button>
              </div>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.sku} className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                    <div className="flex items-center space-x-4">
                      <input type="checkbox" className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary" />
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                        <img className="w-full h-full object-cover" src={item.img} alt={item.alt} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">{item.name}</h4>
                        <div className="flex items-center space-x-4 text-xs text-gray-600">
                          <span>SKU: {item.sku}</span>
                          <span>Stock: {item.stock}</span>
                          <span className="text-primary font-medium">{item.price}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-medium text-gray-900 mb-1">{item.discount} Discount</div>
                        <div className="text-xs text-gray-600">Final: {item.final}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-center">
                <button type="button" className="text-sm text-primary hover:text-primary/80 font-medium">
                  Load More Items <i className="fa-solid fa-chevron-down ml-1" aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 sticky top-20">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Selection Summary</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Items Selected</span>
                    <span className="text-2xl font-bold text-gray-900">0</span>
                  </div>
                  <div className="text-xs text-gray-500">of 42 eligible items</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Projected Reach</span>
                    <span className="text-2xl font-bold text-blue-600">12.5K+</span>
                  </div>
                  <div className="text-xs text-gray-500">potential customers</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Est. Sales Boost</span>
                    <span className="text-2xl font-bold text-green-600">+35%</span>
                  </div>
                  <div className="text-xs text-gray-500">average increase</div>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Selected Items Preview</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="text-center py-6">
                    <i className="fa-solid fa-box-open text-gray-300 text-3xl mb-2" aria-hidden />
                    <p className="text-xs text-gray-500">No items selected yet</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <button type="button" className="w-full bg-gray-300 text-gray-500 px-4 py-3 rounded-lg text-sm font-semibold cursor-not-allowed" disabled>
                  Join Campaign
                </button>
                <button type="button" className="w-full bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </div>
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <i className="fa-solid fa-info-circle text-blue-600 text-sm mt-0.5 shrink-0" aria-hidden />
                  <p className="text-xs text-blue-700">You can modify your selection anytime during the campaign period.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
