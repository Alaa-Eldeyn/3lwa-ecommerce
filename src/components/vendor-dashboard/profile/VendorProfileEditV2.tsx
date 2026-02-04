"use client";

export function VendorProfileEditV2() {
  return (
    <div className="px-8 py-6">
      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-600">
          <a href="/vendor/profile-edit" className="hover:text-primary">Settings</a>
          <i className="fa-solid fa-chevron-right mx-2 text-xs" aria-hidden />
          <span className="text-gray-800 font-medium">Business Information</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex border-b border-gray-200">
          <button type="button" className="px-6 py-4 text-sm font-medium text-primary border-b-2 border-primary">
            Business Information
          </button>
          <button type="button" className="px-6 py-4 text-sm font-medium text-gray-600 hover:text-gray-800">
            Verification Documents
          </button>
          <button type="button" className="px-6 py-4 text-sm font-medium text-gray-600 hover:text-gray-800">
            Security Settings
          </button>
          <button type="button" className="px-6 py-4 text-sm font-medium text-gray-600 hover:text-gray-800">
            Payment Methods
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-8">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Update Business Information</h3>
            <p className="text-sm text-gray-600">Keep your business details up to date for smooth operations and customer communication.</p>
          </div>

          <form className="space-y-8">
            <div className="flex items-start space-x-6">
              <label className="w-1/4 text-right text-gray-700 font-medium pt-2">Business Name</label>
              <div className="w-3/4">
                <input type="text" defaultValue="Ahmed Store" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                <p className="text-sm text-gray-500 mt-2">This is the name that will appear on your storefront and invoices.</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <label className="w-1/4 text-right text-gray-700 font-medium pt-2">Business Email</label>
              <div className="w-3/4">
                <input type="email" defaultValue="contact@ahmedstore.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                <p className="text-sm text-gray-500 mt-2">Primary email for business communications and customer support.</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <label className="w-1/4 text-right text-gray-700 font-medium pt-2">Business Phone</label>
              <div className="w-3/4">
                <div className="flex items-center space-x-3">
                  <div className="relative w-32">
                    <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 cursor-pointer">
                      <span className="text-gray-700 mr-2">🇸🇦</span>
                      <span className="text-gray-700 flex-1">+966</span>
                      <i className="fa-solid fa-chevron-down text-gray-400 text-xs" aria-hidden />
                    </div>
                  </div>
                  <input type="tel" defaultValue="501234567" className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div className="flex items-center mt-3">
                  <input type="checkbox" id="show-phone" defaultChecked className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                  <label htmlFor="show-phone" className="ml-2 text-sm text-gray-600">Show on receipts and customer communications</label>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <label className="w-1/4 text-right text-gray-700 font-medium pt-2">
                Business Address
              </label>
              <div className="w-3/4 space-y-4">
                <div className="relative">
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option>Saudi Arabia</option>
                    <option>United Arab Emirates</option>
                    <option>Kuwait</option>
                    <option>Qatar</option>
                    <option>Bahrain</option>
                  </select>
                  <i className="fa-solid fa-chevron-down absolute right-4 top-4 text-gray-400 text-sm pointer-events-none" aria-hidden />
                </div>
                <input type="text" placeholder="Street address" defaultValue="King Fahd Road" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                <input type="text" placeholder="Address line 2 (optional)" defaultValue="Building 42, Floor 3" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="City" defaultValue="Riyadh" className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  <input type="text" placeholder="Postal code" defaultValue="11564" className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <p className="text-sm text-gray-500">This address will appear on invoices and shipping documents. PO Boxes are not accepted.</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <label className="w-1/4 text-right text-gray-700 font-medium pt-2">
                Business Website
                <span className="text-gray-400 text-sm font-normal block mt-1">Optional</span>
              </label>
              <div className="w-3/4">
                <input type="url" placeholder="https://www.yourwebsite.com" defaultValue="https://www.ahmedstore.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                <p className="text-sm text-gray-500 mt-2">Your business website will be displayed on your vendor profile.</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <label className="w-1/4 text-right text-gray-700 font-medium pt-2">
                Support Email
                <span className="text-gray-400 text-sm font-normal block mt-1">Optional</span>
              </label>
              <div className="w-3/4">
                <input type="email" placeholder="support@yourwebsite.com" defaultValue="support@ahmedstore.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                <p className="text-sm text-gray-500 mt-2">Customers will use this email for support inquiries.</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <label className="w-1/4 text-right text-gray-700 font-medium pt-2">Tax ID / VAT Number</label>
              <div className="w-3/4">
                <input type="text" placeholder="Enter your tax identification number" defaultValue="300123456789003" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                <p className="text-sm text-gray-500 mt-2">Required for tax compliance and invoicing purposes.</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <label className="w-1/4 text-right text-gray-700 font-medium pt-2">
                Business Description
                <span className="text-gray-400 text-sm font-normal block mt-1">Optional</span>
              </label>
              <div className="w-3/4">
                <textarea rows={4} placeholder="Tell customers about your business..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none">We specialize in high-quality electronics and accessories, providing exceptional customer service and competitive pricing to customers across the region.</textarea>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-gray-500">This will appear on your vendor profile page.</p>
                  <p className="text-sm text-gray-400">142 / 500</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button type="button" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">Cancel</button>
              <button type="submit" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-header font-medium transition-colors">Save Changes</button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 shrink-0">
            <i className="fa-solid fa-info-circle text-blue-600" aria-hidden />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Important Information</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-start">
                <i className="fa-solid fa-check text-blue-600 mr-2 mt-0.5 shrink-0" aria-hidden />
                <span>Changes to business name and address may require re-verification.</span>
              </li>
              <li className="flex items-start">
                <i className="fa-solid fa-check text-blue-600 mr-2 mt-0.5 shrink-0" aria-hidden />
                <span>Ensure all information is accurate to avoid delays in payments and shipments.</span>
              </li>
              <li className="flex items-start">
                <i className="fa-solid fa-check text-blue-600 mr-2 mt-0.5 shrink-0" aria-hidden />
                <span>Contact information will be used for platform communications and customer support.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
