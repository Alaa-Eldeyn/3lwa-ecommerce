"use client";

import { Link } from "@/src/i18n/routing";
import { formatPrice } from "@/src/config/currency";

const todayOrders = [
  { id: "ORD-2024-5847", date: "January 15, 2024 • 2:45 PM", items: "3", total: 245, status: "Processing", statusClass: "bg-yellow-100 text-yellow-800", icon: "fa-clock", iconBg: "bg-yellow-50", iconColor: "text-yellow-600", customer: "Sarah Johnson", location: "New York, NY" },
  { id: "ORD-2024-5846", date: "January 15, 2024 • 11:20 AM", items: "2", total: 189, status: "Shipped", statusClass: "bg-purple-100 text-purple-800", icon: "fa-truck", iconBg: "bg-purple-50", iconColor: "text-purple-600", customer: "Michael Chen", location: "Los Angeles, CA" },
  { id: "ORD-2024-5845", date: "January 15, 2024 • 9:15 AM", items: "5", total: 567.5, status: "Pending", statusClass: "bg-blue-100 text-blue-800", icon: "fa-box", iconBg: "bg-blue-50", iconColor: "text-blue-600", customer: "Emma Rodriguez", location: "Chicago, IL" },
];

const thisWeekOrders = [
  { id: "ORD-2024-5844", date: "January 14, 2024 • 4:30 PM", items: "1", total: 129, status: "Delivered", statusClass: "bg-green-100 text-green-800", icon: "fa-check-circle", iconBg: "bg-green-50", iconColor: "text-green-600", customer: "David Thompson", location: "Miami, FL" },
  { id: "ORD-2024-5843", date: "January 14, 2024 • 1:15 PM", items: "4", total: 398, status: "Shipped", statusClass: "bg-purple-100 text-purple-800", icon: "fa-truck", iconBg: "bg-purple-50", iconColor: "text-purple-600", customer: "Lisa Park", location: "Seattle, WA" },
  { id: "ORD-2024-5842", date: "January 13, 2024 • 6:45 PM", items: "2", total: 276, status: "Processing", statusClass: "bg-yellow-100 text-yellow-800", icon: "fa-clock", iconBg: "bg-yellow-50", iconColor: "text-yellow-600", customer: "Alex Williams", location: "Boston, MA" },
  { id: "ORD-2024-5841", date: "January 13, 2024 • 2:30 PM", items: "3", total: 445, status: "Delivered", statusClass: "bg-green-100 text-green-800", icon: "fa-check-circle", iconBg: "bg-green-50", iconColor: "text-green-600", customer: "Jennifer Martinez", location: "Austin, TX" },
  { id: "ORD-2024-5840", date: "January 12, 2024 • 10:20 AM", items: "1", total: 89, status: "Cancelled", statusClass: "bg-red-100 text-red-800", icon: "fa-times-circle", iconBg: "bg-red-50", iconColor: "text-red-600", customer: "Robert Taylor", location: "Denver, CO" },
];

function OrderCard({ order }: { order: (typeof todayOrders)[0] }) {
  return (
    <Link href="/dashboard/order-details" className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 ${order.iconBg} rounded-lg flex items-center justify-center`}>
            <i className={`fas ${order.icon} ${order.iconColor} text-lg`} aria-hidden />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">#{order.id}</h3>
            <p className="text-sm text-gray-500">{order.date}</p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <p className="text-sm text-gray-500">Items</p>
            <p className="font-semibold text-gray-900">{order.items}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total</p>
            <p className="font-semibold text-gray-900">{formatPrice(order.total)}</p>
          </div>
          <span className={`px-4 py-2 ${order.statusClass} text-sm font-medium rounded-lg`}>{order.status}</span>
          <span className="text-gray-400 hover:text-gray-600">
            <i className="fas fa-chevron-right" aria-hidden />
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <i className="fas fa-user text-gray-400" aria-hidden />
        <span>{order.customer}</span>
        <span className="text-gray-400">•</span>
        <i className="fas fa-map-marker-alt text-gray-400" aria-hidden />
        <span>{order.location}</span>
      </div>
    </Link>
  );
}

export function OrdersList() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <header id="header" className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and track all your orders</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input type="text" placeholder="Search orders..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-64" aria-label="Search orders" />
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Status filter">
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </header>

      <div id="content-area" className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          <div id="stats-section" className="grid grid-cols-4 gap-6 mb-8">
            <div id="stat-card-1" className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <i className="fas fa-shopping-bag text-blue-600" aria-hidden />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">348</p>
              <p className="text-xs text-green-600 mt-2"><i className="fas fa-arrow-up mr-1" aria-hidden />12% from last month</p>
            </div>
            <div id="stat-card-2" className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500">Processing</h3>
                <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <i className="fas fa-clock text-yellow-600" aria-hidden />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">28</p>
              <p className="text-xs text-gray-500 mt-2">Needs attention</p>
            </div>
            <div id="stat-card-3" className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500">Shipped</h3>
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <i className="fas fa-truck text-purple-600" aria-hidden />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">45</p>
              <p className="text-xs text-gray-500 mt-2">In transit</p>
            </div>
            <div id="stat-card-4" className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500">Revenue</h3>
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <i className="fas fa-dollar-sign text-green-600" aria-hidden />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{formatPrice(24890)}</p>
              <p className="text-xs text-green-600 mt-2"><i className="fas fa-arrow-up mr-1" aria-hidden />18% from last month</p>
            </div>
          </div>

          <div id="today-orders-section" className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Today</h2>
              <span className="text-sm text-gray-500">8 orders</span>
            </div>
            <div className="space-y-4">
              {todayOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>

          <div id="this-week-orders-section" className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">This Week</h2>
              <span className="text-sm text-gray-500">32 orders</span>
            </div>
            <div className="space-y-4">
              {thisWeekOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>

          <div id="pagination-section" className="flex items-center justify-between p-6 bg-white rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Showing <span className="font-semibold">1-10</span> of <span className="font-semibold">348</span> orders</p>
            <div className="flex items-center space-x-2">
              <button type="button" className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                <i className="fas fa-chevron-left" aria-hidden />
              </button>
              <button type="button" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">1</button>
              <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">2</button>
              <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">3</button>
              <span className="px-2 text-gray-400">...</span>
              <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">35</button>
              <button type="button" className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                <i className="fas fa-chevron-right" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
