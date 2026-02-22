"use client";

import { Link } from "@/src/i18n/routing";

const listItems = [
  { code: "SAVE20", status: "Active", statusClass: "text-green-600 bg-green-50", desc: "20% discount on all items - General promotion code for new customers", dates: "Jan 1 - Dec 31, 2024", redemptions: "142 uses", items: "All items" },
  { code: "WINTER25", status: "Active", statusClass: "text-green-600 bg-green-50", desc: "Winter sale - 25% off selected electronics", dates: "Jan 15 - Feb 15", redemptions: "47 / 100", items: "12 items" },
  { code: "FREESHIP", status: "Expired", statusClass: "text-gray-600 bg-gray-100", desc: "Free shipping on orders over $50", dates: "Jan 1 - Jan 31", redemptions: "89 uses", items: "25 items" },
];

export function PromoCodesList() {
  return (
    <div className="px-8 py-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Campaigns &amp; Promo Codes</h1>
            <p className="text-gray-600 mt-1">Manage marketing campaigns and promotional offers to boost your sales</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/create-promo" className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-all inline-flex items-center">
              <i className="fa-solid fa-tag mr-2" aria-hidden />Create Promo Code
            </Link>
            <Link href="/dashboard/campaigns" className="px-4 py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-lg transition-all inline-flex items-center shrink-0">
              <i className="fa-solid fa-plus mr-2" aria-hidden />Browse Campaigns
            </Link>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-2 border-b border-gray-200">
          <Link href="/dashboard/promo-codes" className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-primary transition-all">Campaigns</Link>
          <span className="px-4 py-3 text-sm font-semibold text-primary border-b-2 border-primary">Promo Codes</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-check-circle text-green-600" aria-hidden />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Active</span>
          </div>
          <div className="text-2xl font-bold text-foreground">7</div>
          <div className="text-sm text-gray-600 mt-1">Active Promo Codes</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-users text-primary" aria-hidden />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">342</div>
          <div className="text-sm text-gray-600 mt-1">Total Redemptions</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-clock text-amber-600" aria-hidden />
            </div>
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Expiring</span>
          </div>
          <div className="text-2xl font-bold text-foreground">2</div>
          <div className="text-sm text-gray-600 mt-1">Expiring Soon</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-chart-line text-blue-600" aria-hidden />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">AED 12.4K</div>
          <div className="text-sm text-gray-600 mt-1">Promo Revenue</div>
        </div>
      </div>

      <div className="space-y-4">
        {listItems.map((item) => (
          <div key={item.code} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-tag text-primary text-xl" aria-hidden />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-foreground font-mono">{item.code}</h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${item.statusClass}`}>{item.status}</span>
                    <button type="button" className="text-xs text-gray-500 hover:text-gray-700"><i className="fa-solid fa-copy" aria-hidden /></button>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{item.desc}</p>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-calendar text-gray-400" aria-hidden />
                      <span className="text-gray-600">{item.dates}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-chart-line text-gray-400" aria-hidden />
                      <span className="text-gray-600">{item.redemptions}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-box text-gray-400" aria-hidden />
                      <span className="text-gray-600">{item.items}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button type="button" className="px-4 py-2 text-sm border border-primary rounded-lg text-primary hover:bg-primary hover:text-white transition-all">
                  <i className="fa-solid fa-edit mr-2" aria-hidden />Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
