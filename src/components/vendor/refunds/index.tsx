"use client";

import { useState } from "react";
import Link from "next/link";
import VendorLayout from "../components/VendorLayout";
import {
  Search,
  ChevronDown,
  FileDown,
  Eye,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const refunds = [
  {
    id: "REF-1234",
    orderId: "ORD-7820",
    customer: "Mohammed Ali",
    item: "Smart Watch Series 5",
    amount: "SAR 599",
    reason: "Defective Product",
    status: "Pending",
    date: "Jan 19, 2026",
  },
  {
    id: "REF-1233",
    orderId: "ORD-7815",
    customer: "Fatima Hassan",
    item: "Wireless Earbuds Pro",
    amount: "SAR 299",
    reason: "Wrong Item Received",
    status: "Approved",
    date: "Jan 18, 2026",
  },
  {
    id: "REF-1232",
    orderId: "ORD-7810",
    customer: "Ahmed Khalid",
    item: "Laptop Stand Aluminum",
    amount: "SAR 149",
    reason: "Changed Mind",
    status: "Rejected",
    date: "Jan 17, 2026",
  },
  {
    id: "REF-1231",
    orderId: "ORD-7805",
    customer: "Sarah Ahmed",
    item: "USB-C Hub 7-in-1",
    amount: "SAR 89",
    reason: "Not as Described",
    status: "Processing",
    date: "Jan 16, 2026",
  },
  {
    id: "REF-1230",
    orderId: "ORD-7800",
    customer: "Layla Omar",
    item: "Mechanical Keyboard RGB",
    amount: "SAR 349",
    reason: "Defective Product",
    status: "Completed",
    date: "Jan 15, 2026",
  },
];

const RefundsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Approved":
        return "bg-blue-100 text-blue-700";
      case "Processing":
        return "bg-purple-100 text-purple-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <VendorLayout title="Refund Requests">
      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">All Requests</p>
          <p className="text-2xl font-bold text-gray-800">156</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">12</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Processing</p>
          <p className="text-2xl font-bold text-purple-600">8</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-green-600">125</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Rejected</p>
          <p className="text-2xl font-bold text-red-600">11</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search refunds..."
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
              <option value="approved">Approved</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary appearance-none pr-10">
              <option>All Reasons</option>
              <option>Defective Product</option>
              <option>Wrong Item Received</option>
              <option>Not as Described</option>
              <option>Changed Mind</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center">
          <FileDown className="w-4 h-4 mr-2" />
          Export
        </button>
      </div>

      {/* Refunds Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Request ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Order
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Customer
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Item
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Reason
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
            {refunds.map((refund) => (
              <tr key={refund.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <Link
                    href={`/refunds/${refund.id}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    #{refund.id}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/orders/${refund.orderId}`}
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    #{refund.orderId}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {refund.customer}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{refund.item}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                  {refund.amount}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{refund.reason}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      refund.status
                    )}`}
                  >
                    {refund.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{refund.date}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/refunds/${refund.id}`}
                      className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    {refund.status === "Pending" && (
                      <>
                        <button
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg"
                          title="Approve"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg"
                          title="Reject"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
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
          Showing 1 to {refunds.length} of 156 requests
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
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </VendorLayout>
  );
};

export default RefundsList;
