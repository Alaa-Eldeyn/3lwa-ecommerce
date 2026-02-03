"use client";

import Link from "next/link";
import VendorLayout from "../../components/VendorLayout";
import { Pencil, Plus, Minus, ArrowLeftRight, AlertTriangle } from "lucide-react";

const stockHistory = [
  {
    date: "Jan 18, 2026",
    type: "Stock Added",
    quantity: "+50",
    balance: "150",
    reason: "Stock Received",
    user: "System",
  },
  {
    date: "Jan 17, 2026",
    type: "Order #7829",
    quantity: "-3",
    balance: "100",
    reason: "Order Fulfilled",
    user: "System",
  },
  {
    date: "Jan 16, 2026",
    type: "Order #7825",
    quantity: "-2",
    balance: "103",
    reason: "Order Fulfilled",
    user: "System",
  },
  {
    date: "Jan 15, 2026",
    type: "Adjustment",
    quantity: "-5",
    balance: "105",
    reason: "Damaged Items",
    user: "Ahmed",
  },
  {
    date: "Jan 14, 2026",
    type: "Stock Added",
    quantity: "+110",
    balance: "110",
    reason: "Initial Stock",
    user: "Ahmed",
  },
];

const InventoryDetails = () => {
  return (
    <VendorLayout
      title="Inventory Details"
      showBackButton
      breadcrumbs={[
        { label: "Inventory", href: "/inventory" },
        { label: "Wireless Earbuds Pro Max" },
      ]}
    >
      {/* Action Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            In Stock
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/inventory/1/edit"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Link>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Stock
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Stock Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Stock Overview
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700">Available</p>
                <p className="text-3xl font-bold text-green-800">150</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-700">Reserved</p>
                <p className="text-3xl font-bold text-yellow-800">12</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">In Transit</p>
                <p className="text-3xl font-bold text-blue-800">0</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Stock Level</p>
                  <div className="flex items-center mt-2">
                    <div className="w-48 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-800 ml-3">
                      75%
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Low Stock Alert</p>
                  <p className="text-lg font-semibold text-gray-800">20 units</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stock History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Stock History
              </h3>
              <button className="text-primary text-sm font-medium hover:underline">
                Export History
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Balance
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Reason
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      By
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stockHistory.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {entry.date}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800">
                        {entry.type}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-sm font-medium ${
                            entry.quantity.startsWith("+")
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {entry.quantity}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">
                        {entry.balance}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {entry.reason}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {entry.user}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stock Forecast */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Stock Forecast
            </h3>
            <div className="h-48 flex items-end justify-between space-x-4 border-b border-gray-200 pb-4">
              {["Week 1", "Week 2", "Week 3", "Week 4"].map((week, index) => {
                const heights = [75, 60, 45, 30];
                return (
                  <div key={week} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-primary/20 rounded-t-lg"
                      style={{ height: `${heights[index]}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">{week}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-yellow-800 font-medium">
                    Stock Alert
                  </p>
                  <p className="text-xs text-yellow-700 mt-1">
                    Based on current sales velocity, stock will reach low level in
                    approximately <strong>3 weeks</strong>. Consider reordering
                    soon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Product Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src="https://picsum.photos/seed/invdetail1/100/100"
                alt="Product"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-800">
                  Wireless Earbuds Pro Max
                </h4>
                <p className="text-sm text-gray-500">SKU: WEP-001</p>
              </div>
            </div>
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Category</span>
                <span className="text-sm font-medium text-gray-800">
                  Electronics
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Price</span>
                <span className="text-sm font-medium text-gray-800">SAR 299</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Stock Value</span>
                <span className="text-sm font-medium text-gray-800">
                  SAR 44,850
                </span>
              </div>
            </div>
            <Link
              href="/items/1"
              className="mt-4 w-full px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 font-medium flex items-center justify-center"
            >
              View Product
            </Link>
          </div>

          {/* Warehouse Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Warehouse
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Location</span>
                <span className="text-sm font-medium text-gray-800">
                  Riyadh Main
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Zone</span>
                <span className="text-sm font-medium text-gray-800">A-15</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Shelf</span>
                <span className="text-sm font-medium text-gray-800">R3-B2</span>
              </div>
            </div>
          </div>

          {/* Stock Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Track Stock</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  Enabled
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Backorders</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                  Disabled
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Low Stock Alert</span>
                <span className="text-sm font-medium text-gray-800">
                  20 units
                </span>
              </div>
            </div>
            <Link
              href="/inventory/1/edit"
              className="mt-4 w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center justify-center"
            >
              Edit Settings
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium text-sm flex items-center justify-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Stock
              </button>
              <button className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center justify-center">
                <Minus className="w-4 h-4 mr-2" />
                Remove Stock
              </button>
              <button className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center justify-center">
                <ArrowLeftRight className="w-4 h-4 mr-2" />
                Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default InventoryDetails;
