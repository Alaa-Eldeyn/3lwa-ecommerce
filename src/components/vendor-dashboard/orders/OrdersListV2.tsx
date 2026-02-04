"use client";

import { Link } from "@/src/i18n/routing";

const orders = [
  { id: "ORD-2847", status: "Paid", statusClass: "text-green-600 bg-green-50", mixed: true, customer: "Sarah Johnson", itemsText: "3 items (2 yours) • Order Date: Jan 15, 2024", badge: "Partial Fulfillment", badgeClass: "bg-amber-50 text-amber-700", sub: "Your items: Processing", total: "$159.97", time: "2 hours ago" },
  { id: "ORD-2846", status: "Processing", statusClass: "text-amber-600 bg-amber-50", mixed: false, customer: "Mike Chen", itemsText: "1 item (1 yours) • Order Date: Jan 15, 2024", badge: "Full Control", badgeClass: "bg-green-50 text-green-700", sub: null, total: "$89.99", time: "5 hours ago" },
  { id: "ORD-2845", status: "Shipped", statusClass: "text-blue-600 bg-blue-50", mixed: true, customer: "Emma Wilson", itemsText: "2 items (1 yours) • Order Date: Jan 14, 2024", badge: "Your items: Shipped", badgeClass: "bg-blue-50 text-blue-700", sub: null, total: "$49.98", time: "1 day ago" },
  { id: "ORD-2844", status: "Delivered", statusClass: "text-green-600 bg-green-50", mixed: false, customer: "David Brown", itemsText: "5 items (3 yours) • Order Date: Jan 12, 2024", badge: "Completed", badgeClass: "bg-green-50 text-green-700", sub: null, total: "$324.95", time: "2 days ago" },
];

export function OrdersListV2() {
  return (
    <div id="orders-main" className="px-8 py-6">
      <div id="orders-header" className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Order Management</h1>
          <p className="text-gray-600">Manage your orders and shipping status</p>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all">
            <i className="fa-solid fa-download mr-2" aria-hidden />Export Orders
          </button>
        </div>
      </div>

      <div id="orders-content" className="grid grid-cols-3 gap-6">
        <div id="orders-list-section" className="col-span-2">
          <div className="bg-white rounded-xl border border-gray-200">
            <div id="orders-filters" className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 relative">
                  <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden />
                  <input type="text" placeholder="Search orders by ID, customer, or items..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20" aria-label="Search orders" />
                </div>
                <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="Status">
                  <option>All Status</option>
                  <option>Paid</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <input type="date" className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="Date from" />
                <span className="text-sm text-gray-500">to</span>
                <input type="date" className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="Date to" />
                <button type="button" className="px-4 py-2 bg-primary hover:bg-header text-white text-sm font-semibold rounded-lg transition-all">
                  Apply Filter
                </button>
              </div>
            </div>

            <div id="orders-list" className="divide-y divide-gray-200">
              {orders.map((order) => (
                <Link key={order.id} href="/vendor/order-details" className="block order-item p-6 hover:bg-gray-50 cursor-pointer transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-lg font-bold text-primary">#{order.id}</span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${order.statusClass}`}>{order.status}</span>
                        {order.mixed && (
                          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                            <i className="fa-solid fa-users mr-1" aria-hidden />Mixed Vendor
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">Customer: {order.customer}</div>
                      <div className="text-sm text-gray-600 mb-3">{order.itemsText}</div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${order.badgeClass}`}>{order.badge}</span>
                        {order.sub && <span className="text-xs text-gray-500">{order.sub}</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-foreground mb-1">{order.total}</div>
                      <div className="text-sm text-gray-500">{order.time}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div id="order-details-section" className="bg-white rounded-xl border border-gray-200">
          <div id="order-details-content">
            <div id="order-summary" className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">Order #ORD-2847</h3>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Paid</span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer:</span>
                  <span className="font-medium text-foreground">Sarah Johnson</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-medium text-foreground">Jan 15, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-bold text-foreground">$159.97</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Your Items:</span>
                  <span className="font-medium text-foreground">2 of 3</span>
                </div>
              </div>
            </div>

            <div id="vendor-items" className="p-6 border-b border-gray-200">
              <h4 className="text-md font-bold text-foreground mb-4">Your Items in this Order</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                    <i className="fa-solid fa-shirt text-primary" aria-hidden />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground text-sm">Premium Cotton T-Shirt</div>
                    <div className="text-xs text-gray-500">Size: M, Color: Blue</div>
                    <div className="text-xs text-gray-500">Qty: 1 × $29.99</div>
                  </div>
                  <div className="text-sm font-bold text-foreground">$29.99</div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                    <i className="fa-solid fa-shoe-prints text-primary" aria-hidden />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground text-sm">Running Shoes Pro</div>
                    <div className="text-xs text-gray-500">Size: 10, Color: Black</div>
                    <div className="text-xs text-gray-500">Qty: 1 × $89.99</div>
                  </div>
                  <div className="text-sm font-bold text-foreground">$89.99</div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <i className="fa-solid fa-info-circle text-blue-600 mt-0.5" aria-hidden />
                  <div className="text-xs text-blue-700">
                    <div className="font-medium">Mixed Vendor Order</div>
                    <div>This order contains items from multiple vendors. You can only manage shipping for your own items.</div>
                  </div>
                </div>
              </div>
            </div>

            <div id="shipping-controls" className="p-6 border-b border-gray-200">
              <h4 className="text-md font-bold text-foreground mb-4">Shipping Management</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div>
                    <div className="text-sm font-semibold text-foreground">Current Status</div>
                    <div className="text-xs text-amber-700">Processing - Awaiting shipment</div>
                  </div>
                  <span className="text-xs font-medium text-amber-600 bg-amber-100 px-3 py-1 rounded-full">Processing</span>
                </div>
                <div className="space-y-3">
                  <Link href="/vendor/shipment-status" className="flex w-full px-4 py-3 bg-primary hover:bg-header text-white font-semibold rounded-lg transition-all items-center justify-center gap-2">
                    <i className="fa-solid fa-truck" aria-hidden />Mark as Shipped
                  </Link>
                  <button type="button" className="w-full px-4 py-3 border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition-all flex items-center justify-center gap-2">
                    <i className="fa-solid fa-tag" aria-hidden />Add Tracking Number
                  </button>
                </div>
              </div>
            </div>

            <div id="shipping-timeline" className="p-6">
              <h4 className="text-md font-bold text-foreground mb-4">Shipping Timeline</h4>
              <div className="space-y-4">
                {[
                  { label: "Order Confirmed", time: "Jan 15, 2024 - 10:30 AM", done: true },
                  { label: "Payment Received", time: "Jan 15, 2024 - 10:32 AM", done: true },
                  { label: "Processing", time: "Jan 15, 2024 - 11:00 AM", current: true },
                  { label: "Shipped", time: "Pending", done: false },
                  { label: "Delivered", time: "Pending", done: false },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full mt-1 shrink-0 ${step.current ? "bg-amber-500" : step.done ? "bg-green-500" : "bg-gray-300"}`} />
                    <div>
                      <div className={`text-sm font-semibold ${step.done || step.current ? "text-foreground" : "text-gray-400"}`}>{step.label}</div>
                      <div className={`text-xs ${step.done || step.current ? "text-gray-500" : "text-gray-400"}`}>{step.time}</div>
                      {step.current && <div className="text-xs text-amber-600 font-medium">Current Status</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
