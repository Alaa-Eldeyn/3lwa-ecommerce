"use client";
import { useQuery } from "@tanstack/react-query";
import {
  Loader2,
  Store,
  Star,
  ThumbsUp,
  ThumbsDown,
  Flag,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { customAxios } from "@/src/auth/customAxios";
import { useLocale, useTranslations } from "next-intl";
import ProductCard from "../common/ProductCard";
import { Product } from "@/src/types/types";
import axios from "axios";
import Image from "next/image";

const VendorPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("vendor");
  const tProducts = useTranslations("vendor.products");

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["vendor", id],
    queryFn: async () => {
      const { data } = await customAxios.get(`/VendorManagement/Preview/${id}`);
      return data;
    },
    enabled: !!id,
  });

  const vendorData = response?.data;

  // Fetch vendor products
  const { data: productsResponse } = useQuery({
    queryKey: ["vendor-products", id],
    queryFn: async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ItemAdvancedSearch/search`,
        {
          vendorId: id,
          pageNumber: 0,
          pageSize: 4,
        }
      );
      return res?.data?.data;
    },
    enabled: !!id && !!vendorData,
  });

  const products: Product[] = productsResponse?.items ?? [];
  const totalProducts = productsResponse?.totalRecords ?? 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-slate-600 text-lg font-medium">{t("loading")}</p>
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
          <h2 className="text-2xl font-bold text-slate-800 mb-2">{t("error")}</h2>
          <p className="text-slate-600 mb-4">
            {(error as any)?.response?.data?.message || t("errorMessage")}
          </p>
          <button
            onClick={() => router.push(`/products?v=${id}`)}
            className="px-6 py-3 bg-primary hover:bg-headerDark text-white font-semibold rounded-xl transition-colors">
            {t("backToProducts")}
          </button>
        </div>
      </div>
    );
  }

  if (!vendorData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 text-lg">{t("noData")}</p>
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

  // Mock reviews data - in real app, this would come from an API
  const reviews = [
    {
      id: 1,
      name: "Ahmed Hassan",
      avatar: "",
      rating: 5,
      date: "2 days ago",
      text: "Excellent service and product quality! Ordered a laptop and it arrived within 2 days, perfectly packaged. The seller was very responsive to my questions and provided detailed information about the product specifications. Highly recommend this vendor for anyone looking for reliable electronics.",
      helpful: 24,
      unhelpful: 2,
    },
    {
      id: 2,
      name: "Sarah Al-Mansouri",
      avatar: "",
      rating: 4,
      date: "5 days ago",
      text: "Good experience overall. The product matches the description and works perfectly. Delivery took a bit longer than expected (4 days instead of 2), but the quality makes up for it. Customer service was helpful when I had questions about warranty coverage. Would buy again.",
      helpful: 18,
      unhelpful: 1,
    },
    {
      id: 3,
      name: "Mohammed Khalid",
      avatar: "",
      rating: 5,
      date: "1 week ago",
      text: "Outstanding vendor! This is my third purchase from TechMart and they never disappoint. Products are always authentic, prices are competitive, and shipping is fast. The seller also includes helpful setup guides and responds quickly to any post-purchase questions. Definitely my go-to store for electronics.",
      helpful: 42,
      unhelpful: 0,
    },
    {
      id: 4,
      name: "Fatima Abdullah",
      avatar: "",
      rating: 4.5,
      date: "2 weeks ago",
      text: "Very satisfied with my purchase. The smartphone I ordered came in original packaging with all accessories included. Price was better than retail stores. Only minor issue was that tracking information wasn't updated regularly, but the package arrived on time. Great vendor overall!",
      helpful: 15,
      unhelpful: 1,
    },
    {
      id: 5,
      name: "Youssef Ibrahim",
      avatar: "",
      rating: 5,
      date: "3 weeks ago",
      text: "Exceptional service! Bought a gaming laptop and the seller provided detailed specs and answered all my technical questions before purchase. Product arrived well-protected with extra bubble wrap. Even followed up after delivery to ensure everything was working properly. This level of customer care is rare. Highly recommended!",
      helpful: 31,
      unhelpful: 0,
    },
  ];

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
            <Star className="w-4 h-4 text-gray-300 absolute" />
            <div className="absolute overflow-hidden" style={{ width: "50%" }}>
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground font-cairo"
      dir={isArabic ? "rtl" : "ltr"}>
      <main id="vendor-main" className="max-w-7xl mx-auto px-6 py-12">
        {/* Vendor Header Section */}
        <div
          id="vendor-header-section"
          className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-start space-x-6">
            <div className="w-32 h-32 bg-gradient-to-br from-primary to-headerDark rounded-xl flex items-center justify-center">
              <span className="text-white text-5xl font-bold">{initials}</span>
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-foreground mb-3">{displayName}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {renderStars(vendorData.averageRating || 0)}
                  <span className="ml-2 text-foreground font-semibold">
                    {vendorData.averageRating ? vendorData.averageRating.toFixed(2) : "0.00"}
                  </span>
                </div>
                <span className="text-gray-500">|</span>
                <span className="text-gray-600">2,847 {t("reviews")}</span>
                <span className="text-gray-500">|</span>
                <span className="text-gray-600">
                  {totalProducts} {t("productsSold")}
                </span>
              </div>

              {/* Vendor Info */}
              <div className="space-y-2 mb-4">
                {(vendorData.address?.trim() || vendorData.postalCode?.trim()) && (
                  <p className="text-gray-700">
                    <span className="font-semibold">{t("address")}</span>{" "}
                    {[vendorData.address?.trim(), vendorData.postalCode?.trim()]
                      .filter(Boolean)
                      .join(", ") || t("nA")}
                  </p>
                )}
                {(vendorData.cityName?.trim() ||
                  vendorData.stateName?.trim() ||
                  vendorData.countryName?.trim()) && (
                  <p className="text-gray-700">
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
                  <p className="text-gray-700">
                    <span className="font-semibold">{t("realEstateRegistered")}</span>{" "}
                    {vendorData.isRealEstateRegistered ? t("yes") : t("no")}
                  </p>
                )}
              </div>

              <p className="text-gray-700 leading-relaxed">
                {vendorData.notes || t("defaultDescription")}
              </p>
            </div>
          </div>
        </div>

        {/* Products Section */}
        {products.length > 0 && (
          <section
            id="vendor-products-section"
            className="border border-gray-200 rounded-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{tProducts("title")}</h2>
                <p className="text-gray-600">{tProducts("description")}</p>
              </div>
              <button
                onClick={() => router.push(`/products?v=${id}`)}
                className="bg-primary hover:bg-headerDark text-white font-semibold py-3 px-8 rounded-xl transition-colors flex items-center gap-2">
                <span>{tProducts("viewAll")}</span>
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

        {/* // TODO: Customer Reviews Section */}
        {/* <div id="vendor-reviews-section" className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">{t("customerReviews")}</h2>
            <div className="flex items-center space-x-3">
              <span className="text-gray-600">{t("sortBy")}</span>
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                <option>{t("mostRecent")}</option>
                <option>{t("highestRated")}</option>
                <option>{t("lowestRated")}</option>
                <option>{t("mostHelpful")}</option>
              </select>
            </div>
          </div>

          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`${
                index < reviews.length - 1 ? "border-b border-gray-200 pb-6 mb-6" : "pb-6"
              }`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={review.avatar}
                    alt="Reviewer"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{review.name}</div>
                    <div className="text-sm text-gray-500">{t("verifiedPurchase")}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{review.date}</div>
              </div>
              <div className="flex items-center mb-3">{renderStars(review.rating)}</div>
              <p className="text-gray-700 mb-4">{review.text}</p>
              <div className="flex items-center space-x-4 text-sm">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-primary transition">
                  <ThumbsUp className="w-4 h-4" />
                  <span>
                    {t("helpful")} ({review.helpful})
                  </span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition">
                  <ThumbsDown className="w-4 h-4" />
                  <span>
                    {t("unhelpful")} ({review.unhelpful})
                  </span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition">
                  <Flag className="w-4 h-4" />
                  <span>{t("report")}</span>
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-8">
            <button className="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-semibold transition">
              {t("loadMoreReviews")}
            </button>
          </div>
        </div> */}
      </main>
    </div>
  );
};

export default VendorPage;
