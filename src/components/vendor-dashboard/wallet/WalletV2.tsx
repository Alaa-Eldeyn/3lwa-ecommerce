"use client";

import { Link } from "@/src/i18n/routing";

const transactions = [
  { title: "Order Payment", detail: "Order #ORD-2024-1247", date: "Dec 10, 2024 at 2:45 PM", amount: "+$245.00", status: "Completed", icon: "fa-arrow-down", iconBg: "bg-green-100", iconColor: "text-green-600", amountClass: "text-green-600", statusBg: "bg-green-100", statusColor: "text-green-800" },
  { title: "Order Payment", detail: "Order #ORD-2024-1246", date: "Dec 10, 2024 at 11:20 AM", amount: "+$580.00", status: "Completed", icon: "fa-arrow-down", iconBg: "bg-green-100", iconColor: "text-green-600", amountClass: "text-green-600", statusBg: "bg-green-100", statusColor: "text-green-800" },
  { title: "Withdrawal to Bank", detail: "Bank Account ****4523", date: "Dec 9, 2024 at 4:15 PM", amount: "-$1,500.00", status: "Processing", icon: "fa-arrow-up", iconBg: "bg-red-100", iconColor: "text-red-600", amountClass: "text-red-600", statusBg: "bg-blue-100", statusColor: "text-blue-800" },
  { title: "Refund Processed", detail: "Order #ORD-2024-1238", date: "Dec 8, 2024 at 9:30 AM", amount: "-$125.00", status: "Completed", icon: "fa-undo", iconBg: "bg-orange-100", iconColor: "text-orange-600", amountClass: "text-orange-600", statusBg: "bg-orange-100", statusColor: "text-orange-800" },
  { title: "Order Payment", detail: "Order #ORD-2024-1235", date: "Dec 7, 2024 at 3:50 PM", amount: "+$890.00", status: "Completed", icon: "fa-arrow-down", iconBg: "bg-green-100", iconColor: "text-green-600", amountClass: "text-green-600", statusBg: "bg-green-100", statusColor: "text-green-800" },
];

