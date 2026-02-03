"use client";

import Link from "next/link";
import VendorLayout from "../components/VendorLayout";
import {
  Megaphone,
  Ticket,
  CheckCircle,
  TrendingUp,
  Plus,
  Globe,
  Store,
  Eye,
  Pencil,
  Pause,
} from "lucide-react";

const campaigns = [
  {
    id: "1",
    name: "Ramadan Sale 2026",
    type: "Discount",
    discount: "20% OFF",
    status: "Active",
    startDate: "Mar 1, 2026",
    endDate: "Mar 31, 2026",
    usage: 245,
  },
  {
    id: "2",
    name: "New Customer Welcome",
    type: "Promo Code",
    discount: "15% OFF",
    status: "Active",
    startDate: "Jan 1, 2026",
    endDate: "Dec 31, 2026",
    usage: 156,
  },
  {
    id: "3",
    name: "Flash Sale Friday",
    type: "Flash Sale",
    discount: "30% OFF",
    status: "Scheduled",
    startDate: "Jan 24, 2026",
    endDate: "Jan 24, 2026",
    usage: 0,
  },
  {
    id: "4",
    name: "Winter Clearance",
    type: "Discount",
    discount: "Up to 50% OFF",
    status: "Ended",
    startDate: "Dec 15, 2025",
    endDate: "Jan 15, 2026",
    usage: 892,
  },
];

const CampaignsOverview = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Scheduled":
        return "bg-blue-100 text-blue-700";
      case "Ended":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <VendorLayout title="Campaigns & Promotions">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Campaigns</p>
              <p className="text-2xl font-bold text-green-600">4</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Megaphone className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Promo Codes</p>
              <p className="text-2xl font-bold text-blue-600">12</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Ticket className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Redemptions</p>
              <p className="text-2xl font-bold text-purple-600">1,293</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Revenue Impact</p>
              <p className="text-2xl font-bold text-primary">SAR 45K</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Link
          href="/campaigns/promo-codes/create"
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-primary transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Create Promo Code</p>
              <p className="text-sm text-gray-500">
                Add a new promotional code
              </p>
            </div>
          </div>
        </Link>
        <Link
          href="/campaigns/public-promo-codes"
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-primary transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Public Promo Codes</p>
              <p className="text-sm text-gray-500">
                Platform-wide promotions
              </p>
            </div>
          </div>
        </Link>
        <Link
          href="/campaigns/vendor-promo-codes"
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-primary transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Store className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">My Promo Codes</p>
              <p className="text-sm text-gray-500">
                Your store promotions
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Active Campaigns */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">All Campaigns</h3>
          <Link
            href="/campaigns/promo-codes/create"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium text-sm flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Campaign
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Discount
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Duration
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Usage
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
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{campaign.name}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {campaign.type}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-primary">
                    {campaign.discount}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {campaign.startDate} - {campaign.endDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {campaign.usage} uses
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        campaign.status
                      )}`}
                    >
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg">
                        <Pencil className="w-4 h-4" />
                      </button>
                      {campaign.status !== "Ended" && (
                        <button className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg">
                          <Pause className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Campaign Performance
          </h3>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm bg-primary text-white rounded-lg">
              7 Days
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
              30 Days
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
              90 Days
            </button>
          </div>
        </div>
        <div className="h-64 flex items-end justify-between space-x-4">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
            const heights = [45, 60, 30, 75, 50, 85, 65];
            return (
              <div key={day} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-primary/20 rounded-t-lg hover:bg-primary/30 transition-colors"
                  style={{ height: `${heights[index]}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">{day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </VendorLayout>
  );
};

export default CampaignsOverview;
