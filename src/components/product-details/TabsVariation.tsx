"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import ReviewCard from "./components/ReviewCard";

interface Review {
  id: string;
  reviewNumber: number;
  itemID: string;
  customerID: string;
  rating: number;
  reviewTitle: string;
  reviewText: string;
}

interface TabsVariationProps {
  description: string;
  reviews: Review[];
  totalReviews: number;
}

const TabsVariation = ({ description, reviews, totalReviews }: TabsVariationProps) => {
  const t = useTranslations("productDetails");
  const tFeatures = useTranslations("productDetails.features");
  const [activeTab, setActiveTab] = useState<"details" | "reviews">("reviews");
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
          }`}>
          {t("productDetails")}
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
          }`}>
          {t("ratingAndReviews")}
          {activeTab === "reviews" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary dark:bg-white" />
          )}
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "details" && (
        <div className="text-gray-600 dark:text-gray-400 leading-relaxed animate-fadeIn">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {t("productInformation")}
          </h3>
          <p className="mb-4">{description}</p>
          <ul className="list-disc list-inside space-y-2">
            <li>{tFeatures("premiumCotton")}</li>
            <li>{tFeatures("machineWashable")}</li>
            <li>{tFeatures("comfortableFit")}</li>
            <li>{tFeatures("durable")}</li>
            <li>{tFeatures("multipleOptions")}</li>
          </ul>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="animate-fadeIn">
          {/* Reviews Header */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("allReviews")} ({totalReviews})
            </h3>
            <button className="px-6 py-2 bg-primary dark:bg-white text-white dark:text-primary rounded-full font-medium hover:bg-secondary dark:hover:bg-gray-200 soft">
              {t("writeReview")}
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
                className="px-8 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-800 soft">
                {t("loadMoreReviews")}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TabsVariation;
