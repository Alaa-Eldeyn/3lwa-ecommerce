"use client";

import { Link } from "@/src/i18n/routing";

const gridCards = [
  { code: "SUMMER25", status: "ACTIVE", statusClass: "bg-green-600", borderClass: "border-green-200", bgClass: "from-green-50 to-green-100", discountType: "25% Off", minPurchase: "$50", usageLimit: "500", validPeriod: "June 1 - July 31, 2024", used: "247 / 500", usagePct: 49, usageBarClass: "bg-green-600", tags: ["Electronics (12)", "Accessories (8)", "+3 more"] },
  { code: "NEWUSER", status: "ACTIVE", statusClass: "bg-green-600", borderClass: "border-green-200", bgClass: "from-green-50 to-green-100", discountType: "$15 Off", minPurchase: "$30", usageLimit: "1000", validPeriod: "May 15 - Aug 31, 2024", used: "412 / 1000", usagePct: 41, usageBarClass: "bg-green-600", tags: ["All Items"] },
  { code: "BACKTOSCHOOL", status: "SCHEDULED", statusClass: "bg-blue-600", borderClass: "border-blue-200", bgClass: "from-blue-50 to-blue-100", discountType: "30% Off", minPurchase: "$75", usageLimit: "300", validPeriod: "Aug 1 - Sep 15, 2024", used: "0 / 300", usagePct: 0, usageBarClass: "bg-blue-600", tags: ["Laptops (5)", "Tablets (3)"], statusSub: "Starts in 5 days" },
  { code: "FLASH50", status: "ACTIVE", statusClass: "bg-green-600", borderClass: "border-green-200", bgClass: "from-green-50 to-green-100", discountType: "$50 Off", minPurchase: "$200", usageLimit: "100", validPeriod: "July 15 - July 31, 2024", used: "87 / 100", usagePct: 87, usageBarClass: "bg-green-600", tags: ["Premium Items (7)"], statusSub: "Ends in 8 days" },
  { code: "SPRING20", status: "EXPIRED", statusClass: "bg-red-600", borderClass: "border-red-200", bgClass: "from-red-50 to-red-100", discountType: "20% Off", minPurchase: "$40", usageLimit: "200", validPeriod: "Mar 1 - May 31, 2024", used: "156 / 200", usagePct: 78, usageBarClass: "bg-red-600", tags: ["Fashion (15)", "Shoes (9)"], statusSub: "Ended 3 days ago" },
  { code: "AUTUMN40", status: "SCHEDULED", statusClass: "bg-blue-600", borderClass: "border-blue-200", bgClass: "from-blue-50 to-blue-100", discountType: "40% Off", minPurchase: "$100", usageLimit: "250", validPeriod: "Sep 1 - Oct 31, 2024", used: "0 / 250", usagePct: 0, usageBarClass: "bg-blue-600", tags: ["Clothing (22)"], statusSub: "Starts in 15 days" },
];

export function PromoCodesGrid() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Promo Codes</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your promotional codes and discount campaigns</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
              <i className="fa-solid fa-search text-gray-600" aria-hidden />
              <input type="text" placeholder="Search codes..." className="bg-transparent text-sm focus:outline-none w-40" aria-label="Search" />
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
              <i className="fa-solid fa-filter text-gray-600" aria-hidden />
              <select className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none" aria-label="Status">
                <option>All Status</option>
                <option>Active</option>
                <option>Scheduled</option>
                <option>Expired</option>
              </select>
            </div>
            <Link href="/vendor/create-promo" className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center">
              <i className="fa-solid fa-plus mr-2" aria-hidden />Create Code
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-check-circle text-green-600 text-xl" aria-hidden />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">12</p>
              <p className="text-sm text-gray-500">Active Codes</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-clock text-blue-600 text-xl" aria-hidden />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">5</p>
              <p className="text-sm text-gray-500">Scheduled</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-times-circle text-red-600 text-xl" aria-hidden />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">8</p>
              <p className="text-sm text-gray-500">Expired</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-chart-line text-primary text-xl" aria-hidden />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">1,247</p>
              <p className="text-sm text-gray-500">Total Uses</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {gridCards.map((card) => (
              <div
                key={card.code}
                className={`bg-white rounded-lg border overflow-hidden hover:shadow-lg transition-shadow ${card.borderClass} ${card.status === "EXPIRED" ? "opacity-75" : ""}`}
              >
                <div className={`bg-gradient-to-r ${card.bgClass} p-6 border-b ${card.borderClass}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 ${card.statusClass} text-white text-xs font-bold rounded-full tracking-wider`}>{card.status}</span>
                        {card.statusSub && <span className="text-xs text-gray-500">{card.statusSub}</span>}
                      </div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-3xl font-bold text-gray-900 tracking-wide">{card.code}</h3>
                        <button type="button" className="text-gray-400 hover:text-gray-600"><i className="fa-solid fa-copy" aria-hidden /></button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-600 hover:text-primary transition-colors"><i className="fa-solid fa-eye" aria-hidden /></button>
                      <button type="button" className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-600 hover:text-primary transition-colors"><i className="fa-solid fa-edit" aria-hidden /></button>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Discount Type</p>
                      <p className="text-sm font-semibold text-gray-900">{card.discountType}</p>
                    </div>
                    <div className="h-8 w-px bg-gray-300" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Min. Purchase</p>
                      <p className="text-sm font-semibold text-gray-900">{card.minPurchase}</p>
                    </div>
                    <div className="h-8 w-px bg-gray-300" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Usage Limit</p>
                      <p className="text-sm font-semibold text-gray-900">{card.usageLimit}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Valid Period</p>
                      <p className="text-sm font-medium text-gray-900">{card.validPeriod}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Times Used</p>
                      <p className="text-sm font-medium text-gray-900">{card.used}</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Usage Progress</span>
                      <span>{card.usagePct}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${card.usageBarClass} h-2 rounded-full`} style={{ width: `${card.usagePct}%` }} />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-2">Assigned Items</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {card.tags.map((t) => (
                        <span key={t} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
