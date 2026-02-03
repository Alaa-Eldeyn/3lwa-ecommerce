"use client";

import { useState } from "react";
import Link from "next/link";
import VendorLayout from "../../components/VendorLayout";
import { Search, ChevronDown, Truck, MessageSquare, Package, Star, ChevronLeft, ChevronRight } from "lucide-react";

const vendorReviews = [
  {
    id: "1",
    customer: "Sarah Ahmed",
    orderId: "ORD-7829",
    rating: 5,
    comment:
      "Excellent seller! Fast shipping and the product was exactly as described. Will definitely buy again.",
    date: "Jan 19, 2026",
    replied: true,
  },
  {
    id: "2",
    customer: "Mohammed Ali",
    orderId: "ORD-7825",
    rating: 5,
    comment:
      "Very responsive to questions and provided excellent customer service. Highly recommended vendor.",
    date: "Jan 18, 2026",
    replied: true,
  },
  {
    id: "3",
    customer: "Fatima Hassan",
    orderId: "ORD-7820",
    rating: 4,
    comment:
      "Good seller overall. Product arrived a day late but was well packaged and in perfect condition.",
    date: "Jan 17, 2026",
    replied: false,
  },
  {
    id: "4",
    customer: "Ahmed Khalid",
    orderId: "ORD-7815",
    rating: 5,
    comment:
      "Professional seller with quality products. Communication was excellent throughout.",
    date: "Jan 16, 2026",
    replied: false,
  },
];

const VendorReviews = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <VendorLayout title="Vendor Reviews">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <Link
          href="/reviews/items"
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
        >
          Item Reviews
        </Link>
        <Link
          href="/reviews/vendor"
          className="px-4 py-2 bg-primary text-white rounded-lg font-medium"
        >
          Vendor Reviews
        </Link>
      </div>

      {/* Vendor Rating Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-2 gap-8">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-5xl font-bold text-gray-800">4.8</p>
              <div className="flex items-center justify-center mt-2">
                {renderStars(5)}
              </div>
              <p className="text-sm text-gray-500 mt-1">Based on 456 reviews</p>
            </div>
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const percentages: Record<number, number> = {
                  5: 78,
                  4: 15,
                  3: 5,
                  2: 1,
                  1: 1,
                };
                return (
                  <div key={star} className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600 w-8">{star} star</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400"
                        style={{ width: `${percentages[star]}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 w-10">
                      {percentages[star]}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="border-l border-gray-200 pl-8">
            <h4 className="font-semibold text-gray-800 mb-4">
              Performance Highlights
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Fast Shipping
                  </p>
                  <p className="text-xs text-gray-500">98% on-time delivery</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Responsive
                  </p>
                  <p className="text-xs text-gray-500">&lt; 2hr response time</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Quality Products
                  </p>
                  <p className="text-xs text-gray-500">2.3% return rate</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Top Rated
                  </p>
                  <p className="text-xs text-gray-500">In top 5% of sellers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="relative">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary appearance-none pr-10">
              <option>All Ratings</option>
              <option>5 Stars</option>
              <option>4 Stars</option>
              <option>3 Stars</option>
              <option>2 Stars</option>
              <option>1 Star</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {vendorReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">
                    {review.customer
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{review.customer}</p>
                  <div className="flex items-center space-x-3 mt-1">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {review.replied && (
                  <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Replied
                  </span>
                )}
                <Link
                  href={`/orders/${review.orderId}`}
                  className="text-sm text-primary hover:underline"
                >
                  #{review.orderId}
                </Link>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{review.comment}</p>
            <div className="flex items-center space-x-3">
              <Link
                href={`/reviews/${review.id}`}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm"
              >
                View Details
              </Link>
              {!review.replied && (
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium text-sm">
                  Reply
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-600">
          Showing 1 to {vendorReviews.length} of 456 reviews
        </p>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
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

export default VendorReviews;
