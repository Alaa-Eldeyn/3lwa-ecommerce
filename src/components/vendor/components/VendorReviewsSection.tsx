"use client";

import { Loader2, Star, PenLine } from "lucide-react";
import { useTranslations } from "next-intl";
import ReviewCard from "../../product-details/components/ReviewCard";
import type { VendorReviewStats, VendorReview } from "@/src/types/vendor-reviews.types";

export interface VendorReviewsSectionProps {
  reviewStats: VendorReviewStats | undefined;
  reviews: VendorReview[];
  reviewsLoading: boolean;
  reviewsTotalRecords: number;
  locale: string;
  onWriteReview: () => void;
  onLoadMore: () => void;
}

export default function VendorReviewsSection({
  reviewStats,
  reviews,
  reviewsLoading,
  reviewsTotalRecords,
  locale,
  onWriteReview,
  onLoadMore,
}: VendorReviewsSectionProps) {
  const t = useTranslations("vendor");

  return (
    <section
      id="vendor-reviews-section"
      className="border border-gray-200 dark:border-transparent rounded-lg p-5 sm:p-6 dark:p-0 bg-white dark:bg-transparent">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t("customerReviews")}</h2>
        <button
          type="button"
          onClick={onWriteReview}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-headerDark text-white text-sm font-medium transition-colors shrink-0">
          <PenLine className="w-3.5 h-3.5" />
          {t("writeReview")}
        </button>
      </div>

      {reviewStats && reviewStats.reviewCount > 0 && (
        <div className="flex flex-col items-center sm:flex-row gap-4 sm:gap-6 mb-5 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-800/30">
          <div className="flex sm:flex-col items-center sm:items-start gap-1 shrink-0">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums">
                {reviewStats.averageRating.toFixed(1)}
              </span>
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" aria-hidden />
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
              {reviewStats.reviewCount} {t("reviews")}
            </span>
          </div>
          <div className="flex-1 min-w-0 space-y-1.5">
            {[
              { stars: 5, count: reviewStats.fiveStarCount, pct: reviewStats.fiveStarPercentage },
              { stars: 4, count: reviewStats.fourStarCount, pct: reviewStats.fourStarPercentage },
              {
                stars: 3,
                count: reviewStats.threeStarCount,
                pct: reviewStats.threeStarPercentage,
              },
              { stars: 2, count: reviewStats.twoStarCount, pct: reviewStats.twoStarPercentage },
              { stars: 1, count: reviewStats.oneStarCount, pct: reviewStats.oneStarPercentage },
            ].map(({ stars, count, pct }) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400 w-6 tabular-nums">
                  {stars}
                </span>
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden min-w-[60px]">
                  <div
                    className="h-full bg-amber-400 dark:bg-amber-500 rounded-full transition-all duration-300"
                    style={{ width: `${Math.max(pct, 0)}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 w-6 tabular-nums text-right">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {reviewsLoading && reviews.length === 0 ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 text-primary animate-spin" aria-hidden />
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-4 mt-5">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              id={review.id}
              itemId={review.vendorId}
              customerName={review.customerName}
              reviewNumber={
                review.createdDateUtc
                  ? new Date(review.createdDateUtc).toLocaleDateString(locale, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : undefined
              }
              rating={review.rating}
              reviewTitle=""
              reviewText={review.reviewText ?? ""}
              helpfulVoteCount={0}
              countReport={0}
            />
          ))}
          {reviews.length < reviewsTotalRecords && (
            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={onLoadMore}
                disabled={reviewsLoading}
                className="px-6 py-2.5 rounded-xl border border-primary text-primary dark:text-primary hover:bg-primary hover:text-white font-medium transition-colors disabled:opacity-50 inline-flex items-center gap-2">
                {reviewsLoading ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden /> : null}
                {t("loadMoreReviews")}
              </button>
            </div>
          )}
        </div>
      ) : null}

      {!reviewsLoading &&
        (!reviewStats || reviewStats.reviewCount === 0) &&
        reviews.length === 0 && (
          <p className="text-gray-600 dark:text-gray-400 py-4 text-center text-sm">
            {t("noReviewsYet")}
          </p>
        )}
    </section>
  );
}
