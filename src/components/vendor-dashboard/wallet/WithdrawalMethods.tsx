"use client";

const methods = [
  { id: 1, name: "Bank Transfer", detail: "Chase Bank • ****4892", badge: "Verified", default: true, timing: "2-3 business days", fee: "No fees", icon: "fa-university", iconBg: "bg-blue-100", iconColor: "text-blue-600", actions: ["Edit", "Remove"] },
  { id: 2, name: "PayPal", detail: "vendor@example.com", badge: "Verified", default: false, timing: "1-2 business days", fee: "2.9% + $0.30", icon: "fa-paypal", iconBg: "bg-blue-50", iconColor: "text-blue-600", actions: ["Set Default", "Edit", "Remove"] },
  { id: 3, name: "Debit Card", detail: "Visa • ****3421", badge: "Pending Verification", badgeClass: "bg-yellow-100 text-yellow-800", timing: "Instant", fee: "1.5% fee", icon: "fa-credit-card", iconBg: "bg-purple-100", iconColor: "text-purple-600", note: "Verification required before use", actions: ["Edit", "Remove"] },
];

export function WithdrawalMethods() {
  return (
    <div className="px-8 py-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold text-gray-900">Withdrawal Methods</h1>
          <button type="button" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-all font-medium inline-flex items-center">
            <i className="fa-solid fa-plus mr-2" aria-hidden />
            Add Method
          </button>
        </div>
        <p className="text-gray-600">Manage your payout destinations and configure how you receive earnings.</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Saved Payment Methods</h3>
          <p className="text-sm text-gray-600 mt-1">Your configured withdrawal destinations</p>
        </div>
        <div className="divide-y divide-gray-200">
          {methods.map((m) => (
            <div key={m.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`w-12 h-12 ${m.iconBg} rounded-lg flex items-center justify-center shrink-0`}>
                    <i className={`fa-${m.icon === "fa-paypal" ? "brands fa-paypal" : "solid " + m.icon} ${m.iconColor} text-xl`} aria-hidden />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{m.name}</h4>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${m.badgeClass || "bg-green-100 text-green-800"}`}>{m.badge}</span>
                      {m.default && <span className="px-2 py-0.5 text-xs font-medium bg-primary text-white rounded-full">Default</span>}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">{m.detail}</div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span><i className="fa-solid fa-clock mr-1" aria-hidden />{m.timing}</span>
                      <span><i className="fa-solid fa-tag mr-1" aria-hidden />{m.fee}</span>
                    </div>
                    {m.note && (
                      <div className="mt-2 text-xs text-amber-600">
                        <i className="fa-solid fa-exclamation-circle mr-1" aria-hidden />
                        {m.note}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {m.actions?.includes("Set Default") && (
                    <button type="button" className="px-3 py-1.5 text-sm border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all">
                      <i className="fa-solid fa-star mr-1" aria-hidden />Set Default
                    </button>
                  )}
                  <button type="button" className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
                    <i className="fa-solid fa-edit mr-1" aria-hidden />Edit
                  </button>
                  <button type="button" className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all">
                    <i className="fa-solid fa-trash mr-1" aria-hidden />Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
