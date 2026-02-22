"use client";

import { Link } from "@/src/i18n/routing";
import { formatPrice } from "@/src/config/currency";

const cards = [
  { title: "Wireless Bluetooth Headphones", sku: "WBH-2024-001", pricingType: "Basic Pricing", pricingClass: "text-primary", price: 89.99, stock: "In Stock", stockClass: "bg-green-500", campaign: true, rating: "4.8", reviews: "124 reviews", img: "/placeholder.png", alt: "wireless bluetooth headphones" },
  { title: "Smart Fitness Watch", sku: "SFW-2024-045", pricingType: "Combination", pricingClass: "text-secondary", price: 129.99, stock: "In Stock", stockClass: "bg-green-500", campaign: false, rating: "4.6", reviews: "89 reviews", img: "/placeholder.png", alt: "smart watch" },
  { title: "Portable Power Bank 20000mAh", sku: "PPB-2024-078", pricingType: "Basic Pricing", pricingClass: "text-primary", price: 45.99, stock: "Low Stock", stockClass: "bg-yellow-500", campaign: true, rating: "4.9", reviews: "203 reviews", img: "/placeholder.png", alt: "power bank" },
  { title: "RGB Gaming Mouse Pro", sku: "RGM-2024-112", pricingType: "Combination", pricingClass: "text-secondary", price: 69.99, stock: "Out of Stock", stockClass: "bg-red-500", campaign: false, rating: "4.7", reviews: "156 reviews", img: "/placeholder.png", alt: "gaming mouse" },
  { title: "Mechanical Gaming Keyboard", sku: "MGK-2024-089", pricingType: "Combination", pricingClass: "text-secondary", price: 119.99, stock: "In Stock", stockClass: "bg-green-500", campaign: false, rating: "4.5", reviews: "78 reviews", img: "/placeholder.png", alt: "keyboard" },
  { title: "USB-C Hub 7-in-1 Adapter", sku: "UCH-2024-034", pricingType: "Basic Pricing", pricingClass: "text-primary", price: 39.99, stock: "In Stock", stockClass: "bg-green-500", campaign: true, rating: "4.4", reviews: "92 reviews", img: "/placeholder.png", alt: "usb-c hub" },
  { title: "Adjustable Laptop Stand", sku: "ALS-2024-067", pricingType: "Basic Pricing", pricingClass: "text-primary", price: 54.99, stock: "In Stock", stockClass: "bg-green-500", campaign: false, rating: "4.8", reviews: "167 reviews", img: "/placeholder.png", alt: "laptop stand" },
  { title: "HD Webcam 1080p Streaming", sku: "HDW-2024-023", pricingType: "Combination", pricingClass: "text-secondary", price: 79.99, stock: "Low Stock", stockClass: "bg-yellow-500", campaign: false, rating: "4.6", reviews: "134 reviews", img: "/placeholder.png", alt: "webcam" },
];

export function ItemsListV3() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Items</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your product catalog</p>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <i className="fa-solid fa-download mr-2" aria-hidden />Export
            </button>
            <Link href="/dashboard/add-item" className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-secondary transition-colors inline-flex items-center">
              <i className="fa-solid fa-plus mr-2" aria-hidden />Add New Item
            </Link>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 relative">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden />
            <input type="text" placeholder="Search items by name, SKU, or category..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" aria-label="Search items" />
          </div>
          <div className="flex items-center gap-3">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" aria-label="Availability">
              <option>All Availability</option>
              <option>In Stock</option>
              <option>Out of Stock</option>
              <option>Low Stock</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" aria-label="Pricing">
              <option>All Pricing Types</option>
              <option>Basic Pricing</option>
              <option>Combination Pricing</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" aria-label="Campaign">
              <option>Campaign Status</option>
              <option>Active Campaign</option>
              <option>No Campaign</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" aria-label="Sort">
              <option>Sort by: Newest</option>
              <option>Sort by: Oldest</option>
              <option>Sort by: Name A-Z</option>
              <option>Sort by: Name Z-A</option>
              <option>Sort by: Price Low-High</option>
              <option>Sort by: Price High-Low</option>
              <option>Sort by: Best Rating</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div id="stats-cards" className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">248</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-box text-blue-600 text-xl" aria-hidden />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">In Stock</p>
                <p className="text-2xl font-bold text-green-600">186</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-check-circle text-green-600 text-xl" aria-hidden />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">42</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-times-circle text-red-600 text-xl" aria-hidden />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">In Campaigns</p>
                <p className="text-2xl font-bold text-primary">38</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-bullhorn text-primary text-xl" aria-hidden />
              </div>
            </div>
          </div>
        </div>

        <div id="items-grid" className="grid grid-cols-4 gap-6">
          {cards.map((item) => (
            <div key={item.sku} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <img className="w-full h-full object-cover" src={item.img} alt={item.alt} />
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <span className={`px-2 py-1 ${item.stockClass} text-white text-xs font-medium rounded`}>{item.stock}</span>
                  {item.campaign && (
                    <span className="px-2 py-1 bg-primary text-white text-xs font-medium rounded flex items-center">
                      <i className="fa-solid fa-bullhorn text-xs mr-1" aria-hidden />Campaign
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 mb-3">SKU: {item.sku}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-sm font-medium ${item.pricingType === "Basic Pricing" ? "text-primary" : "text-secondary"}`}>{item.pricingType}</span>
                  <span className="text-lg font-bold text-gray-900">{formatPrice(item.price)}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <i className="fa-solid fa-star text-yellow-400 mr-1" aria-hidden />
                  <span className="font-medium mr-1">{item.rating}</span>
                  <span className="text-gray-400">({item.reviews})</span>
                </div>
                <div className="flex gap-2">
                  <Link href="/dashboard/item-details" className="flex-1 px-3 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors text-sm font-medium text-center inline-flex items-center justify-center">
                    <i className="fa-solid fa-eye mr-1" aria-hidden />View
                  </Link>
                  <Link href="/dashboard/edit-item" className="flex-1 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-center inline-flex items-center justify-center">
                    <i className="fa-solid fa-edit mr-1" aria-hidden />Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-8 pb-6">
          <p className="text-sm text-gray-600">Showing 1-8 of 248 items</p>
          <div className="flex items-center gap-2">
            <button type="button" className="px-3 py-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled aria-label="Previous page">
              <i className="fa-solid fa-chevron-left" aria-hidden />
            </button>
            <button type="button" className="px-4 py-2 bg-primary text-white rounded-lg">1</button>
            <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">2</button>
            <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">3</button>
            <span className="px-3 py-2 text-gray-500">...</span>
            <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">31</button>
            <button type="button" className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50" aria-label="Next page">
              <i className="fa-solid fa-chevron-right" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
