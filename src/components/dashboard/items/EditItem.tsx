"use client";

import { Link } from "@/src/i18n/routing";

export function EditItem() {
  return (
    <div className="px-8 py-6">
      <header className="bg-white border-b border-gray-200 -mx-8 px-8 py-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/items" className="text-gray-600 hover:text-gray-800" aria-label="Back">
              <i className="fa-solid fa-arrow-left text-lg" aria-hidden />
            </Link>
            <div>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <span>Items &amp; Offers</span>
                <i className="fa-solid fa-chevron-right mx-2 text-xs" aria-hidden />
                <span>Premium Wireless Headphones</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Edit Item</h2>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button type="button" className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
              Discard
            </button>
            <button type="button" className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-secondary font-medium">
              Save Changes
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <div className="flex-1 pr-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Basic Information</h3>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
              <input type="text" defaultValue="Premium Wireless Headphones" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea rows={4} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">High-quality wireless headphones with active noise cancellation, premium sound quality, and up to 30 hours of battery life. Perfect for music lovers and professionals.</textarea>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="relative">
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none">
                    <option>Electronics</option>
                    <option>Fashion</option>
                    <option>Home &amp; Garden</option>
                    <option>Sports</option>
                  </select>
                  <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" aria-hidden />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <input type="text" defaultValue="AudioTech Pro" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Pricing &amp; Variants</h3>
              <button type="button" className="text-primary text-sm font-medium hover:underline flex items-center">
                <i className="fa-solid fa-plus mr-1.5" aria-hidden /> Add Variant
              </button>
            </div>
            <div className="space-y-5">
              {[
                { name: "Black - Standard", price: "149.99", cost: "85.00", stock: 45, margin: "43%", profit: "$64.99" },
                { name: "White - Standard", price: "149.99", cost: "85.00", stock: 32, margin: "43%", profit: "$64.99" },
                { name: "Silver - Limited Edition", price: "179.99", cost: "95.00", stock: 18, margin: "47%", profit: "$84.99" },
              ].map((v) => (
                <div key={v.name} className="border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mr-3" />
                      <span className="font-medium text-gray-800">{v.name}</span>
                    </div>
                    <button type="button" className="text-gray-400 hover:text-red-500" aria-label="Remove variant">
                      <i className="fa-solid fa-trash text-sm" aria-hidden />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Price</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                        <input type="text" defaultValue={v.price} className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Cost per item</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                        <input type="text" defaultValue={v.cost} className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Stock</label>
                      <input type="number" defaultValue={v.stock} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">Profit margin: {v.margin} · {v.profit} per item</p>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-5 border-t border-gray-200">
              <button type="button" className="w-full py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium flex items-center justify-center">
                <i className="fa-solid fa-pencil mr-2" aria-hidden /> Bulk Edit Prices
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Shipping Settings</h3>
            <div className="grid grid-cols-3 gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                <div className="flex">
                  <input type="text" defaultValue="0.65" className="flex-1 px-4 py-2.5 border border-gray-300 rounded-l-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  <div className="px-4 py-2.5 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-600 text-sm">kg</div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Length</label>
                <div className="flex">
                  <input type="text" defaultValue="20" className="flex-1 px-4 py-2.5 border border-gray-300 rounded-l-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  <div className="px-4 py-2.5 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-600 text-sm">cm</div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
                <div className="flex">
                  <input type="text" defaultValue="18" className="flex-1 px-4 py-2.5 border border-gray-300 rounded-l-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  <div className="px-4 py-2.5 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-600 text-sm">cm</div>
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
              <div className="flex w-1/3">
                <input type="text" defaultValue="8" className="flex-1 px-4 py-2.5 border border-gray-300 rounded-l-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                <div className="px-4 py-2.5 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-600 text-sm">cm</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" id="physical-product" />
              <label htmlFor="physical-product" className="text-sm text-gray-700">This is a physical product (requires shipping)</label>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Visibility &amp; Status</h3>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-3">Item Status</label>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input type="radio" name="status" defaultChecked className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" id="status-active" />
                  <label htmlFor="status-active" className="ml-3 text-sm text-gray-700">Active (visible to customers)</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="status" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" id="status-draft" />
                  <label htmlFor="status-draft" className="ml-3 text-sm text-gray-700">Draft (not visible)</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="status" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" id="status-inactive" />
                  <label htmlFor="status-inactive" className="ml-3 text-sm text-gray-700">Inactive (temporarily hidden)</label>
                </div>
              </div>
            </div>
            <div className="pt-5 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">Featured Item</p>
                  <p className="text-xs text-gray-500 mt-1">Highlight this item in your store</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto shrink-0">
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">Item Preview</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img className="w-full h-full object-cover" src="/placeholder.png" alt="Premium wireless headphones" />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 mb-1">Premium Wireless Headphones</h4>
                  <p className="text-sm text-gray-600 mb-3">AudioTech Pro</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">$149.99</span>
                    <span className="text-xs text-gray-500">45 in stock</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button type="button" className="w-full px-4 py-2.5 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 text-sm font-medium flex items-center justify-center">
                  <i className="fa-solid fa-eye mr-2" aria-hidden /> Preview in Store
                </button>
                <button type="button" className="w-full px-4 py-2.5 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 text-sm font-medium flex items-center justify-center">
                  <i className="fa-solid fa-copy mr-2" aria-hidden /> Duplicate Item
                </button>
                <button type="button" className="w-full px-4 py-2.5 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 text-sm font-medium flex items-center justify-center">
                  <i className="fa-solid fa-share-nodes mr-2" aria-hidden /> Share Item
                </button>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">Item Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Total Sales</span>
                  <span className="text-sm font-semibold text-gray-800">234 units</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Revenue</span>
                  <span className="text-sm font-semibold text-gray-800">$35,097.66</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Average Rating</span>
                  <div className="flex items-center">
                    <i className="fa-solid fa-star text-yellow-400 text-xs mr-1" aria-hidden />
                    <span className="text-sm font-semibold text-gray-800">4.8</span>
                    <span className="text-xs text-gray-500 ml-1">(67)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Views</span>
                  <span className="text-sm font-semibold text-gray-800">1,847</span>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">Linked Inventory</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-800">Warehouse A</span>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">Active</span>
                </div>
                <p className="text-xs text-gray-500">95 units available</p>
                <button type="button" className="mt-3 text-primary text-sm font-medium hover:underline">View Details</button>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-200">
              <button type="button" className="w-full px-4 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-medium flex items-center justify-center">
                <i className="fa-solid fa-trash mr-2" aria-hidden /> Delete Item
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">This action cannot be undone</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
