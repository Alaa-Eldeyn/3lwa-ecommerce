"use client";

import { useState } from "react";
import Link from "next/link";
import VendorLayout from "../../../components/VendorLayout";
import { Percent, Banknote, Truck } from "lucide-react";

const CreatePromoCode = () => {
  const [discountType, setDiscountType] = useState("percentage");

  return (
    <VendorLayout
      title="Create Promo Code"
      showBackButton
      breadcrumbs={[
        { label: "Campaigns", href: "/campaigns" },
        { label: "My Promo Codes", href: "/campaigns/vendor-promo-codes" },
        { label: "Create" },
      ]}
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Promo Code Details
          </h3>

          <div className="space-y-6">
            {/* Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Promo Code <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  placeholder="e.g., SUMMER20"
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary uppercase"
                />
                <button className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Generate
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Code will be automatically converted to uppercase
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                placeholder="Brief description of the promo code"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>

            {/* Discount Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setDiscountType("percentage")}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    discountType === "percentage"
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Percent className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-800">Percentage</p>
                </button>
                <button
                  onClick={() => setDiscountType("fixed")}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    discountType === "fixed"
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Banknote className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-800">
                    Fixed Amount
                  </p>
                </button>
                <button
                  onClick={() => setDiscountType("shipping")}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    discountType === "shipping"
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Truck className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-800">
                    Free Shipping
                  </p>
                </button>
              </div>
            </div>

            {/* Discount Value */}
            {discountType !== "shipping" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Value <span className="text-red-500">*</span>
                </label>
                <div className="relative w-1/2">
                  {discountType === "fixed" && (
                    <span className="absolute left-4 top-2.5 text-gray-500">
                      SAR
                    </span>
                  )}
                  <input
                    type="number"
                    placeholder="0"
                    className={`w-full ${
                      discountType === "fixed" ? "pl-14" : "pl-4"
                    } pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary`}
                  />
                  {discountType === "percentage" && (
                    <span className="absolute right-4 top-2.5 text-gray-500">
                      %
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Minimum Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Order Amount
              </label>
              <div className="relative w-1/2">
                <span className="absolute left-4 top-2.5 text-gray-500">SAR</span>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full pl-14 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Leave empty for no minimum
              </p>
            </div>

            {/* Usage Limits */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-medium text-gray-800 mb-4">Usage Limits</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Usage Limit
                  </label>
                  <input
                    type="number"
                    placeholder="Unlimited"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Per Customer Limit
                  </label>
                  <input
                    type="number"
                    placeholder="Unlimited"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Validity Period */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-medium text-gray-800 mb-4">Validity Period</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Applicable Products */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-medium text-gray-800 mb-4">Applies To</h4>
              <div className="space-y-3">
                <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                  <input
                    type="radio"
                    name="applies-to"
                    defaultChecked
                    className="w-4 h-4 text-primary border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700">All products</span>
                </label>
                <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                  <input
                    type="radio"
                    name="applies-to"
                    className="w-4 h-4 text-primary border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    Specific categories
                  </span>
                </label>
                <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                  <input
                    type="radio"
                    name="applies-to"
                    className="w-4 h-4 text-primary border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    Specific products
                  </span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <Link
                href="/campaigns/vendor-promo-codes"
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </Link>
              <button className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium">
                Create Promo Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default CreatePromoCode;
