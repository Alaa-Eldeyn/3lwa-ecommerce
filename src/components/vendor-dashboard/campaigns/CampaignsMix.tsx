"use client";

const stats = [
  { label: "Available Campaigns", value: "12", icon: "fa-bullhorn", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
  { label: "Joined Campaigns", value: "5", icon: "fa-handshake", iconBg: "bg-primary/10", iconColor: "text-primary" },
  { label: "Active Promotions", value: "8", icon: "fa-tags", iconBg: "bg-green-100", iconColor: "text-green-600" },
  { label: "Potential Revenue", value: "$2,450", icon: "fa-dollar-sign", iconBg: "bg-yellow-100", iconColor: "text-yellow-600" },
];

const available = [
  { title: "Holiday Flash Deals", desc: "Limited time offers on top-selling products with enhanced visibility", boost: "+20%", duration: "14 Days", eligibility: "Electronics", eligibilityClass: "bg-blue-100 text-blue-800" },
  { title: "Fitness & Wellness", desc: "Promote healthy lifestyle products with special marketing support", boost: "+15%", duration: "45 Days", eligibility: "Health", eligibilityClass: "bg-green-100 text-green-800" },
  { title: "Home & Garden", desc: "Spring collection with seasonal promotions and featured placement", boost: "+18%", duration: "60 Days", eligibility: "Home", eligibilityClass: "bg-purple-100 text-purple-800" },
];

const joined = [
  { title: "Tech Innovation Week", desc: "Showcase cutting-edge technology products with enhanced visibility and marketing support", boost: "+22%", items: "8 items", remaining: "12 days", revenue: "$1,245" },
  { title: "Premium Accessories Drive", desc: "Focus on high-quality accessories with premium positioning and customer targeting", boost: "+28%", items: "12 items", remaining: "25 days", revenue: "$890" },
];

export function CampaignsMix() {
  return (
    <div className="px-8 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
        <p className="text-sm text-gray-500 mt-1">Discover and join promotional campaigns to boost your sales</p>
      </header>

      <div className="flex items-center space-x-3 mb-8">
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-4 py-2">
          <i className="fas fa-filter text-gray-600" aria-hidden />
          <select className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none">
            <option>All Campaigns</option>
            <option>Available</option>
            <option>Joined</option>
            <option>Expired</option>
          </select>
        </div>
        <button type="button" className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
          <i className="fas fa-search text-sm" aria-hidden />
          <span className="text-sm font-medium">Browse All</span>
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{s.label}</p>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              </div>
              <div className={`w-12 h-12 ${s.iconBg} rounded-lg flex items-center justify-center`}>
                <i className={`fas ${s.icon} ${s.iconColor} text-xl`} aria-hidden />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Featured Campaigns</h2>
          <span className="text-sm text-gray-500">High impact opportunities</span>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-primary to-header rounded-xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" aria-hidden />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full">FEATURED</span>
                <span className="text-white/80 text-sm">Ends in 15 days</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Summer Electronics Sale</h3>
              <p className="text-white/90 text-sm mb-4">Get up to 25% commission boost on electronics during summer season</p>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-white/80 text-xs mb-1">Commission Boost</p>
                  <p className="text-lg font-bold">+25%</p>
                </div>
                <div>
                  <p className="text-white/80 text-xs mb-1">Duration</p>
                  <p className="text-lg font-bold">30 Days</p>
                </div>
              </div>
              <button type="button" className="w-full bg-white text-primary font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors">
                View Details &amp; Join
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" aria-hidden />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full">HOT</span>
                <span className="text-white/80 text-sm">Ends in 8 days</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Back to School Mega Sale</h3>
              <p className="text-white/90 text-sm mb-4">Special promotion for educational and tech products</p>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-white/80 text-xs mb-1">Commission Boost</p>
                  <p className="text-lg font-bold">+30%</p>
                </div>
                <div>
                  <p className="text-white/80 text-xs mb-1">Duration</p>
                  <p className="text-lg font-bold">21 Days</p>
                </div>
              </div>
              <button type="button" className="w-full bg-white text-orange-500 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors">
                View Details &amp; Join
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Available Campaigns</h2>
          <span className="text-sm text-gray-500">12 campaigns</span>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {available.map((c) => (
            <div key={c.title} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">AVAILABLE</span>
                <i className="fas fa-heart text-gray-300 hover:text-red-500 cursor-pointer" aria-hidden />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{c.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{c.desc}</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Commission Boost</span>
                  <span className="text-sm font-semibold text-gray-900">{c.boost}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Duration</span>
                  <span className="text-sm font-semibold text-gray-900">{c.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Eligibility</span>
                  <span className={`text-xs ${c.eligibilityClass} px-2 py-1 rounded-full`}>{c.eligibility}</span>
                </div>
              </div>
              <button type="button" className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-secondary transition-colors">
                Join Campaign
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Your Active Campaigns</h2>
          <span className="text-sm text-gray-500">5 campaigns</span>
        </div>
        <div className="space-y-4">
          {joined.map((c) => (
            <div key={c.title} className="bg-white rounded-lg border border-primary/20 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">ACTIVE</span>
                    <h3 className="font-bold text-gray-900">{c.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{c.desc}</p>
                  <div className="grid grid-cols-4 gap-6">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Commission Boost</p>
                      <p className="text-sm font-semibold text-gray-900">{c.boost}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Items Enrolled</p>
                      <p className="text-sm font-semibold text-gray-900">{c.items}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Time Remaining</p>
                      <p className="text-sm font-semibold text-gray-900">{c.remaining}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Campaign Revenue</p>
                      <p className="text-sm font-semibold text-green-600">{c.revenue}</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 ml-6">
                  <button type="button" className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
                    View Details
                  </button>
                  <button type="button" className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-secondary transition-colors">
                    Manage Items
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
