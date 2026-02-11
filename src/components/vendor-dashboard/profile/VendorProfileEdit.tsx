"use client";

export function VendorProfileEdit() {
  return (
    <div className="px-8 py-6">
      <div className="mb-8 border-b border-gray-200">
        <div className="flex space-x-8">
          <button type="button" className="pb-3 border-b-2 border-primary text-primary font-medium">
            Business Profile
          </button>
          <button type="button" className="pb-3 text-gray-500 hover:text-gray-700">
            Verification Documents
          </button>
          <button type="button" className="pb-3 text-gray-500 hover:text-gray-700">
            Security Settings
          </button>
          <button type="button" className="pb-3 text-gray-500 hover:text-gray-700">
            Notifications
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Business Information</h3>
              <button type="button" className="text-primary text-sm font-medium hover:underline">
                <i className="fa-solid fa-pen mr-1" aria-hidden />Edit
              </button>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                <input type="text" defaultValue="Ahmed Electronics Store" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Store Display Name</label>
                <input type="text" defaultValue="Ahmed Store" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Category</label>
                <div className="relative">
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white appearance-none">
                    <option>Electronics &amp; Technology</option>
                    <option>Fashion &amp; Apparel</option>
                    <option>Home &amp; Garden</option>
                    <option>Sports &amp; Outdoors</option>
                  </select>
                  <i className="fa-solid fa-chevron-down absolute right-4 top-3.5 text-gray-400 text-sm pointer-events-none" aria-hidden />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Description</label>
                <textarea rows={4} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white" placeholder="Tell customers about your business...">Premium electronics retailer specializing in the latest technology products and accessories. We offer competitive pricing and excellent customer service.</textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tax Registration Number</label>
                  <input type="text" defaultValue="TR-123456789" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business License Number</label>
                  <input type="text" defaultValue="BL-987654321" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
              <button type="button" className="text-primary text-sm font-medium hover:underline">
                <i className="fa-solid fa-pen mr-1" aria-hidden />Edit
              </button>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="flex items-center">
                  <input type="email" defaultValue="ahmed.store@business.com" className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white" />
                  <span className="ml-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Verified</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="flex items-center">
                  <input type="tel" defaultValue="+966 50 123 4567" className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white" />
                  <span className="ml-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Verified</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alternative Phone</label>
                <input type="tel" defaultValue="+966 50 765 4321" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
                <input type="url" defaultValue="www.ahmedstore.com" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Business Address</h3>
              <button type="button" className="text-primary text-sm font-medium hover:underline">
                <i className="fa-solid fa-pen mr-1" aria-hidden />Edit
              </button>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                <input type="text" defaultValue="King Fahd Road, Building 42" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input type="text" defaultValue="Riyadh" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                  <input type="text" defaultValue="12345" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
                  <input type="text" defaultValue="Riyadh Province" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <div className="relative">
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white appearance-none">
                      <option>Saudi Arabia</option>
                      <option>United Arab Emirates</option>
                      <option>Kuwait</option>
                      <option>Qatar</option>
                    </select>
                    <i className="fa-solid fa-chevron-down absolute right-4 top-3.5 text-gray-400 text-sm pointer-events-none" aria-hidden />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Bank Account Information</h3>
              <button type="button" className="text-primary text-sm font-medium hover:underline">
                <i className="fa-solid fa-pen mr-1" aria-hidden />Edit
              </button>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                <div className="relative">
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white appearance-none">
                    <option>Al Rajhi Bank</option>
                    <option>Saudi National Bank</option>
                    <option>Riyad Bank</option>
                    <option>Saudi British Bank</option>
                  </select>
                  <i className="fa-solid fa-chevron-down absolute right-4 top-3.5 text-gray-400 text-sm pointer-events-none" aria-hidden />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Holder Name</label>
                <input type="text" defaultValue="Ahmed Electronics Store LLC" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                <input type="text" defaultValue="SA•••• •••• •••• 4567" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-gray-100" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">IBAN</label>
                <input type="text" defaultValue="SA03 8000 0000 6080 1016 7519" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <button type="button" className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">Cancel</button>
            <button type="button" className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-secondary font-medium">Save Changes</button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Store Logo</h3>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-4xl font-bold">AS</span>
              </div>
              <p className="text-sm text-gray-600 text-center mb-4">Upload a logo to represent your store across the platform</p>
              <div className="flex flex-col space-y-2 w-full">
                <button type="button" className="w-full px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-secondary font-medium">
                  <i className="fa-solid fa-upload mr-2" aria-hidden />Upload Logo
                </button>
                <button type="button" className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">Remove</button>
              </div>
              <p className="text-xs text-gray-400 mt-3">Recommended: 512x512px, PNG or JPG</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Verification Status</h3>
            <div className="space-y-4">
              {["Email Verified · ahmed.store@business.com", "Phone Verified · +966 50 123 4567", "Business Documents · Approved", "Bank Account · Connected"].map((text) => (
                <div key={text} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <i className="fa-solid fa-check-circle text-green-600 mr-3" aria-hidden />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{text.split(" · ")[0]}</p>
                      <p className="text-xs text-gray-500">{text.split(" · ")[1]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <div className="flex items-start">
                <i className="fa-solid fa-shield-alt text-primary text-xl mr-3 mt-0.5 shrink-0" aria-hidden />
                <div>
                  <p className="text-sm font-medium text-gray-800">Verified Vendor</p>
                  <p className="text-xs text-gray-600 mt-1">Your account is fully verified and in good standing</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Account Statistics</h3>
            <div className="space-y-4">
              {[
                ["Member Since", "Jan 2024"],
                ["Total Orders", "1,247"],
                ["Active Items", "127"],
                ["Average Rating", "4.8"],
                ["Response Rate", "98%"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{label}</span>
                  <span className="text-sm font-medium text-gray-800 flex items-center">
                    {value}
                    {label === "Average Rating" && <i className="fa-solid fa-star text-yellow-400 text-xs ml-1" aria-hidden />}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
