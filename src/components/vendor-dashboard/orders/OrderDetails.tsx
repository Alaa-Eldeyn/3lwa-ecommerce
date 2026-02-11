"use client";

import { Link } from "@/src/i18n/routing";

const orderItems = [
  { name: "Premium Wireless Headphones", sku: "WH-PRO-001", color: "Black", price: "$89.00", qty: 1, img: "/placeholder.png", alt: "premium wireless headphones product shot white background" },
  { name: "Smart Watch Pro", sku: "SW-PRO-002", color: "Silver", price: "$45.00", qty: 1, img: "/placeholder.png", alt: "smart watch fitness tracker product shot white background" },
  { name: "Portable Bluetooth Speaker", sku: "BS-PORT-003", color: "Blue", price: "$22.00", qty: 1, img: "/placeholder.png", alt: "portable bluetooth speaker product shot white background" },
];

const trackingSteps = [
  { label: "Out for Delivery", time: "Jan 20, 2026 - 8:45 AM", desc: "Package is on the delivery vehicle", done: true, line: "primary" },
  { label: "In Transit", time: "Jan 19, 2026 - 3:20 PM", desc: "Package arrived at distribution center", done: true, line: "primary" },
  { label: "Picked Up", time: "Jan 18, 2026 - 5:15 PM", desc: "Package picked up by carrier", done: true, line: "gray" },
  { label: "Order Placed", time: "Jan 18, 2026 - 2:30 PM", desc: "Order confirmed and processed", done: false, line: "gray" },
];

