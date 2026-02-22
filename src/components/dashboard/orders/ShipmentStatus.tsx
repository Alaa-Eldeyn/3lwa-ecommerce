"use client";

import { Link } from "@/src/i18n/routing";

const shipments = [
  {
    orderId: "ORD-2847",
    product: "Premium Wireless Headphones",
    customer: "Sarah Johnson",
    ordered: "Jan 18, 2026",
    status: "In Transit",
    statusClass: "bg-blue-100 text-blue-700",
    statusIcon: "fa-truck",
    amount: "$156.00",
    progressWidth: "60%",
    timeline: [
      { label: "Order Placed", time: "Jan 18, 10:30 AM", done: true, icon: "fa-check" },
      { label: "Picked Up", time: "Jan 18, 2:15 PM", done: true, icon: "fa-check" },
      { label: "In Transit", time: "Jan 19, 8:00 AM", done: true, icon: "fa-truck" },
      { label: "Out for Delivery", time: "Pending", done: false, icon: "fa-box" },
      { label: "Delivered", time: "Pending", done: false, icon: "fa-home" },
    ],
    location: "Cairo Distribution Center",
    tracking: "TRK2847293847",
    img: "/placeholder.png",
    imgAlt: "wireless headphones product on white background",
  },
  {
    orderId: "ORD-2846",
    product: "Smart Watch Pro",
    customer: "Michael Chen",
    ordered: "Jan 18, 2026",
    status: "Out for Delivery",
    statusClass: "bg-green-100 text-green-700",
    statusIcon: "fa-box-open",
    amount: "$89.50",
    progressWidth: "80%",
    timeline: [
      { label: "Order Placed", time: "Jan 18, 9:15 AM", done: true, icon: "fa-check" },
      { label: "Picked Up", time: "Jan 18, 1:30 PM", done: true, icon: "fa-check" },
      { label: "In Transit", time: "Jan 19, 7:00 AM", done: true, icon: "fa-check" },
      { label: "Out for Delivery", time: "Jan 20, 9:30 AM", done: true, icon: "fa-box" },
      { label: "Delivered", time: "Est. Today 5 PM", done: false, icon: "fa-home" },
    ],
    location: "Giza Local Hub",
    tracking: "TRK2846192736",
    img: "/placeholder.png",
    imgAlt: "smart watch product on white background",
  },
  {
    orderId: "ORD-2845",
    product: "Portable Bluetooth Speaker",
    customer: "Emma Davis",
    ordered: "Jan 17, 2026",
    status: "Delivered",
    statusClass: "bg-green-100 text-green-700",
    statusIcon: "fa-check-circle",
    amount: "$234.00",
    progressWidth: "100%",
    timeline: [
      { label: "Order Placed", time: "Jan 17, 11:00 AM", done: true, icon: "fa-check" },
      { label: "Picked Up", time: "Jan 17, 3:00 PM", done: true, icon: "fa-check" },
      { label: "In Transit", time: "Jan 18, 9:00 AM", done: true, icon: "fa-check" },
      { label: "Out for Delivery", time: "Jan 19, 10:00 AM", done: true, icon: "fa-check" },
      { label: "Delivered", time: "Jan 19, 4:30 PM", done: true, icon: "fa-home" },
    ],
    location: "Alexandria Warehouse",
    tracking: "TRK2845081928",
    img: "/placeholder.png",
    imgAlt: "bluetooth speaker product on white background",
  },
];

function ShipmentCard({ s }: { s: (typeof shipments)[0] }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
              <img className="w-full h-full object-cover" src={s.img} alt={s.imgAlt} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Order #{s.orderId}</h3>
              <p className="text-sm text-gray-600 mt-1">{s.product}</p>
              <p className="text-xs text-gray-500 mt-1">Customer: {s.customer}</p>
              <p className="text-xs text-gray-500">Ordered: {s.ordered}</p>
            </div>
          </div>
          <div className="text-right">
            <span className={`inline-flex items-center ${s.statusClass} px-3 py-1 rounded-full text-xs font-medium`}>
              <i className={`fa-solid ${s.statusIcon} mr-1.5`} aria-hidden />{s.status}
            </span>
            <p className="text-sm font-semibold text-gray-800 mt-2">{s.amount}</p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute top-5 left-4 right-4 h-0.5 bg-gray-200" />
          <div className="absolute top-5 left-4 h-0.5 bg-primary" style={{ width: s.progressWidth }} />
          <div className="relative flex justify-between">
            {s.timeline.map((step, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step.done ? "bg-primary" : "bg-gray-200"}`}>
                  <i className={`fa-solid ${step.icon} ${step.done ? "text-white" : "text-gray-400"}`} aria-hidden />
                </div>
                <p className={`text-xs font-medium ${step.done ? "text-gray-800" : "text-gray-500"}`}>{step.label}</p>
                <p className={`text-xs ${step.done ? "text-gray-500" : "text-gray-400"}`}>{step.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <i className="fa-solid fa-map-marker-alt text-gray-400 mr-2" aria-hidden />
              <span>{s.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <i className="fa-solid fa-shipping-fast text-gray-400 mr-2" aria-hidden />
              <span>Tracking: {s.tracking}</span>
            </div>
          </div>
          <Link href="/dashboard/order-details" className="text-primary text-sm font-medium hover:underline">View Details</Link>
        </div>
      </div>
    </div>
  );
}

export function ShipmentStatus() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <header id="header" className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-semibold text-gray-800">Shipment Status</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input type="text" placeholder="Search orders..." className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" aria-label="Search orders" />
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
        <div id="filters-section" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button type="button" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
                All Shipments
                <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">48</span>
              </button>
              <button type="button" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                In Transit
                <span className="ml-2 bg-gray-200 px-2 py-0.5 rounded-full text-xs">23</span>
              </button>
              <button type="button" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                Out for Delivery
                <span className="ml-2 bg-gray-200 px-2 py-0.5 rounded-full text-xs">12</span>
              </button>
              <button type="button" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                Delivered
                <span className="ml-2 bg-gray-200 px-2 py-0.5 rounded-full text-xs">9</span>
              </button>
              <button type="button" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                Delayed
                <span className="ml-2 bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs">4</span>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <button type="button" className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                <i className="fa-solid fa-calendar-alt mr-2" aria-hidden />Last 30 days
                <i className="fa-solid fa-chevron-down ml-2 text-xs" aria-hidden />
              </button>
              <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                <i className="fa-solid fa-download mr-2" aria-hidden />Export
              </button>
            </div>
          </div>
        </div>

        <div id="shipments-list" className="space-y-4">
          {shipments.map((s) => (
            <ShipmentCard key={s.orderId} s={s} />
          ))}
        </div>
      </main>
    </div>
  );
}
