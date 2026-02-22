"use client";

import { Link } from "@/src/i18n/routing";
import { formatPrice } from "@/src/config/currency";

const recentTransactions = [
  { type: "credit", title: "Order Payment", detail: "Order #ORD-2024-5892 • Jan 3, 2025", amount: 247.5, status: "Completed", icon: "fa-plus", iconBg: "bg-green-100", iconColor: "text-green-600", amountClass: "text-green-600" },
  { type: "debit", title: "Withdrawal", detail: "Bank Transfer • Jan 2, 2025", amount: 2500, status: "Processing", icon: "fa-minus", iconBg: "bg-red-100", iconColor: "text-red-600", amountClass: "text-red-600", statusClass: "text-yellow-600" },
  { type: "credit", title: "Order Payment", detail: "Order #ORD-2024-5891 • Jan 1, 2025", amount: 189, status: "Completed", icon: "fa-plus", iconBg: "bg-green-100", iconColor: "text-green-600", amountClass: "text-green-600" },
  { type: "debit", title: "Refund Processed", detail: "Order #ORD-2024-5845 • Dec 30, 2024", amount: 75, status: "Completed", icon: "fa-rotate-left", iconBg: "bg-blue-100", iconColor: "text-blue-600", amountClass: "text-red-600" },
  { type: "credit", title: "Order Payment", detail: "Order #ORD-2024-5844 • Dec 29, 2024", amount: 425.8, status: "Completed", icon: "fa-plus", iconBg: "bg-green-100", iconColor: "text-green-600", amountClass: "text-green-600" },
  { type: "debit", title: "Withdrawal", detail: "Bank Transfer • Dec 28, 2024", amount: 5000, status: "Completed", icon: "fa-minus", iconBg: "bg-red-100", iconColor: "text-red-600", amountClass: "text-red-600", statusClass: "text-green-600" },
];

export function Wallet() {
  return (
    <div className="px-8 py-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold text-gray-900">Wallet Overview</h1>
          <div className="flex items-center space-x-3">
            <Link href="/dashboard/withdrawal-request" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-all font-medium inline-flex items-center">
              <i className="fa-solid fa-money-bill-transfer mr-2" aria-hidden />
              Request Withdrawal
            </Link>
            <Link href="/dashboard/withdrawal-methods" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium inline-flex items-center">
              <i className="fa-solid fa-gear mr-2" aria-hidden />
              Manage Methods
            </Link>
          </div>
        </div>
        <p className="text-gray-600">Monitor your earnings, pending balances, and manage withdrawal requests.</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-primary to-teal-700 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm opacity-90">Current Balance</span>
            <i className="fa-solid fa-wallet text-2xl opacity-80" aria-hidden />
          </div>
          <div className="text-3xl font-bold mb-2">{formatPrice(12847.5)}</div>
          <div className="text-xs opacity-90">Available for withdrawal</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">Pending Balance</span>
            <i className="fa-solid fa-clock text-xl text-yellow-500" aria-hidden />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{formatPrice(3245.8)}</div>
          <div className="text-xs text-gray-500">Awaiting clearance</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">Total Earned</span>
            <i className="fa-solid fa-chart-line text-xl text-green-600" aria-hidden />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">$48,932.15</div>
          <div className="text-xs text-green-600 flex items-center">
            <i className="fa-solid fa-arrow-up mr-1" aria-hidden />
            <span>+18% this month</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Withdrawal Status</h3>
            <i className="fa-solid fa-arrow-right-from-bracket text-primary" aria-hidden />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <i className="fa-solid fa-check text-green-600" aria-hidden />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Last Withdrawal</div>
                  <div className="text-sm text-gray-500">Completed on Dec 28, 2024</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">{formatPrice(5000)}</div>
                <div className="text-xs text-green-600">Successful</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <i className="fa-solid fa-clock text-yellow-600" aria-hidden />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Pending Request</div>
                  <div className="text-sm text-gray-500">Submitted on Jan 2, 2025</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">{formatPrice(2500)}</div>
                <div className="text-xs text-yellow-600">Processing</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Withdrawal Methods</h3>
            <i className="fa-solid fa-credit-card text-secondary" aria-hidden />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <i className="fa-solid fa-building-columns text-primary text-lg" aria-hidden />
                <div>
                  <div className="font-medium text-gray-900">Bank Transfer</div>
                  <div className="text-sm text-gray-500">****4892</div>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg opacity-60">
              <div className="flex items-center space-x-3">
                <i className="fa-brands fa-paypal text-blue-600 text-lg" aria-hidden />
                <div>
                  <div className="font-medium text-gray-900">PayPal</div>
                  <div className="text-sm text-gray-500">vendor@email.com</div>
                </div>
              </div>
              <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded-full font-medium">Inactive</span>
            </div>
            <Link href="/dashboard/withdrawal-methods" className="block w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors text-center">
              <i className="fa-solid fa-plus mr-2" aria-hidden />
              Add New Method
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-accent to-orange-100 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <i className="fa-solid fa-bolt text-primary text-xl" aria-hidden />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Quick Actions</h3>
              <p className="text-sm text-gray-600">Manage your wallet efficiently with these shortcuts</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/dashboard/withdrawal-request" className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-secondary transition-all font-medium inline-flex items-center">
              <i className="fa-solid fa-hand-holding-dollar mr-2" aria-hidden />
              Request Withdrawal
            </Link>
            <Link href="/dashboard/wallet" className="px-5 py-2.5 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium border border-gray-200 inline-flex items-center">
              <i className="fa-solid fa-list mr-2" aria-hidden />
              View All Transactions
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <Link href="/dashboard/wallet" className="text-sm text-primary hover:underline font-medium">
              View All Transactions →
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {recentTransactions.map((tx) => (
            <div key={tx.detail} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full ${tx.iconBg} flex items-center justify-center`}>
                    <i className={`fa-solid ${tx.icon} ${tx.iconColor}`} aria-hidden />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{tx.title}</div>
                    <div className="text-sm text-gray-500">{tx.detail}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${tx.amountClass}`}>{tx.type === "credit" ? "+" : "-"}{formatPrice(tx.amount)}</div>
                  <div className={`text-xs ${tx.statusClass || "text-gray-500"}`}>{tx.status}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
