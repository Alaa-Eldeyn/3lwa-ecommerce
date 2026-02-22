"use client";

import { Link } from "@/src/i18n/routing";

const relatedOrders = [
  { id: "ORD-2847", customer: "Sarah Johnson", avatar: "avatar-5.jpg", date: "Jan 18, 2026", qty: 2, amount: "$599.98", status: "Shipped", statusClass: "bg-green-100 text-green-700" },
  { id: "ORD-2835", customer: "Michael Chen", avatar: "avatar-3.jpg", date: "Jan 17, 2026", qty: 1, amount: "$299.99", status: "Processing", statusClass: "bg-yellow-100 text-yellow-700" },
  { id: "ORD-2821", customer: "Emma Davis", avatar: "avatar-6.jpg", date: "Jan 16, 2026", qty: 3, amount: "$899.97", status: "Delivered", statusClass: "bg-blue-100 text-blue-700" },
  { id: "ORD-2814", customer: "James Wilson", avatar: "avatar-4.jpg", date: "Jan 15, 2026", qty: 1, amount: "$299.99", status: "Shipped", statusClass: "bg-green-100 text-green-700" },
  { id: "ORD-2803", customer: "Olivia Brown", avatar: "avatar-7.jpg", date: "Jan 14, 2026", qty: 2, amount: "$599.98", status: "Delivered", statusClass: "bg-blue-100 text-blue-700" },
  { id: "ORD-2795", customer: "David Martinez", avatar: "avatar-8.jpg", date: "Jan 13, 2026", qty: 1, amount: "$299.99", status: "Cancelled", statusClass: "bg-red-100 text-red-700" },
];

