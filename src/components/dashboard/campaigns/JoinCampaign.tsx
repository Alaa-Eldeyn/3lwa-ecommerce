"use client";

import { Link } from "@/src/i18n/routing";
import { formatPrice } from "@/src/config/currency";

const items = [
  { id: 1, name: "Wireless Bluetooth Headphones", desc: "Premium quality audio device", price: 129.99, boostAmount: 32.5, rating: "4.8 (124 reviews)", img: "/placeholder.png", alt: "Wireless Bluetooth Headphones", eligible: true, selected: true },
  { id: 2, name: "Latest Smartphone Pro", desc: "Advanced mobile technology", price: 899.99, boostAmount: 225, rating: "4.9 (89 reviews)", img: "/placeholder.png", alt: "Smartphone", eligible: true, selected: true },
  { id: 3, name: "Gaming Mechanical Keyboard", desc: "RGB backlit gaming peripheral", price: 159.99, boostAmount: 40, rating: "4.7 (67 reviews)", img: "/placeholder.png", alt: "Gaming Keyboard", eligible: true, selected: true },
  { id: 4, name: "Professional Laptop", desc: "High-performance computing device", price: 1299.99, boostAmount: 325, rating: "4.6 (143 reviews)", img: "/placeholder.png", alt: "Laptop", eligible: true, selected: false },
  { id: 5, name: "Smart Fitness Watch", desc: "Advanced health monitoring device", price: 249.99, boostAmount: 62.5, rating: "4.5 (98 reviews)", img: "/placeholder.png", alt: "Smart Watch", eligible: true, selected: false },
  { id: 6, name: "Wireless Earbuds Pro", desc: "True wireless audio experience", price: 179.99, boostAmount: 45, rating: "4.8 (156 reviews)", img: "/placeholder.png", alt: "Earbuds", eligible: true, selected: false },
  { id: 7, name: "Ceramic Home Vase", desc: "Decorative home accessory", price: 49.99, boostAmount: null as number | null, rating: "4.3 (23 reviews)", img: "/placeholder.png", alt: "Vase", eligible: false, selected: false },
  { id: 8, name: "Tablet Pro", desc: "Sleek digital device", price: 549.99, boostAmount: 137.5, rating: "4.7 (76 reviews)", img: "/placeholder.png", alt: "Tablet", eligible: true, selected: false },
];

export function JoinCampaign() {
  return (
    <div className="px-8 py-6">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/campaigns" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <i className="fas fa-arrow-left mr-2" aria-hidden />
              <span className="text-sm font-medium">Back to Campaigns</span>
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Join Summer Electronics Sale</h1>
              <p className="text-sm text-gray-500 mt-1">Select items to participate in this campaign</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-4 py-2">
              <i className="fas fa-filter text-gray-600" aria-hidden />
              <select className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none">
                <option>All Items</option>
                <option>Eligible Only</option>
                <option>Selected Only</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
              <i className="fas fa-search text-gray-600" aria-hidden />
              <input type="text" placeholder="Search items..." className="bg-transparent text-sm focus:outline-none w-32" />
            </div>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-r from-primary to-header rounded-lg p-6 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Summer Electronics Sale Campaign</h2>
            <p className="text-white/90 mb-4">Get up to 25% commission boost on electronics during summer season</p>
            <div className="flex items-center space-x-8">
              <div>
                <p className="text-white/80 text-sm">Commission Boost</p>
                <p className="text-lg font-bold">+25%</p>
              </div>
              <div>
                <p className="text-white/80 text-sm">Duration</p>
                <p className="text-lg font-bold">30 Days</p>
              </div>
              <div>
                <p className="text-white/80 text-sm">Eligible Categories</p>
                <p className="text-lg font-bold">Electronics</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-sm">Campaign Ends</p>
            <p className="text-lg font-bold">July 31, 2024</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Selection Summary</h3>
            <p className="text-sm text-gray-500">Review your selected items before joining the campaign</p>
          </div>
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">3</p>
              <p className="text-sm text-gray-500">Items Selected</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">$347</p>
              <p className="text-sm text-gray-500">Potential Boost</p>
            </div>
            <button type="button" className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-secondary transition-colors">
              Join Campaign
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-lg border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${!item.eligible ? "opacity-60" : ""}`}
          >
            <div className="relative">
              <img className="w-full h-48 object-cover" src={item.img} alt={item.alt} />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.eligible ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {item.eligible ? "ELIGIBLE" : "NOT ELIGIBLE"}
                </span>
              </div>
              {item.eligible && (
                <div className="absolute top-3 right-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.selected ? "bg-primary text-white" : "bg-gray-200 text-gray-400"}`}>
                    <i className={`fas ${item.selected ? "fa-check" : "fa-plus"} text-sm`} aria-hidden />
                  </div>
                </div>
              )}
              {item.selected && item.eligible && <div className="absolute inset-0 bg-primary/10 border-2 border-primary rounded-lg pointer-events-none" />}
              {!item.eligible && <div className="absolute inset-0 bg-gray-500/20" />}
            </div>
            <div className="p-4">
              <h4 className={`font-semibold mb-1 ${item.eligible ? "text-gray-900" : "text-gray-500"}`}>{item.name}</h4>
              <p className={`text-sm mb-3 ${item.eligible ? "text-gray-600" : "text-gray-400"}`}>{item.desc}</p>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-lg font-bold ${item.eligible ? "text-gray-900" : "text-gray-500"}`}>{formatPrice(item.price)}</span>
                <span className={`text-sm font-medium ${item.eligible ? "text-green-600" : "text-gray-400"}`}>{item.boostAmount != null ? `+${formatPrice(item.boostAmount)} boost` : "Not eligible"}</span>
              </div>
              <div className={`flex items-center text-sm ${item.eligible ? "text-gray-500" : "text-gray-400"}`}>
                <i className={`fas fa-star mr-1 ${item.eligible ? "text-yellow-400" : "text-gray-300"}`} aria-hidden />
                <span>{item.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
