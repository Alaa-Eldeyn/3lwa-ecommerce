"use client";

import { useState } from "react";
import Link from "next/link";
import VendorLayout from "../../components/VendorLayout";
import { Package, ChevronDown, Truck, Printer, Mail, FileText } from "lucide-react";

const ShipmentStatus = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [carrier, setCarrier] = useState("aramex");

  return (
    <VendorLayout
      title="Shipment Status"
      showBackButton
      breadcrumbs={[
        { label: "Orders", href: "/orders" },
        { label: "#ORD-7829", href: "/orders/ORD-7829" },
        { label: "Shipment" },
      ]}
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Shipment Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                Shipment Information
              </h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shipping Carrier <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "aramex", name: "Aramex", logo: "A" },
                      { id: "smsa", name: "SMSA Express", logo: "S" },
                      { id: "dhl", name: "DHL", logo: "D" },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setCarrier(option.id)}
                        className={`p-4 border rounded-lg text-center transition-colors ${
                          carrier === option.id
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${
                            carrier === option.id
                              ? "bg-primary text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <span className="font-bold">{option.logo}</span>
                        </div>
                        <p className="text-sm font-medium text-gray-800">
                          {option.name}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tracking Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter tracking number"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Delivery
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shipping Cost
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-2.5 text-gray-500">
                        SAR
                      </span>
                      <input
                        type="number"
                        defaultValue="15"
                        className="w-full pl-14 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shipping Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Add any shipping notes..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                Package Details
              </h3>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    defaultValue="0.5"
                    step="0.1"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length (cm)
                  </label>
                  <input
                    type="number"
                    defaultValue="20"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width (cm)
                  </label>
                  <input
                    type="number"
                    defaultValue="15"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    defaultValue="10"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="fragile"
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="fragile" className="ml-2 text-sm text-gray-700">
                  Mark as fragile
                </label>
              </div>
            </div>

            {/* Shipping Updates */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                Shipping Updates
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      Package Created
                    </p>
                    <p className="text-xs text-gray-500">
                      Jan 20, 2026 - 11:00 AM
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Package is ready for pickup
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-800 mb-4">Add Update</h4>
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary appearance-none">
                      <option>Package Picked Up</option>
                      <option>In Transit</option>
                      <option>Out for Delivery</option>
                      <option>Delivered</option>
                      <option>Delivery Attempted</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
                  </div>
                  <button className="px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium">
                    Add Update
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4">
              <Link
                href="/orders/ORD-7829"
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </Link>
              <button className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium flex items-center">
                <Truck className="w-4 h-4 mr-2" />
                Update Shipment
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Order Summary
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Order ID</span>
                  <span className="text-sm font-medium text-primary">
                    #ORD-7829
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Items</span>
                  <span className="text-sm font-medium text-gray-800">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Total</span>
                  <span className="text-sm font-medium text-gray-800">
                    SAR 459
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    Processing
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Shipping To
              </h3>
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-800">Sarah Ahmed</p>
                <p>123 King Fahd Road</p>
                <p>Al Olaya District</p>
                <p>Riyadh, 12345</p>
                <p>Saudi Arabia</p>
                <p className="mt-2">+966 50 123 4567</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm text-left flex items-center">
                  <Printer className="w-4 h-4 mr-2 text-gray-500" />
                  Print Shipping Label
                </button>
                <button className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm text-left flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-500" />
                  Send Tracking Email
                </button>
                <button className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm text-left flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-gray-500" />
                  Print Packing Slip
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default ShipmentStatus;
