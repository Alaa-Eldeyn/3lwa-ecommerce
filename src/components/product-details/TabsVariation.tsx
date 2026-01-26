"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import ReviewCard from "./components/ReviewCard";
import { CheckCircle2 } from "lucide-react";
import type { ProductDetails } from "@/src/types/product-details.types";

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
  product?: ProductDetails;
}

const TabsVariation = ({ description, reviews, totalReviews, product }: TabsVariationProps) => {
  const t = useTranslations("productDetails");
  const tFeatures = useTranslations("productDetails.features");
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<"details" | "specifications" | "reviews">(
    "details"
  );
  const [visibleReviews, setVisibleReviews] = useState(6);

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 6);
  };

  const brandName = locale === "ar" ? product?.brand?.nameAr : product?.brand?.nameEn;

  return (
    <section id="details-tabs">
      {/* Tab Headers */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex gap-8 overflow-x-auto" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("details")}
            className={`border-b-2 py-4 px-1 text-sm whitespace-nowrap transition-colors ${
              activeTab === "details"
                ? "border-primary dark:border-primary font-bold text-primary dark:text-primary"
                : "border-transparent font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}>
            {t("productDetails")}
          </button>
          {/* //TODO: Add specifications and reviews tabs */}
          {/* <button
            onClick={() => setActiveTab("specifications")}
            className={`border-b-2 py-4 px-1 text-sm whitespace-nowrap transition-colors ${
              activeTab === "specifications"
                ? "border-primary dark:border-primary font-bold text-primary dark:text-primary"
                : "border-transparent font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}>
            {locale === "ar" ? "المواصفات" : "Specifications"}
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`border-b-2 py-4 px-1 text-sm whitespace-nowrap transition-colors ${
              activeTab === "reviews"
                ? "border-primary dark:border-primary font-bold text-primary dark:text-primary"
                : "border-transparent font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}>
            {t("ratingAndReviews")} ({totalReviews || reviews.length})
          </button> */}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "details" && (
        <div className="grid grid-cols-12 gap-8">
          {/* Description Content */}
          <div className="col-span-12 md:col-span-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t("productInformation")}
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{description}</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2
                    className="text-green-500 dark:text-green-400 mt-1 shrink-0"
                    size={16}
                  />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {tFeatures("premiumCotton")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2
                    className="text-green-500 dark:text-green-400 mt-1 shrink-0"
                    size={16}
                  />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {tFeatures("machineWashable")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2
                    className="text-green-500 dark:text-green-400 mt-1 shrink-0"
                    size={16}
                  />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {tFeatures("comfortableFit")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2
                    className="text-green-500 dark:text-green-400 mt-1 shrink-0"
                    size={16}
                  />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {tFeatures("multipleOptions")}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Specs Table */}
          <div className="col-span-12 md:col-span-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {locale === "ar" ? "المواصفات التقنية" : "Technical Specs"}
            </h3>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <table className="min-w-full text-sm">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 w-1/3">
                      {locale === "ar" ? "العلامة التجارية" : "Brand"}
                    </td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white font-semibold">
                      {brandName || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 w-1/3">
                      {locale === "ar" ? "رقم الموديل" : "Model Number"}
                    </td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">
                      {product?.currentCombination?.sku || "-"}
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 w-1/3">
                      {locale === "ar" ? "المادة" : "Material"}
                    </td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">
                      {locale === "ar" ? "متنوع" : "Various"}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 w-1/3">
                      {locale === "ar" ? "نوع القطع" : "Fit Type"}
                    </td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">
                      {locale === "ar" ? "عادي" : "Regular Fit"}
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 w-1/3">
                      {locale === "ar" ? "المنشأ" : "Origin"}
                    </td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">
                      {locale === "ar" ? "متنوع" : "Various"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "specifications" && (
        <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>
            {locale === "ar" ? "المواصفات التفصيلية للمنتج" : "Detailed product specifications"}
          </p>
        </div>
      )}

      {activeTab === "reviews" && (
        <div>
          {/* Reviews Header */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("allReviews")} ({totalReviews || reviews.length})
            </h3>
            <button className="px-6 py-2 bg-primary dark:bg-white text-white dark:text-primary rounded-full font-medium hover:bg-secondary dark:hover:bg-gray-200 transition-colors">
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
                className="px-8 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {t("loadMoreReviews")}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default TabsVariation;
