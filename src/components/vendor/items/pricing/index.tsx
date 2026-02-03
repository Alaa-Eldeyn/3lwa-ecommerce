"use client";

import { useState } from "react";
import Link from "next/link";
import VendorLayout from "../../components/VendorLayout";
import {
  TrendingUp,
  Percent,
  Info,
  Plus,
  Pencil,
  Trash2,
  ChevronRight,
  Check,
} from "lucide-react";

const ItemPricing = () => {
  const [variants] = useState([
    {
      id: "1",
      name: "Black",
      sku: "WEP-001-BLK",
      price: "299",
      stock: 50,
      enabled: true,
    },
    {
      id: "2",
      name: "White",
      sku: "WEP-001-WHT",
      price: "299",
      stock: 45,
      enabled: true,
    },
    {
      id: "3",
      name: "Blue",
      sku: "WEP-001-BLU",
      price: "309",
      stock: 30,
      enabled: true,
    },
    {
      id: "4",
      name: "Red",
      sku: "WEP-001-RED",
      price: "309",
      stock: 25,
      enabled: false,
    },
  ]);

  return (
    <VendorLayout
      title="Pricing & Variants"
      showBackButton
      breadcrumbs={[
        { label: "Items", href: "/items" },
        { label: "Wireless Earbuds Pro Max", href: "/items/1" },
        { label: "Pricing & Variants" },
      ]}
    >
      <div className="grid grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Base Pricing */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Base Pricing
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Regular Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-2.5 text-gray-500">SAR</span>
                  <input
                    type="number"
                    defaultValue="349"
                    className="w-full pl-14 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sale Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-2.5 text-gray-500">SAR</span>
                  <input
                    type="number"
                    defaultValue="299"
                    className="w-full pl-14 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-2.5 text-gray-500">SAR</span>
                  <input
                    type="number"
                    defaultValue="180"
                    className="w-full pl-14 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Profit Margin: <strong className="ml-1">40%</strong>
                </p>
                <p className="text-xs text-green-700 mt-1">
                  SAR 119 profit per unit
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 flex items-center">
                  <Percent className="w-4 h-4 mr-2" />
                  Discount: <strong className="ml-1">14%</strong>
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  SAR 50 off regular price
                </p>
              </div>
            </div>
          </div>

          {/* Sale Schedule */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Sale Schedule
              </h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  defaultValue="2026-01-15T00:00"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="datetime-local"
                  defaultValue="2026-02-15T23:59"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-yellow-800">
                    Sale is active and will end in <strong>25 days</strong>
                  </p>
                  <p className="text-xs text-yellow-700 mt-1">
                    The sale price will automatically revert to regular price after
                    the end date.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Product Variants
              </h3>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium text-sm flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Variant
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Variant
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      SKU
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Price (SAR)
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Stock
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Enabled
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {variants.map((variant) => (
                    <tr key={variant.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div
                            className="w-6 h-6 rounded-full border border-gray-200 mr-3"
                            style={{
                              backgroundColor:
                                variant.name.toLowerCase() === "white"
                                  ? "#ffffff"
                                  : variant.name.toLowerCase(),
                            }}
                          ></div>
                          <span className="text-sm font-medium text-gray-800">
                            {variant.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {variant.sku}
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          defaultValue={variant.price}
                          className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          defaultValue={variant.stock}
                          className="w-20 px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked={variant.enabled}
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <button className="p-1.5 text-gray-600 hover:text-primary hover:bg-gray-100 rounded">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bulk Pricing */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Bulk Pricing
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Offer discounts for larger quantities
                </p>
              </div>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Tier
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    Min Quantity
                  </label>
                  <input
                    type="number"
                    defaultValue="5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    Max Quantity
                  </label>
                  <input
                    type="number"
                    defaultValue="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    Discount %
                  </label>
                  <input
                    type="number"
                    defaultValue="5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                  />
                </div>
                <button className="p-2 text-gray-400 hover:text-red-500 mt-5">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    Min Quantity
                  </label>
                  <input
                    type="number"
                    defaultValue="11"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    Max Quantity
                  </label>
                  <input
                    type="number"
                    defaultValue="20"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    Discount %
                  </label>
                  <input
                    type="number"
                    defaultValue="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                  />
                </div>
                <button className="p-2 text-gray-400 hover:text-red-500 mt-5">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Product Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src="https://picsum.photos/seed/pricing1/100/100"
                alt="Product"
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-800">
                  Wireless Earbuds Pro Max
                </h4>
                <p className="text-sm text-gray-500">SKU: WEP-001</p>
              </div>
            </div>
            <div className="space-y-2 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Total Stock</span>
                <span className="text-sm font-medium text-gray-800">
                  150 units
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Links
            </h3>
            <div className="space-y-2">
              <Link
                href="/items/1"
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <span className="text-sm text-gray-700">View Item</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/items/1/edit"
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <span className="text-sm text-gray-700">Edit Item</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/items/1/shipping"
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <span className="text-sm text-gray-700">Shipping Settings</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-3">
              <button className="w-full px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium flex items-center justify-center">
                <Check className="w-4 h-4 mr-2" />
                Save Changes
              </button>
              <Link
                href="/items/1"
                className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center justify-center"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default ItemPricing;
