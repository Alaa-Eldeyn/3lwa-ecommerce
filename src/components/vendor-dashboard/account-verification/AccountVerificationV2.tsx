"use client";

import { Link } from "@/src/i18n/routing";

export function AccountVerificationV2() {
  return (
    <div className="px-4 lg:px-8 py-8">
          <div className="mb-6 flex items-center text-sm text-gray-500">
            <Link href="#" className="hover:text-primary">Settings</Link>
            <i className="fa-solid fa-chevron-right mx-2 text-xs" aria-hidden />
            <span className="text-gray-800">Verification Documents</span>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 px-6 py-4 rounded-lg mb-8 flex items-center justify-between">
            <div className="flex items-center">
              <i className="fa-solid fa-clock text-yellow-600 text-xl mr-4" aria-hidden />
              <div>
                <p className="font-medium text-gray-800">Verification Pending</p>
                <p className="text-sm text-gray-600">Please upload all required documents to complete your vendor verification process.</p>
              </div>
            </div>
            <div className="text-right mr-4">
              <p className="text-sm font-medium text-gray-800">2 of 5 completed</p>
              <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
                <div className="w-2/5 h-2 bg-yellow-500 rounded-full" style={{ width: "40%" }} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center mb-4">
              <i className="fa-solid fa-info-circle text-primary text-xl mr-3" aria-hidden />
              <h3 className="text-lg font-semibold text-gray-800">Document Requirements</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <i className="fa-solid fa-check text-green-500 mr-2 mt-0.5" aria-hidden />
                  <span>All documents must be clear and readable</span>
                </li>
                <li className="flex items-start">
                  <i className="fa-solid fa-check text-green-500 mr-2 mt-0.5" aria-hidden />
                  <span>Accepted formats: PDF, JPG, PNG (max 10MB per file)</span>
                </li>
                <li className="flex items-start">
                  <i className="fa-solid fa-check text-green-500 mr-2 mt-0.5" aria-hidden />
                  <span>Documents must be valid and not expired</span>
                </li>
                <li className="flex items-start">
                  <i className="fa-solid fa-check text-green-500 mr-2 mt-0.5" aria-hidden />
                  <span>Business information must match your registered details</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="fa-solid fa-file-contract text-green-600 text-xl" aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Business License</h3>
                    <p className="text-xs text-gray-500">Required</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Approved</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <i className="fa-solid fa-file-pdf text-red-500 text-2xl mr-3" aria-hidden />
                    <div>
                      <p className="text-sm font-medium text-gray-800">business_license_2026.pdf</p>
                      <p className="text-xs text-gray-500">Uploaded on Jan 10, 2026</p>
                    </div>
                  </div>
                  <button type="button" className="text-gray-400 hover:text-gray-600">
                    <i className="fa-solid fa-download" aria-hidden />
                  </button>
                </div>
                <div className="flex items-center text-xs text-gray-500 mt-3">
                  <i className="fa-solid fa-check-circle text-green-500 mr-1" aria-hidden />
                  <span>Verified by admin on Jan 12, 2026</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button type="button" className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                  <i className="fa-solid fa-eye mr-2" aria-hidden />View
                </button>
                <button type="button" className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                  <i className="fa-solid fa-sync mr-2" aria-hidden />Replace
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="fa-solid fa-id-card text-blue-600 text-xl" aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">National ID / Passport</h3>
                    <p className="text-xs text-gray-500">Required</p>
                  </div>
                </div>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">Not Uploaded</span>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 text-center">
                <i className="fa-solid fa-cloud-arrow-up text-gray-400 text-4xl mb-3" aria-hidden />
                <p className="text-sm text-gray-600 mb-2">Drag and drop your file here</p>
                <p className="text-xs text-gray-500 mb-4">or</p>
                <button type="button" className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary">
                  Browse Files
                </button>
                <p className="text-xs text-gray-400 mt-3">PDF, JPG, PNG (max 10MB)</p>
              </div>
            </div>
          </div>
    </div>
  );
}
