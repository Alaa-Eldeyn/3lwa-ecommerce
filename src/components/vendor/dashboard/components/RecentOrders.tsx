"use client";

import Link from "next/link";

const orders = [
  {
    id: "#ORD-7829",
    customer: "Sarah Ahmed",
    items: 3,
    total: "SAR 459",
    status: "Processing",
    statusColor: "bg-blue-100 text-blue-700",
  },
  {
    id: "#ORD-7828",
    customer: "Mohammed Ali",
    items: 1,
    total: "SAR 129",
    status: "Shipped",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    id: "#ORD-7827",
    customer: "Fatima Hassan",
    items: 2,
    total: "SAR 278",
    status: "Pending",
    statusColor: "bg-yellow-100 text-yellow-700",
  },
  {
    id: "#ORD-7826",
    customer: "Ahmed Khalid",
    items: 5,
    total: "SAR 892",
    status: "Delivered",
    statusColor: "bg-gray-100 text-gray-700",
  },
  {
    id: "#ORD-7825",
    customer: "Layla Omar",
    items: 2,
    total: "SAR 345",
    status: "Processing",
    statusColor: "bg-blue-100 text-blue-700",
  },
];

const RecentOrders = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
        <Link
          href="/orders"
          className="text-primary text-sm font-medium hover:underline"
        >
          View All
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Items
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Total
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-primary">
                  {order.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {order.customer}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.items}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{order.total}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${order.statusColor}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/orders/${order.id.replace("#", "")}`}
                    className="text-primary hover:underline text-sm"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
