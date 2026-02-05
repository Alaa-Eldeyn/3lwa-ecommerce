"use client";

import { Star, Pencil, Trash2, ThumbsUp, Flag } from "lucide-react";
import { useTranslations } from "next-intl";

interface ReviewCardProps {
  id: string;
  itemId: string;
  customerName?: string;
  reviewNumber?: string;
  rating: number;
  reviewTitle: string;
  reviewText: string;
  helpfulVoteCount?: number;
  countReport?: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ReviewCard = ({
  rating,
  reviewTitle,
  reviewText,
  customerName: customerNameProp,
  reviewNumber,
  helpfulVoteCount = 0,
  countReport = 0,
  onEdit,
  onDelete,
}: ReviewCardProps) => {
  const t = useTranslations("reviewCard");
  const displayName = customerNameProp?.trim() || t("anonymous");

  return (
    <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/30">
      {/* Header: name + rating */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
        <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">{displayName}</span>
        <div
          className="flex items-center gap-0.5"
          aria-label={t("ratingOutOf5", { rating })}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={14}
              className={
                i <= rating
                  ? "fill-amber-500 text-amber-500"
                  : "fill-gray-300 dark:fill-gray-500 text-gray-300 dark:text-gray-500"
              }
            />
          ))}
        </div>
      </div>

      {/* Title */}
      {reviewTitle && (
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{reviewTitle}</h3>
      )}

      {/* Body */}
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-snug mb-3">{reviewText}</p>

      {/* Footer: helpful, reports, actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <ThumbsUp size={12} className="shrink-0" />
            {helpfulVoteCount} {t("helpful")}
          </span>
          <span className="flex items-center gap-1">
            <Flag size={12} className="shrink-0" />
            {countReport} {countReport === 1 ? t("report") : t("reports")}
          </span>
        </div>
        {/* //TODO: Add edit and delete functionality */}
        {/* {(onEdit || onDelete) && (
          <div className="flex items-center gap-1">
            {onEdit && (
              <button
                type="button"
                onClick={onEdit}
                className="px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600 rounded border border-transparent hover:border-gray-300 dark:hover:border-gray-500 transition-colors focus:outline-none focus:border-primary"
                aria-label="Edit review">
                <Pencil size={12} />
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="px-2 py-1 text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-transparent hover:border-red-200 dark:hover:border-red-800 transition-colors focus:outline-none focus:border-red-500"
                aria-label="Delete review">
                <Trash2 size={12} />
              </button>
            )}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ReviewCard;
