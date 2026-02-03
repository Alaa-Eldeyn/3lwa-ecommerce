"use client";

import { useState } from "react";
import Link from "next/link";
import VendorLayout from "../../components/VendorLayout";
import { ChevronDown, CloudUpload, X, Check } from "lucide-react";

const AddItem = () => {
  const [images, setImages] = useState<string[]>([]);

  return (
    <VendorLayout
      title="Add New Item"
      showBackButton
      breadcrumbs={[
        { label: "Items", href: "/items" },
        { label: "Add New Item" },
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
                  placeholder="Enter item name"
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
                    placeholder="e.g., WEP-001"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand
                  </label>
                  <div className="relative">
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary appearance-none">
                      <option>Select brand</option>
                      <option>Apple</option>
                      <option>Samsung</option>
                      <option>Sony</option>
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
                  placeholder="Enter item description..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief description for listing cards..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Media</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <CloudUpload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-2">
                Drag and drop your images here
              </p>
              <p className="text-xs text-gray-500 mb-4">or</p>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                Browse Files
              </button>
              <p className="text-xs text-gray-400 mt-3">
                PNG, JPG, WEBP up to 5MB. First image will be the main image.
              </p>
            </div>
            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt={`Product ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
                    placeholder="0.00"
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
                    placeholder="0.00"
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
                  placeholder="0.00"
                  className="w-full pl-14 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
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
                  placeholder="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Low Stock Alert
                </label>
                <input
                  type="number"
                  placeholder="10"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="track-stock"
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
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Length (cm)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Width (cm)
                </label>
                <input
                  type="number"
                  placeholder="0"
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
                placeholder="0"
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
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary appearance-none">
                <option>Draft</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
            </div>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="featured"
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                Featured item
              </label>
            </div>
          </div>

          {/* Category */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Category</h3>
            <div className="relative">
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary appearance-none">
                <option>Select category</option>
                <option>Electronics</option>
                <option>Accessories</option>
                <option>Clothing</option>
                <option>Home & Garden</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative mt-4">
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary appearance-none">
                <option>Select subcategory</option>
                <option>Audio</option>
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
                electronics
                <button className="ml-2 text-gray-500 hover:text-gray-700">
                  <X className="w-3 h-3" />
                </button>
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-3">
              <button className="w-full px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium flex items-center justify-center">
                <Check className="w-4 h-4 mr-2" />
                Save Item
              </button>
              <button className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                Save as Draft
              </button>
              <Link
                href="/items"
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

export default AddItem;
