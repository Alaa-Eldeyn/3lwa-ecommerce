"use client";
import { useState, useEffect, useCallback } from "react";
import { Loader2, Star, ArrowLeft, ArrowRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { customAxios } from "@/src/auth/customAxios";
import { useLocale, useTranslations } from "next-intl";
import ProductCard from "../common/ProductCard";
import VendorReviewsSection from "./components/VendorReviewsSection";
import WriteReviewModal from "./components/WriteReviewModal";
import { Product } from "@/src/types/types";
import {
  VendorReviewStats,
  VendorReviewSubmitPayload,
  VendorReviewUpdatePayload,
  VendorReview,
} from "@/src/types/vendor-reviews.types";
import { useUserStore } from "@/src/store/userStore";
import toast from "react-hot-toast";

const VendorPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("vendor");
  const tProducts = useTranslations("vendor.products");
  const user = useUserStore((s) => s.user);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<VendorReview | null>(null);

  const [vendorData, setVendorData] = useState<any>(null);
  const [vendorLoading, setVendorLoading] = useState(true);
  const [vendorError, setVendorError] = useState<any>(null);

  const [reviewStats, setReviewStats] = useState<VendorReviewStats | undefined>(undefined);
  const [reviewStatsLoading, setReviewStatsLoading] = useState(false);

  const [reviews, setReviews] = useState<VendorReview[]>([]);
  const [reviewsPageNumber, setReviewsPageNumber] = useState(1);
  const reviewsPageSize = 10;
  const [reviewsTotalRecords, setReviewsTotalRecords] = useState(0);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [productsLoading, setProductsLoading] = useState(false);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Fetch review stats
  const fetchReviewStats = useCallback(async () => {
    if (!id) return;
    setReviewStatsLoading(true);
    try {
      const { data } = await customAxios.get(`/VendorReview/vendor-review-stats/${id}`);
      setReviewStats(data?.data);
    } catch {
      setReviewStats(undefined);
    } finally {
      setReviewStatsLoading(false);
    }
  }, [id]);

  // Fetch reviews
  const fetchReviews = useCallback(
    async (pageNumber: number = 1, append: boolean = false) => {
      if (!id || typeof id !== "string") return;
      setReviewsLoading(true);
      try {
        const { data } = await customAxios.get("/VendorReview/search-public", {
          params: { vendorId: id, pageNumber, pageSize: reviewsPageSize },
        });
        const payload = data?.data ?? data;
        const items: VendorReview[] = payload?.items ?? [];
        const total = payload?.totalRecords ?? 0;
        setReviewsTotalRecords(total);
        setReviewsPageNumber(pageNumber);
        setReviews((prev) => (append ? [...prev, ...items] : items));
      } catch {
        if (!append) setReviews([]);
        setReviewsTotalRecords(0);
      } finally {
        setReviewsLoading(false);
      }
    },
    [id, reviewsPageSize]
  );

  // Fetch vendor data
  useEffect(() => {
    if (!id) return;
    setVendorLoading(true);
    setVendorError(null);
    customAxios
      .get(`/VendorManagement/Preview/${id}`)
      .then((res) => {
        setVendorData(res?.data?.data ?? null);
      })
      .catch((err) => {
        setVendorError(err);
        setVendorData(null);
      })
      .finally(() => setVendorLoading(false));
  }, [id]);

  // Fetch review stats
  useEffect(() => {
    if (!id || !vendorData) return;
    fetchReviewStats();
  }, [id, vendorData, fetchReviewStats]);

  // Fetch reviews
  useEffect(() => {
    if (!id || !vendorData) return;
    fetchReviews(1, false);
  }, [id, vendorData, fetchReviews]);

  // Fetch products
  useEffect(() => {
    if (!id || !vendorData) return;
    setProductsLoading(true);
    customAxios
      .post("/ItemAdvancedSearch/search", {
        vendorId: id,
        pageNumber: 1,
        pageSize: 4,
      })
      .then((res) => {
        const data = res?.data?.data;
        setProducts(data?.items ?? []);
        setTotalProducts(data?.totalRecords ?? 0);
      })
      .catch(() => {
        setProducts([]);
        setTotalProducts(0);
      })
      .finally(() => setProductsLoading(false));
  }, [id, vendorData]);

  // Submit review
  const handleSubmitReview = async (payload: VendorReviewSubmitPayload) => {
    setSubmitError(null);
    setSubmitLoading(true);
    try {
      await customAxios.post("/VendorReview/submit", payload);
      await fetchReviewStats();
      await fetchReviews(1, false);
      setReviewModalOpen(false);
      setSubmitError(null);
      toast.success(t("submitReview"));
    } catch (err: any) {
      const message = err?.response?.data?.message || t("error");
      setSubmitError(message);
      toast.error(message);
    } finally {
      setSubmitLoading(false);
    }
  };

  // Update review
  const updateReview = async (payload: VendorReviewUpdatePayload) => {
    try {
      await customAxios.put("/VendorReview/update", payload);
      await fetchReviewStats();
      await fetchReviews(1, false);
      setEditingReview(null);
      setReviewModalOpen(false);
      toast.success(t("updateReview"));
    } catch (err: any) {
      toast.error(err?.response?.data?.message || t("error"));
    }
  };

  // Delete review
  const deleteReview = async (id: string) => {
    try {
      await customAxios.post("/VendorReview/delete", { id });
      await fetchReviewStats();
      await fetchReviews(1, false);
      toast.success(t("deleteReview"));
    } catch (err: any) {
      toast.error(err?.response?.data?.message || t("error"));
    }
  };

  const openReviewModal = () => {
    setSubmitError(null);
    setEditingReview(null);
    setReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    if (!submitLoading) {
      setReviewModalOpen(false);
      setEditingReview(null);
      setSubmitError(null);
    }
  };

  const openEditReviewModal = (review: VendorReview) => {
    setSubmitError(null);
    setEditingReview(review);
    setReviewModalOpen(true);
  };

  // Handle review helpful
  const handleReviewHelpful = useCallback(
    async (reviewId: string) => {
      try {
        await customAxios.post(`/VendorReview/${reviewId}/toggle-helpful`, { reviewId });
        await fetchReviews(1, false);
      } catch (err: any) {
        toast.error(err?.response?.data?.message || t("error"));
      }
    },
    [fetchReviews, t]
  );

  // Handle review report
  const handleReviewReport = useCallback(
    async (reviewId: string, isReportedByUser: boolean) => {
      try {
        await customAxios.post(`/VendorReview/${reviewId}/toggle-report`, { reviewId });
        if (!isReportedByUser) {
          toast.success(t("reportSubmitted"));
        }
        await fetchReviews(1, false);
      } catch (err: any) {
        toast.error(err?.response?.data?.message || t("error"));
      }
    },
    [fetchReviews, t]
  );

  if (vendorLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-gray-400 text-lg font-medium">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (vendorError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{t("error")}</h2>
          <p className="text-slate-600 dark:text-gray-400 mb-4">
            {vendorError?.response?.data?.message || t("errorMessage")}
          </p>
          <button
            onClick={() => router.push(`/products?v=${id}`)}
            className="px-6 py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-colors">
            {t("backToProducts")}
          </button>
        </div>
      </div>
    );
  }

  if (!vendorData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 dark:text-gray-400 text-lg">{t("noData")}</p>
        </div>
      </div>
    );
  }

  // Get display name - prefer storeName, fallback to administrator name, then vendorCode
  const displayName =
    (vendorData.storeName && vendorData.storeName.trim()) ||
    (vendorData.administratorFirstName && vendorData.administratorLastName
      ? `${vendorData.administratorFirstName} ${vendorData.administratorLastName}`
      : vendorData.administratorFirstName || vendorData.administratorLastName) ||
    t("vendorFallback");
  const initials = displayName
    .split(" ")
    .map((word: string) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
        ))}
        {hasHalfStar && (
          <div className="relative w-4 h-4">
            <Star className="w-4 h-4 text-gray-300 dark:text-gray-600 absolute" />
            <div className="absolute overflow-hidden" style={{ width: "50%" }}>
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300 dark:text-gray-600" />
        ))}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-cairo"
      dir={isArabic ? "rtl" : "ltr"}>
      <main
        id="vendor-main"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Vendor Header Section */}
        <div
          id="vendor-header-section"
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 flex-shrink-0 bg-gradient-to-br from-primary to-headerDark rounded-xl flex items-center justify-center">
              <span className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold">
                {initials}
              </span>
            </div>
            <div className="flex-1 w-full text-start">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 text-center sm:text-start">
                {displayName}
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 mb-4">
                <div className="flex items-center">
                  {renderStars(reviewStats?.averageRating ?? vendorData.averageRating ?? 0)}
                  <span className="ms-2 text-gray-900 dark:text-white font-semibold">
                    {reviewStats?.averageRating ?? vendorData.averageRating
                      ? (reviewStats?.averageRating ?? vendorData.averageRating).toFixed(2)
                      : "0.00"}
                  </span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">|</span>
                <span className="text-gray-600 dark:text-gray-300">
                  {reviewStats?.reviewCount ?? 0} {t("reviews")}
                </span>
                {/* <span className="text-gray-500 dark:text-gray-400">|</span> */}
                {/* <span className="text-gray-600 dark:text-gray-300">
                  {totalProducts} {t("productsSold")}
                </span> */}
              </div>

              {/* Vendor Info */}
              <div className="space-y-2 mb-4">
                {(vendorData.address?.trim() || vendorData.postalCode?.trim()) && (
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">{t("address")}</span>{" "}
                    {[vendorData.address?.trim(), vendorData.postalCode?.trim()]
                      .filter(Boolean)
                      .join(", ") || t("nA")}
                  </p>
                )}
                {(vendorData.cityName?.trim() ||
                  vendorData.stateName?.trim() ||
                  vendorData.countryName?.trim()) && (
                  <p className="text-gray-700 dark:text-gray-300 text-center sm:text-start">
                    <span className="font-semibold">{t("location")}</span>{" "}
                    {[
                      vendorData.cityName?.trim(),
                      vendorData.stateName?.trim(),
                      vendorData.countryName?.trim(),
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                )}
                {vendorData.isRealEstateRegistered !== undefined && (
                  <p className="text-gray-700 dark:text-gray-300 text-center sm:text-start">
                    <span className="font-semibold">{t("realEstateRegistered")}</span>{" "}
                    {vendorData.isRealEstateRegistered ? t("yes") : t("no")}
                  </p>
                )}
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {vendorData.notes || t("defaultDescription")}
              </p>
            </div>
          </div>
        </div>

        {/* Products Section */}
        {products.length > 0 && (
          <section
            id="vendor-products-section"
            className="bg-white dark:bg-gray-900 border-gray-200 border dark:border-transparent rounded-xl p-4 sm:p-6 lg:p-8 dark:p-0 mb-6 sm:mb-8">
            <div className="flex flex-row items-center justify-between gap-4 mb-6 sm:mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {tProducts("title")}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {tProducts("description")}
                </p>
              </div>
              <button
                onClick={() => router.push(`/products?v=${id}`)}
                className="bg-primary hover:bg-secondary text-white font-semibold py-3 px-6 text-sm sm:text-base sm:px-8 rounded-xl transition-colors flex items-center gap-2">
                <span>{tProducts("viewAllShort")}</span>
                {isArabic ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.itemCombinationId} variant="minimal" {...product} />
              ))}
            </div>
          </section>
        )}

        {/* Customer Reviews Section */}
        <VendorReviewsSection
          vendorId={id as string}
          reviewStats={reviewStats}
          reviews={reviews}
          reviewsLoading={reviewsLoading}
          reviewsTotalRecords={reviewsTotalRecords}
          locale={locale}
          onWriteReview={() =>
            user ? openReviewModal() : router.push(`/${locale}/login?redirect=/vendor/${id}`)
          }
          onLoadMore={() => fetchReviews(reviewsPageNumber + 1, true)}
          onHelpful={handleReviewHelpful}
          onReport={handleReviewReport}
          onEdit={user ? openEditReviewModal : undefined}
          onDelete={user ? deleteReview : undefined}
        />

        {/* Write Review Modal */}
        <WriteReviewModal
          isOpen={reviewModalOpen}
          onClose={closeReviewModal}
          vendorId={id as string}
          onSubmit={handleSubmitReview}
          isSubmitting={submitLoading}
          submitError={submitError}
          editingReview={
            editingReview
              ? { id: editingReview.id, rating: editingReview.rating, reviewText: editingReview.reviewText ?? "" }
              : null
          }
          onUpdate={updateReview}
        />
      </main>
    </div>
  );
};

export default VendorPage;
