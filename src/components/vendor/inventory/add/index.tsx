"use client";

import Link from "next/link";
import VendorLayout from "../../components/VendorLayout";
import { Search, ChevronDown } from "lucide-react";

const AddInventory = () => {
  return (
    <VendorLayout
      title="Add Stock"
      showBackButton
      breadcrumbs={[
        { label: "Inventory", href: "/inventory" },
        { label: "Add Stock" },
      ]}
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Add Stock to Inventory
          </h3>

          <div className="space-y-6">
            {/* Product Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Product <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search product by name or SKU..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary pr-10"
                />
                <Search className="w-4 h-4 absolute right-4 top-3 text-gray-400" />
              </div>
            </div>

            {/* Selected Product Preview */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-4">
                <img
                  src="https://picsum.photos/seed/inv1/100/100"
                  alt="Product"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">
                    Wireless Earbuds Pro Max
                  </h4>
                  <p className="text-sm text-gray-500">SKU: WEP-001</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Current Stock</p>
                  <p className="text-lg font-bold text-gray-800">150</p>
                </div>
              </div>
            </div>

            {/* Stock Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity to Add <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Warehouse <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary appearance-none">
                    <option>Select warehouse</option>
                    <option>Riyadh Main</option>
                    <option>Jeddah</option>
                    <option>Dammam</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Purchase Information */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-medium text-gray-800 mb-4">
                Purchase Information (Optional)
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost per Unit
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-2.5 text-gray-500">
                      SAR
                    </span>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full pl-14 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supplier
                  </label>
                  <div className="relative">
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary appearance-none">
                      <option>Select supplier</option>
                      <option>Tech Distributors Inc.</option>
                      <option>Global Electronics</option>
                      <option>Direct Import</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purchase Order Number
                </label>
                <input
                  type="text"
                  placeholder="e.g., PO-2026-001"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                rows={3}
                placeholder="Add any notes about this stock addition..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none"
              ></textarea>
            </div>

            {/* Summary */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-800">New Stock Level</p>
                  <p className="text-xs text-blue-700">After adding 50 units</p>
                </div>
                <p className="text-2xl font-bold text-blue-800">200</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
              <Link
                href="/inventory"
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </Link>
              <button className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium">
                Add Stock
              </button>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default AddInventory;
