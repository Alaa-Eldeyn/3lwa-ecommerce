"use client";

import { Link } from "@/src/i18n/routing";

export function AddItemV2() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/vendor/items" className="text-gray-500 hover:text-gray-700" aria-label="Back">
              <i className="fa-solid fa-arrow-left" aria-hidden />
            </Link>
            <div>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <span>Items &amp; Offers</span>
                <i className="fa-solid fa-chevron-right text-xs mx-2" aria-hidden />
                <span>Add New Item</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Add New Item</h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
              Save as Draft
            </button>
            <button type="button" className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium">
              Publish Item
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-7xl mx-auto p-8">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Basic Information</h3>
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Item Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Enter item name" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" />
                </div>
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description <span className="text-red-500">*</span></label>
                  <textarea rows={5} placeholder="Describe your item in detail..." className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" />
                  <p className="text-xs text-gray-500 mt-1">Minimum 50 characters recommended</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" aria-label="Category">
                        <option>Select category</option>
                        <option>Electronics</option>
                        <option>Fashion &amp; Apparel</option>
                        <option>Home &amp; Garden</option>
                        <option>Sports &amp; Outdoors</option>
                        <option>Beauty &amp; Health</option>
                      </select>
                      <i className="fa-solid fa-chevron-down absolute right-4 top-3.5 text-gray-400 text-sm pointer-events-none" aria-hidden />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sub-Category</label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" aria-label="Sub-category">
                        <option>Select sub-category</option>
                        <option>Smartphones</option>
                        <option>Laptops</option>
                        <option>Audio</option>
                      </select>
                      <i className="fa-solid fa-chevron-down absolute right-4 top-3.5 text-gray-400 text-sm pointer-events-none" aria-hidden />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Product Images</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fa-solid fa-cloud-upload text-gray-400 text-2xl" aria-hidden />
                  </div>
                  <p className="text-gray-700 font-medium mb-1">Drop images here or click to browse</p>
                  <p className="text-sm text-gray-500">Upload up to 8 images (JPG, PNG - Max 5MB each)</p>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="relative border border-gray-200 rounded-lg p-2">
                    <img src="/placeholder.png" alt="" className="w-full h-24 object-cover rounded" />
                    <button type="button" className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                      <i className="fa-solid fa-times" aria-hidden />
                    </button>
                    <div className="absolute bottom-1 left-1 bg-primary text-white text-xs px-2 py-0.5 rounded">Main</div>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-28 cursor-pointer hover:border-primary hover:bg-primary/5">
                    <i className="fa-solid fa-plus text-gray-400 text-xl" aria-hidden />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Pricing &amp; Inventory</h3>
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-gray-500">$</span>
                      <input type="text" placeholder="0.00" className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Compare at Price</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-gray-500">$</span>
                      <input type="text" placeholder="0.00" className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SKU <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Enter SKU" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Barcode</label>
                    <input type="text" placeholder="Enter barcode" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" />
                  </div>
                </div>
                <div className="bg-accent/50 border border-accent rounded-lg p-4 flex items-start">
                  <i className="fa-solid fa-info-circle text-primary mt-0.5 mr-3" aria-hidden />
                  <div>
                    <p className="text-sm font-medium text-gray-800 mb-1">Link to Existing Inventory</p>
                    <p className="text-xs text-gray-600 mb-3">This item must be linked to available inventory to be published</p>
                    <button type="button" className="text-primary text-sm font-medium hover:underline">Select from Inventory</button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Product Variants</h3>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only" />
                    <div className="relative w-11 h-6 bg-gray-300 rounded-full" />
                    <span className="ml-3 text-sm text-gray-700">Enable Variants</span>
                  </label>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <p className="text-sm text-gray-500 text-center">Enable variants to add options like size, color, or material</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Shipping Information</h3>
                <div className="flex items-center mb-5">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only" defaultChecked />
                    <div className="relative w-11 h-6 bg-primary rounded-full" />
                    <span className="ml-3 text-sm font-medium text-gray-700">This is a physical product</span>
                  </label>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                    <input type="text" placeholder="0.0" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Length (cm)</label>
                    <input type="text" placeholder="0" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Width (cm)</label>
                    <input type="text" placeholder="0" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Item Status</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
                  <div className="relative">
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" aria-label="Visibility">
                      <option>Active</option>
                      <option>Draft</option>
                      <option>Scheduled</option>
                    </select>
                    <i className="fa-solid fa-chevron-down absolute right-4 top-3.5 text-gray-400 text-sm pointer-events-none" aria-hidden />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock Status</label>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">In Stock</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Available</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <label className="flex items-center cursor-pointer mb-3">
                    <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                    <span className="ml-3 text-sm text-gray-700">Featured Item</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                    <span className="ml-3 text-sm text-gray-700">Allow Reviews</span>
                  </label>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Inventory Link</h3>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start">
                    <i className="fa-solid fa-exclamation-triangle text-orange-600 mt-0.5 mr-3" aria-hidden />
                    <div>
                      <p className="text-sm font-medium text-orange-800 mb-1">No Inventory Linked</p>
                      <p className="text-xs text-orange-700">Link this item to inventory to enable publishing</p>
                    </div>
                  </div>
                </div>
                <button type="button" className="w-full px-4 py-2.5 border border-primary text-primary rounded-lg hover:bg-primary/5 font-medium">
                  <i className="fa-solid fa-link mr-2" aria-hidden />Link to Inventory
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tags &amp; Labels</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Tags</label>
                  <input type="text" placeholder="Add tags separated by commas" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" />
                  <p className="text-xs text-gray-500 mt-1">e.g., electronics, wireless, premium</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                  <input type="text" placeholder="Enter brand name" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">SEO Settings</h3>
                  <button type="button" className="text-gray-400 hover:text-gray-600">
                    <i className="fa-solid fa-chevron-down" aria-hidden />
                  </button>
                </div>
                <p className="text-sm text-gray-500">Optimize your item for search engines</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
