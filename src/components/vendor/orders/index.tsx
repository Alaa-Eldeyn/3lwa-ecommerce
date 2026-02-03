"use client";

import { useState } from "react";
import Link from "next/link";
import VendorLayout from "../components/VendorLayout";
import {
  Search,
  ChevronDown,
  FileDown,
  Printer,
  Eye,
  Truck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const orders = [
  {
    id: "ORD-7829",
    customer: "Sarah Ahmed",
    email: "sarah@example.com",
    items: 3,
    total: "SAR 459",
    status: "Processing",
    payment: "Paid",
    date: "Jan 20, 2026",
  },
  {
    id: "ORD-7828",
    customer: "Mohammed Ali",
    email: "mohammed@example.com",
    items: 1,
    total: "SAR 129",
    status: "Shipped",
    payment: "Paid",
    date: "Jan 19, 2026",
  },
  {
    id: "ORD-7827",
    customer: "Fatima Hassan",
    email: "fatima@example.com",
    items: 2,
    total: "SAR 278",
    status: "Pending",
    payment: "Pending",
    date: "Jan 19, 2026",
  },
  {
    id: "ORD-7826",
    customer: "Ahmed Khalid",
    email: "ahmed@example.com",
    items: 5,
    total: "SAR 892",
    status: "Delivered",
    payment: "Paid",
    date: "Jan 18, 2026",
  },
  {
    id: "ORD-7825",
    customer: "Layla Omar",
    email: "layla@example.com",
    items: 2,
    total: "SAR 345",
    status: "Processing",
    payment: "Paid",
    date: "Jan 18, 2026",
  },
  {
    id: "ORD-7824",
    customer: "Omar Yusuf",
    email: "omar@example.com",
    items: 1,
    total: "SAR 199",
    status: "Cancelled",
    payment: "Refunded",
    date: "Jan 17, 2026",
  },
];

const OrdersList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Shipped":
        return "bg-purple-100 text-purple-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPaymentColor = (payment: string) => {
    switch (payment) {
      case "Paid":
        return "text-green-600";
      case "Pending":
        return "text-yellow-600";
      case "Refunded":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <VendorLayout title="Orders">
      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">All Orders</p>
          <p className="text-2xl font-bold text-gray-800">1,247</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">23</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Processing</p>
          <p className="text-2xl font-bold text-blue-600">45</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Shipped</p>
          <p className="text-2xl font-bold text-purple-600">89</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Delivered</p>
          <p className="text-2xl font-bold text-green-600">1,090</p>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary appearance-none pr-10"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <input
              type="date"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center">
            <FileDown className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Order ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Customer
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Items
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Total
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Payment
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/orders/${order.id}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    #{order.id}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {order.customer}
                    </p>
                    <p className="text-xs text-gray-500">{order.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.items}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                  {order.total}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-sm font-medium ${getPaymentColor(
                      order.payment
                    )}`}
                  >
                    {order.payment}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/orders/${order.id}`}
                      className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/orders/${order.id}/shipment`}
                      className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg"
                      title="Shipment"
                    >
                      <Truck className="w-4 h-4" />
                    </Link>
                    <button
                      className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg"
                      title="Print"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-600">
          Showing 1 to {orders.length} of 1,247 orders
        </p>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg">1</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
            2
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
            3
          </button>
          <span className="px-2 text-gray-500">...</span>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
            125
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </VendorLayout>
  );
};

export default OrdersList;
