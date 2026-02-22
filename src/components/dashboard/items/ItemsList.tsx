"use client";

import { Link } from "@/src/i18n/routing";

const items = [
  { name: "Premium Wireless Headphones", sku: "WH-PRO-001", stock: 48, price: "$129.99", sold: "234 sold", status: "Active", statusClass: "bg-green-100 text-green-700", stockClass: "", img: "/placeholder.png44d6b24262-f433849a138127beb3c0", alt: "premium wireless headphones black on white background product photography" },
  { name: "Smart Watch Pro", sku: "SW-PRO-002", stock: 92, price: "$299.99", sold: "187 sold", status: "Active", statusClass: "bg-green-100 text-green-700", stockClass: "", img: "/placeholder.png731647a66a-56dd49212dbddcaccaca", alt: "smart watch fitness tracker black modern product photography" },
  { name: "Bluetooth Speaker", sku: "BT-SPK-003", stock: 8, price: "$79.99", sold: "312 sold", status: "Low Stock", statusClass: "bg-orange-100 text-orange-700", stockClass: "text-orange-600", img: "/placeholder.png2312db6c70-1d8be3d3ddcf8963dc36", alt: "bluetooth speaker portable wireless black product photography" },
  { name: "USB-C Fast Charging Cable", sku: "USB-C-004", stock: 156, price: "$19.99", sold: "521 sold", status: "Active", statusClass: "bg-green-100 text-green-700", stockClass: "", img: "/placeholder.pngcd61429dc1-51e64fa7a5b5c45a829c", alt: "usb-c charging cable white modern product photography" },
  { name: "Wireless Ergonomic Mouse", sku: "WM-ERG-005", stock: 34, price: "$49.99", sold: "98 sold", status: "Inactive", statusClass: "bg-gray-100 text-gray-700", stockClass: "", img: "/placeholder.pnge04e21910b-6553456bddc85b8f9d4d", alt: "wireless mouse ergonomic black product photography" },
  { name: "Aluminum Laptop Stand", sku: "LAP-STD-006", stock: 0, price: "$59.99", sold: "0 sold", status: "Draft", statusClass: "bg-yellow-100 text-yellow-700", stockClass: "", img: "/placeholder.pnga1ecd19460-9a0db6fba5ef70c6485c", alt: "laptop stand aluminum modern minimalist product photography" },
  { name: "RGB Mechanical Keyboard", sku: "RGB-KB-007", stock: 67, price: "$119.99", sold: "143 sold", status: "Active", statusClass: "bg-green-100 text-green-700", stockClass: "", img: "/placeholder.png68ed8ac243-237b62e7965150b297a7", alt: "mechanical keyboard rgb backlit gaming product photography" },
];

export function ItemsList() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <header id="header" className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-semibold text-gray-800">Items & Offers</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input type="text" placeholder="Search items..." className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" aria-label="Search items" />
              <i className="fa-solid fa-search absolute left-3 top-3 text-gray-400 text-sm" aria-hidden />
            </div>
            <button type="button" className="relative p-2 text-gray-600 hover:text-gray-800" aria-label="Notifications">
              <i className="fa-regular fa-bell text-xl" aria-hidden />
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
            </button>
            <button type="button" className="p-2 text-gray-600 hover:text-gray-800" aria-label="Help">
              <i className="fa-regular fa-question-circle text-xl" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-8">
          <div id="action-bar" className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <button type="button" className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
                <i className="fa-solid fa-filter mr-2 text-sm" aria-hidden />Filter
              </button>
              <div className="relative">
                <select className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 appearance-none pr-10" aria-label="Status">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Draft</option>
                </select>
                <i className="fa-solid fa-chevron-down absolute right-3 top-3 text-gray-400 text-xs pointer-events-none" aria-hidden />
              </div>
              <div className="relative">
                <select className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 appearance-none pr-10" aria-label="Sort">
                  <option>Sort: Recent</option>
                  <option>Sort: Name A-Z</option>
                  <option>Sort: Price Low-High</option>
                  <option>Sort: Price High-Low</option>
                </select>
                <i className="fa-solid fa-chevron-down absolute right-3 top-3 text-gray-400 text-xs pointer-events-none" aria-hidden />
              </div>
            </div>
            <Link href="/dashboard/add-item" className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-secondary flex items-center">
              <i className="fa-solid fa-plus mr-2" aria-hidden />Add New Item
            </Link>
          </div>

          <div id="stats-cards" className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total Items", value: "145", icon: "fa-box", bg: "bg-blue-100", color: "text-blue-600" },
              { label: "Active", value: "127", icon: "fa-check-circle", bg: "bg-green-100", color: "text-green-600" },
              { label: "Inactive", value: "12", icon: "fa-pause-circle", bg: "bg-gray-100", color: "text-gray-600" },
              { label: "Draft", value: "6", icon: "fa-file-alt", bg: "bg-orange-100", color: "text-orange-600" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-500">{s.label}</p>
                  <div className={`w-8 h-8 ${s.bg} rounded-lg flex items-center justify-center`}>
                    <i className={`fa-solid ${s.icon} ${s.color} text-sm`} aria-hidden />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-800">{s.value}</p>
              </div>
            ))}
          </div>

          <div id="items-list" className="bg-white rounded-lg border border-gray-200">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" aria-label="Select all" />
                <span className="ml-3 text-sm text-gray-600">Select All</span>
              </div>
              <div className="flex items-center space-x-2">
                <button type="button" className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded">
                  <i className="fa-solid fa-pencil mr-1" aria-hidden />Edit
                </button>
                <button type="button" className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded">
                  <i className="fa-solid fa-copy mr-1" aria-hidden />Duplicate
                </button>
                <button type="button" className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded">
                  <i className="fa-solid fa-trash mr-1" aria-hidden />Delete
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.sku} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" aria-label={`Select ${item.name}`} />
                    <div className="ml-4 flex items-center flex-1">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                        <img className="w-full h-full object-cover" src={item.img} alt={item.alt} />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center mb-1">
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          <span className={`ml-3 ${item.statusClass} px-2 py-0.5 rounded text-xs font-medium`}>{item.status}</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-1">SKU: {item.sku}</p>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className={`mr-4 ${item.stockClass}`}><i className="fa-solid fa-box text-gray-400 mr-1" aria-hidden />Stock: {item.stock}</span>
                          <span className="mr-4"><i className="fa-solid fa-dollar-sign text-gray-400 mr-1" aria-hidden />{item.price}</span>
                          <span><i className="fa-solid fa-shopping-cart text-gray-400 mr-1" aria-hidden />{item.sold}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link href="/dashboard/edit-item" className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/10 rounded">
                          <i className="fa-solid fa-pencil text-sm" aria-hidden />
                        </Link>
                        <button type="button" className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                          <i className="fa-solid fa-ellipsis-v text-sm" aria-hidden />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
