"use client";

import { useEffect, useState } from "react";
import { X, Star, Truck, ShieldCheck, Store, ChevronDown, ChevronUp } from "lucide-react";
import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface VendorOffer {
  offerId: string;
  vendorId: string;
  vendorName: string;
  vendorNameAr: string;
  vendorRating: number;
  reviewCount: number;
  price: number;
  salesPrice: number;
  discountPercentage: number;
  availableQuantity: number;
  stockStatus: number;
  isFreeShipping: boolean;
  estimatedDeliveryDays: number;
  isBuyBoxWinner: boolean;
  minOrderQuantity: number;
  maxOrderQuantity: number;
  warranty?: string;
  warrantyAr?: string;
  returnPolicy?: string;
  returnPolicyAr?: string;
}

interface VendorsResponse {
  data: {
    itemCombinationId: string;
    totalVendors: number;
    offers: VendorOffer[];
  };
}

interface VendorsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  itemCombinationId: string;
  productName: string;
}

const VendorsSidebar = ({ isOpen, onClose, itemCombinationId, productName }: VendorsSidebarProps) => {
  const locale = useLocale();
  const [expandedVendor, setExpandedVendor] = useState<string | null>(null);

  // Fetch vendors from API
  const { data: vendorsData, isLoading, error } = useQuery<VendorsResponse, Error>({
    queryKey: ["vendors", itemCombinationId],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/VendorItem/${itemCombinationId}/vendors-items`
      );
      return response.data;
    },
    enabled: isOpen && !!itemCombinationId,
  });

  const vendors = vendorsData?.data?.offers || [];

  // Close sidebar on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getStockStatusText = (status: number) => {
    switch (status) {
      case 1:
        return locale === "ar" ? "متوفر" : "In Stock";
      case 2:
        return locale === "ar" ? "كمية محدودة" : "Limited Stock";
      case 3:
        return locale === "ar" ? "غير متوفر" : "Out of Stock";
      default:
        return locale === "ar" ? "غير معروف" : "Unknown";
    }
  };

  const getStockStatusColor = (status: number) => {
    switch (status) {
      case 1:
        return "text-green-600 dark:text-green-400";
      case 2:
        return "text-orange-600 dark:text-orange-400";
      case 3:
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 soft"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed ${
          locale === "ar" ? "left-0" : "right-0"
        } top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 z-50 shadow-2xl overflow-y-auto soft`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 z-10">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {locale === "ar" ? "العروض المتاحة" : "Available Offers"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full soft"
            >
              <X size={24} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
            {productName}
          </p>
          {vendorsData?.data?.totalVendors && (
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              {vendorsData.data.totalVendors}{" "}
              {locale === "ar" ? "عروض متاحة" : "offers available"}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 dark:text-gray-400">
                {locale === "ar" ? "جاري التحميل..." : "Loading..."}
              </p>
            </div>
          )}

          {error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
              <p className="text-red-600 dark:text-red-400">
                {locale === "ar"
                  ? "حدث خطأ أثناء تحميل العروض"
                  : "Error loading offers"}
              </p>
              <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                {error.message}
              </p>
            </div>
          ) : null}

          {!isLoading && !error && vendors.length === 0 && (
            <div className="text-center py-12">
              <Store size={48} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600 dark:text-gray-400">
                {locale === "ar" ? "لا توجد عروض متاحة" : "No offers available"}
              </p>
            </div>
          )}

          {/* Vendors List */}
          <div className="space-y-3">
            {vendors.map((vendor, index) => {
              const isExpanded = expandedVendor === vendor.vendorId;
              const vendorName = locale === "ar" ? vendor.vendorNameAr || vendor.vendorName : vendor.vendorName;
              const hasDiscount = vendor.discountPercentage > 0;
              const finalPrice = vendor.salesPrice || vendor.price;

              return (
                <div
                  key={vendor.offerId}
                  className={`border rounded-lg overflow-hidden soft ${
                    vendor.isBuyBoxWinner
                      ? "border-primary dark:border-primary shadow-md"
                      : "border-gray-200 dark:border-gray-800"
                  } ${index === 0 ? "bg-primary/5 dark:bg-primary/10" : ""}`}
                >
                  {/* Buy Box Winner Badge */}
                  {vendor.isBuyBoxWinner && (
                    <div className="bg-primary text-white text-xs font-medium px-3 py-1 text-center">
                      {locale === "ar" ? "⭐ أفضل عرض" : "⭐ Best Offer"}
                    </div>
                  )}

                  <div className="p-4">
                    {/* Vendor Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Store size={16} className="text-gray-600 dark:text-gray-400" />
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                            {vendorName}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star
                              size={14}
                              className="fill-yellow-400 text-yellow-400"
                            />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {vendor.vendorRating.toFixed(1)}
                            </span>
                          </div>
                          {vendor.reviewCount > 0 && (
                            <span className="text-xs text-gray-500 dark:text-gray-500">
                              ({vendor.reviewCount}{" "}
                              {locale === "ar" ? "تقييم" : "reviews"})
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-left">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {finalPrice.toFixed(2)}{" "}
                          {locale === "ar" ? "جنيه" : "EGP"}
                        </div>
                        {hasDiscount && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 dark:text-gray-500 line-through">
                              {vendor.price.toFixed(2)}
                            </span>
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                              -{vendor.discountPercentage}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {/* Stock Status */}
                      <div className="flex items-center gap-2 text-xs">
                        <ShieldCheck size={14} className={getStockStatusColor(vendor.stockStatus)} />
                        <span className={getStockStatusColor(vendor.stockStatus)}>
                          {getStockStatusText(vendor.stockStatus)}
                        </span>
                      </div>

                      {/* Shipping */}
                      <div className="flex items-center gap-2 text-xs">
                        <Truck
                          size={14}
                          className={
                            vendor.isFreeShipping
                              ? "text-green-600 dark:text-green-400"
                              : "text-gray-600 dark:text-gray-400"
                          }
                        />
                        <span
                          className={
                            vendor.isFreeShipping
                              ? "text-green-600 dark:text-green-400"
                              : "text-gray-600 dark:text-gray-400"
                          }
                        >
                          {vendor.isFreeShipping
                            ? locale === "ar"
                              ? "شحن مجاني"
                              : "Free Shipping"
                            : locale === "ar"
                            ? "شحن مدفوع"
                            : "Paid Shipping"}
                        </span>
                      </div>
                    </div>

                    {/* Delivery Time */}
                    {vendor.estimatedDeliveryDays > 0 && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                        {locale === "ar" ? "التوصيل خلال" : "Delivery in"}{" "}
                        {vendor.estimatedDeliveryDays}{" "}
                        {locale === "ar"
                          ? vendor.estimatedDeliveryDays === 1
                            ? "يوم"
                            : "أيام"
                          : vendor.estimatedDeliveryDays === 1
                          ? "day"
                          : "days"}
                      </p>
                    )}

                    {/* Action Button */}
                    <button className="w-full bg-primary hover:bg-secondary text-white text-sm font-medium py-2 px-4 rounded-lg soft">
                      {locale === "ar" ? "إضافة للعربة" : "Add to Cart"}
                    </button>

                    {/* Expandable Details */}
                    {(vendor.warranty || vendor.warrantyAr || vendor.returnPolicy || vendor.returnPolicyAr) && (
                      <button
                        onClick={() =>
                          setExpandedVendor(isExpanded ? null : vendor.vendorId)
                        }
                        className="w-full flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400 mt-3 hover:text-gray-900 dark:hover:text-white soft"
                      >
                        {locale === "ar" ? "التفاصيل" : "Details"}
                        {isExpanded ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        )}
                      </button>
                    )}

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800 space-y-2">
                        {(vendor.warranty || vendor.warrantyAr) && (
                          <div>
                            <h4 className="text-xs font-semibold text-gray-900 dark:text-white mb-1">
                              {locale === "ar" ? "الضمان" : "Warranty"}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {locale === "ar"
                                ? vendor.warrantyAr || vendor.warranty
                                : vendor.warranty || vendor.warrantyAr}
                            </p>
                          </div>
                        )}
                        {(vendor.returnPolicy || vendor.returnPolicyAr) && (
                          <div>
                            <h4 className="text-xs font-semibold text-gray-900 dark:text-white mb-1">
                              {locale === "ar" ? "سياسة الإرجاع" : "Return Policy"}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {locale === "ar"
                                ? vendor.returnPolicyAr || vendor.returnPolicy
                                : vendor.returnPolicy || vendor.returnPolicyAr}
                            </p>
                          </div>
                        )}
                        {vendor.minOrderQuantity > 0 && (
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {locale === "ar" ? "الحد الأدنى للطلب:" : "Min Order:"}{" "}
                            {vendor.minOrderQuantity}
                          </div>
                        )}
                        {vendor.maxOrderQuantity > 0 && (
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {locale === "ar" ? "الحد الأقصى للطلب:" : "Max Order:"}{" "}
                            {vendor.maxOrderQuantity}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorsSidebar;
