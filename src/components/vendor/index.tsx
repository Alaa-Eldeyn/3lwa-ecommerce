"use client";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Store, Star, ThumbsUp, ThumbsDown, Flag, ChevronDown } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { customAxios } from "@/src/utils/customAxios";
import { useLocale } from "next-intl";
import ProductCard from "../common/ProductCard";
import { Product } from "@/src/types/types";
import axios from "axios";
import Image from "next/image";

const VendorPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const locale = useLocale();
  const isArabic = locale === "ar";

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["vendor", id],
    queryFn: async () => {
      const { data } = await customAxios.get(`/Vendor/${id}`);
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
          <p className="text-slate-600 text-lg font-medium">
            {isArabic ? "جاري تحميل البيانات..." : "Loading data..."}
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
            {isArabic ? "حدث خطأ" : "Error occurred"}
          </h2>
          <p className="text-slate-600 mb-4">
            {(error as any)?.response?.data?.message ||
              (isArabic ? "فشل تحميل بيانات البائع" : "Failed to load vendor data")}
          </p>
          <button
            onClick={() => router.push(`/products?v=${id}`)}
            className="px-6 py-3 bg-primary hover:bg-headerDark text-white font-semibold rounded-xl transition-colors">
            {isArabic ? "العودة للمنتجات" : "Back to Products"}
          </button>
        </div>
      </div>
    );
  }

  if (!vendorData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 text-lg">
            {isArabic ? "لا توجد بيانات للعرض" : "No data available"}
          </p>
        </div>
      </div>
    );
  }

  // Get display name - prefer companyName, fallback to contactName, then vendorCode
  const displayName =
    vendorData.companyName || vendorData.contactName || vendorData.vendorCode || "Vendor";
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
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
      rating: 5,
      date: "2 days ago",
      text: "Excellent service and product quality! Ordered a laptop and it arrived within 2 days, perfectly packaged. The seller was very responsive to my questions and provided detailed information about the product specifications. Highly recommend this vendor for anyone looking for reliable electronics.",
      helpful: 24,
      unhelpful: 2,
    },
    {
      id: 2,
      name: "Sarah Al-Mansouri",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
      rating: 4,
      date: "5 days ago",
      text: "Good experience overall. The product matches the description and works perfectly. Delivery took a bit longer than expected (4 days instead of 2), but the quality makes up for it. Customer service was helpful when I had questions about warranty coverage. Would buy again.",
      helpful: 18,
      unhelpful: 1,
    },
    {
      id: 3,
      name: "Mohammed Khalid",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
      rating: 5,
      date: "1 week ago",
      text: "Outstanding vendor! This is my third purchase from TechMart and they never disappoint. Products are always authentic, prices are competitive, and shipping is fast. The seller also includes helpful setup guides and responds quickly to any post-purchase questions. Definitely my go-to store for electronics.",
      helpful: 42,
      unhelpful: 0,
    },
    {
      id: 4,
      name: "Fatima Abdullah",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg",
      rating: 4.5,
      date: "2 weeks ago",
      text: "Very satisfied with my purchase. The smartphone I ordered came in original packaging with all accessories included. Price was better than retail stores. Only minor issue was that tracking information wasn't updated regularly, but the package arrived on time. Great vendor overall!",
      helpful: 15,
      unhelpful: 1,
    },
    {
      id: 5,
      name: "Youssef Ibrahim",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
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
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              <div className="w-32 h-32 bg-gradient-to-br from-primary to-headerDark rounded-xl flex items-center justify-center">
                <span className="text-white text-5xl font-bold">{initials}</span>
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-foreground mb-3">{displayName}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {renderStars(vendorData.rating || 4.7)}
                    <span className="ml-2 text-foreground font-semibold">
                      {vendorData.rating ? vendorData.rating.toFixed(1) : "4.7"}
                    </span>
                  </div>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-600">
                    {isArabic ? "2,847 تقييم" : "2,847 Reviews"}
                  </span>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-600">
                    {totalProducts} {isArabic ? "منتج مباع" : "Products Sold"}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed max-w-3xl">
                  {vendorData.notes ||
                    (isArabic
                      ? "مرحباً بك في متجرنا - وجهتك المفضلة للتكنولوجيا والإلكترونيات الحديثة. نتخصص في توفير الهواتف الذكية عالية الجودة وأجهزة الكمبيوتر المحمولة والملحقات وأجهزة المنزل الذكي. مع أكثر من 10 سنوات من الخبرة في الصناعة، نفخر بخدمة العملاء الاستثنائية والأسعار التنافسية والمنتجات الأصيلة. جميع منتجاتنا تأتي مع ضمان الشركة المصنعة وخيارات الشحن السريع."
                      : "Welcome to our store - your premier destination for cutting-edge technology and electronics. We specialize in providing high-quality smartphones, laptops, accessories, and smart home devices. With over 10 years of experience in the industry, we pride ourselves on exceptional customer service, competitive pricing, and genuine products. All our items come with manufacturer warranty and fast shipping options.")}
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push(`/products?v=${id}`)}
              className="bg-primary hover:bg-headerDark text-white px-8 py-3 rounded-lg font-semibold transition flex items-center space-x-2">
              <Store className="w-5 h-5" />
              <span>{isArabic ? "عرض جميع المنتجات" : "View All Products"}</span>
            </button>
          </div>
        </div>

        {/* Vendor Stats Section */}
        <div id="vendor-stats-section" className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-primary text-3xl font-bold mb-2">98.5%</div>
            <div className="text-gray-600">{isArabic ? "تقييم إيجابي" : "Positive Feedback"}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-primary text-3xl font-bold mb-2">24hrs</div>
            <div className="text-gray-600">
              {isArabic ? "متوسط وقت الاستجابة" : "Avg. Response Time"}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-primary text-3xl font-bold mb-2">{totalProducts}</div>
            <div className="text-gray-600">{isArabic ? "المنتجات النشطة" : "Active Products"}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-primary text-3xl font-bold mb-2">2018</div>
            <div className="text-gray-600">{isArabic ? "عضو منذ" : "Member Since"}</div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div id="vendor-reviews-section" className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {isArabic ? "تقييمات العملاء" : "Customer Reviews"}
            </h2>
            <div className="flex items-center space-x-3">
              <span className="text-gray-600">{isArabic ? "ترتيب حسب:" : "Sort by:"}</span>
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                <option>{isArabic ? "الأحدث" : "Most Recent"}</option>
                <option>{isArabic ? "الأعلى تقييماً" : "Highest Rated"}</option>
                <option>{isArabic ? "الأقل تقييماً" : "Lowest Rated"}</option>
                <option>{isArabic ? "الأكثر فائدة" : "Most Helpful"}</option>
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
                    <div className="text-sm text-gray-500">
                      {isArabic ? "شراء موثق" : "Verified Purchase"}
                    </div>
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
                    {isArabic ? "مفيد" : "Helpful"} ({review.helpful})
                  </span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition">
                  <ThumbsDown className="w-4 h-4" />
                  <span>
                    {isArabic ? "غير مفيد" : "Unhelpful"} ({review.unhelpful})
                  </span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition">
                  <Flag className="w-4 h-4" />
                  <span>{isArabic ? "الإبلاغ" : "Report"}</span>
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-8">
            <button className="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-semibold transition">
              {isArabic ? "تحميل المزيد من التقييمات" : "Load More Reviews"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorPage;
