"use client";

import { Link } from "@/src/i18n/routing";

const topItems = [
  { name: "Premium Cotton T-Shirt", sku: "TSH-001", price: "$29.99", sold: "142 sold", change: "+24%", icon: "fa-shirt" },
  { name: "Running Shoes Pro", sku: "SHO-045", price: "$89.99", sold: "98 sold", change: "+18%", icon: "fa-shoe-prints" },
  { name: "Summer Cap Collection", sku: "CAP-023", price: "$19.99", sold: "87 sold", change: "+15%", icon: "fa-hat-cowboy" },
  { name: "Leather Handbag", sku: "BAG-112", price: "$129.99", sold: "56 sold", change: "+12%", icon: "fa-bag-shopping" },
];

const recentOrders: Array<{ id: string; items: string; time: string; total: string; status: string; statusClass: string; totalClass?: string }> = [
  { id: "ORD-2847", items: "3 items", time: "2 hours ago", total: "$159.97", status: "Paid", statusClass: "text-green-600 bg-green-50" },
  { id: "ORD-2846", items: "1 item", time: "5 hours ago", total: "$89.99", status: "Processing", statusClass: "text-amber-600 bg-amber-50" },
  { id: "ORD-2845", items: "2 items", time: "1 day ago", total: "$49.98", status: "Shipped", statusClass: "text-blue-600 bg-blue-50" },
  { id: "ORD-2844", items: "5 items", time: "2 days ago", total: "$324.95", status: "Delivered", statusClass: "text-green-600 bg-green-50" },
  { id: "ORD-2843", items: "1 item", time: "3 days ago", total: "$29.99", status: "Cancelled", statusClass: "text-red-600 bg-red-50", totalClass: "text-gray-400" },
];

