"use client";

import { useState } from "react";
import Link from "next/link";
import VendorLayout from "../../components/VendorLayout";
import { Search, ChevronDown, FileDown, Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    id: "1",
    product: "Wireless Earbuds Pro Max",
    customer: "Sarah Ahmed",
    rating: 5,
    comment:
      "Excellent sound quality and comfortable fit. Battery life is impressive!",
    date: "Jan 19, 2026",
    status: "Published",
    replied: true,
  },
  {
    id: "2",
    product: "Smart Watch Series 5",
    customer: "Mohammed Ali",
    rating: 4,
    comment:
      "Great smartwatch overall. The fitness tracking features are accurate. Only giving 4 stars because the battery could be better.",
    date: "Jan 18, 2026",
    status: "Published",
    replied: false,
  },
  {
    id: "3",
    product: "USB-C Hub 7-in-1",
    customer: "Fatima Hassan",
    rating: 5,
    comment: "Works perfectly with my MacBook. All ports function as expected.",
    date: "Jan 17, 2026",
    status: "Published",
    replied: true,
  },
  {
    id: "4",
    product: "Mechanical Keyboard RGB",
    customer: "Ahmed Khalid",
    rating: 3,
    comment:
      "The keyboard is decent but the RGB software is buggy. Keys feel good though.",
    date: "Jan 16, 2026",
    status: "Pending",
    replied: false,
  },
  {
    id: "5",
    product: "Laptop Stand Aluminum",
    customer: "Layla Omar",
    rating: 5,
    comment:
      "Sturdy and elegant. Improves my posture while working. Highly recommend!",
    date: "Jan 15, 2026",
    status: "Published",
    replied: false,
  },
];

const ItemReviews = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

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
    <VendorLayout title="Item Reviews">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <Link
          href="/reviews/items"
          className="px-4 py-2 bg-primary text-white rounded-lg font-medium"
        >
          Item Reviews
        </Link>
        <Link
          href="/reviews/vendor"
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
        >
          Vendor Reviews
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-sm text-gray-500">Total Reviews</p>
          <p className="text-2xl font-bold text-gray-800">1,247</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-sm text-gray-500">Average Rating</p>
          <div className="flex items-center justify-center space-x-1">
            <p className="text-2xl font-bold text-gray-800">4.7</p>
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-sm text-gray-500">5 Star</p>
          <p className="text-2xl font-bold text-green-600">856</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-sm text-gray-500">Pending Reply</p>
          <p className="text-2xl font-bold text-yellow-600">23</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-sm text-gray-500">Response Rate</p>
          <p className="text-2xl font-bold text-primary">89%</p>
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
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary appearance-none pr-10"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary appearance-none pr-10">
              <option>All Products</option>
              <option>Wireless Earbuds Pro Max</option>
              <option>Smart Watch Series 5</option>
              <option>USB-C Hub 7-in-1</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center">
          <FileDown className="w-4 h-4 mr-2" />
          Export
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
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
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    review.status === "Published"
                      ? "bg-gray-100 text-gray-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {review.status}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <Link
                href={`/items/1`}
                className="text-sm text-primary hover:underline"
              >
                {review.product}
              </Link>
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
          Showing 1 to {reviews.length} of 1,247 reviews
        </p>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
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

export default ItemReviews;
