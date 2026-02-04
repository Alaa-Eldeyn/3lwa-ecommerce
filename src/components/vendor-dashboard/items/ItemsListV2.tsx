"use client";

import { Link } from "@/src/i18n/routing";

const listItems = [
  { id: "ITEM-001", name: "Premium Cotton T-Shirt", status: "Active", statusClass: "text-green-600 bg-green-50", stockLabel: "In Stock", stockClass: "text-blue-600 bg-blue-50", sku: "TSH-001", category: "Clothing", variants: "3 variants", priceRange: "$25.00 - $35.00", badge: "2 Warehouses", badgeClass: "bg-green-50 text-green-700", sub: "Last updated: 2 hours ago", sold: "145 sold", soldSub: "This month", icon: "fa-shirt" },
  { id: "ITEM-002", name: "Running Shoes Pro", status: "Read-only", statusClass: "text-red-600 bg-red-50", stockLabel: "Low Stock", stockClass: "text-amber-600 bg-amber-50", sku: "SHO-002", category: "Footwear", variants: "5 variants", priceRange: "$85.00 - $120.00", badge: "Active Orders", badgeClass: "bg-red-50 text-red-700", sub: "Cannot edit while orders pending", sold: "89 sold", soldSub: "This month", icon: "fa-shoe-prints" },
  { id: "ITEM-003", name: "Wireless Headphones", status: "Draft", statusClass: "text-gray-600 bg-gray-50", stockLabel: "Missing Info", stockClass: "text-red-600 bg-red-50", sku: "HDH-003", category: "Electronics", variants: "Incomplete pricing • No variants set", priceRange: "", badge: "Missing Attributes", badgeClass: "bg-amber-50 text-amber-700", sub: "Complete to publish", sold: "Not published", soldSub: "Draft mode", icon: "fa-laptop" },
  { id: "ITEM-004", name: "Smart Watch Series X", status: "Inactive", statusClass: "text-gray-600 bg-gray-100", stockLabel: "Out of Stock", stockClass: "text-red-600 bg-red-50", sku: "WAT-004", category: "Electronics", variants: "4 variants", priceRange: "$299.00 - $399.00", badge: "No Warehouse", badgeClass: "bg-red-50 text-red-700", sub: "Configure location to reactivate", sold: "67 sold", soldSub: "Last month", icon: "fa-watch" },
];

