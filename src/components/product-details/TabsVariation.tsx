"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { customAxios } from "@/src/auth/customAxios";
import ReviewCard from "./components/ReviewCard";
import { CheckCircle2, Star, X } from "lucide-react";
import type { ProductDetails } from "@/src/types/product-details.types";
import toast from "react-hot-toast";

const EMPTY_GUID = "00000000-0000-0000-0000-000000000000";

export interface Review {
  id: string;
  itemId: string;
  customerName?: string;
  reviewNumber: string;
  reviewTitle: string;
  reviewText: string;
  rating: number;
  helpfulVoteCount?: number;
  countReport?: number;
}

interface TabsVariationProps {
  description: string;
  product?: ProductDetails;
}

interface ReviewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingReview: Review | null;
  formRating: number;
  setFormRating: (n: number) => void;
  formTitle: string;
  setFormTitle: (s: string) => void;
  formText: string;
  setFormText: (s: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  t: (key: string) => string;
}

function ReviewFormModal({
  isOpen,
  onClose,
  editingReview,
  formRating,
  setFormRating,
  formTitle,
  setFormTitle,
  formText,
  setFormText,
  onSubmit,
  isSubmitting,
  t,
}: ReviewFormModalProps) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      aria-modal="true">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {editingReview ? t("editReview") : t("writeReview")}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 focus:outline-none focus:border-primary"
            aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("rating")}
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormRating(star)}
                  className="p-1 rounded border-2 border-transparent focus:outline-none focus:border-primary">
                  <Star
                    size={28}
                    className={
                      star <= formRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600"
                    }
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t("reviewTitle")}
            </label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-primary"
              placeholder={t("reviewTitlePlaceholder")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t("reviewText")}
            </label>
            <textarea
              value={formText}
              onChange={(e) => setFormText(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:outline-none focus:border-primary"
              placeholder={t("reviewTextPlaceholder")}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 bg-primary dark:bg-white text-white dark:text-primary rounded-full font-medium hover:bg-secondary dark:hover:bg-gray-200 disabled:opacity-50 border-2 border-transparent focus:outline-none focus:border-primary">
              {isSubmitting
                ? t("submitting")
                : editingReview
                ? t("updateReview")
                : t("submitReview")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:border-primary">
              {t("cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const TabsVariation = ({ description, product }: TabsVariationProps) => {
  const t = useTranslations("productDetails");
  const tFeatures = useTranslations("productDetails.features");
  const tProduct = useTranslations("product");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<"details" | "specifications" | "reviews">("details");
  const [visibleReviews, setVisibleReviews] = useState(6);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [formRating, setFormRating] = useState(5);
  const [formTitle, setFormTitle] = useState("");
  const [formText, setFormText] = useState("");

  const itemId = product?.id ?? "";

  const resetForm = () => {
    setEditingReview(null);
    setFormRating(5);
    setFormTitle("");
    setFormText("");
    setShowReviewModal(false);
  };

  const openCreateModal = () => {
    resetForm();
    setShowReviewModal(true);
  };

  const openEditModal = (review: Review) => {
    setEditingReview(review);
    setFormRating(review.rating);
    setFormTitle(review.reviewTitle ?? "");
    setFormText(review.reviewText ?? "");
    setShowReviewModal(true);
  };

  // Fetch Reviews
  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useQuery({
    queryKey: ["reviews", itemId],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/ItemReview/search`, {
        params: { ItemId: itemId },
      });
      return res.data;
    },
    enabled: !!itemId,
    refetchOnWindowFocus: false,
  });

  const reviews: Review[] = reviewsData?.data?.items ?? [];
  const totalReviews = reviewsData?.data?.totalRecords ?? reviews.length;

  // Create Review
  const createMutation = useMutation({
    mutationFn: async (body: {
      id: string;
      itemID: string;
      rating: number;
      reviewTitle: string;
      reviewText: string;
    }) => {
      const { data } = await customAxios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ItemReview/Add`,
        body
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", itemId] });
      toast.success(t("reviewSubmitted"));
      resetForm();
    },
    onError: (err: unknown) => {
      const message =
        err && typeof err === "object" && "message" in err
          ? String((err as { message: string }).message)
          : t("errorSubmitReview");
      toast.error(message);
    },
  });

  // Update Review
  const updateMutation = useMutation({
    mutationFn: async (body: {
      id: string;
      itemID: string;
      rating: number;
      reviewTitle: string;
      reviewText: string;
    }) => {
      const { data } = await customAxios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ItemReview/Update`,
        body
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", itemId] });
      toast.success(t("reviewUpdated"));
      resetForm();
    },
    onError: (err: unknown) => {
      const message =
        err && typeof err === "object" && "message" in err
          ? String((err as { message: string }).message)
          : t("errorUpdateReview");
      toast.error(message);
    },
  });

  // Delete Review
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await customAxios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ItemReview/delete`,
        { data: { id } }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", itemId] });
      toast.success(t("reviewDeleted"));
    },
    onError: (err: unknown) => {
      const message =
        err && typeof err === "object" && "message" in err
          ? String((err as { message: string }).message)
          : t("errorDeleteReview");
      toast.error(message);
    },
  });

  // Handle Submit Review
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemId) return;
    if (editingReview) {
      updateMutation.mutate({
        id: editingReview.id,
        itemID: itemId,
        rating: formRating,
        reviewTitle: formTitle.trim(),
        reviewText: formText.trim(),
      });
    } else {
      createMutation.mutate({
        id: EMPTY_GUID,
        itemID: itemId,
        rating: formRating,
        reviewTitle: formTitle.trim(),
        reviewText: formText.trim(),
      });
    }
  };

  const handleDeleteReview = (review: Review) => {
    if (typeof window !== "undefined" && window.confirm(t("confirmDeleteReview"))) {
      deleteMutation.mutate(review.id);
    }
  };

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 6);
  };

  const brandName = isArabic ? product?.brand?.nameAr : product?.brand?.nameEn;

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
          <button
            onClick={() => setActiveTab("reviews")}
            className={`border-b-2 py-4 px-1 text-sm whitespace-nowrap transition-colors ${
              activeTab === "reviews"
                ? "border-primary dark:border-primary font-bold text-primary dark:text-primary"
                : "border-transparent font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}>
            {t("ratingAndReviews")} ({totalReviews})
          </button>
        </nav>
      </div>

      {/* Tab Content - Details */}
      {activeTab === "details" && (
        <div className="grid grid-cols-12 gap-8">
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

          <div className="col-span-12 md:col-span-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {tProduct("technicalSpecs")}
            </h3>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <table className="min-w-full text-sm">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 w-1/3">
                      {tProduct("brand")}
                    </td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white font-semibold">
                      {brandName || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 w-1/3">
                      {tProduct("modelNumber")}
                    </td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">
                      {product?.currentCombination?.sku || "-"}
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 w-1/3">
                      {tProduct("material")}
                    </td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">
                      {tProduct("various")}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 w-1/3">
                      {tProduct("fitType")}
                    </td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">
                      {tProduct("regularFit")}
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 w-1/3">
                      {tProduct("origin")}
                    </td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">
                      {tProduct("various")}
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
          <p>{tProduct("detailedSpecs")}</p>
        </div>
      )}

      {/* Tab Content - Reviews */}
      {activeTab === "reviews" && (
        <div>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("allReviews")} ({totalReviews})
            </h3>
            <button
              type="button"
              onClick={openCreateModal}
              className="px-6 py-2 bg-primary dark:bg-white text-white dark:text-primary rounded-full font-medium hover:bg-secondary dark:hover:bg-gray-200 transition-colors">
              {t("writeReview")}
            </button>
          </div>

          {reviewsLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : reviewsError ? (
            <p className="text-red-600 dark:text-red-400 py-4">{t("errorLoadingReviews")}</p>
          ) : reviews.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 py-8">{t("noReviews")}</p>
          ) : (
            <>
              <div className="flex flex-col gap-5 mb-8">
                {reviews.slice(0, visibleReviews).map((review) => (
                  <ReviewCard
                    key={review.id}
                    {...review}
                    customerName={review.customerName}
                    onEdit={() => openEditModal(review)}
                    onDelete={() => handleDeleteReview(review)}
                  />
                ))}
              </div>
              {visibleReviews < reviews.length && (
                <div className="text-center">
                  <button
                    onClick={loadMoreReviews}
                    className="px-8 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    {t("loadMoreReviews")}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <ReviewFormModal
        isOpen={showReviewModal}
        onClose={resetForm}
        editingReview={editingReview}
        formRating={formRating}
        setFormRating={setFormRating}
        formTitle={formTitle}
        setFormTitle={setFormTitle}
        formText={formText}
        setFormText={setFormText}
        onSubmit={handleSubmitReview}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        t={t}
      />
    </section>
  );
};

export default TabsVariation;
