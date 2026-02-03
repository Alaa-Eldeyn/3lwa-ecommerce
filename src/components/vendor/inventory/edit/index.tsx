"use client";

import Link from "next/link";
import VendorLayout from "../../components/VendorLayout";
import { ChevronDown } from "lucide-react";

const EditInventory = () => {
  return (
    <VendorLayout
      title="Edit Inventory"
      showBackButton
      breadcrumbs={[
        { label: "Inventory", href: "/inventory" },
        { label: "Wireless Earbuds Pro Max", href: "/inventory/1" },
        { label: "Edit" },
      ]}
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4 pb-6 border-b border-gray-200 mb-6">
            <img
              src="https://picsum.photos/seed/editinv1/100/100"
              alt="Product"
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Wireless Earbuds Pro Max
              </h3>
              <p className="text-sm text-gray-500">SKU: WEP-001</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Stock Adjustment */}
            <div>
              <h4 className="font-medium text-gray-800 mb-4">Stock Adjustment</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Stock
                  </label>
                  <input
                    type="number"
                    defaultValue="150"
                    disabled
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adjustment Type
                  </label>
                  <div className="relative">
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary appearance-none">
                      <option>Add</option>
                      <option>Remove</option>
                      <option>Set</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    defaultValue="0"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Stock Settings */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-medium text-gray-800 mb-4">Stock Settings</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Low Stock Alert
                  </label>
                  <input
                    type="number"
                    defaultValue="20"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Alert when stock falls below this level
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Warehouse
                  </label>
                  <div className="relative">
                    <select
                      defaultValue="Riyadh Main"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary appearance-none"
                    >
                      <option value="Riyadh Main">Riyadh Main</option>
                      <option>Jeddah</option>
                      <option>Dammam</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tracking Options */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-medium text-gray-800 mb-4">Tracking Options</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Track Stock</p>
                    <p className="text-sm text-gray-500">
                      Automatically update stock when orders are placed
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Allow Backorders</p>
                    <p className="text-sm text-gray-500">
                      Accept orders even when out of stock
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">
                      Low Stock Notifications
                    </p>
                    <p className="text-sm text-gray-500">
                      Receive email alerts for low stock
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Adjustment Reason */}
            <div className="border-t border-gray-200 pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adjustment Reason
              </label>
              <div className="relative mb-4">
                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary appearance-none">
                  <option>Select reason</option>
                  <option>Stock Received</option>
                  <option>Stock Correction</option>
                  <option>Damaged/Lost</option>
                  <option>Return to Supplier</option>
                  <option>Other</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
              </div>
              <textarea
                rows={3}
                placeholder="Add notes about this adjustment..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none"
              ></textarea>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
              <Link
                href="/inventory/1"
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </Link>
              <button className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default EditInventory;
