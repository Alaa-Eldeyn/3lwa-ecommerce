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
    return new Date(dateString).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-slate-600 text-lg font-medium">
            {tBrand("loading")}
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            {tBrand("error")}
          </h2>
          <p className="text-slate-600 mb-4">
            {(error as any)?.response?.data?.message || tBrand("errorMessage")}
          </p>
          <button
            onClick={() => router.push("/brands")}
            className="px-6 py-3 bg-primary hover:bg-headerDark text-white font-semibold rounded-xl transition-colors">
            {tBrand("backToBrands")}
          </button>
        </div>
      </div>
    );
  }

  if (!brandData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 text-lg">
            {tBrand("noData")}
          </p>
        </div>
      </div>
    );
  }

  const displayName = isArabic ? brandData.nameAr : brandData.nameEn;
  const displayTitle = isArabic ? brandData.titleAr : brandData.titleEn;
  const displayDescription = isArabic ? brandData.descriptionAr : brandData.descriptionEn;

  return (
    <div
      className="min-h-screen bg-background text-foreground font-cairo space-y-8 pb-8"
      dir={isArabic ? "rtl" : "ltr"}>
      {/* Brand Hero Section */}
      <section
        id="brand-hero-section"
        className="bg-gradient-to-br from-primary to-headerDark relative overflow-hidden h-[340px]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-[1440px] mx-auto px-8 h-full relative z-10">
          <div className="flex items-center justify-between h-full">
            <div className="flex-1">
              <div className="flex items-center gap-6 mb-6">
                <div className="bg-white rounded-2xl p-6 shadow-2xl">
                  {brandData.logoPath ? (
                    <img
                      className="w-32 h-32 object-contain"
                      src={`${process.env.NEXT_PUBLIC_DOMAIN}${brandData.logoPath}`}
                      alt={displayName}
                    />
                  ) : (
                    <div className="w-32 h-32 flex items-center justify-center text-6xl font-bold text-gray-300">
                      {displayName?.charAt(0) || "B"}
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h1 className="text-4xl font-bold text-white">{displayName}</h1>
                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                      <Heart className={`w-5 h-5 ${brandData.isFavorite ? "fill-white" : ""}`} />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-white/90">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {tBrand("established")}{" "}
                        {formatDate(brandData.createdDateUtc)}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Info Section */}
      <section
        id="brand-info-section"
        className="bg-white max-w-[1440px] mx-auto px-8 grid grid-cols-3 gap-8">
        {/* About & Statistics */}
        <div className="col-span-2">
          <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              {tBrand("about", { brandName: displayName })}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {displayDescription || tBrand("noDescription")}
            </p>
          </div>
        </div>

        {/* Brand Information Sidebar */}
        <div className="col-span-1">
          <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 shadow-sm sticky top-24">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              {tBrand("brandInformation")}
            </h3>

            <div className="space-y-6">
              {brandData.websiteUrl && (
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="text-primary text-xl" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">
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
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="text-primary text-xl" />
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">
                    {tBrand("establishedDate")}
                  </div>
                  <div className="font-semibold text-foreground">
                    {formatDate(brandData.createdDateUtc)}
                  </div>
                </div>
              </div>

              {brandData.isFavorite && (
                <div className="pt-4">
                  <button className="w-full bg-white hover:bg-gray-50 text-foreground font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-3 border-2 border-gray-200">
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
        <section id="products-section" className="bg-white max-w-[1440px] mx-auto px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-3">{t("title")}</h2>
            </div>
            <button
              onClick={() => router.push(`/products?b=${id}`)}
              className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-xl transition-colors flex items-center gap-2">
              <span>{t("viewAll")}</span>
              {isArabic ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6">
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
