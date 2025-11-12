"use client";

import { useState } from "react";
import ReviewCard from "./ReviewCard";

interface Review {
  id: number;
  name: string;
  rating: number;
  verified: boolean;
  date: string;
  review: string;
}

interface ProductTabsContentProps {
  description: string;
  reviews: Review[];
  totalReviews: number;
}

const ProductTabsContent = ({ description, reviews, totalReviews }: ProductTabsContentProps) => {
  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "faqs">("reviews");
  const [visibleReviews, setVisibleReviews] = useState(6);

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 6);
  };

  return (
    <div className="mb-16">
      {/* Tab Headers */}
      <div className="flex items-center gap-8 border-b border-gray-200 dark:border-gray-700 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab("details")}
          className={`pb-4 font-medium soft relative whitespace-nowrap ${
            activeTab === "details"
              ? "text-gray-900 dark:text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          Product Details
          {activeTab === "details" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary dark:bg-white" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-4 font-medium soft relative whitespace-nowrap ${
            activeTab === "reviews"
              ? "text-gray-900 dark:text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          Rating & Reviews
          {activeTab === "reviews" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary dark:bg-white" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("faqs")}
          className={`pb-4 font-medium soft relative whitespace-nowrap ${
            activeTab === "faqs"
              ? "text-gray-900 dark:text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          FAQs
          {activeTab === "faqs" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary dark:bg-white" />
          )}
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "details" && (
        <div className="text-gray-600 dark:text-gray-400 leading-relaxed animate-fadeIn">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Product Information
          </h3>
          <p className="mb-4">{description}</p>
          <ul className="list-disc list-inside space-y-2">
            <li>100% Premium Cotton</li>
            <li>Machine washable</li>
            <li>Comfortable fit</li>
            <li>Durable and long-lasting</li>
            <li>Available in multiple colors and sizes</li>
          </ul>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="animate-fadeIn">
          {/* Reviews Header */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              All Reviews ({totalReviews})
            </h3>
            <button className="px-6 py-2 bg-primary dark:bg-white text-white dark:text-primary rounded-full font-medium hover:bg-secondary dark:hover:bg-gray-200 soft">
              Write a Review
            </button>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {reviews.slice(0, visibleReviews).map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </div>

          {/* Load More Button */}
          {visibleReviews < reviews.length && (
            <div className="text-center">
              <button
                onClick={loadMoreReviews}
                className="px-8 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-800 soft"
              >
                Load More Reviews
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === "faqs" && (
        <div className="space-y-4 animate-fadeIn">
          <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">
              How do I choose the right size?
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Please refer to our size guide for detailed measurements. We recommend
              measuring your current favorite t-shirt and comparing it with our size chart.
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">
              What is the return policy?
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              We offer a 30-day return policy. Items must be unworn, unwashed, and in their
              original condition with tags attached.
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">
              How long does shipping take?
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Standard shipping takes 5-7 business days. Express shipping is available and
              takes 2-3 business days.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTabsContent;
