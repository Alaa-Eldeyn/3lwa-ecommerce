"use client";

import Link from "next/link";

const products = [
  {
    name: "Wireless Earbuds Pro",
    sales: 156,
    revenue: "SAR 23,400",
    image: "https://picsum.photos/seed/earbuds/100/100",
  },
  {
    name: "Smart Watch Series 5",
    sales: 98,
    revenue: "SAR 19,600",
    image: "https://picsum.photos/seed/watch/100/100",
  },
  {
    name: "Laptop Stand Aluminum",
    sales: 87,
    revenue: "SAR 8,700",
    image: "https://picsum.photos/seed/stand/100/100",
  },
  {
    name: "USB-C Hub 7-in-1",
    sales: 76,
    revenue: "SAR 5,320",
    image: "https://picsum.photos/seed/hub/100/100",
  },
];

const TopProducts = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Top Products</h3>
        <Link
          href="/items"
          className="text-primary text-sm font-medium hover:underline"
        >
          View All
        </Link>
      </div>
      <div className="p-4 space-y-4">
        {products.map((product, index) => (
          <div key={index} className="flex items-center space-x-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {product.name}
              </p>
              <p className="text-xs text-gray-500">{product.sales} sales</p>
            </div>
            <p className="text-sm font-semibold text-gray-800">
              {product.revenue}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
