"use client";

import { Star, Pencil, Trash2, ThumbsUp, Flag } from "lucide-react";
import { useTranslations } from "next-intl";

interface ReviewCardProps {
  id: string;
  itemId: string;
  customerName?: string;
  reviewDate?: string;
  rating: number;
  reviewTitle: string;
  reviewText: string;
  helpfulVoteCount?: number;
  countReport?: number;
  isMarkedHelpfulByUser?: boolean;
  isReportedByUser?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onHelpful?: (reviewId: string) => void | Promise<void>;
  onReport?: (reviewId: string) => void | Promise<void>;
}

const ReviewCard = ({
  id,
  rating,
  reviewTitle,
  reviewText,
  customerName: customerNameProp,
  reviewDate,
  helpfulVoteCount = 0,
  countReport = 0,
  isMarkedHelpfulByUser = false,
  isReportedByUser = false,
  onEdit,
  onDelete,
  onHelpful,
  onReport,
}: ReviewCardProps) => {
  const t = useTranslations("reviewCard");
  const displayName = customerNameProp?.trim() || t("anonymous");

  return (
    <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/30">
      {/* Header: name + rating + date */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
          <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">
            {displayName}
          </span>
          <div className="flex items-center gap-0.5" aria-label={t("ratingOutOf5", { rating })}>
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
        {reviewDate && (
          <span className="text-xs text-gray-500 dark:text-gray-400">{reviewDate}</span>
        )}
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
          {onHelpful ? (
            <button
              type="button"
              onClick={() => onHelpful(id)}
              className={`flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 rounded ${
                isMarkedHelpfulByUser
                  ? "text-primary dark:text-primary fill-primary dark:fill-primary"
                  : "text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
              }`}
              aria-label={t("markHelpful")}
              aria-pressed={isMarkedHelpfulByUser}>
              <ThumbsUp
                size={12}
                className={`shrink-0 ${isMarkedHelpfulByUser ? "fill-current" : ""}`}
              />
              {helpfulVoteCount} {t("helpful")}
            </button>
          ) : (
            <span className="flex items-center gap-1">
              <ThumbsUp size={12} className="shrink-0" />
              {helpfulVoteCount} {t("helpful")}
            </span>
          )}
          {onReport ? (
            <button
              type="button"
              onClick={() => onReport(id, isReportedByUser)}
              className={`flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-error/30 rounded ${
                isReportedByUser
                  ? "text-error dark:text-error fill-error dark:fill-error"
                  : "text-gray-500 dark:text-gray-400 hover:text-error dark:hover:text-error"
              }`}
              aria-label={t("reportReview")}
              aria-pressed={isReportedByUser}>
              <Flag size={12} className={`shrink-0 ${isReportedByUser ? "fill-current" : ""}`} />
              {countReport} {countReport === 1 ? t("report") : t("reports")}
            </button>
          ) : (
            <span className="flex items-center gap-1">
              <Flag size={12} className="shrink-0" />
              {countReport} {countReport === 1 ? t("report") : t("reports")}
            </span>
          )}
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
