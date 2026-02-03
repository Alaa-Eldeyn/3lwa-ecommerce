"use client";

import { useState } from "react";
import VendorLayout from "../../components/VendorLayout";
import { Info, Search, Ticket } from "lucide-react";

const publicCodes = [
  {
    id: "1",
    code: "WELCOME20",
    description: "20% off for new customers",
    discount: "20%",
    minOrder: "SAR 100",
    validUntil: "Dec 31, 2026",
    status: "Active",
  },
  {
    id: "2",
    code: "RAMADAN25",
    description: "Ramadan special discount",
    discount: "25%",
    minOrder: "SAR 200",
    validUntil: "Mar 31, 2026",
    status: "Active",
  },
  {
    id: "3",
    code: "FREESHIP",
    description: "Free shipping on orders over SAR 150",
    discount: "Free Shipping",
    minOrder: "SAR 150",
    validUntil: "Jun 30, 2026",
    status: "Active",
  },
  {
    id: "4",
    code: "FLASH30",
    description: "Flash sale discount",
    discount: "30%",
    minOrder: "SAR 250",
    validUntil: "Jan 31, 2026",
    status: "Active",
  },
];

const PublicPromoCodes = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <VendorLayout
      title="Public Promo Codes"
      breadcrumbs={[
        { label: "Campaigns", href: "/campaigns" },
        { label: "Public Promo Codes" },
      ]}
    >
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <div className="flex items-start">
          <Info className="w-6 h-6 text-blue-600 mr-4 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">
              Platform-Wide Promo Codes
            </h4>
            <p className="text-sm text-blue-700">
              These promo codes are created by the platform and available to all
              customers. They apply to eligible products from your store
              automatically. You can opt-in or opt-out of specific promotions.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search promo codes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Showing {publicCodes.length} active promotions
          </span>
        </div>
      </div>

      {/* Promo Codes Grid */}
      <div className="grid grid-cols-2 gap-6">
        {publicCodes.map((code) => (
          <div
            key={code.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Ticket className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-lg">{code.code}</p>
                  <p className="text-sm text-gray-500">{code.description}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                {code.status}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-200">
              <div>
                <p className="text-xs text-gray-500">Discount</p>
                <p className="font-semibold text-primary">{code.discount}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Min. Order</p>
                <p className="font-semibold text-gray-800">{code.minOrder}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Valid Until</p>
                <p className="font-semibold text-gray-800">{code.validUntil}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`opt-in-${code.id}`}
                  defaultChecked
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label
                  htmlFor={`opt-in-${code.id}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  Opt-in to this promotion
                </label>
              </div>
              <button className="text-primary text-sm font-medium hover:underline">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </VendorLayout>
  );
};

export default PublicPromoCodes;