export function ItemsListV2() {
  return (
    <div id="items-main" className="px-8 py-6">
      <div id="items-header" className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Catalog Management</h1>
          <p className="text-gray-600">Manage your product catalog, inventory and pricing</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/vendor/add-item" className="px-4 py-2 bg-primary hover:bg-header text-white text-sm font-semibold rounded-lg transition-all inline-flex items-center">
            <i className="fa-solid fa-plus mr-2" aria-hidden />Add New Item
          </Link>
          <button type="button" className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all">
            <i className="fa-solid fa-download mr-2" aria-hidden />Export Items
          </button>
        </div>
      </div>

      <div id="items-content" className="grid grid-cols-3 gap-6">
        <div id="items-list-section" className="col-span-2">
          <div className="bg-white rounded-xl border border-gray-200">
            <div id="items-filters" className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 relative">
                  <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden />
                  <input type="text" placeholder="Search items by name, SKU, or category..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20" aria-label="Search items" />
                </div>
                <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="Status">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Draft</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="Category">
                  <option>All Categories</option>
                  <option>Electronics</option>
                  <option>Clothing</option>
                  <option>Home & Garden</option>
                </select>
                <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="Stock">
                  <option>Stock Status</option>
                  <option>In Stock</option>
                  <option>Low Stock</option>
                  <option>Out of Stock</option>
                </select>
                <button type="button" className="px-4 py-2 bg-primary hover:bg-header text-white text-sm font-semibold rounded-lg transition-all">
                  Apply Filter
                </button>
              </div>
            </div>

            <div id="items-list" className="divide-y divide-gray-200">
              {listItems.map((item) => (
                <Link key={item.id} href="/vendor/item-details" className="item-row p-6 hover:bg-gray-50 cursor-pointer transition-all block">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center shrink-0">
                      <i className={`fa-solid ${item.icon} text-primary text-xl`} aria-hidden />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="text-lg font-bold text-foreground">{item.name}</span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${item.statusClass}`}>{item.status}</span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${item.stockClass}`}>{item.stockLabel}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">SKU: {item.sku} • Category: {item.category}</div>
                      <div className="text-sm text-gray-600 mb-3">{item.variants}{item.priceRange ? ` • Price: ${item.priceRange}` : ""}</div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs px-2 py-1 rounded-full ${item.badgeClass}`}>
                          {item.badge.includes("Warehouse") && <i className="fa-solid fa-warehouse mr-1" aria-hidden />}
                          {item.badge.includes("Active Orders") && <i className="fa-solid fa-exclamation-triangle mr-1" aria-hidden />}
                          {item.badge.includes("Missing") && <i className="fa-solid fa-exclamation-triangle mr-1" aria-hidden />}
                          {item.badge}
                        </span>
                        <span className="text-xs text-gray-500">{item.sub}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className={`text-sm font-bold mb-1 ${item.sold === "Not published" ? "text-gray-400" : "text-foreground"}`}>{item.sold}</div>
                      <div className="text-xs text-gray-500">{item.soldSub}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div id="item-details-section" className="bg-white rounded-xl border border-gray-200">
          <div id="item-details-content">
            <div id="item-summary" className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">Premium Cotton T-Shirt</h3>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Active</span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">SKU:</span>
                  <span className="font-medium text-foreground">TSH-001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium text-foreground">Clothing</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price Range:</span>
                  <span className="font-bold text-foreground">$25.00 - $35.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Variants:</span>
                  <span className="font-medium text-foreground">3 combinations</span>
                </div>
              </div>
            </div>

            <div id="item-variants" className="p-6 border-b border-gray-200">
              <h4 className="text-md font-bold text-foreground mb-4">Product Variants</h4>
              <div className="space-y-3">
                {[
                  { color: "bg-blue-500", label: "Blue - Medium", stock: "45 units", price: "$29.99" },
                  { color: "bg-red-500", label: "Red - Large", stock: "32 units", price: "$29.99" },
                  { color: "bg-black", label: "Black - Small", stock: "28 units", price: "$25.00" },
                ].map((v) => (
                  <div key={v.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-8 h-8 ${v.color} rounded border border-gray-200 shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-foreground text-sm">{v.label}</div>
                      <div className="text-xs text-gray-500">Stock: {v.stock}</div>
                    </div>
                    <div className="text-sm font-bold text-foreground">{v.price}</div>
                  </div>
                ))}
              </div>
            </div>

            <div id="item-controls" className="p-6 border-b border-gray-200">
              <h4 className="text-md font-bold text-foreground mb-4">Item Actions</h4>
              <div className="space-y-3">
                <Link href="/vendor/edit-item" className="w-full px-4 py-3 bg-primary hover:bg-header text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2">
                  <i className="fa-solid fa-edit" aria-hidden />Edit Item Details
                </Link>
                <button type="button" className="w-full px-4 py-3 border border-primary text-primary hover:bg-primary/5 font-medium rounded-lg transition-all flex items-center justify-center gap-2">
                  <i className="fa-solid fa-tags" aria-hidden />Manage Pricing & Attributes
                </button>
                <button type="button" className="w-full px-4 py-3 border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition-all flex items-center justify-center gap-2">
                  <i className="fa-solid fa-copy" aria-hidden />Duplicate Item
                </button>
              </div>
            </div>

            <div id="item-reviews" className="p-6">
              <h4 className="text-md font-bold text-foreground mb-4">Customer Reviews (Read-only)</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <img src="/placeholder-avatar.png" alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-foreground text-sm">Sarah Johnson</span>
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map((i) => <i key={i} className="fa-solid fa-star text-xs" aria-hidden />)}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mb-1">Perfect fit and great quality!</div>
                    <div className="text-xs text-gray-400">2 days ago</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <img src="/placeholder-avatar.png" alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-foreground text-sm">Mike Chen</span>
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4].map((i) => <i key={i} className="fa-solid fa-star text-xs" aria-hidden />)}
                        <i className="fa-regular fa-star text-xs" aria-hidden />
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mb-1">Good quality, fast shipping.</div>
                    <div className="text-xs text-gray-400">5 days ago</div>
                  </div>
                </div>
                <div className="text-center">
                  <button type="button" className="text-xs text-primary hover:underline">View All Reviews (24)</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