export function WalletV2() {
  return (
    <div className="px-8 py-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Wallet &amp; Payout Settings</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your earnings, transactions, and payout preferences</p>
          </div>
          <div className="flex items-center space-x-3">
            <button type="button" className="flex items-center space-x-2 bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-secondary transition-colors font-medium">
              <i className="fa-solid fa-download" aria-hidden />
              <span>Export Statement</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-primary to-header rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-wallet text-2xl" aria-hidden />
            </div>
            <button type="button" className="text-white/80 hover:text-white" aria-label="Options">
              <i className="fa-solid fa-ellipsis-v" aria-hidden />
            </button>
          </div>
          <p className="text-white/80 text-sm mb-2">Available Balance</p>
          <p className="text-4xl font-bold mb-4">$12,847.50</p>
          <div className="flex items-center space-x-2 text-sm">
            <i className="fa-solid fa-arrow-up" aria-hidden />
            <span>+$2,340 this month</span>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-clock text-yellow-600 text-xl" aria-hidden />
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-2">Pending Payout</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">$3,420.00</p>
          <p className="text-xs text-gray-500">Expected: Dec 15, 2024</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-chart-line text-green-600 text-xl" aria-hidden />
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-2">Total Earnings</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">$48,920.00</p>
          <p className="text-xs text-gray-500">All time</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 px-4 py-2">
              <i className="fa-solid fa-filter text-gray-600" aria-hidden />
              <select className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none">
                <option>All Types</option>
                <option>Credits</option>
                <option>Debits</option>
                <option>Withdrawals</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 px-4 py-2">
              <i className="fa-solid fa-calendar text-gray-600" aria-hidden />
              <select className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none">
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 3 months</option>
                <option>All time</option>
              </select>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.detail + tx.date} className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${tx.iconBg} rounded-lg flex items-center justify-center`}>
                    <i className={`fa-solid ${tx.icon} ${tx.iconColor} text-xl`} aria-hidden />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{tx.title}</p>
                    <p className="text-sm text-gray-500">{tx.detail}</p>
                    <p className="text-xs text-gray-400 mt-1">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${tx.amountClass}`}>{tx.amount}</p>
                  <span className={`inline-block px-3 py-1 ${tx.statusBg} ${tx.statusColor} text-xs font-medium rounded-full mt-2`}>{tx.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center py-6">
          <Link href="/vendor/wallet" className="inline-block px-8 py-3 bg-white text-primary border border-primary font-semibold rounded-lg hover:bg-gray-50 transition-colors">
            View All Transactions
          </Link>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Withdrawal Methods</h2>
          <Link href="/vendor/withdrawal-methods" className="flex items-center space-x-2 bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-secondary transition-colors font-medium">
            <i className="fa-solid fa-plus" aria-hidden />
            <span>Add Method</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border-2 border-primary p-6 relative">
            <div className="absolute top-4 right-4">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Primary</span>
            </div>
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-university text-blue-600 text-2xl" aria-hidden />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">Bank Transfer</h3>
                <p className="text-sm text-gray-500">Direct deposit to bank account</p>
              </div>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between py-2 border-t border-gray-100">
                <span className="text-sm text-gray-600">Bank Name</span>
                <span className="text-sm font-medium text-gray-900">National Bank</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-gray-100">
                <span className="text-sm text-gray-600">Account Number</span>
                <span className="text-sm font-medium text-gray-900">****4523</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-gray-100">
                <span className="text-sm text-gray-600">Account Holder</span>
                <span className="text-sm font-medium text-gray-900">Ahmed Store LLC</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-gray-100">
                <span className="text-sm text-gray-600">Status</span>
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Verified</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button type="button" className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-medium">
                <i className="fa-solid fa-edit mr-2" aria-hidden />Edit
              </button>
              <button type="button" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <i className="fa-solid fa-trash" aria-hidden />
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="fa-brands fa-paypal text-purple-600 text-2xl" aria-hidden />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">PayPal</h3>
                <p className="text-sm text-gray-500">Withdraw to PayPal account</p>
              </div>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between py-2 border-t border-gray-100">
                <span className="text-sm text-gray-600">Email</span>
                <span className="text-sm font-medium text-gray-900">ahmed@store.com</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-gray-100">
                <span className="text-sm text-gray-600">Account Name</span>
                <span className="text-sm font-medium text-gray-900">Ahmed Store</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-gray-100">
                <span className="text-sm text-gray-600">Status</span>
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Verified</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button type="button" className="flex-1 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-gray-50 transition-colors font-medium">
                <i className="fa-solid fa-edit mr-2" aria-hidden />Edit
              </button>
              <button type="button" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <i className="fa-solid fa-trash" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Warehouses</h2>
          <button type="button" className="flex items-center space-x-2 bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-secondary transition-colors font-medium">
            <i className="fa-solid fa-plus" aria-hidden />
            <span>Add Warehouse</span>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-warehouse text-primary text-2xl" aria-hidden />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Main Warehouse</h3>
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Active</span>
                </div>
              </div>
              <button type="button" className="text-gray-400 hover:text-gray-600" aria-label="More">
                <i className="fa-solid fa-ellipsis-v" aria-hidden />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <i className="fa-solid fa-map-marker-alt text-gray-400 mt-1 shrink-0" aria-hidden />
                <div>
                  <p className="text-sm text-gray-900 font-medium">123 Industrial Ave</p>
                  <p className="text-sm text-gray-500">Dubai, United Arab Emirates</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 pt-3 border-t border-gray-100">
                <i className="fa-solid fa-boxes text-gray-400" aria-hidden />
                <p className="text-sm text-gray-600">1,247 items stored</p>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fa-solid fa-map-pin text-gray-400" aria-hidden />
                <p className="text-sm text-gray-600">Serving: Dubai, Abu Dhabi, Sharjah</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-gray-100">
              <button type="button" className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-medium">
                <i className="fa-solid fa-edit mr-2" aria-hidden />Edit
              </button>
              <button type="button" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <i className="fa-solid fa-eye" aria-hidden />
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-warehouse text-secondary text-2xl" aria-hidden />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Northern Hub</h3>
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Active</span>
                </div>
              </div>
              <button type="button" className="text-gray-400 hover:text-gray-600" aria-label="More">
                <i className="fa-solid fa-ellipsis-v" aria-hidden />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <i className="fa-solid fa-map-marker-alt text-gray-400 mt-1 shrink-0" aria-hidden />
                <div>
                  <p className="text-sm text-gray-900 font-medium">456 Commerce Street</p>
                  <p className="text-sm text-gray-500">Ras Al Khaimah, UAE</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 pt-3 border-t border-gray-100">
                <i className="fa-solid fa-boxes text-gray-400" aria-hidden />
                <p className="text-sm text-gray-600">683 items stored</p>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fa-solid fa-map-pin text-gray-400" aria-hidden />
                <p className="text-sm text-gray-600">Serving: Ras Al Khaimah, Fujairah, Umm Al Quwain</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-gray-100">
              <button type="button" className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-medium">
                <i className="fa-solid fa-edit mr-2" aria-hidden />Edit
              </button>
              <button type="button" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <i className="fa-solid fa-eye" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