export function DashboardV1() {
  return (
    <div id="dashboard-main" className="px-8 py-6 text-foreground">
      <div id="welcome-section" className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Ahmed!</h1>
            <p className="text-gray-600">Here&apos;s what&apos;s happening with your store today</p>
          </div>
          <div className="flex items-center gap-3">
            <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="Date range">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last year</option>
            </select>
            <button type="button" className="px-4 py-2 bg-primary hover:bg-header text-white text-sm font-semibold rounded-lg transition-all flex items-center gap-2">
              <i className="fa-solid fa-download" aria-hidden />Export Report
            </button>
          </div>
        </div>
      </div>

      <div id="stats-overview" className="grid grid-cols-4 gap-5 mb-6">
        <div id="sales-card" className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <i className="fa-solid fa-dollar-sign text-green-600 text-xl" aria-hidden />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12.5%</span>
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">$24,580</div>
          <div className="text-sm text-gray-500">Total Sales</div>
        </div>
        <div id="orders-card" className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <i className="fa-solid fa-shopping-bag text-blue-600 text-xl" aria-hidden />
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">+8.2%</span>
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">342</div>
          <div className="text-sm text-gray-500">Total Orders</div>
        </div>
        <div id="items-card" className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <i className="fa-solid fa-box text-purple-600 text-xl" aria-hidden />
            </div>
            <span className="text-xs font-semibold text-gray-500 bg-gray-50 px-2 py-1 rounded-full">128 active</span>
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">156</div>
          <div className="text-sm text-gray-500">Total Items</div>
        </div>
        <div id="wallet-card" className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <i className="fa-solid fa-wallet text-amber-600 text-xl" aria-hidden />
            </div>
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Available</span>
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">$8,240</div>
          <div className="text-sm text-gray-500">Wallet Balance</div>
        </div>
      </div>

      <div id="secondary-stats" className="grid grid-cols-3 gap-5 mb-6">
        <div id="pending-balance-card" className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl border border-orange-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-clock text-orange-600" aria-hidden />
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">$3,450</div>
                <div className="text-xs text-gray-600">Pending Balance</div>
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-600">Will be available in 2-3 business days</div>
        </div>
        <div id="pending-orders-card" className="bg-gradient-to-br from-red-50 to-red-100/50 rounded-xl border border-red-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-exclamation-circle text-red-600" aria-hidden />
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">12</div>
                <div className="text-xs text-gray-600">Pending Actions</div>
              </div>
            </div>
            <Link href="/vendor/orders" className="text-xs font-semibold text-red-600 hover:text-red-700">View All</Link>
          </div>
          <div className="text-xs text-gray-600">Orders requiring immediate attention</div>
        </div>
        <div id="reviews-card" className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-xl border border-yellow-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-star text-yellow-600" aria-hidden />
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">4.8</div>
                <div className="text-xs text-gray-600">Vendor Rating</div>
              </div>
            </div>
            <Link href="/vendor/vendor-reviews" className="text-xs font-semibold text-yellow-600 hover:text-yellow-700">View All</Link>
          </div>
          <div className="text-xs text-gray-600">Based on 284 customer reviews</div>
        </div>
      </div>

      <div id="content-grid" className="grid grid-cols-3 gap-5 mb-6">
        <div id="top-items-card" className="col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-foreground">Top Performing Items</h3>
            <Link href="/vendor/items" className="text-sm font-semibold text-primary hover:text-headerDark">View All Items</Link>
          </div>
          <div className="space-y-4">
            {topItems.map((item) => (
              <div key={item.sku} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                <div className="w-14 h-14 bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                  <i className={`fa-solid ${item.icon} text-primary text-xl`} aria-hidden />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground mb-1">{item.name}</div>
                  <div className="text-xs text-gray-500">SKU: {item.sku}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-foreground">{item.price}</div>
                  <div className="text-xs text-green-600 font-medium">{item.sold}</div>
                </div>
                <div className="w-16 text-right">
                  <div className="text-sm font-bold text-green-600">{item.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div id="recent-orders-card" className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-foreground">Recent Orders</h3>
            <Link href="/vendor/orders" className="text-sm font-semibold text-primary hover:text-headerDark">View All</Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <Link key={order.id} href="/vendor/order-details" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-primary">#{order.id}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${order.statusClass}`}>{order.status}</span>
                </div>
                <div className="text-sm font-semibold text-foreground mb-1">{order.items}</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{order.time}</span>
                  <span className={`text-sm font-bold ${order.totalClass ?? "text-foreground"}`}>{order.total}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div id="alerts-section" className="grid grid-cols-2 gap-5 mb-6">
        <div id="pending-alerts-card" className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-bell text-red-600" aria-hidden />
            </div>
            <h3 className="text-lg font-bold text-foreground">Pending Alerts</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <i className="fa-solid fa-circle-exclamation text-red-600 mt-0.5" aria-hidden />
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground mb-1">5 orders require shipping</div>
                <div className="text-xs text-gray-600">Orders pending for more than 24 hours</div>
              </div>
              <button type="button" className="text-xs font-semibold text-red-600 hover:text-red-700">Action</button>
            </div>
            <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <i className="fa-solid fa-triangle-exclamation text-amber-600 mt-0.5" aria-hidden />
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground mb-1">3 items low in stock</div>
                <div className="text-xs text-gray-600">Update inventory to avoid stockouts</div>
              </div>
              <button type="button" className="text-xs font-semibold text-amber-600 hover:text-amber-700">View</button>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <i className="fa-solid fa-info-circle text-blue-600 mt-0.5" aria-hidden />
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground mb-1">2 customer inquiries</div>
                <div className="text-xs text-gray-600">Respond to maintain high rating</div>
              </div>
              <button type="button" className="text-xs font-semibold text-blue-600 hover:text-blue-700">Reply</button>
            </div>
          </div>
        </div>
        <div id="quick-actions-card" className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-bolt text-primary" aria-hidden />
            </div>
            <h3 className="text-lg font-bold text-foreground">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/vendor/add-item" className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20 border border-primary/20 rounded-lg transition-all text-left">
              <i className="fa-solid fa-plus text-primary text-xl mb-2" aria-hidden />
              <div className="text-sm font-semibold text-foreground">Add New Item</div>
            </Link>
            <Link href="/vendor/create-promo" className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200 rounded-lg transition-all text-left">
              <i className="fa-solid fa-tag text-blue-600 text-xl mb-2" aria-hidden />
              <div className="text-sm font-semibold text-foreground">Create Promo</div>
            </Link>
            <Link href="/vendor/withdrawal-request" className="p-4 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border border-green-200 rounded-lg transition-all text-left">
              <i className="fa-solid fa-money-bill-transfer text-green-600 text-xl mb-2" aria-hidden />
              <div className="text-sm font-semibold text-foreground">Request Payout</div>
            </Link>
            <button type="button" className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border border-purple-200 rounded-lg transition-all text-left">
              <i className="fa-solid fa-chart-simple text-purple-600 text-xl mb-2" aria-hidden />
              <div className="text-sm font-semibold text-foreground">View Analytics</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
