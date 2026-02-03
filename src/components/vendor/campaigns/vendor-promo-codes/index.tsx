"use client";

import { useState } from "react";
import Link from "next/link";
import VendorLayout from "../../components/VendorLayout";
import {
  Search,
  ChevronDown,
  Plus,
  Pencil,
  Copy,
  Pause,
  Play,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const vendorCodes = [
  {
    id: "1",
    code: "AHMED10",
    description: "10% off entire store",
    discount: "10%",
    usageLimit: 100,
    used: 45,
    status: "Active",
    validUntil: "Feb 28, 2026",
  },
  {
    id: "2",
    code: "NEWUSER15",
    description: "15% off for new customers",
    discount: "15%",
    usageLimit: 50,
    used: 23,
    status: "Active",
    validUntil: "Mar 31, 2026",
  },
  {
    id: "3",
    code: "BUNDLE20",
    description: "20% off when buying 3+ items",
    discount: "20%",
    usageLimit: 200,
    used: 156,
    status: "Active",
    validUntil: "Apr 15, 2026",
  },
  {
    id: "4",
    code: "WINTER25",
    description: "Winter clearance sale",
    discount: "25%",
    usageLimit: 100,
    used: 100,
    status: "Expired",
    validUntil: "Jan 15, 2026",
  },
];

const VendorPromoCodes = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Expired":
        return "bg-gray-100 text-gray-700";
      case "Paused":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <VendorLayout
      title="My Promo Codes"
      breadcrumbs={[
        { label: "Campaigns", href: "/campaigns" },
        { label: "My Promo Codes" },
      ]}
    >
      {/* Filters & Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
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
          <div className="relative">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary appearance-none pr-10">
              <option>All Status</option>
              <option>Active</option>
              <option>Paused</option>
              <option>Expired</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <Link
          href="/campaigns/promo-codes/create"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Promo Code
        </Link>
      </div>

      {/* Promo Codes Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Code
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Description
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Discount
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Usage
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Valid Until
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {vendorCodes.map((code) => (
              <tr key={code.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <span className="font-mono font-bold text-gray-800">
                    {code.code}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {code.description}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-primary">
                  {code.discount}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${(code.used / code.usageLimit) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">
                      {code.used}/{code.usageLimit}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {code.validUntil}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      code.status
                    )}`}
                  >
                    {code.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/campaigns/promo-codes/${code.id}/edit`}
                      className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      className="p-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-lg"
                      title="Copy Code"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    {code.status === "Active" ? (
                      <button
                        className="p-2 text-gray-600 hover:text-yellow-500 hover:bg-yellow-50 rounded-lg"
                        title="Pause"
                      >
                        <Pause className="w-4 h-4" />
                      </button>
                    ) : code.status === "Paused" ? (
                      <button
                        className="p-2 text-gray-600 hover:text-green-500 hover:bg-green-50 rounded-lg"
                        title="Resume"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                    ) : null}
                    <button
                      className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
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
          Showing 1 to {vendorCodes.length} of {vendorCodes.length} promo codes
        </p>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg">1</button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </VendorLayout>
  );
};

export default VendorPromoCodes;
