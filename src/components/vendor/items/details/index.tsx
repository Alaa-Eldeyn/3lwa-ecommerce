"use client";

import Link from "next/link";
import VendorLayout from "../../components/VendorLayout";
import { Pencil, Tags, Share2, Star } from "lucide-react";

const ItemDetails = () => {
  const item = {
    id: "1",
    name: "Wireless Earbuds Pro Max",
    sku: "WEP-001",
    category: "Electronics > Audio",
    brand: "Apple",
    price: "SAR 349",
    salePrice: "SAR 299",
    stock: 150,
    status: "Active",
    description:
      "Premium wireless earbuds with active noise cancellation, high-fidelity audio, and up to 30 hours of battery life with the charging case. Features include touch controls, wireless charging, and water resistance.",
    images: [
      "https://picsum.photos/seed/detail1/400/400",
      "https://picsum.photos/seed/detail2/400/400",
      "https://picsum.photos/seed/detail3/400/400",
      "https://picsum.photos/seed/detail4/400/400",
    ],
    stats: {
      views: 2450,
      sales: 156,
      revenue: "SAR 46,644",
      rating: 4.8,
      reviews: 89,
    },
  };

  return (
    <VendorLayout
      title="Item Details"
      showBackButton
      breadcrumbs={[
        { label: "Items", href: "/items" },
        { label: item.name },
      ]}
    >
      {/* Action Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              item.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {item.status}
          </span>
          <span className="text-gray-500 text-sm">SKU: {item.sku}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href={`/items/${item.id}/edit`}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit Item
          </Link>
          <Link
            href={`/items/${item.id}/pricing`}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center"
          >
            <Tags className="w-4 h-4 mr-2" />
            Pricing
          </Link>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium flex items-center">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-sm text-gray-500">Views</p>
          <p className="text-2xl font-bold text-gray-800">{item.stats.views}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-sm text-gray-500">Sales</p>
          <p className="text-2xl font-bold text-gray-800">{item.stats.sales}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-2xl font-bold text-gray-800">{item.stats.revenue}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-sm text-gray-500">Rating</p>
          <p className="text-2xl font-bold text-gray-800 flex items-center justify-center">
            {item.stats.rating}
            <Star className="w-5 h-5 text-yellow-400 ml-1 fill-yellow-400" />
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-sm text-gray-500">Reviews</p>
          <p className="text-2xl font-bold text-gray-800">{item.stats.reviews}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Images */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Images</h3>
            <div className="grid grid-cols-4 gap-4">
              {item.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Product ${index + 1}`}
                  className="w-full aspect-square object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed">{item.description}</p>
          </div>

          {/* Sales Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Sales Performance
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
            <div className="h-64 flex items-end justify-between space-x-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day, index) => {
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
                }
              )}
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Reviews
              </h3>
              <Link
                href={`/reviews/items?item=${item.id}`}
                className="text-primary text-sm font-medium hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((review) => (
                <div
                  key={review}
                  className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {review === 1 ? "SA" : review === 2 ? "MK" : "FH"}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {review === 1
                            ? "Sarah Ahmed"
                            : review === 2
                            ? "Mohammed Khalid"
                            : "Fatima Hassan"}
                        </p>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${
                                star <= (review === 2 ? 4 : 5)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {review} day{review !== 1 ? "s" : ""} ago
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {review === 1
                      ? "Excellent sound quality and comfortable fit. Battery life is impressive!"
                      : review === 2
                      ? "Great earbuds overall. ANC could be better but still good value."
                      : "Love these earbuds! The touch controls are very responsive."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Product Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Product Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Name</span>
                <span className="text-sm font-medium text-gray-800">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">SKU</span>
                <span className="text-sm font-medium text-gray-800">
                  {item.sku}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Category</span>
                <span className="text-sm font-medium text-gray-800">
                  {item.category}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Brand</span>
                <span className="text-sm font-medium text-gray-800">
                  {item.brand}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pricing</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Regular Price</span>
                <span className="text-sm text-gray-400 line-through">
                  {item.price}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Sale Price</span>
                <span className="text-lg font-bold text-primary">
                  {item.salePrice}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Discount</span>
                <span className="text-sm font-medium text-green-600">
                  -14% OFF
                </span>
              </div>
            </div>
            <Link
              href={`/items/${item.id}/pricing`}
              className="mt-4 w-full px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 font-medium flex items-center justify-center"
            >
              Manage Pricing
            </Link>
          </div>

          {/* Inventory */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Inventory
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">In Stock</span>
                <span className="text-sm font-medium text-gray-800">
                  {item.stock} units
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  In Stock
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Low Stock Alert</span>
                <span className="text-sm font-medium text-gray-800">
                  20 units
                </span>
              </div>
            </div>
            <Link
              href="/inventory"
              className="mt-4 w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center justify-center"
            >
              View Inventory
            </Link>
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipping</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Weight</span>
                <span className="text-sm font-medium text-gray-800">0.25 kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Dimensions</span>
                <span className="text-sm font-medium text-gray-800">
                  10 x 8 x 5 cm
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Shipping Class</span>
                <span className="text-sm font-medium text-gray-800">Standard</span>
              </div>
            </div>
            <Link
              href={`/items/${item.id}/shipping`}
              className="mt-4 w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center justify-center"
            >
              Shipping Settings
            </Link>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default ItemDetails;
