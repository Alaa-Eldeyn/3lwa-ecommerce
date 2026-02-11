"use client";

const notifications = [
  { icon: "fa-shopping-cart", iconBg: "bg-primary/10", iconColor: "text-primary", title: "New Order Received", desc: "Order #ORD-2847 from Sarah Johnson has been placed. Total amount: $156.00", time: "2 hours ago", unread: true, primaryBtn: "View Order", secondaryBtn: "Dismiss" },
  { icon: "fa-exclamation-triangle", iconBg: "bg-orange-100", iconColor: "text-orange-600", title: "Low Stock Alert", desc: "Premium Wireless Headphones has only 3 units left in inventory. Consider restocking soon.", time: "5 hours ago", unread: true, primaryBtn: "Update Inventory", secondaryBtn: "Dismiss" },
  { icon: "fa-star", iconBg: "bg-purple-100", iconColor: "text-purple-600", title: "New Customer Review", desc: "Michael Chen left a 5-star review on Smart Watch Pro: \"Excellent product, fast shipping!\"", time: "1 day ago", unread: true, primaryBtn: "View Review", secondaryBtn: "Dismiss" },
  { icon: "fa-bullhorn", iconBg: "bg-blue-100", iconColor: "text-blue-600", title: "Campaign Started Successfully", desc: "Your Winter Sale 2026 campaign is now live. 12 items are included in this promotion.", time: "2 days ago", unread: false, primaryBtn: "View Campaign", secondaryBtn: "Dismiss" },
  { icon: "fa-undo", iconBg: "bg-red-100", iconColor: "text-red-600", title: "Refund Request Submitted", desc: "Emma Davis requested a refund for Order #ORD-2821 - Bluetooth Speaker. Reason: Product defect.", time: "3 days ago", unread: false, primaryBtn: "Review Request", secondaryBtn: "Dismiss" },
  { icon: "fa-check-circle", iconBg: "bg-green-100", iconColor: "text-green-600", title: "Order Delivered Successfully", desc: "Order #ORD-2845 has been delivered to James Wilson. Customer confirmed receipt.", time: "4 days ago", unread: false, primaryBtn: "View Order", secondaryBtn: "Dismiss" },
  { icon: "fa-info-circle", iconBg: "bg-yellow-100", iconColor: "text-yellow-600", title: "System Maintenance Scheduled", desc: "The platform will undergo scheduled maintenance on Jan 25, 2026 from 2:00 AM to 4:00 AM UTC.", time: "5 days ago", unread: false, primaryBtn: null, secondaryBtn: "Dismiss" },
  { icon: "fa-box", iconBg: "bg-indigo-100", iconColor: "text-indigo-600", title: "New Item Approved", desc: "Your item \"Portable Power Bank 20000mAh\" has been approved and is now live on the platform.", time: "1 week ago", unread: false, primaryBtn: "View Item", secondaryBtn: "Dismiss" },
];

export function NotificationsList() {
  return (
    <div className="px-8 py-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            <button type="button" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
              All Notifications
            </button>
            <button type="button" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">
              Unread (3)
            </button>
            <button type="button" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">
              Orders
            </button>
            <button type="button" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">
              System
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <button type="button" className="text-gray-500 hover:text-gray-700 p-2" aria-label="Refresh">
              <i className="fa-solid fa-arrows-rotate" aria-hidden />
            </button>
            <button type="button" className="text-gray-500 hover:text-gray-700 p-2" aria-label="Filters">
              <i className="fa-solid fa-sliders" aria-hidden />
            </button>
            <button type="button" className="text-primary hover:text-primary/80 text-sm font-medium">
              Mark all as read
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.title + n.time}
            className={`rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow ${n.unread ? "bg-white" : "bg-gray-50"}`}
          >
            <div className="p-6">
              <div className="flex items-start">
                <div className={`w-12 h-12 ${n.iconBg} rounded-full flex items-center justify-center mr-4 shrink-0`}>
                  <i className={`fa-solid ${n.icon} ${n.iconColor} text-lg`} aria-hidden />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-base font-semibold text-gray-800">{n.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{n.desc}</p>
                    </div>
                    {n.unread && <span className="w-2 h-2 bg-primary rounded-full shrink-0 ml-4 mt-2" aria-hidden />}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-400">{n.time}</span>
                    <div className="flex items-center space-x-2">
                      {n.primaryBtn && (
                        <button type="button" className={`px-3 py-1.5 rounded text-xs font-medium ${n.unread ? "bg-primary text-white hover:bg-secondary" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                          {n.primaryBtn}
                        </button>
                      )}
                      <button type="button" className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded text-xs font-medium">
                        {n.secondaryBtn}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button type="button" className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          Load More Notifications
        </button>
      </div>
    </div>
  );
}
