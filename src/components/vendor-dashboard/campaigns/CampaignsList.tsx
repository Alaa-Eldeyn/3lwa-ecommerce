"use client";

const stats = [
  { icon: "fa-bullhorn", iconBg: "bg-primary/10", iconColor: "text-primary", label: "Active Campaigns", value: "8", sub: "participating in" },
  { icon: "fa-percentage", iconBg: "bg-green-100", iconColor: "text-green-600", label: "Promo Codes", value: "12", sub: "active codes" },
  { icon: "fa-chart-line", iconBg: "bg-blue-100", iconColor: "text-blue-600", label: "Campaign Sales", value: "$8,450", sub: "this month", badge: "+24%" },
  { icon: "fa-clock", iconBg: "bg-purple-100", iconColor: "text-purple-600", label: "Pending Approval", value: "3", sub: "awaiting review" },
];

const campaigns = [
  { title: "Winter Sale 2026", status: "Active", badge2: "Auto-Enrolled", desc: "Platform-wide winter promotion with up to 40% discount on selected categories", date: "Jan 15 - Feb 15, 2026", items: "24 items participating", sales: "$3,240 sales", discount: "20-40%", orders: "87", conversion: "12.4%", gradient: "from-red-500 to-pink-500", icon: "fa-fire" },
  { title: "Valentine's Day Special", status: "Active", badge2: "Opted In", desc: "Special offers for Valentine's Day gifts and romantic products", date: "Feb 1 - Feb 14, 2026", items: "8 items participating", sales: "$1,890 sales", discount: "15-25%", orders: "34", conversion: "8.7%", gradient: "from-purple-500 to-indigo-500", icon: "fa-heart" },
  { title: "Eco-Friendly Products Week", status: "Scheduled", desc: "Promote sustainable and eco-friendly products with special pricing", date: "Mar 1 - Mar 7, 2026", items: "12 items selected", extra: "Starts in 10 days", discount: "10-20%", reach: "15k+ users", gradient: "from-green-500 to-teal-500", icon: "fa-leaf" },
  { title: "Flash Sale Friday", status: "Active", badge2: "Limited Time", desc: "Weekly flash sale with deep discounts for 24 hours only", date: "Every Friday", items: "5 items this week", sales: "$2,560 sales", discount: "30-50%", orders: "52", timeLeft: "6h 24m", gradient: "from-orange-500 to-red-500", icon: "fa-bolt" },
  { title: "New Vendor Spotlight", status: "Active", badge2: "Featured", desc: "Exclusive promotion for new vendors to boost visibility and sales", date: "Jan 10 - Feb 10, 2026", items: "All items eligible", sales: "$760 sales", boost: "2x visibility", orders: "18", newCustomers: "14", gradient: "from-blue-500 to-cyan-500", icon: "fa-star" },
];