export function OrderDetails() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <header id="header" className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/vendor/orders" className="w-10 h-10 bg-gray-100 hover:bg-gray-200 flex items-center justify-center rounded-lg text-gray-600" aria-label="Back to orders">
              <i className="fa-solid fa-arrow-left" aria-hidden />
            </Link>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Order #ORD-2847</h2>
              <p className="text-sm text-gray-500">Placed on Jan 18, 2026 at 2:30 PM</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input type="text" placeholder="Search..." className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" aria-label="Search" />
              <i className="fa-solid fa-search absolute left-3 top-3 text-gray-400 text-sm" aria-hidden />
            </div>
            <button type="button" className="relative p-2 text-gray-600 hover:text-gray-800" aria-label="Notifications">
              <i className="fa-regular fa-bell text-xl" aria-hidden />
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
            </button>
            <button type="button" className="p-2 text-gray-600 hover:text-gray-800" aria-label="Help">
              <i className="fa-regular fa-question-circle text-xl" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
        <div className="grid grid-cols-3 gap-6">
          <div id="order-main-section" className="col-span-2 space-y-6">
            <div id="order-status-card" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center">
                    <i className="fa-solid fa-truck mr-2" aria-hidden />Shipped
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center">
                    <i className="fa-solid fa-check-circle mr-2" aria-hidden />Paid
                  </span>
                </div>
                <button type="button" className="text-gray-400 hover:text-gray-600" aria-label="More options">
                  <i className="fa-solid fa-ellipsis-h text-xl" aria-hidden />
                </button>
              </div>
              <div className="flex items-center">
                <img src="/placeholder-avatar.png" alt="Customer" className="w-12 h-12 rounded-full object-cover" />
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Customer since Dec 2025</p>
                </div>
              </div>
            </div>

            <div id="order-items-card" className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Order Items: 3</h3>
              </div>
              <div className="p-6 space-y-4">
                {orderItems.map((item, i) => (
                  <div key={item.sku} className={`flex items-center justify-between ${i < orderItems.length - 1 ? "pb-4 border-b border-gray-100" : "pb-4"}`}>
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                        <img className="w-full h-full object-cover" src={item.img} alt={item.alt} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                        <p className="text-sm text-gray-500">Color: {item.color}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{item.price} × {item.qty}</p>
                      <p className="font-semibold text-gray-800">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div id="shipment-tracking-card" className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Shipment Tracking</h3>
                  <Link href="/vendor/shipment-status" className="text-primary text-sm font-medium hover:underline">Update Status</Link>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Tracking Number</p>
                    <p className="font-semibold text-gray-800">TRK-2847-US-001</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Carrier</p>
                    <p className="font-semibold text-gray-800">FedEx Express</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Est. Delivery</p>
                    <p className="font-semibold text-gray-800">Jan 22, 2026</p>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  {trackingSteps.map((step, i) => (
                    <div key={i} className="flex items-start">
                      <div className="flex flex-col items-center mr-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.done ? "bg-primary" : "bg-gray-200"}`}>
                          <i className={`fa-solid fa-check ${step.done ? "text-white" : "text-gray-400"}`} aria-hidden />
                        </div>
                        {i < trackingSteps.length - 1 && (
                          <div className={`w-0.5 h-16 mt-2 ${step.line === "primary" ? "bg-primary" : "bg-gray-200"}`} />
                        )}
                      </div>
                      <div className="flex-1 pt-2">
                        <p className="font-medium text-gray-800">{step.label}</p>
                        <p className="text-sm text-gray-500">{step.time}</p>
                        <p className="text-sm text-gray-600 mt-1">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div id="payment-summary-card" className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Payment Summary</h3>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-800">$156.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-800">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium text-gray-800">$0.00</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-semibold text-gray-800">Total</span>
                  <span className="font-bold text-gray-800 text-lg">$156.00</span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">Payment Method</p>
                      <p className="text-sm text-gray-500">Visa ending in 4242</p>
                    </div>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Paid</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Transaction ID: TXN-2847-2026-01-18</p>
                </div>
              </div>
            </div>
          </div>

          <div id="order-sidebar-section" className="col-span-1 space-y-6">
            <div id="customer-info-card" className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Customer</h3>
                  <button type="button" className="text-gray-400 hover:text-gray-600" aria-label="Edit">
                    <i className="fa-solid fa-pencil text-sm" aria-hidden />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <p className="font-medium text-gray-800">Sarah Johnson</p>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <i className="fa-regular fa-envelope mr-2 text-gray-400" aria-hidden />sarah.j@email.com
                  </p>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <i className="fa-solid fa-phone mr-2 text-gray-400" aria-hidden />+1 (555) 123-4567
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-2">Customer Stats</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Orders</span>
                    <span className="font-medium text-gray-800">8</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-gray-600">Total Spent</span>
                    <span className="font-medium text-gray-800">$1,247</span>
                  </div>
                </div>
              </div>
            </div>

            <div id="shipping-address-card" className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Shipping Address</h3>
                  <button type="button" className="text-gray-400 hover:text-gray-600" aria-label="Edit">
                    <i className="fa-solid fa-pencil text-sm" aria-hidden />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <p className="font-medium text-gray-800">Sarah Johnson</p>
                <p className="text-sm text-gray-600 mt-2">1234 Oak Street</p>
                <p className="text-sm text-gray-600">Apt 5B</p>
                <p className="text-sm text-gray-600">San Francisco, CA 94102</p>
                <p className="text-sm text-gray-600">United States</p>
                <button type="button" className="mt-4 text-primary text-sm font-medium hover:underline flex items-center">
                  <i className="fa-solid fa-map-marker-alt mr-2" aria-hidden />View on Map
                </button>
              </div>
            </div>

            <div id="billing-address-card" className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Billing Address</h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600">Same as shipping address</p>
              </div>
            </div>

            <div id="order-notes-card" className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Order Notes</h3>
                  <button type="button" className="text-gray-400 hover:text-gray-600" aria-label="Edit">
                    <i className="fa-solid fa-pencil text-sm" aria-hidden />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 italic">Please leave package at the front desk</p>
              </div>
            </div>

            <div id="order-actions-card" className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 space-y-3">
                <button type="button" className="w-full bg-primary hover:bg-secondary text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center">
                  <i className="fa-solid fa-print mr-2" aria-hidden />Print Invoice
                </button>
                <button type="button" className="w-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium flex items-center justify-center">
                  <i className="fa-solid fa-download mr-2" aria-hidden />Download Packing Slip
                </button>
                <button type="button" className="w-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium flex items-center justify-center">
                  <i className="fa-regular fa-envelope mr-2" aria-hidden />Email Customer
                </button>
                <button type="button" className="w-full bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 py-3 px-4 rounded-lg font-medium flex items-center justify-center">
                  <i className="fa-solid fa-ban mr-2" aria-hidden />Cancel Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
