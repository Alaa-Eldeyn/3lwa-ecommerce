"use client";

import { useState } from "react";
import Link from "next/link";
import VendorLayout from "../components/VendorLayout";
import {
  Package,
  Check,
  AlertTriangle,
  X,
  Search,
  ChevronDown,
  FileDown,
  FileUp,
  Plus,
  Eye,
  Pencil,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const inventoryItems = [
  {
    id: "1",
    name: "Wireless Earbuds Pro Max",
    sku: "WEP-001",
    stock: 150,
    lowStock: 20,
    warehouse: "Riyadh Main",
    lastUpdated: "Jan 18, 2026",
    status: "In Stock",
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    sku: "SWS-005",
    stock: 75,
    lowStock: 15,
    warehouse: "Riyadh Main",
    lastUpdated: "Jan 17, 2026",
    status: "In Stock",
  },
  {
    id: "3",
    name: "Laptop Stand Aluminum",
    sku: "LSA-003",
    stock: 0,
    lowStock: 10,
    warehouse: "Jeddah",
    lastUpdated: "Jan 15, 2026",
    status: "Out of Stock",
  },
  {
    id: "4",
    name: "USB-C Hub 7-in-1",
    sku: "UCH-007",
    stock: 200,
    lowStock: 25,
    warehouse: "Riyadh Main",
    lastUpdated: "Jan 19, 2026",
    status: "In Stock",
  },
  {
    id: "5",
    name: "Mechanical Keyboard RGB",
    sku: "MKR-012",
    stock: 8,
    lowStock: 15,
    warehouse: "Riyadh Main",
    lastUpdated: "Jan 16, 2026",
    status: "Low Stock",
  },
  {
    id: "6",
    name: "Wireless Mouse Ergonomic",
    sku: "WME-008",
    stock: 5,
    lowStock: 10,
    warehouse: "Jeddah",
    lastUpdated: "Jan 14, 2026",
    status: "Low Stock",
  },
];

const InventoryList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-700";
      case "Out of Stock":
        return "bg-red-100 text-red-700";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStockBarColor = (stock: number, lowStock: number) => {
    const ratio = stock / (lowStock * 5);
    if (ratio === 0) return "bg-red-500";
    if (ratio < 0.3) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <VendorLayout title="Inventory Management">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-2xl font-bold text-gray-800">127</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">In Stock</p>
              <p className="text-2xl font-bold text-green-600">98</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">18</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">11</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <X className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search inventory..."
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
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary appearance-none pr-10">
              <option>All Warehouses</option>
              <option>Riyadh Main</option>
              <option>Jeddah</option>
              <option>Dammam</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center">
            <FileDown className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center">
            <FileUp className="w-4 h-4 mr-2" />
            Import
          </button>
          <Link
            href="/inventory/add"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Stock
          </Link>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Product
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                SKU
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Stock Level
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Warehouse
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Last Updated
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {inventoryItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-gray-800">{item.name}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.sku}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getStockBarColor(
                          item.stock,
                          item.lowStock
                        )}`}
                        style={{
                          width: `${Math.min(
                            (item.stock / (item.lowStock * 5)) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {item.stock}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {item.warehouse}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {item.lastUpdated}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/inventory/${item.id}`}
                      className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/inventory/${item.id}/edit`}
                      className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg"
                      title="Add Stock"
                    >
                      <Plus className="w-4 h-4" />
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
          Showing 1 to {inventoryItems.length} of {inventoryItems.length} items
        </p>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg">1</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </VendorLayout>
  );
};

export default InventoryList;
