"use client";

import { Link } from "@/src/i18n/routing";

const tableRows = [
  { name: "Winter Sale", code: "WINTER25", discount: "25% Off", discountType: "Percentage", validity: "Jan 15 - Feb 15", validitySub: "30 days left", validitySubClass: "text-gray-500", used: 47, limit: 100, usagePct: 47, items: "12 items", itemsSub: "Electronics", status: "Active", statusClass: "bg-green-100 text-green-800" },
  { name: "New Customer Deal", code: "SAVE50", discount: "$50 Off", discountType: "Fixed Amount", validity: "Feb 1 - Mar 31", validitySub: "Scheduled", validitySubClass: "text-orange-500", used: 0, limit: 50, usagePct: 0, items: "8 items", itemsSub: "All Categories", status: "Scheduled", statusClass: "bg-orange-100 text-orange-800" },
  { name: "Free Shipping", code: "FREESHIP", discount: "Free Shipping", discountType: "Free Shipping", validity: "Jan 1 - Jan 31", validitySub: "Expired", validitySubClass: "text-red-500", used: 89, limit: 200, usagePct: 44.5, items: "25 items", itemsSub: "All Categories", status: "Expired", statusClass: "bg-red-100 text-red-800" },
  { name: "Flash Weekend", code: "FLASH15", discount: "15% Off", discountType: "Percentage", validity: "Feb 10 - Feb 12", validitySub: "3 days", validitySubClass: "text-gray-500", used: 23, limit: 75, usagePct: 30.7, items: "6 items", itemsSub: "Accessories", status: "Active", statusClass: "bg-green-100 text-green-800" },
  { name: "Bulk Purchase", code: "BULK30", discount: "30% Off", discountType: "Percentage", validity: "Jan 20 - Feb 28", validitySub: "25 days left", validitySubClass: "text-gray-500", used: 12, limit: 30, usagePct: 40, items: "15 items", itemsSub: "Laptops", status: "Active", statusClass: "bg-green-100 text-green-800" },
];

export function PromoCodesTable() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold text-gray-900">Promo Codes</h1>
          <Link href="/vendor/create-promo" className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-secondary transition-colors inline-flex items-center gap-2">
            <i className="fa-solid fa-plus" aria-hidden /><span>Create Promo Code</span>
          </Link>
        </div>
        <p className="text-gray-600">Manage your promotional codes to boost sales and attract customers.</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Codes</span>
            <i className="fa-solid fa-ticket text-primary" aria-hidden />
          </div>
          <div className="text-2xl font-bold text-gray-900">12</div>
          <div className="text-xs text-gray-500">+2 this month</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Active Codes</span>
            <i className="fa-solid fa-play-circle text-green-600" aria-hidden />
          </div>
          <div className="text-2xl font-bold text-green-600">8</div>
          <div className="text-xs text-gray-500">Currently running</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Uses</span>
            <i className="fa-solid fa-chart-line text-blue-600" aria-hidden />
          </div>
          <div className="text-2xl font-bold text-blue-600">247</div>
          <div className="text-xs text-gray-500">This month</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Revenue Impact</span>
            <i className="fa-solid fa-dollar-sign text-orange-600" aria-hidden />
          </div>
          <div className="text-2xl font-bold text-orange-600">$3,240</div>
          <div className="text-xs text-gray-500">Generated sales</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="relative">
            <input type="text" placeholder="Search promo codes..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm" aria-label="Search" />
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden />
          </div>
          <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm" aria-label="Status">
            <option>All Status</option>
            <option>Active</option>
            <option>Scheduled</option>
            <option>Expired</option>
          </select>
          <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm" aria-label="Type">
            <option>All Types</option>
            <option>Percentage</option>
            <option>Fixed Amount</option>
            <option>Free Shipping</option>
          </select>
          <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm" aria-label="Period">
            <option>All Periods</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>Custom Range</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Code Details</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Discount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Validity</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Usage</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Items</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tableRows.map((row) => (
                <tr key={row.code} className="hover:bg-gray-50 cursor-pointer">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-semibold text-gray-900">{row.name}</div>
                      <div className="text-sm text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded inline-block">{row.code}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm font-medium text-primary">{row.discount}</div>
                    <div className="text-xs text-gray-500">{row.discountType}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-900">{row.validity}</div>
                    <div className={`text-xs ${row.validitySubClass}`}>{row.validitySub}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-900">{row.used} / {row.limit}</div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div
                        className={`h-1.5 rounded-full ${row.status === "Expired" ? "bg-gray-400" : "bg-primary"}`}
                        style={{ width: `${row.usagePct}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-900">{row.items}</div>
                    <div className="text-xs text-gray-500">{row.itemsSub}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${row.statusClass}`}>{row.status}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button type="button" className="text-primary hover:text-primary/80 text-sm"><i className="fa-solid fa-edit" aria-hidden /></button>
                      <button type="button" className="text-gray-400 hover:text-gray-600 text-sm"><i className="fa-solid fa-copy" aria-hidden /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
