"use client";

import { useState } from "react";
import Link from "next/link";
import VendorLayout from "../../components/VendorLayout";
import {
  Info,
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronRight,
  Check,
} from "lucide-react";

const ItemShipping = () => {
  const [shippingZones] = useState([
    {
      id: "1",
      name: "Riyadh",
      regions: "Riyadh City",
      method: "Standard Delivery",
      rate: "SAR 15",
      time: "1-2 days",
      enabled: true,
    },
    {
      id: "2",
      name: "Major Cities",
      regions: "Jeddah, Dammam, Makkah",
      method: "Standard Delivery",
      rate: "SAR 25",
      time: "2-4 days",
      enabled: true,
    },
    {
      id: "3",
      name: "Rest of Saudi Arabia",
      regions: "All other regions",
      method: "Standard Delivery",
      rate: "SAR 35",
      time: "3-5 days",
      enabled: true,
    },
    {
      id: "4",
      name: "International",
      regions: "GCC Countries",
      method: "International Shipping",
      rate: "SAR 75",
      time: "5-10 days",
      enabled: false,
    },
  ]);

  return (
    <VendorLayout
      title="Shipping Settings"
      showBackButton
      breadcrumbs={[
        { label: "Items", href: "/items" },
        { label: "Wireless Earbuds Pro Max", href: "/items/1" },
        { label: "Shipping Settings" },
      ]}
    >
      <div className="grid grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Product Dimensions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Product Dimensions
            </h3>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  defaultValue="0.25"
                  step="0.01"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Length (cm)
                </label>
                <input
                  type="number"
                  defaultValue="10"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Width (cm)
                </label>
                <input
                  type="number"
                  defaultValue="8"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  defaultValue="5"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800">
                    Volumetric weight: <strong>0.08 kg</strong>
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    Shipping cost will be calculated based on the greater of actual
                    weight or volumetric weight.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Zones */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Shipping Zones
              </h3>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium text-sm flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Zone
              </button>
            </div>

            <div className="space-y-4">
              {shippingZones.map((zone) => (
                <div
                  key={zone.id}
                  className={`border rounded-lg p-4 ${
                    zone.enabled
                      ? "border-gray-200"
                      : "border-gray-200 bg-gray-50 opacity-60"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold text-gray-800">
                          {zone.name}
                        </h4>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            zone.enabled
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {zone.enabled ? "Active" : "Disabled"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{zone.regions}</p>
                      <div className="flex items-center space-x-6 mt-3">
                        <div>
                          <span className="text-xs text-gray-500">Method</span>
                          <p className="text-sm font-medium text-gray-700">
                            {zone.method}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Rate</span>
                          <p className="text-sm font-medium text-gray-700">
                            {zone.rate}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">
                            Delivery Time
                          </span>
                          <p className="text-sm font-medium text-gray-700">
                            {zone.time}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked={zone.enabled}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                      <button className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Options */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Shipping Options
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Free Shipping</p>
                  <p className="text-sm text-gray-500">
                    Offer free shipping for orders above a certain amount
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
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium text-gray-800">
                      Free Shipping Threshold
                    </p>
                    <p className="text-sm text-gray-500">
                      Minimum order amount for free shipping
                    </p>
                  </div>
                </div>
                <div className="relative w-48">
                  <span className="absolute left-4 top-2.5 text-gray-500">SAR</span>
                  <input
                    type="number"
                    defaultValue="200"
                    className="w-full pl-14 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Express Shipping</p>
                  <p className="text-sm text-gray-500">
                    Allow customers to choose express delivery
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Handling */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Handling & Processing
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Processing Time
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary appearance-none">
                    <option>Same day</option>
                    <option>1 business day</option>
                    <option>2-3 business days</option>
                    <option>3-5 business days</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Handling Fee
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-2.5 text-gray-500">SAR</span>
                  <input
                    type="number"
                    defaultValue="0"
                    className="w-full pl-14 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Handling Instructions
              </label>
              <textarea
                rows={3}
                placeholder="Any special handling instructions for this product..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Product Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src="https://picsum.photos/seed/shipping1/100/100"
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
                <span className="text-sm text-gray-500">Weight</span>
                <span className="text-sm font-medium text-gray-800">0.25 kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Dimensions</span>
                <span className="text-sm font-medium text-gray-800">
                  10 x 8 x 5 cm
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Shipping Class</span>
                <span className="text-sm font-medium text-gray-800">Standard</span>
              </div>
            </div>
          </div>

          {/* Shipping Class */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Shipping Class
            </h3>
            <div className="relative">
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary appearance-none">
                <option>Standard</option>
                <option>Fragile</option>
                <option>Oversized</option>
                <option>Perishable</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Shipping class determines the base shipping rates and handling
              requirements.
            </p>
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
                href="/items/1/pricing"
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <span className="text-sm text-gray-700">Pricing & Variants</span>
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

export default ItemShipping;
