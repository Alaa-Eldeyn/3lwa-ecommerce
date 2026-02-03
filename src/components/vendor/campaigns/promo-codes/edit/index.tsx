"use client";

import { useState } from "react";
import Link from "next/link";
import VendorLayout from "../../../components/VendorLayout";
import { Percent, Banknote, Truck, Trash2 } from "lucide-react";

const EditPromoCode = () => {
  const [discountType, setDiscountType] = useState("percentage");

  return (
    <VendorLayout
      title="Edit Promo Code"
      showBackButton
      breadcrumbs={[
        { label: "Campaigns", href: "/campaigns" },
        { label: "My Promo Codes", href: "/campaigns/vendor-promo-codes" },
        { label: "AHMED10" },
      ]}
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Edit Promo Code
            </h3>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              Active
            </span>
          </div>

          <div className="space-y-6">
            {/* Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Promo Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                defaultValue="AHMED10"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary uppercase bg-gray-100"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">
                Promo code cannot be changed after creation
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                defaultValue="10% off entire store"
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
                    defaultValue="10"
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
                  defaultValue="50"
                  className="w-full pl-14 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Usage Stats */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-3">Usage Statistics</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Times Used</p>
                  <p className="text-xl font-bold text-gray-800">45</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Usage Limit</p>
                  <p className="text-xl font-bold text-gray-800">100</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Remaining</p>
                  <p className="text-xl font-bold text-green-600">55</p>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-3">
                <div className="h-full bg-primary" style={{ width: "45%" }}></div>
              </div>
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
                    defaultValue="100"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Per Customer Limit
                  </label>
                  <input
                    type="number"
                    defaultValue="1"
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
                    defaultValue="2026-02-28T23:59"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium flex items-center">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Promo Code
              </button>
              <div className="flex items-center space-x-4">
                <Link
                  href="/campaigns/vendor-promo-codes"
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </Link>
                <button className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default EditPromoCode;
