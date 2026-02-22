"use client";

import { Link } from "@/src/i18n/routing";
import { formatPrice } from "@/src/config/currency";

const attachments = [
  { img: "/placeholder.png", alt: "damaged headphones close-up crack on headband", name: "headband_damage.jpg" },
  { img: "/placeholder.png", alt: "broken headphone speaker close up detail shot", name: "speaker_issue.jpg" },
  { img: "/placeholder.png", alt: "damaged product packaging box", name: "packaging.jpg" },
];

const timelineSteps = [
  { label: "Order Placed", time: "January 10, 2026 at 11:23 AM", icon: "fa-shopping-cart", bg: "bg-blue-100", iconColor: "text-blue-600" },
  { label: "Order Shipped", time: "January 11, 2026 at 2:15 PM", icon: "fa-truck", bg: "bg-green-100", iconColor: "text-green-600" },
  { label: "Order Delivered", time: "January 14, 2026 at 4:30 PM", icon: "fa-box", bg: "bg-blue-100", iconColor: "text-blue-600" },
  { label: "Refund Requested", time: "January 16, 2026 at 3:42 PM", desc: "Customer initiated refund request for damaged product", icon: "fa-undo", bg: "bg-yellow-100", iconColor: "text-yellow-600" },
];

export function RefundRequestDetails() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <header id="header" className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/refunds" className="text-gray-400 hover:text-gray-600" aria-label="Back">
              <i className="fa-solid fa-arrow-left" aria-hidden />
            </Link>
            <h2 className="text-2xl font-semibold text-gray-800">Refund Request Details</h2>
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
        <div id="refund-overview-section" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-800">Refund Request #REF-1847</h3>
                <span className="ml-4 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">Pending Review</span>
              </div>
              <p className="text-sm text-gray-500">Requested on January 16, 2026 at 3:42 PM</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Refund Amount</p>
              <p className="text-2xl font-bold text-gray-800">{formatPrice(234)}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-500 mb-1">Order ID</p>
              <p className="text-sm font-medium text-gray-800">#ORD-2845</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Customer Name</p>
              <p className="text-sm font-medium text-gray-800">Emma Davis</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Order Date</p>
              <p className="text-sm font-medium text-gray-800">January 10, 2026</p>
            </div>
          </div>
        </div>

        <div id="refund-reason-section" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Refund Reason</h4>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-start mb-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 shrink-0">
                <i className="fa-solid fa-exclamation-circle text-red-600 text-sm" aria-hidden />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 mb-1">Product Defect</p>
                <p className="text-sm text-gray-600">The item arrived damaged and is not functioning properly.</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Customer Comments:</p>
            <p className="text-sm text-gray-600 leading-relaxed">The wireless headphones arrived with a cracked headband and the left speaker produces no sound. I&apos;ve tested them with multiple devices and the issue persists. I would like a full refund as the product is unusable. I have attached photos showing the damage.</p>
          </div>
        </div>

        <div id="items-section" className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800">Items in Refund Request</h4>
          </div>
          <div className="p-6">
            <div className="flex items-start pb-6 border-b border-gray-200">
              <div className="w-20 h-20 bg-gray-100 rounded-lg shrink-0 mr-4 overflow-hidden">
                <img className="w-full h-full object-cover" src="/placeholder.png" alt="premium wireless headphones black modern product shot" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="text-base font-semibold text-gray-800 mb-1">Premium Wireless Headphones</h5>
                    <p className="text-sm text-gray-500 mb-2">SKU: WH-PRO-001-BLK</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Quantity: 1</span>
                      <span>•</span>
                      <span>Color: Black</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-800">{formatPrice(234)}</p>
                    <span className="inline-block mt-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">Refund Requested</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Item Subtotal</span>
                <span className="text-gray-800 font-medium">{formatPrice(234)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Shipping Fee</span>
                <span className="text-gray-800 font-medium">{formatPrice(0)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-800 font-medium">{formatPrice(0)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                <span className="text-base font-semibold text-gray-800">Total Refund Amount</span>
                <span className="text-lg font-bold text-gray-800">{formatPrice(234)}</span>
              </div>
            </div>
          </div>
        </div>

        <div id="attachments-section" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Attachments</h4>
          <div className="grid grid-cols-4 gap-4">
            {attachments.map((a) => (
              <div key={a.name} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="h-32 bg-gray-100 overflow-hidden">
                  <img className="w-full h-full object-cover" src={a.img} alt={a.alt} />
                </div>
                <div className="p-2">
                  <p className="text-xs text-gray-600 truncate">{a.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="timeline-section" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Timeline</h4>
          <div className="space-y-4">
            {timelineSteps.map((step, i) => (
              <div key={i} className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className={`w-8 h-8 ${step.bg} rounded-full flex items-center justify-center shrink-0`}>
                    <i className={`fa-solid ${step.icon} ${step.iconColor} text-xs`} aria-hidden />
                  </div>
                  {i < timelineSteps.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-2 min-h-[24px]" />}
                </div>
                <div className={i < timelineSteps.length - 1 ? "pb-6" : ""}>
                  <p className="text-sm font-medium text-gray-800">{step.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{step.time}</p>
                  {"desc" in step && step.desc && <p className="text-xs text-gray-600 mt-2">{step.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="customer-info-section" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h4>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Customer Name</p>
              <p className="text-sm font-medium text-gray-800">Emma Davis</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="text-sm font-medium text-gray-800">emma.davis@email.com</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Phone</p>
              <p className="text-sm font-medium text-gray-800">+1 (555) 234-5678</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Customer Since</p>
              <p className="text-sm font-medium text-gray-800">March 2024</p>
            </div>
          </div>
        </div>

        <div id="notes-section" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Internal Notes</h4>
          <div className="bg-accent/30 border-l-4 border-primary rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <i className="fa-solid fa-info-circle text-primary text-lg mr-3 mt-0.5 shrink-0" aria-hidden />
              <div>
                <p className="text-sm font-medium text-gray-800 mb-1">Note</p>
                <p className="text-sm text-gray-600">This is a view-only refund request. All refund decisions and processing are handled by the platform administration. You can review the details but cannot approve or reject the request.</p>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Add Internal Note (Optional)</label>
            <textarea className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-primary" rows={3} placeholder="Add any internal notes about this refund request..." aria-label="Internal note" />
          </div>
        </div>

        <div id="action-section" className="flex justify-end space-x-4">
          <button type="button" className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium">
            <i className="fa-solid fa-download mr-2" aria-hidden />Download Report
          </button>
          <button type="button" className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium">
            <i className="fa-solid fa-envelope mr-2" aria-hidden />Contact Customer
          </button>
        </div>
      </main>
    </div>
  );
}
