"use client";

import { useState } from "react";
import Link from "next/link";
import VendorLayout from "../components/VendorLayout";
import {
  Search,
  ChevronDown,
  FileDown,
  Plus,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const items = [
  {
    id: "1",
    name: "Wireless Earbuds Pro Max",
    sku: "WEP-001",
    category: "Electronics",
    price: "SAR 299",
    stock: 150,
    status: "Active",
    image: "https://picsum.photos/seed/earbuds1/100/100",
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    sku: "SWS-005",
    category: "Electronics",
    price: "SAR 599",
    stock: 75,
    status: "Active",
    image: "https://picsum.photos/seed/watch1/100/100",
  },
  {
    id: "3",
    name: "Laptop Stand Aluminum",
    sku: "LSA-003",
    category: "Accessories",
    price: "SAR 149",
    stock: 0,
    status: "Out of Stock",
    image: "https://picsum.photos/seed/stand1/100/100",
  },
  {
    id: "4",
    name: "USB-C Hub 7-in-1",
    sku: "UCH-007",
    category: "Accessories",
    price: "SAR 89",
    stock: 200,
    status: "Active",
    image: "https://picsum.photos/seed/hub1/100/100",
  },
  {
    id: "5",
    name: "Mechanical Keyboard RGB",
    sku: "MKR-012",
    category: "Electronics",
    price: "SAR 349",
    stock: 45,
    status: "Active",
    image: "https://picsum.photos/seed/keyboard1/100/100",
  },
  {
    id: "6",
    name: "Wireless Mouse Ergonomic",
    sku: "WME-008",
    category: "Electronics",
    price: "SAR 129",
    stock: 5,
    status: "Low Stock",
    image: "https://picsum.photos/seed/mouse1/100/100",
  },
];

const ItemsList = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const toggleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((item) => item.id));
    }
  };

  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Out of Stock":
        return "bg-red-100 text-red-700";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <VendorLayout title="Items & Offers">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search items..."
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
              <option value="active">Active</option>
              <option value="out-of-stock">Out of Stock</option>
              <option value="low-stock">Low Stock</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary appearance-none pr-10">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Accessories</option>
              <option>Clothing</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center">
            <FileDown className="w-4 h-4 mr-2" />
            Export
          </button>
          <Link
            href="/items/add"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Link>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-3 mb-4 flex items-center justify-between">
          <p className="text-sm text-primary font-medium">
            {selectedItems.length} item(s) selected
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 text-sm border border-primary text-primary rounded-lg hover:bg-primary/10">
              Bulk Edit
            </button>
            <button className="px-3 py-1.5 text-sm border border-red-500 text-red-500 rounded-lg hover:bg-red-50">
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Items Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedItems.length === items.length}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Item
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                SKU
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Price
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Stock
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
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelectItem(item.id)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-800">
                        {item.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.sku}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {item.category}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                  {item.price}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.stock}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/items/${item.id}`}
                      className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/items/${item.id}/edit`}
                      className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
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
          Showing 1 to {items.length} of {items.length} items
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

export default ItemsList;
