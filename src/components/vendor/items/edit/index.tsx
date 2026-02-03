"use client";

import { useState } from "react";
import Link from "next/link";
import VendorLayout from "../../components/VendorLayout";
import {
  ChevronDown,
  ChevronRight,
  Eye,
  Trash2,
  Plus,
  X,
  Check,
  TrendingUp,
} from "lucide-react";

const EditItem = () => {
  const [images] = useState<string[]>([
    "https://picsum.photos/seed/edit1/200/200",
    "https://picsum.photos/seed/edit2/200/200",
    "https://picsum.photos/seed/edit3/200/200",
  ]);

  return (
    <VendorLayout
      title="Edit Item"
      showBackButton
      breadcrumbs={[
        { label: "Items", href: "/items" },
        { label: "Wireless Earbuds Pro Max" },
        { label: "Edit" },
      ]}
    >
      <div className="grid grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Basic Information
            </h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  defaultValue="Wireless Earbuds Pro Max"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SKU <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue="WEP-001"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand
                  </label>
                  <div className="relative">
                    <select
                      defaultValue="Apple"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary appearance-none"
                    >
                      <option>Select brand</option>
                      <option value="Apple">Apple</option>
                      <option value="Samsung">Samsung</option>
                      <option value="Sony">Sony</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  defaultValue="Premium wireless earbuds with active noise cancellation, high-fidelity audio, and up to 30 hours of battery life with the charging case. Features include touch controls, wireless charging, and water resistance."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  defaultValue="Premium wireless earbuds with ANC and 30hr battery life"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Media</h3>
            <div className="grid grid-cols-4 gap-4 mb-4">
              {images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt={`Product ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                    <button className="w-8 h-8 bg-white rounded-full text-gray-700 hover:text-primary flex items-center justify-center">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 bg-white rounded-full text-gray-700 hover:text-red-500 flex items-center justify-center">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {index === 0 && (
                    <span className="absolute top-1 left-1 bg-primary text-white text-xs px-2 py-0.5 rounded">
                      Main
                    </span>
                  )}
                </div>
              ))}
              <div className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-24 hover:border-primary cursor-pointer">
                <Plus className="w-6 h-6 text-gray-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Drag images to reorder. First image will be the main image.
            </p>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Pricing</h3>
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cost Price (for profit calculation)
              </label>
              <div className="relative w-1/2">
                <span className="absolute left-4 top-2.5 text-gray-500">SAR</span>
                <input
                  type="number"
                  defaultValue="180"
                  className="w-full pl-14 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Estimated profit margin: <strong className="ml-1">40%</strong> (SAR 119 per unit)
              </p>
            </div>
          </div>

          {/* Inventory */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Inventory</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  defaultValue="150"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Low Stock Alert
                </label>
                <input
                  type="number"
                  defaultValue="20"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="track-stock"
                defaultChecked
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor="track-stock" className="ml-2 text-sm text-gray-700">
                Track stock quantity
              </label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="allow-backorders"
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label
                htmlFor="allow-backorders"
                className="ml-2 text-sm text-gray-700"
              >
                Allow backorders
              </label>
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Shipping</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  defaultValue="0.25"
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
            </div>
            <div className="mt-4 w-1/3">
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
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Status</h3>
            <div className="relative">
              <select
                defaultValue="Active"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary appearance-none"
              >
                <option>Draft</option>
                <option value="Active">Active</option>
                <option>Inactive</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
            </div>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="featured"
                defaultChecked
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                Featured item
              </label>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Created: Jan 15, 2026
                <br />
                Last modified: Jan 18, 2026
              </p>
            </div>
          </div>

          {/* Category */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Category</h3>
            <div className="relative">
              <select
                defaultValue="Electronics"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary appearance-none"
              >
                <option>Select category</option>
                <option value="Electronics">Electronics</option>
                <option>Accessories</option>
                <option>Clothing</option>
                <option>Home & Garden</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative mt-4">
              <select
                defaultValue="Audio"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary appearance-none"
              >
                <option>Select subcategory</option>
                <option value="Audio">Audio</option>
                <option>Wearables</option>
                <option>Computers</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tags</h3>
            <input
              type="text"
              placeholder="Add tags separated by comma"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center">
                wireless
                <button className="ml-2 text-gray-500 hover:text-gray-700">
                  <X className="w-3 h-3" />
                </button>
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center">
                earbuds
                <button className="ml-2 text-gray-500 hover:text-gray-700">
                  <X className="w-3 h-3" />
                </button>
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center">
                audio
                <button className="ml-2 text-gray-500 hover:text-gray-700">
                  <X className="w-3 h-3" />
                </button>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Links
            </h3>
            <div className="space-y-2">
              <Link
                href="/items/1/pricing"
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <span className="text-sm text-gray-700">
                  Pricing & Variants
                </span>
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
                Update Item
              </button>
              <Link
                href="/items/1"
                className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center justify-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Item
              </Link>
              <button className="w-full px-4 py-2.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 font-medium flex items-center justify-center">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default EditItem;
