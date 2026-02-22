"use client";

import { Link } from "@/src/i18n/routing";

const pendingRefunds = [
  { id: "refund-card-1", name: "Premium Wireless Headphones", orderId: "ORD-2024-5847", reason: "Product Defective", amount: "$129.00", updated: "2 hours ago", note: "The left speaker is not working properly. Audio cuts out frequently.", img: "/placeholder.png", alt: "wireless headphones product" },
  { id: "refund-card-2", name: "Smart Fitness Watch", orderId: "ORD-2024-5823", reason: "Wrong Item Received", amount: "$89.00", updated: "5 hours ago", note: "Ordered Silver but received Black color. Need exchange or refund.", img: "/placeholder.png", alt: "smart fitness watch product" },
  { id: "refund-card-3", name: "Protective Phone Case", orderId: "ORD-2024-5809", reason: "Not As Described", amount: "$27.00", updated: "1 day ago", note: "Case does not fit iPhone 15 Pro as advertised. Too loose.", img: "/placeholder.png", alt: "phone case protective cover" },
];

const approvedRefunds = [
  { id: "refund-card-4", name: "Wireless Earbuds Pro", orderId: "ORD-2024-5791", reason: "Changed Mind", amount: "$79.00", updated: "2 days ago", note: "Purchased different model. Product unused and in original packaging.", img: "/placeholder.png", alt: "wireless earbuds product" },
  { id: "refund-card-5", name: "Premium Watch Band", orderId: "ORD-2024-5776", reason: "Damaged in Transit", amount: "$39.00", updated: "3 days ago", note: "Band arrived with scratches and packaging was damaged.", img: "/placeholder.png", alt: "smart watch band accessory" },
];

const rejectedRefunds = [
  { id: "refund-card-6", name: "USB-C Cable Pack", orderId: "ORD-2024-5752", reason: "Changed Mind", amount: "$15.00", updated: "5 days ago", note: "Return window expired. Product was delivered 45 days ago.", img: "/placeholder.png", alt: "phone accessories product" },
];

function RefundCard({
  id,
  name,
  orderId,
  reason,
  amount,
  updated,
  note,
  img,
  alt,
  status,
  borderClass,
}: {
  id: string;
  name: string;
  orderId: string;
  reason: string;
  amount: string;
  updated: string;
  note: string;
  img: string;
  alt: string;
  status: "Pending" | "Approved" | "Rejected";
  borderClass: string;
}) {
  const statusClass = status === "Pending" ? "bg-yellow-100 text-yellow-800" : status === "Approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  const label = status === "Rejected" ? "Rejection Reason:" : "Customer Note:";
  return (
    <div id={id} className={`bg-white rounded-lg border ${borderClass} p-6 hover:shadow-md transition-shadow`}>
      <div className="flex items-start space-x-4">
        <div className="w-20 h-20 bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
          <img className="w-full h-full object-cover" src={img} alt={alt} />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{name}</h3>
              <p className="text-sm text-gray-500 mt-1">Order #{orderId}</p>
            </div>
            <span className={`px-3 py-1 ${statusClass} text-xs font-semibold rounded-full`}>{status}</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Reason</p>
              <p className="text-sm font-medium text-gray-900">{reason}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Amount</p>
              <p className="text-sm font-medium text-gray-900">{amount}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Last Updated</p>
              <p className="text-sm font-medium text-gray-900">{updated}</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-sm text-gray-600"><span className="font-medium">{label}</span> {note}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RefundsList() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <header id="header" className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Refund Requests</h1>
            <p className="text-sm text-gray-500 mt-1">View and track refund requests from customers</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-4 py-2">
              <i className="fas fa-filter text-gray-600" aria-hidden />
              <select className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none" aria-label="Filter status">
                <option>All Status</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <div id="content-area" className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          <div id="stats-overview" className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-undo text-gray-600 text-xl" aria-hidden />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">8</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-clock text-yellow-600 text-xl" aria-hidden />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Approved</p>
                  <p className="text-2xl font-bold text-green-600">13</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-check-circle text-green-600 text-xl" aria-hidden />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">3</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-times-circle text-red-600 text-xl" aria-hidden />
                </div>
              </div>
            </div>
          </div>

          <div id="pending-section" className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Pending Requests</h2>
              <span className="text-sm text-gray-500">8 requests</span>
            </div>
            <div className="space-y-4">
              {pendingRefunds.map((r) => (
                <Link key={r.id} href="/dashboard/refund-request-details">
                  <RefundCard {...r} status="Pending" borderClass="border-gray-200" />
                </Link>
              ))}
            </div>
          </div>

          <div id="approved-section" className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Approved Refunds</h2>
              <span className="text-sm text-gray-500">13 requests</span>
            </div>
            <div className="space-y-4">
              {approvedRefunds.map((r) => (
                <RefundCard key={r.id} {...r} status="Approved" borderClass="border-green-200" />
              ))}
            </div>
          </div>

          <div id="rejected-section">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Rejected Requests</h2>
              <span className="text-sm text-gray-500">3 requests</span>
            </div>
            <div className="space-y-4">
              {rejectedRefunds.map((r) => (
                <RefundCard key={r.id} {...r} status="Rejected" borderClass="border-red-200" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
