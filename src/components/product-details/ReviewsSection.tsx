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

interface ReviewsSectionProps {
  reviews: Review[];
  totalReviews: number;
}

const ReviewsSection = ({ reviews, totalReviews }: ReviewsSectionProps) => {
  const [visibleReviews, setVisibleReviews] = useState(6);

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 6);
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Rating & Reviews ({totalReviews})
        </h2>
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
  );
};

export default ReviewsSection;