export function ItemDetails() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/vendor/items" className="text-gray-400 hover:text-gray-600" aria-label="Back">
              <i className="fa-solid fa-arrow-left" aria-hidden />
            </Link>
            <h2 className="text-2xl font-semibold text-gray-800">Premium Wireless Headphones</h2>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Active</span>
          </div>
          <div className="flex items-center gap-4">
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-6">
              <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                <img className="w-full h-full object-cover" src="/placeholder.png" alt="Premium wireless headphones" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Premium Wireless Headphones</h1>
                <p className="text-gray-600 mb-3">SKU: WH-PRO-2024-BLK</p>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center">
                    <i className="fa-solid fa-star text-yellow-400 text-sm" aria-hidden />
                    <span className="ml-1 text-sm font-medium text-gray-800">4.8</span>
                    <span className="ml-1 text-sm text-gray-500">(127 reviews)</span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <span className="text-sm text-gray-600">Category: Electronics</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-primary">$299.99</span>
                  <span className="text-lg text-gray-400 line-through">$399.99</span>
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-medium">25% OFF</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/vendor/edit-item" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
                <i className="fa-solid fa-edit mr-2" aria-hidden />Edit
              </Link>
              <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <i className="fa-solid fa-ellipsis-h" aria-hidden />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4 mb-6">
          {[
            { label: "Total Views", value: "2,847", icon: "fa-eye", iconBg: "bg-primary/10", iconColor: "text-primary", sub: "15%", subClass: "text-green-500" },
            { label: "Units Sold", value: "342", icon: "fa-shopping-cart", iconBg: "bg-secondary/10", iconColor: "text-secondary", sub: "22%", subClass: "text-green-500" },
            { label: "Revenue", value: "$102,597", icon: "fa-dollar-sign", iconBg: "bg-green-100", iconColor: "text-green-600", sub: "18%", subClass: "text-green-500" },
            { label: "In Stock", value: "23", icon: "fa-warehouse", iconBg: "bg-blue-100", iconColor: "text-blue-600", sub: "Low", subClass: "text-orange-500" },
            { label: "Conversion", value: "12.1%", icon: "fa-percent", iconBg: "bg-purple-100", iconColor: "text-purple-600", sub: "Rate", subClass: "text-gray-500" },
          ].map((m) => (
            <div key={m.label} className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${m.iconBg} rounded-lg flex items-center justify-center`}>
                  <i className={`fa-solid ${m.icon} ${m.iconColor}`} aria-hidden />
                </div>
                <span className={`text-xs font-medium flex items-center ${m.subClass}`}>
                  {m.sub.startsWith("%") ? <i className="fa-solid fa-arrow-up text-xs mr-1" aria-hidden /> : null}{m.sub}
                </span>
              </div>
              <h3 className="text-gray-500 text-xs mb-1">{m.label}</h3>
              <p className="text-xl font-bold text-gray-800">{m.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Sales Performance</h3>
              <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary" aria-label="Period">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Last 6 months</option>
                <option>Last year</option>
              </select>
            </div>
            <div id="sales-chart" className="h-[300px] bg-gray-50 rounded flex items-center justify-center text-gray-400 text-sm">Chart area</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Traffic Sources</h3>
              <button type="button" className="text-sm text-primary hover:underline">View Details</button>
            </div>
            <div id="traffic-chart" className="h-[300px] bg-gray-50 rounded flex items-center justify-center text-gray-400 text-sm">Chart area</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Related Orders</h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input type="text" placeholder="Search orders..." className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary" aria-label="Search orders" />
                  <i className="fa-solid fa-search absolute left-3 top-3 text-gray-400 text-xs" aria-hidden />
                </div>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary" aria-label="Status">
                  <option>All Status</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>
          </div>
          <div className="p-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="pb-3 text-sm font-medium text-gray-500">Order ID</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Customer</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Date</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Quantity</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Amount</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Status</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {relatedOrders.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100">
                    <td className="py-4 text-sm font-medium text-primary hover:underline cursor-pointer"><Link href="/vendor/order-details">#{row.id}</Link></td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <img src="/placeholder-avatar.png" alt="" className="w-8 h-8 rounded-full object-cover mr-2" />
                        <span className="text-sm text-gray-800">{row.customer}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-gray-600">{row.date}</td>
                    <td className="py-4 text-sm text-gray-800">{row.qty}</td>
                    <td className="py-4 text-sm font-medium text-gray-800">{row.amount}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${row.statusClass}`}>{row.status}</span>
                    </td>
                    <td className="py-4">
                      <button type="button" className="text-gray-400 hover:text-gray-600"><i className="fa-solid fa-ellipsis-h" aria-hidden /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-600">Showing 1 to 6 of 342 orders</p>
              <div className="flex items-center gap-2">
                <button type="button" className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Previous</button>
                <button type="button" className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm">1</button>
                <button type="button" className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">2</button>
                <button type="button" className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">3</button>
                <span className="px-2 text-gray-400">...</span>
                <button type="button" className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">57</button>
                <button type="button" className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Item Information</h3>
            <div className="space-y-4">
              {[
                { k: "Brand", v: "AudioTech Pro" },
                { k: "Model", v: "AT-WH-PRO-2024" },
                { k: "Weight", v: "250g" },
                { k: "Dimensions", v: "20 x 18 x 8 cm" },
                { k: "Color Options", v: "Black, White, Silver" },
                { k: "Warranty", v: "2 Years" },
                { k: "Date Added", v: "Dec 15, 2025" },
              ].map(({ k, v }) => (
                <div key={k} className={`flex justify-between py-2 ${k !== "Date Added" ? "border-b border-gray-100" : ""}`}>
                  <span className="text-sm text-gray-600">{k}</span>
                  <span className="text-sm font-medium text-gray-800">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { icon: "fa-check", iconBg: "bg-green-100", iconColor: "text-green-600", title: "Order #ORD-2847 shipped", time: "2 hours ago" },
                { icon: "fa-shopping-cart", iconBg: "bg-blue-100", iconColor: "text-blue-600", title: "New order received", time: "5 hours ago" },
                { icon: "fa-exclamation-triangle", iconBg: "bg-orange-100", iconColor: "text-orange-600", title: "Low stock alert triggered", time: "8 hours ago" },
                { icon: "fa-star", iconBg: "bg-purple-100", iconColor: "text-purple-600", title: "New 5-star review received", time: "1 day ago" },
                { icon: "fa-edit", iconBg: "bg-primary/10", iconColor: "text-primary", title: "Price updated", time: "2 days ago" },
              ].map((a) => (
                <div key={a.title} className="flex items-start">
                  <div className={`w-8 h-8 ${a.iconBg} rounded-full flex items-center justify-center mr-3 shrink-0`}>
                    <i className={`fa-solid ${a.icon} ${a.iconColor} text-xs`} aria-hidden />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{a.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
