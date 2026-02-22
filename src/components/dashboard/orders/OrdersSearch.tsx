"use client";

import { Link } from "@/src/i18n/routing";
import { formatPrice } from "@/src/config/currency";

const tableRows = [
  { id: "ORD-2024-001", track: "TRK789123", customer: "Ahmed Hassan", email: "ahmed.hassan@email.com", location: "Cairo, Egypt", items: "Wireless Headphones", itemsSub: "Qty: 1 • SKU: WH-001", total: 89.5, status: "Delivered", statusClass: "bg-green-100 text-green-700", date: "Jan 15, 2024", time: "2:30 PM", actionIcon: "fa-download" },
  { id: "ORD-2024-002", track: "TRK789124", customer: "Fatima Al-Zahra", email: "fatima.zahra@email.com", location: "Alexandria, Egypt", items: "Smart Watch + Phone Case", itemsSub: "Qty: 2 • Multiple SKUs", total: 156.25, status: "Processing", statusClass: "bg-yellow-100 text-yellow-800", date: "Jan 15, 2024", time: "11:15 AM", actionIcon: "fa-truck" },
  { id: "ORD-2024-003", track: "TRK789125", customer: "Omar Khalil", email: "omar.khalil@email.com", location: "Giza, Egypt", items: "Bluetooth Speaker", itemsSub: "Qty: 1 • SKU: BS-002", total: 43.75, status: "Shipped", statusClass: "bg-blue-100 text-blue-800", date: "Jan 14, 2024", time: "4:45 PM", actionIcon: "fa-check" },
  { id: "ORD-2024-004", track: "TRK789126", customer: "Layla Mohammed", email: "layla.mohammed@email.com", location: "Mansoura, Egypt", items: "Tablet Stand", itemsSub: "Qty: 2 • SKU: TS-003", total: 98, status: "Pending", statusClass: "bg-orange-100 text-orange-800", date: "Jan 14, 2024", time: "9:20 AM", actionIcon: "fa-play" },
  { id: "ORD-2024-005", track: "TRK789127", customer: "Youssef Ali", email: "youssef.ali@email.com", location: "Aswan, Egypt", items: "Gaming Mouse", itemsSub: "Qty: 1 • SKU: GM-004", total: 67.3, status: "Cancelled", statusClass: "bg-red-100 text-red-800", date: "Jan 13, 2024", time: "6:10 PM", actionIcon: "fa-undo" },
];

export function OrdersSearch() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div id="orders-header" className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Orders & Refunds</h1>
            <p className="text-gray-600 mt-1">Manage all orders for your items and track shipping status</p>
          </div>
          <div className="flex items-center space-x-3">
            <button type="button" className="bg-white border border-gray-300 text-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              <i className="fa-solid fa-download mr-2" aria-hidden />Export Orders
            </button>
            <button type="button" className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
              <i className="fa-solid fa-filter mr-2" aria-hidden />Advanced Filters
            </button>
          </div>
        </div>
      </div>

      <div id="orders-filters" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Orders</label>
            <div className="relative">
              <input type="text" placeholder="Order ID, Customer name..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" aria-label="Search orders" />
              <i className="fa-solid fa-search absolute left-3 top-2.5 text-gray-400" aria-hidden />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="Status">
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date From</label>
            <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="Date from" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date To</label>
            <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="Date to" />
          </div>
          <div className="flex items-end">
            <button type="button" className="w-full bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <div id="orders-stats" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-6">
        {[
          { label: "Total Orders", value: "1,247", icon: "fa-shopping-bag", bg: "bg-blue-100", color: "text-blue-600" },
          { label: "Pending", value: "23", icon: "fa-clock", bg: "bg-orange-100", color: "text-orange-600" },
          { label: "Processing", value: "45", icon: "fa-cog", bg: "bg-yellow-100", color: "text-yellow-600" },
          { label: "Shipped", value: "156", icon: "fa-truck", bg: "bg-blue-100", color: "text-blue-600" },
          { label: "Completed", value: "1,023", icon: "fa-check-circle", bg: "bg-green-100", color: "text-green-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}>
                <i className={`fa-solid ${stat.icon} ${stat.color}`} aria-hidden />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div id="orders-table-container" className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Order Management</h2>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Showing 1-25 of 1,247 orders</span>
              <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="Per page">
                <option>25 per page</option>
                <option>50 per page</option>
                <option>100 per page</option>
              </select>
            </div>
          </div>
        </div>

        <div id="orders-table" className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                  <button type="button" className="flex items-center space-x-1 hover:text-gray-900">
                    <span>Order ID</span>
                    <i className="fa-solid fa-sort text-xs" aria-hidden />
                  </button>
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                  <button type="button" className="flex items-center space-x-1 hover:text-gray-900">
                    <span>Customer</span>
                    <i className="fa-solid fa-sort text-xs" aria-hidden />
                  </button>
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Items</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                  <button type="button" className="flex items-center space-x-1 hover:text-gray-900">
                    <span>Total</span>
                    <i className="fa-solid fa-sort text-xs" aria-hidden />
                  </button>
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                  <button type="button" className="flex items-center space-x-1 hover:text-gray-900">
                    <span>Date</span>
                    <i className="fa-solid fa-sort text-xs" aria-hidden />
                  </button>
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">#{row.id}</p>
                      <p className="text-xs text-gray-500">Track: {row.track}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{row.customer}</p>
                      <p className="text-xs text-gray-500">{row.email}</p>
                      <p className="text-xs text-gray-500">{row.location}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-foreground">{row.items}</p>
                      <p className="text-xs text-gray-500">{row.itemsSub}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-foreground">{formatPrice(row.total)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${row.statusClass}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-foreground">{row.date}</p>
                      <p className="text-xs text-gray-500">{row.time}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Link href="/dashboard/order-details" className="text-primary hover:text-primary/80 text-sm">
                        <i className="fa-solid fa-eye" aria-hidden />
                      </Link>
                      <button type="button" className="text-gray-600 hover:text-gray-800 text-sm">
                        <i className={`fa-solid ${row.actionIcon}`} aria-hidden />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div id="pagination" className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button type="button" className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50" disabled>
                <i className="fa-solid fa-chevron-left" aria-hidden />
              </button>
              <button type="button" className="px-3 py-1 bg-primary text-white rounded text-sm">1</button>
              <button type="button" className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
              <button type="button" className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">3</button>
              <span className="px-2 text-gray-500">...</span>
              <button type="button" className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">50</button>
              <button type="button" className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                <i className="fa-solid fa-chevron-right" aria-hidden />
              </button>
            </div>
            <p className="text-sm text-gray-600">Page 1 of 50</p>
          </div>
        </div>
      </div>
    </div>
  );
}
