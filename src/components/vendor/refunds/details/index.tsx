"use client";

import Link from "next/link";
import VendorLayout from "../../components/VendorLayout";
import { X, Check, Mail, Phone } from "lucide-react";

const RefundDetails = () => {
  const refund = {
    id: "REF-1234",
    orderId: "ORD-7820",
    status: "Pending",
    amount: "SAR 599",
    reason: "Defective Product",
    date: "Jan 19, 2026",
    customer: {
      name: "Mohammed Ali",
      email: "mohammed@example.com",
      phone: "+966 50 987 6543",
    },
    item: {
      name: "Smart Watch Series 5",
      sku: "SWS-005",
      price: "SAR 599",
      quantity: 1,
      image: "https://picsum.photos/seed/refund1/100/100",
    },
    description:
      "The watch screen has dead pixels and the heart rate monitor is not working properly. I noticed this issue after 3 days of use.",
    images: [
      "https://picsum.photos/seed/refundimg1/200/200",
      "https://picsum.photos/seed/refundimg2/200/200",
    ],
  };

  return (
    <VendorLayout
      title="Refund Request Details"
      showBackButton
      breadcrumbs={[
        { label: "Refund Requests", href: "/refunds" },
        { label: `#${refund.id}` },
      ]}
    >
      {/* Action Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
            {refund.status}
          </span>
          <span className="text-sm text-gray-500">
            Submitted on {refund.date}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 font-medium flex items-center">
            <X className="w-4 h-4 mr-2" />
            Reject
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center">
            <Check className="w-4 h-4 mr-2" />
            Approve Refund
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Refund Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Refund Request
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Reason</p>
                <p className="font-medium text-gray-800">{refund.reason}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Description</p>
                <p className="text-gray-600">{refund.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Attached Images</p>
                <div className="flex space-x-4">
                  {refund.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Evidence ${index + 1}`}
                      className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Item Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Item for Refund
            </h3>
            <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
              <img
                src={refund.item.image}
                alt={refund.item.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">{refund.item.name}</p>
                <p className="text-sm text-gray-500">SKU: {refund.item.sku}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-medium text-gray-800">{refund.item.price}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Qty</p>
                <p className="font-medium text-gray-800">{refund.item.quantity}</p>
              </div>
            </div>
          </div>

          {/* Refund Options */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Refund Options
            </h3>
            <div className="space-y-4">
              <label className="flex items-start p-4 border border-primary bg-primary/5 rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name="refund-option"
                  defaultChecked
                  className="w-4 h-4 text-primary border-gray-300 mt-0.5"
                />
                <div className="ml-3">
                  <p className="font-medium text-gray-800">Full Refund</p>
                  <p className="text-sm text-gray-600">
                    Refund the full amount of {refund.amount} to the customer
                  </p>
                </div>
              </label>
              <label className="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                <input
                  type="radio"
                  name="refund-option"
                  className="w-4 h-4 text-primary border-gray-300 mt-0.5"
                />
                <div className="ml-3">
                  <p className="font-medium text-gray-800">Partial Refund</p>
                  <p className="text-sm text-gray-600">
                    Refund a partial amount to the customer
                  </p>
                  <div className="mt-3 relative w-48">
                    <span className="absolute left-4 top-2.5 text-gray-500">
                      SAR
                    </span>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full pl-14 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                    />
                  </div>
                </div>
              </label>
              <label className="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                <input
                  type="radio"
                  name="refund-option"
                  className="w-4 h-4 text-primary border-gray-300 mt-0.5"
                />
                <div className="ml-3">
                  <p className="font-medium text-gray-800">Store Credit</p>
                  <p className="text-sm text-gray-600">
                    Issue store credit instead of monetary refund
                  </p>
                </div>
              </label>
              <label className="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                <input
                  type="radio"
                  name="refund-option"
                  className="w-4 h-4 text-primary border-gray-300 mt-0.5"
                />
                <div className="ml-3">
                  <p className="font-medium text-gray-800">Replacement</p>
                  <p className="text-sm text-gray-600">
                    Send a replacement item instead of refund
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Internal Notes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Internal Notes
            </h3>
            <textarea
              rows={3}
              placeholder="Add notes for internal reference..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none"
            ></textarea>
            <button className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium text-sm">
              Save Note
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Refund Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Request ID</span>
                <span className="text-sm font-medium text-gray-800">
                  #{refund.id}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Order ID</span>
                <Link
                  href={`/orders/${refund.orderId}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  #{refund.orderId}
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Refund Amount</span>
                <span className="text-lg font-bold text-gray-800">
                  {refund.amount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                  {refund.status}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer</h3>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold">MA</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">{refund.customer.name}</p>
                <p className="text-sm text-gray-500">Customer since Jan 2025</p>
              </div>
            </div>
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 ml-2">
                  {refund.customer.email}
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 ml-2">
                  {refund.customer.phone}
                </span>
              </div>
            </div>
            <button className="mt-4 w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center justify-center">
              <Mail className="w-4 h-4 mr-2" />
              Contact Customer
            </button>
          </div>

          {/* Order Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Original Order
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Order Date</span>
                <span className="text-sm font-medium text-gray-800">
                  Jan 15, 2026
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Order Total</span>
                <span className="text-sm font-medium text-gray-800">SAR 599</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Payment</span>
                <span className="text-sm font-medium text-green-600">Paid</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Delivery</span>
                <span className="text-sm font-medium text-gray-800">
                  Delivered
                </span>
              </div>
            </div>
            <Link
              href={`/orders/${refund.orderId}`}
              className="mt-4 w-full px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 font-medium text-sm flex items-center justify-center"
            >
              View Order
            </Link>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Request Submitted
                  </p>
                  <p className="text-xs text-gray-500">Jan 19, 2026 - 2:30 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-400">Awaiting Review</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default RefundDetails;
