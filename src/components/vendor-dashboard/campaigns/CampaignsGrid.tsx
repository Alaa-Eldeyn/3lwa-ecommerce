"use client";

const stats = [
  { label: "Total Campaigns", value: "8", icon: "fa-bullhorn", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
  { label: "Joined Campaigns", value: "3", icon: "fa-check-circle", iconBg: "bg-green-100", iconColor: "text-green-600" },
  { label: "Eligible Campaigns", value: "5", icon: "fa-star", iconBg: "bg-orange-100", iconColor: "text-orange-600" },
  { label: "Active Now", value: "2", icon: "fa-play", iconBg: "bg-green-100", iconColor: "text-green-600" },
];

const cards = [
  { title: "Winter Flash Sale", status: "Active", statusClass: "bg-green-100 text-green-800", desc: "Up to 40% off on electronics and accessories. Limited time offer for winter season.", start: "Jan 15, 2024", end: "Jan 31, 2024", discount: "20% - 40%", category: "Electronics", eligibility: "Eligible", participation: "Joined", btnPrimary: "Manage Items", btnSecondary: "View Details" },
  { title: "Valentine's Day Special", status: "Upcoming", statusClass: "bg-purple-100 text-purple-800", desc: "Special discounts on gifts and accessories for Valentine's Day celebration.", start: "Feb 10, 2024", end: "Feb 14, 2024", discount: "15% - 25%", category: "Gifts & Accessories", eligibility: "Eligible", participation: "Not Joined", btnPrimary: "Join Campaign", btnSecondary: "View Details" },
  { title: "New Year Mega Sale", status: "Ended", statusClass: "bg-gray-100 text-gray-800", desc: "Massive discounts to kickstart the new year with great deals across all categories.", start: "Jan 1, 2024", end: "Jan 10, 2024", discount: "30% - 50%", performance: "+45% Sales", participation: "Participated", itemsSold: "127 items", btnPrimary: "View Details", btnSecondary: "View Report" },
  { title: "Premium Brand Showcase", status: "Active", statusClass: "bg-green-100 text-green-800", desc: "Exclusive campaign for premium brand partners with high-quality products.", start: "Jan 20, 2024", end: "Feb 20, 2024", requirements: "Premium Tier", minRating: "4.5+ Stars", eligibility: "Not Eligible", eligibilityClass: "bg-red-100 text-red-800", note: "Requires Premium Tier membership and minimum 4.5-star rating.", btnSecondary: "View Requirements" },
];

export function CampaignsGrid() {
  return (
    <div className="px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Available Campaigns</h1>
        <p className="text-gray-600">View and join marketing campaigns created by the platform admin. Participate to boost your product visibility.</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{s.label}</p>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              </div>
              <div className={`w-12 h-12 ${s.iconBg} rounded-lg flex items-center justify-center`}>
                <i className={`fa-solid ${s.icon} ${s.iconColor} text-xl`} aria-hidden />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Filter Campaigns</h2>
          <button type="button" className="text-sm text-primary hover:text-primary/80 font-medium">Reset Filters</button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Search</label>
            <div className="relative">
              <input type="text" placeholder="Search campaigns..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
              <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Status</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
              <option>All Campaigns</option>
              <option>Active</option>
              <option>Upcoming</option>
              <option>Past</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Participation</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
              <option>All</option>
              <option>Eligible</option>
              <option>Joined</option>
              <option>Not Eligible</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Campaign Type</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
              <option>All Types</option>
              <option>Discount</option>
              <option>Flash Sale</option>
              <option>BOGO</option>
              <option>Seasonal</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {cards.map((c) => (
          <div
            key={c.title}
            className={`bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow ${c.eligibility === "Not Eligible" ? "opacity-60" : c.status === "Ended" ? "opacity-75" : ""}`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{c.title}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${c.statusClass}`}>{c.status}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{c.desc}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ml-4 ${c.status === "Active" && c.participation === "Joined" ? "bg-red-100" : c.status === "Upcoming" ? "bg-pink-100" : c.status === "Ended" ? "bg-yellow-100" : "bg-purple-100"}`}>
                  <i className={`fa-solid ${c.status === "Active" && c.participation === "Joined" ? "fa-fire" : c.status === "Upcoming" ? "fa-heart" : c.status === "Ended" ? "fa-star" : "fa-crown"} ${c.status === "Active" && c.participation === "Joined" ? "text-red-600" : c.status === "Upcoming" ? "text-pink-600" : c.status === "Ended" ? "text-yellow-600" : "text-purple-600"} text-xl`} aria-hidden />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div><span className="text-gray-600">Start Date:</span><div className="font-medium">{c.start}</div></div>
                <div><span className="text-gray-600">End Date:</span><div className="font-medium">{c.end}</div></div>
                {c.discount && <div><span className="text-gray-600">Discount:</span><div className="font-medium text-primary">{c.discount}</div></div>}
                {c.category && <div><span className="text-gray-600">Category:</span><div className="font-medium">{c.category}</div></div>}
                {c.performance && <div><span className="text-gray-600">Performance:</span><div className="font-medium text-green-600">{c.performance}</div></div>}
                {c.requirements && <div><span className="text-gray-600">Requirements:</span><div className="font-medium">{c.requirements}</div></div>}
                {c.minRating && <div><span className="text-gray-600">Min Rating:</span><div className="font-medium">{c.minRating}</div></div>}
              </div>
              <div className="border-t border-gray-200 pt-4">
                {c.eligibility && (
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Eligibility:</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${c.eligibilityClass || "bg-green-100 text-green-800"}`}>{c.eligibility}</span>
                  </div>
                )}
                {c.participation && !c.eligibilityClass && (
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Participation:</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${c.participation === "Joined" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}>{c.participation}</span>
                  </div>
                )}
                {c.itemsSold && (
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Items Sold:</span>
                    <span className="font-medium">{c.itemsSold}</span>
                  </div>
                )}
                {c.note && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                    <p className="text-xs text-red-700">{c.note}</p>
                  </div>
                )}
                <div className="flex space-x-3">
                  {c.btnSecondary && (
                    <button type="button" className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                      {c.btnSecondary}
                    </button>
                  )}
                  {c.btnPrimary && (
                    <button type="button" className="flex-1 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
                      {c.btnPrimary}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
