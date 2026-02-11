"use client";

import { useState, useEffect } from "react";
import { Loader2, Star, X } from "lucide-react";
import { useTranslations } from "next-intl";
import type {
  VendorReviewSubmitPayload,
  VendorReviewUpdatePayload,
} from "@/src/types/vendor-reviews.types";

export interface EditingReview {
  id: string;
  rating: number;
  reviewText: string;
}

export interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendorId: string;
  onSubmit: (payload: VendorReviewSubmitPayload) => Promise<void>;
  isSubmitting: boolean;
  submitError: string | null;
  /** When set, modal is in edit mode: form is prefilled and submit calls onUpdate */
  editingReview?: EditingReview | null;
  onUpdate?: (payload: VendorReviewUpdatePayload) => Promise<void>;
}

export default function WriteReviewModal({
  isOpen,
  onClose,
  vendorId,
  onSubmit,
  isSubmitting,
  submitError,
  editingReview = null,
  onUpdate,
}: WriteReviewModalProps) {
  const t = useTranslations("vendor");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (editingReview) {
        setRating(editingReview.rating);
        setText(editingReview.reviewText ?? "");
      } else {
        setRating(5);
        setText("");
      }
    }
  }, [isOpen, editingReview]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingReview && onUpdate) {
      await onUpdate({ id: editingReview.id, rating, reviewText: text.trim() || "" });
    } else {
      await onSubmit({ vendorId, rating, reviewText: text.trim() || "" });
    }
  };

  const isEditMode = Boolean(editingReview);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => !isSubmitting && onClose()}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {isEditMode ? t("editReview") : t("writeReview")}
          </h3>
          <button
            type="button"
            onClick={() => !isSubmitting && onClose()}
            disabled={isSubmitting}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            aria-label={t("close")}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("yourRating")}
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 focus:outline-none focus:ring-2 focus:ring-primary rounded"
                  aria-label={`${star} stars`}>
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= rating
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="vendor-review-text"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("yourReview")}
            </label>
            <textarea
              id="vendor-review-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder={t("yourReview")}
              disabled={isSubmitting}
            />
          </div>

          {submitError && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {submitError}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => !isSubmitting && onClose()}
              disabled={isSubmitting}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50">
              {t("close")}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 px-4 rounded-xl bg-primary hover:bg-secondary text-white font-medium transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                  {isEditMode ? t("updateReview") : t("submitReview")}
                </>
              ) : isEditMode ? (
                t("updateReview")
              ) : (
                t("submitReview")
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
