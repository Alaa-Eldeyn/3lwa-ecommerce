"use client";

import { Link } from "@/src/i18n/routing";

const orderItemsV2 = [
  { name: "Premium Wireless Headphones", sku: "WH-2024-001", specs: "Color: Black | Size: Standard", qty: 1, price: "$129.00", img: "/placeholder.png", alt: "modern wireless headphones product shot" },
  { name: "Smart Fitness Watch", sku: "SW-2024-045", specs: "Color: Silver | Band: Sport", qty: 1, price: "$89.00", img: "/placeholder.png", alt: "smart watch fitness tracker product" },
  { name: "Protective Phone Case", sku: "PC-2024-128", specs: "Color: Clear | Model: iPhone 15 Pro", qty: 1, price: "$27.00", img: "/placeholder.png", alt: "phone case protective cover product" },
];

export function OrderDetailsV2() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <header id="header" className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/vendor/orders" className="text-gray-600 hover:text-gray-900" aria-label="Back">
              <i className="fas fa-arrow-left text-lg" aria-hidden />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order #ORD-2024-5847</h1>
              <p className="text-sm text-gray-500 mt-1">Placed on January 15, 2024 at 2:45 PM</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="px-4 py-2 bg-yellow-100 text-yellow-800 text-sm font-semibold rounded-lg">Processing</span>
            <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <i className="fas fa-print mr-2" aria-hidden />Print
            </button>
          </div>
        </div>
      </header>

      <div id="content-area" className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div id="order-summary-section" className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order Number</p>
                    <p className="font-semibold text-gray-900">#ORD-2024-5847</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order Date</p>
                    <p className="font-semibold text-gray-900">January 15, 2024</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                    <p className="font-semibold text-gray-900">Credit Card</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Payment Status</p>
                    <span className="inline-flex px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">Paid</span>
                  </div>
                </div>
              </div>

              <div id="items-section" className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Items</h2>
                <div className="space-y-4">
                  {orderItemsV2.map((item, i) => (
                    <div key={item.sku} id={`item-card-${i + 1}`} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-20 h-20 bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                        <img className="w-full h-full object-cover" src={item.img} alt={item.alt} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">SKU: {item.sku}</p>
                        <p className="text-sm text-gray-600 mt-1">{item.specs}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Quantity</p>
                        <p className="font-semibold text-gray-900">{item.qty}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="font-semibold text-gray-900">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div id="shipping-progress-section" className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Shipping Progress</h2>
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
                  <div className="space-y-6">
                    {[
                      { title: "Order Placed", time: "January 15, 2024 at 2:45 PM", desc: "Order received and payment confirmed", icon: "fa-check", bg: "bg-green-100", iconColor: "text-green-600" },
                      { title: "Order Confirmed", time: "January 15, 2024 at 3:10 PM", desc: "Order confirmed and being prepared", icon: "fa-check", bg: "bg-green-100", iconColor: "text-green-600" },
                      { title: "Processing", time: "In Progress", desc: "Items are being packed for shipment", icon: "fa-box", bg: "bg-yellow-100", iconColor: "text-yellow-600" },
                      { title: "Shipped", time: "Pending", desc: null, icon: "fa-truck", bg: "bg-gray-100", iconColor: "text-gray-400" },
                      { title: "Delivered", time: "Pending", desc: null, icon: "fa-home", bg: "bg-gray-100", iconColor: "text-gray-400" },
                    ].map((m, i) => (
                      <div key={i} id={`milestone-${i + 1}`} className="relative flex items-start">
                        <div className={`w-12 h-12 ${m.bg} rounded-full flex items-center justify-center border-4 border-white relative z-10 shrink-0`}>
                          <i className={`fas ${m.icon} ${m.iconColor}`} aria-hidden />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className={m.desc ? "font-semibold text-gray-900" : "font-semibold text-gray-400"}>{m.title}</h3>
                          <p className={`text-sm mt-1 ${m.desc ? "text-gray-500" : "text-gray-400"}`}>{m.time}</p>
                          {m.desc && <p className="text-sm text-gray-600 mt-2">{m.desc}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div id="tracking-section" className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Tracking Information</h2>
                  <button type="button" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-secondary">
                    <i className="fas fa-plus mr-2" aria-hidden />Add Tracking
                  </button>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <i className="fas fa-shipping-fast text-gray-400 text-3xl mb-2" aria-hidden />
                  <p className="text-sm text-gray-500">No tracking information added yet</p>
                  <p className="text-xs text-gray-400 mt-1">Add tracking details once the order is shipped</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div id="customer-info-section" className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Customer Information</h2>
                <div className="flex items-center space-x-3 mb-4">
                  <img src="/placeholder-avatar.png" alt="customer" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-gray-900">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Customer since 2023</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <i className="fas fa-envelope text-gray-400 w-5 mt-1 shrink-0" aria-hidden />
                    <div className="ml-3">
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-900">sarah.johnson@email.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-phone text-gray-400 w-5 mt-1 shrink-0" aria-hidden />
                    <div className="ml-3">
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-gray-900">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </div>

              <div id="delivery-info-section" className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Delivery Address</h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <i className="fas fa-map-marker-alt text-gray-400 w-5 mt-1 shrink-0" aria-hidden />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                      <p className="text-sm text-gray-600 mt-1">123 Main Street, Apt 4B</p>
                      <p className="text-sm text-gray-600">New York, NY 10001</p>
                      <p className="text-sm text-gray-600">United States</p>
                    </div>
                  </div>
                </div>
              </div>

              <div id="payment-breakdown-section" className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Breakdown</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <span className="text-sm font-medium text-gray-900">$245.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Shipping</span>
                    <span className="text-sm font-medium text-gray-900">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tax</span>
                    <span className="text-sm font-medium text-gray-900">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-green-600">Discount</span>
                    <span className="text-sm font-medium text-green-600">-$0.00</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="font-bold text-gray-900 text-lg">$245.00</span>
                    </div>
                  </div>
                </div>
              </div>

              <div id="actions-section" className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Actions</h2>
                <div className="space-y-3">
                  <button type="button" className="w-full px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-secondary flex items-center justify-center">
                    <i className="fas fa-check-circle mr-2" aria-hidden />Confirm Dispatch
                  </button>
                  <Link href="/vendor/shipment-status" className="block w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center">
                    <i className="fas fa-edit mr-2" aria-hidden />Update Status
                  </Link>
                  <button type="button" className="w-full px-4 py-3 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 flex items-center justify-center">
                    <i className="fas fa-times-circle mr-2" aria-hidden />Cancel Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
