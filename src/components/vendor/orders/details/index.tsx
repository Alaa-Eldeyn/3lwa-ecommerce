"use client";

import Link from "next/link";
import VendorLayout from "../../components/VendorLayout";
import {
  Printer,
  Truck,
  Check,
  Loader2,
  Circle,
  StickyNote,
  Mail,
  Phone,
  MapPin,
  FileText,
  X,
} from "lucide-react";

const orderItems = [
  {
    id: "1",
    name: "Wireless Earbuds Pro Max",
    sku: "WEP-001",
    price: "SAR 299",
    quantity: 1,
    total: "SAR 299",
    image: "https://picsum.photos/seed/order1/100/100",
  },
  {
    id: "2",
    name: "USB-C Hub 7-in-1",
    sku: "UCH-007",
    price: "SAR 89",
    quantity: 2,
    total: "SAR 178",
    image: "https://picsum.photos/seed/order2/100/100",
  },
];

const timeline = [
  {
    status: "Order Placed",
    date: "Jan 20, 2026 - 10:30 AM",
    description: "Customer placed the order",
    completed: true,
  },
  {
    status: "Payment Confirmed",
    date: "Jan 20, 2026 - 10:32 AM",
    description: "Payment received via Credit Card",
    completed: true,
  },
  {
    status: "Processing",
    date: "Jan 20, 2026 - 11:00 AM",
    description: "Order is being prepared",
    completed: true,
    current: true,
  },
  {
    status: "Shipped",
    date: "",
    description: "Package handed to courier",
    completed: false,
  },
  {
    status: "Delivered",
    date: "",
    description: "Package delivered to customer",
    completed: false,
  },
];

const OrderDetails = () => {
  return (
    <VendorLayout
      title="Order Details"
      showBackButton
      breadcrumbs={[
        { label: "Orders", href: "/orders" },
        { label: "#ORD-7829" },
      ]}
    >
      {/* Action Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            Processing
          </span>
          <span className="text-sm text-gray-500">
            Order placed on Jan 20, 2026 at 10:30 AM
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center">
            <Printer className="w-4 h-4 mr-2" />
            Print Invoice
          </button>
          <Link
            href="/orders/ORD-7829/shipment"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium flex items-center"
          >
            <Truck className="w-4 h-4 mr-2" />
            Update Shipment
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Order Items
            </h3>
            <div className="space-y-4">
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-medium text-gray-800">{item.price}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Qty</p>
                    <p className="font-medium text-gray-800">{item.quantity}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-medium text-gray-800">{item.total}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm font-medium text-gray-800">
                    SAR 477
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Shipping</span>
                  <span className="text-sm font-medium text-gray-800">SAR 15</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tax (15%)</span>
                  <span className="text-sm font-medium text-gray-800">
                    SAR 71.55
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600">Discount</span>
                  <span className="text-sm font-medium text-green-600">
                    - SAR 50
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-lg font-semibold text-gray-800">
                    Total
                  </span>
                  <span className="text-lg font-bold text-primary">
                    SAR 513.55
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Order Timeline
            </h3>
            <div className="relative">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start mb-6 last:mb-0">
                  <div className="relative">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        item.completed
                          ? item.current
                            ? "bg-primary"
                            : "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    >
                      {item.completed ? (
                        item.current ? (
                          <Loader2 className="w-4 h-4 text-white animate-spin" />
                        ) : (
                          <Check className="w-4 h-4 text-white" />
                        )
                      ) : (
                        <Circle className="w-2 h-2 text-gray-400" />
                      )}
                    </div>
                    {index < timeline.length - 1 && (
                      <div
                        className={`absolute top-8 left-4 w-0.5 h-12 ${
                          item.completed ? "bg-green-500" : "bg-gray-200"
                        }`}
                      ></div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <p
                      className={`font-medium ${
                        item.completed ? "text-gray-800" : "text-gray-400"
                      }`}
                    >
                      {item.status}
                    </p>
                    {item.date && (
                      <p className="text-sm text-gray-500">{item.date}</p>
                    )}
                    <p
                      className={`text-sm ${
                        item.completed ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Order Notes
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start">
                  <StickyNote className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-800">
                      Customer requested gift wrapping for the earbuds.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Added by Customer - Jan 20, 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <textarea
                rows={3}
                placeholder="Add a note..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none"
              ></textarea>
              <button className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium text-sm">
                Add Note
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer</h3>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold">SA</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">Sarah Ahmed</p>
                <p className="text-sm text-gray-500">12 previous orders</p>
              </div>
            </div>
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 ml-2">
                  sarah@example.com
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 ml-2">+966 50 123 4567</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Shipping Address
            </h3>
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-800">Sarah Ahmed</p>
              <p>123 King Fahd Road</p>
              <p>Al Olaya District</p>
              <p>Riyadh, 12345</p>
              <p>Saudi Arabia</p>
            </div>
            <button className="mt-4 text-primary text-sm font-medium hover:underline flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              View on Map
            </button>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Method</span>
                <span className="text-sm font-medium text-gray-800">
                  Credit Card
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Card</span>
                <span className="text-sm font-medium text-gray-800">
                  •••• 4242
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  Paid
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Transaction ID</span>
                <span className="text-sm font-medium text-gray-800">
                  TXN-789456
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium text-sm flex items-center justify-center">
                <Truck className="w-4 h-4 mr-2" />
                Mark as Shipped
              </button>
              <button className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center justify-center">
                <Printer className="w-4 h-4 mr-2" />
                Print Packing Slip
              </button>
              <button className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center justify-center">
                <FileText className="w-4 h-4 mr-2" />
                Download Invoice
              </button>
              <button className="w-full px-4 py-2.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 font-medium text-sm flex items-center justify-center">
                <X className="w-4 h-4 mr-2" />
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default OrderDetails;
