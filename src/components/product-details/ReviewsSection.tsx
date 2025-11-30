"use client";

import { useState } from "react";
import ReviewCard from "./ReviewCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useTranslations } from "next-intl";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  variant?: "grid" | "carousel";
}

const ReviewsSection = ({
  reviews,
  totalReviews,
  variant = "carousel",
}: ReviewsSectionProps) => {
  const t = useTranslations("productDetails");
  const [visibleReviews, setVisibleReviews] = useState(6);

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 6);
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("ratingAndReviews")} ({totalReviews})
        </h2>
        <button className="px-6 py-2 bg-primary dark:bg-white text-white dark:text-primary rounded-full font-medium hover:bg-secondary dark:hover:bg-gray-200 soft">
          {t("writeReview")}
        </button>
      </div>

      {/* Reviews Display */}
      {variant === "carousel" ? (
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: ".reviews-swiper-button-prev",
              nextEl: ".reviews-swiper-button-next",
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            className="mb-8"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <ReviewCard {...review} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="reviews-swiper-button-next absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white dark:bg-gray-800 shadow-lg rounded-full flex items-center justify-center hover:bg-primary dark:hover:bg-primary hover:text-white transition-all hover:scale-110">
            <svg
              className="w-5 h-5 rtl:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <button className="reviews-swiper-button-prev absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white dark:bg-gray-800 shadow-lg rounded-full flex items-center justify-center hover:bg-primary dark:hover:bg-primary hover:text-white transition-all hover:scale-110">
            <svg
              className="w-5 h-5 rtl:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
      ) : (
        <>
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
                {t("loadMoreReviews")}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewsSection;