export function CampaignsList() {
  return (
    <div className="px-8 py-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Campaigns &amp; Promotions</h2>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${s.iconBg} rounded-lg flex items-center justify-center`}>
                <i className={`fa-solid ${s.icon} ${s.iconColor} text-xl`} aria-hidden />
              </div>
              {s.badge && <span className="text-green-500 text-sm font-medium flex items-center"><i className="fa-solid fa-arrow-up text-xs mr-1" aria-hidden />{s.badge}</span>}
            </div>
            <h3 className="text-gray-500 text-sm mb-1">{s.label}</h3>
            <p className="text-2xl font-bold text-gray-800">{s.value}</p>
            <p className="text-xs text-gray-400 mt-2">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-5 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase mb-2">Campaign Type</label>
            <div className="relative">
              <select className="w-full border border-gray-300 rounded-lg py-2 px-3 appearance-none focus:outline-none focus:border-primary">
                <option>All Types</option>
                <option>Platform Campaigns</option>
                <option>Vendor Promotions</option>
                <option>Seasonal Sales</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-3 top-3 text-gray-400 text-xs pointer-events-none" aria-hidden />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase mb-2">Status</label>
            <div className="relative">
              <select className="w-full border border-gray-300 rounded-lg py-2 px-3 appearance-none focus:outline-none focus:border-primary">
                <option>All Status</option>
                <option>Active</option>
                <option>Scheduled</option>
                <option>Expired</option>
                <option>Pending</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-3 top-3 text-gray-400 text-xs pointer-events-none" aria-hidden />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase mb-2">Date Range</label>
            <div className="relative">
              <input type="text" placeholder="Select dates..." className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:border-primary" />
              <i className="fa-regular fa-calendar absolute left-3 top-3 text-gray-400 text-sm" aria-hidden />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase mb-2">Participation</label>
            <div className="relative">
              <select className="w-full border border-gray-300 rounded-lg py-2 px-3 appearance-none focus:outline-none focus:border-primary">
                <option>All</option>
                <option>Joined</option>
                <option>Not Joined</option>
                <option>Auto-Enrolled</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-3 top-3 text-gray-400 text-xs pointer-events-none" aria-hidden />
            </div>
          </div>
          <div className="flex items-end">
            <button type="button" className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors">
              <i className="fa-solid fa-filter mr-2" aria-hidden />Apply Filters
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-300">
          <div className="flex space-x-1">
            <button type="button" className="px-6 py-3 border-b-2 border-primary text-primary font-medium">
              Platform Campaigns
              <span className="ml-2 bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">5</span>
            </button>
            <button type="button" className="px-6 py-3 text-gray-600 hover:text-gray-800">
              My Promo Codes
              <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">12</span>
            </button>
            <button type="button" className="px-6 py-3 text-gray-600 hover:text-gray-800">
              Pending Approval
              <span className="ml-2 bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs">3</span>
            </button>
            <button type="button" className="px-6 py-3 text-gray-600 hover:text-gray-800">
              Expired
              <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">8</span>
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {campaigns.map((c) => (
          <div key={c.title} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${c.gradient} rounded-lg flex items-center justify-center shrink-0`}>
                    <i className={`fa-solid ${c.icon} text-white text-2xl`} aria-hidden />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{c.title}</h3>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">{c.status}</span>
                      {c.badge2 && <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">{c.badge2}</span>}
                      {c.status === "Scheduled" && <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">{c.status}</span>}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{c.desc}</p>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center text-gray-600">
                        <i className="fa-regular fa-calendar mr-2" aria-hidden />
                        <span>{c.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <i className="fa-solid fa-box mr-2" aria-hidden />
                        <span>{c.items}</span>
                      </div>
                      {c.sales && <div className="flex items-center text-green-600 font-medium"><i className="fa-solid fa-chart-line mr-2" aria-hidden /><span>{c.sales}</span></div>}
                      {c.extra && <div className="flex items-center text-gray-500"><i className="fa-solid fa-clock mr-2" aria-hidden /><span>{c.extra}</span></div>}
                    </div>
                  </div>
                </div>
                <button type="button" className="text-gray-400 hover:text-gray-600" aria-label="More options">
                  <i className="fa-solid fa-ellipsis-v" aria-hidden />
                </button>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="text-sm">
                    <span className="text-gray-500">Discount:</span>
                    <span className="font-medium text-gray-800 ml-1">{c.discount}</span>
                  </div>
                  {c.orders && <div className="text-sm"><span className="text-gray-500">Orders:</span><span className="font-medium text-gray-800 ml-1">{c.orders}</span></div>}
                  {c.conversion && <div className="text-sm"><span className="text-gray-500">Conversion:</span><span className="font-medium text-gray-800 ml-1">{c.conversion}</span></div>}
                  {c.reach && <div className="text-sm"><span className="text-gray-500">Expected Reach:</span><span className="font-medium text-gray-800 ml-1">{c.reach}</span></div>}
                  {c.timeLeft && <div className="text-sm"><span className="text-gray-500">Time Left:</span><span className="font-medium text-orange-600 ml-1">{c.timeLeft}</span></div>}
                  {c.boost && <div className="text-sm"><span className="text-gray-500">Boost:</span><span className="font-medium text-gray-800 ml-1">{c.boost}</span></div>}
                  {c.newCustomers && <div className="text-sm"><span className="text-gray-500">New Customers:</span><span className="font-medium text-gray-800 ml-1">{c.newCustomers}</span></div>}
                </div>
                <div className="flex items-center space-x-2">
                  <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">View Details</button>
                  <button type="button" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-secondary">
                    {c.status === "Scheduled" ? "Add Items" : c.title.includes("Spotlight") ? "Optimize" : "Manage Items"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="text-sm text-gray-600">Showing 1-5 of 8 campaigns</div>
        <div className="flex items-center space-x-2">
          <button type="button" className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
            <i className="fa-solid fa-chevron-left" aria-hidden />
          </button>
          <button type="button" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">1</button>
          <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">2</button>
          <button type="button" className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            <i className="fa-solid fa-chevron-right" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
