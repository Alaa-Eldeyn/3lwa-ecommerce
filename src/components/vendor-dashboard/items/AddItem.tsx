"use client";

import { useState } from "react";
import { Link } from "@/src/i18n/routing";

export function AddItem() {
  const [pricingMode, setPricingMode] = useState<"basic" | "combination">("basic");

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/vendor/items" className="text-gray-600 hover:text-gray-800" aria-label="Back">
              <i className="fa-solid fa-arrow-left text-lg" aria-hidden />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Configure Item Offer</h1>
              <p className="text-gray-600 mt-1">Set up your pricing and inventory for this item</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" className="bg-white border border-gray-300 text-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Save as Draft
            </button>
            <button type="button" className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              <i className="fa-solid fa-rocket mr-2" aria-hidden />Publish Offer
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Item Information</h3>
            <div className="space-y-4">
              <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                <img className="w-full h-full object-cover" src="/placeholder.png" alt="Product" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Product Name</p>
                <p className="font-medium text-foreground">Wireless Bluetooth Headphones</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">SKU</p>
                <p className="font-mono text-sm text-foreground">WH-BT-001</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="text-sm text-foreground">Electronics &gt; Audio</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Brand</p>
                <p className="text-sm text-foreground">TechSound</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Item ID</p>
                <p className="font-mono text-xs text-gray-500">ITM-789456123</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Fulfillment Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Warehouse Assignment</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="Warehouse">
                  <option value="">Select Warehouse</option>
                  <option value="main">Main Warehouse - Dubai</option>
                  <option value="secondary">Secondary - Abu Dhabi</option>
                  <option value="partner">Partner Warehouse - Sharjah</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Handling Time</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="Handling time">
                  <option value="1">1 business day</option>
                  <option value="2">2 business days</option>
                  <option value="3">3 business days</option>
                  <option value="5">5 business days</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Pricing Configuration</h3>
            <div className="mb-6">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setPricingMode("basic")}
                  className={`flex-1 px-4 py-3 border-2 rounded-lg text-sm font-medium transition-colors ${pricingMode === "basic" ? "border-primary bg-primary/10 text-primary" : "border-gray-300 text-gray-600 hover:border-gray-400"}`}
                >
                  <i className="fa-solid fa-tag mr-2" aria-hidden />Basic Pricing
                </button>
                <button
                  type="button"
                  onClick={() => setPricingMode("combination")}
                  className={`flex-1 px-4 py-3 border-2 rounded-lg text-sm font-medium transition-colors ${pricingMode === "combination" ? "border-primary bg-primary/10 text-primary" : "border-gray-300 text-gray-600 hover:border-gray-400"}`}
                >
                  <i className="fa-solid fa-layer-group mr-2" aria-hidden />Combination Pricing
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-2">Choose how to set pricing for this item</p>
            </div>

            {pricingMode === "basic" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Sale Price (AED)</label>
                    <input type="number" step="0.01" defaultValue="89.50" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Cost Price (AED)</label>
                    <input type="number" step="0.01" defaultValue="45.00" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Stock Quantity</label>
                    <input type="number" defaultValue="45" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Low Stock Alert</label>
                    <input type="number" defaultValue="5" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-600">Profit Margin</p>
                      <p className="text-lg font-bold text-green-600">49.7%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Profit per Unit</p>
                      <p className="text-lg font-bold text-green-600">44.50 AED</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Value</p>
                      <p className="text-lg font-bold text-primary">4,027.50 AED</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {pricingMode === "combination" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Select Attributes</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Color</label>
                      <div className="space-y-2">
                        {["Black", "White", "Blue"].map((c) => (
                          <label key={c} className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary/20" defaultChecked={c !== "Blue"} />
                            <span className="ml-2 text-sm">{c}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Storage</label>
                      <div className="space-y-2">
                        {["32GB", "64GB", "128GB"].map((s) => (
                          <label key={s} className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary/20" defaultChecked={s !== "128GB"} />
                            <span className="ml-2 text-sm">{s}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">Price Combinations</h4>
                    <span className="text-sm text-gray-600">4 combinations generated</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Color</th>
                          <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Storage</th>
                          <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Price (AED)</th>
                          <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Stock</th>
                          <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">SKU</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { color: "Black", storage: "32GB", price: "89.50", stock: "15", sku: "WH-BT-001-BK-32" },
                          { color: "Black", storage: "64GB", price: "109.50", stock: "12", sku: "WH-BT-001-BK-64" },
                          { color: "White", storage: "32GB", price: "89.50", stock: "8", sku: "WH-BT-001-WH-32" },
                          { color: "White", storage: "64GB", price: "109.50", stock: "10", sku: "WH-BT-001-WH-64" },
                        ].map((row) => (
                          <tr key={row.sku} className="border-t border-gray-100">
                            <td className="px-4 py-3 text-sm">{row.color}</td>
                            <td className="px-4 py-3 text-sm">{row.storage}</td>
                            <td className="px-4 py-3">
                              <input type="number" step="0.01" defaultValue={row.price} className="w-20 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20" />
                            </td>
                            <td className="px-4 py-3">
                              <input type="number" defaultValue={row.stock} className="w-16 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20" />
                            </td>
                            <td className="px-4 py-3 text-xs text-gray-500">{row.sku}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <i className="fa-solid fa-info-circle text-blue-600 mr-2" aria-hidden />
                      <p className="text-sm text-blue-800">Combinations are automatically generated based on selected attributes. Ensure all combinations have valid pricing and stock levels.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Additional Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Track inventory", desc: "Automatically update stock levels when orders are placed", checked: true },
                { label: "Allow backorders", desc: "Accept orders when item is out of stock", checked: false },
                { label: "Auto-publish", desc: "Automatically make item available for sale", checked: true },
                { label: "Promotional pricing", desc: "Enable special promotional pricing rules", checked: false },
              ].map((s) => (
                <div key={s.label}>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary/20" defaultChecked={s.checked} />
                    <span className="ml-2 text-sm font-medium">{s.label}</span>
                  </label>
                  <p className="text-xs text-gray-600 ml-6">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
