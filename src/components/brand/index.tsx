"use client";
import { useQuery } from "@tanstack/react-query";
import { Heart, Globe, Calendar, Loader2, ExternalLink, ArrowLeft, ArrowRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { customAxios } from "@/src/auth/customAxios";
import { useLocale, useTranslations } from "next-intl";
import ProductCard from "../common/ProductCard";
import { Product } from "@/src/types/types";
import axios from "axios";

const BrandPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("brand.products");
  const tBrand = useTranslations("brand");

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["brand", id],
    queryFn: async () => {
      const { data } = await customAxios.get(`/Brand/${id}`);
      return data;
    },
    enabled: !!id,
  });

  const brandData = response?.data;

  // Fetch brand products
  const { data: productsResponse, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["brand-products", id],
    queryFn: async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ItemAdvancedSearch/search`,
        {
          brandId: id,
          pageNumber: 0,
          pageSize: 4, // Show 4 featured products
        }
      );
      return res?.data?.data;
    },
    enabled: !!id && !!brandData,
  });

  const products: Product[] = productsResponse?.items ?? [];
  const totalProducts = productsResponse?.totalRecords ?? 0;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(isArabic ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-gray-400 text-lg font-medium">
            {tBrand("loading")}
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            {tBrand("error")}
          </h2>
          <p className="text-slate-600 dark:text-gray-400 mb-4">
            {(error as any)?.response?.data?.message || tBrand("errorMessage")}
          </p>
          <button
            onClick={() => router.push("/brands")}
            className="px-6 py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-colors">
            {tBrand("backToBrands")}
          </button>
        </div>
      </div>
    );
  }

  if (!brandData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 dark:text-gray-400 text-lg">{tBrand("noData")}</p>
        </div>
      </div>
    );
  }

  const displayName = isArabic ? brandData.nameAr : brandData.nameEn;
  const displayTitle = isArabic ? brandData.titleAr : brandData.titleEn;
  const displayDescription = isArabic ? brandData.descriptionAr : brandData.descriptionEn;

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-cairo space-y-8 pb-8"
      dir={isArabic ? "rtl" : "ltr"}>
      {/* Brand Hero Section */}
      <section
        id="brand-hero-section"
        className="bg-gradient-to-br from-primary to-headerDark relative overflow-hidden min-h-[240px] sm:min-h-[280px] lg:h-[340px] py-6 sm:py-8 mb-6">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-10 flex items-center">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl p-3 sm:p-6 shadow-md flex-shrink-0">
              {brandData.logoPath ? (
                <img
                  className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-contain"
                  src={`${process.env.NEXT_PUBLIC_DOMAIN}${brandData.logoPath}`}
                  alt={displayName}
                />
              ) : (
                <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 flex items-center justify-center text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-300 dark:text-gray-600">
                  {displayName?.charAt(0) || "B"}
                </div>
              )}
            </div>
            <div className="text-start">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">
                {displayName}
              </h1>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-white/90">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>
                  {tBrand("established")} {formatDate(brandData.createdDateUtc)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Info Section */}
      <section
        id="brand-info-section"
        className="bg-gray-50 dark:bg-gray-900 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 mb-6">
        {/* About & Statistics */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              {tBrand("about", { brandName: displayName })}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
              {displayDescription || tBrand("noDescription")}
            </p>
          </div>
        </div>

        {/* Brand Information Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 sm:p-6 lg:p-8 lg:sticky lg:top-24">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              {tBrand("brandInformation")}
            </h3>

            <div className="space-y-6">
              {brandData.websiteUrl && (
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 dark:bg-primary/20 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="text-primary text-xl" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {tBrand("officialWebsite")}
                    </div>
                    <a
                      href={brandData.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-headerDark font-semibold flex items-center gap-2 transition-colors">
                      {brandData.websiteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 dark:bg-primary/20 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="text-primary text-xl" />
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {tBrand("establishedDate")}
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {formatDate(brandData.createdDateUtc)}
                  </div>
                </div>
              </div>

              {brandData.isFavorite && (
                <div className="pt-4">
                  <button className="w-full bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-3 border-2 border-gray-200 dark:border-gray-600">
                    <Heart className="w-4 h-4" />
                    <span>{tBrand("removeFromFavorites")}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      {products.length > 0 && (
        <section
          id="products-section"
          className="bg-gray-50 dark:bg-gray-900 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-8 sm:mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                {t("title")}
              </h2>
            </div>
            <button
              onClick={() => router.push(`/products?b=${id}`)}
              className="w-auto bg-primary hover:bg-secondary text-white font-semibold py-3 px-6 sm:px-8 rounded-xl transition-colors flex items-center justify-center gap-2">
              <span>{t("viewAllShort")}</span>
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
    </div>
  );
};

export default BrandPage;
