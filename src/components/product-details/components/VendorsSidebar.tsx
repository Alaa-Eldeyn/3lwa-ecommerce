"use client";

import { useEffect, useState } from "react";
import {
  X,
  Star,
  Truck,
  ShieldCheck,
  Store,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
} from "lucide-react";
import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCartStore } from "@/src/store/cartStore";
import { useUserStore } from "@/src/store/userStore";
import QuantityController from "@/src/components/common/QuantityController";

// 1. تحديد الـ Interfaces بناءً على الـ API الفعلي
interface VendorItem {
  vendorItemId: string;
  vendorId: string;
  vendorFullName: string;
  price: number;
  salesPrice: number;
  stockStatus: string; // "InStock", "OutOfStock", etc.
  availableQuantity: number;
  handlingTimeInDays: number;
  isBuyBoxWinner: boolean;
  warrantyPolicy: string | null;
  itemCombinationImages?: { path: string }[];
  conbinationAttributes?: {
    attributeNameAr: string;
    attributeNameEn: string;
    valueAr: string;
    valueEn: string;
  }[];
  itemTitleAr: string;
  itemTitleEn: string;
  itemId: string;
  itemCombinationId: string;
}

interface VendorsResponse {
  success: boolean;
  data: VendorItem[];
}

interface VendorsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  itemCombinationId: string;
  productName: string;
}

const VendorsSidebar = ({
  isOpen,
  onClose,
  itemCombinationId,
  productName,
}: VendorsSidebarProps) => {
  const locale = useLocale();
  const [expandedVendor, setExpandedVendor] = useState<string | null>(null);

  // --- Cart & User Logic (مشابه لـ ProductCard) ---
  const { items, addItem, updateQuantity, removeItem } = useCartStore();
  const { isAuthenticated } = useUserStore();
  // -----------------------------------------------

  // Fetch vendors from API
  const {
    data: vendorsData,
    isLoading,
    error,
  } = useQuery<VendorsResponse, Error>({
    queryKey: ["vendors", itemCombinationId],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/VendorItem/${itemCombinationId}/vendors-items`
      );
      return response.data;
    },
    enabled: isOpen && !!itemCombinationId,
  });

  const vendors = vendorsData?.data || [];

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

  // دالة لمعالجة حالة المخزون
  const getStockStatusInfo = (status: string) => {
    const s = status?.toLowerCase() || "";
    if (s === "instock") {
      return {
        text: locale === "ar" ? "متوفر" : "In Stock",
        colorClass: "text-green-600 dark:text-green-400",
        iconColor: "text-green-600 dark:text-green-400",
      };
    } else if (s.includes("limited") || s.includes("low")) {
      return {
        text: locale === "ar" ? "كمية محدودة" : "Limited Stock",
        colorClass: "text-orange-600 dark:text-orange-400",
        iconColor: "text-orange-600 dark:text-orange-400",
      };
    } else {
      return {
        text: locale === "ar" ? "غير متوفر" : "Out of Stock",
        colorClass: "text-red-600 dark:text-red-400",
        iconColor: "text-red-600 dark:text-red-400",
      };
    }
  };

  // دالة لتنظيف مسار الصورة
  const formatImagePath = (path: string | undefined) => {
    if (!path) return "/placeholder.png";
    return path.replace(/\\/g, "/");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed ${
          locale === "ar" ? "left-0" : "right-0"
        } top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 z-50 shadow-2xl overflow-y-auto transition-transform duration-300`}>
        {/* Header */}
        <div className="sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-200 dark:border-gray-800 p-4 z-10">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {locale === "ar" ? "العروض المتاحة" : "Available Offers"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <X size={24} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{productName}</p>
          {vendors.length > 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1 font-medium">
              {vendors.length} {locale === "ar" ? "عرض متاح من البائعين" : "offers available"}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="p-4 pb-20">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 dark:text-gray-400">
                {locale === "ar" ? "جاري تحميل العروض..." : "Loading offers..."}
              </p>
            </div>
          )}

          {error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
              <p className="text-red-600 dark:text-red-400">
                {locale === "ar" ? "حدث خطأ أثناء تحميل العروض" : "Error loading offers"}
              </p>
            </div>
          ) : null}

          {!isLoading && !error && vendors.length === 0 && (
            <div className="text-center py-12">
              <Store size={48} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600 dark:text-gray-400">
                {locale === "ar" ? "لا توجد عروض متاحة حالياً" : "No offers available"}
              </p>
            </div>
          )}

          {/* Vendors List */}
          <div className="space-y-4">
            {vendors.map((vendor) => {
              const isExpanded = expandedVendor === vendor.vendorItemId;
              const statusInfo = getStockStatusInfo(vendor.stockStatus);

              // حساب نسبة الخصم
              const discountPercentage =
                vendor.price > vendor.salesPrice
                  ? Math.round(((vendor.price - vendor.salesPrice) / vendor.price) * 100)
                  : 0;

              // تجهيز الصورة (مع إضافة الدومين)
              const imagePath =
                vendor.itemCombinationImages && vendor.itemCombinationImages.length > 0
                  ? formatImagePath(vendor.itemCombinationImages[0].path)
                  : null;
              const fullImageUrl = imagePath
                ? `${process.env.NEXT_PUBLIC_DOMAIN}/${imagePath}`
                : "/placeholder.png";

              // --- Cart Logic: هل المنتج موجود بالفعل في السلة؟ ---
              // نستخدم itemCombinationId لمعرفة العرض المحدد
              const cartItem = items.find((item) => item.id === vendor.itemCombinationId);
              const isInStock = vendor.stockStatus === "InStock";
              // ---------------------------------------------------

              // Handlers مخصصة لهذا البائع
              const handleAddToCart = async (e: React.MouseEvent) => {
                e.stopPropagation();
                try {
                  await addItem(
                    {
                      id: vendor.itemCombinationId,
                      itemId: vendor.itemId,
                      name: locale === "ar" ? vendor.itemTitleAr : vendor.itemTitleEn,
                      price: vendor.salesPrice,
                      image: fullImageUrl,
                      offerCombinationPricingId: vendor.itemCombinationId,
                    },
                    isAuthenticated()
                  );
                } catch (error) {
                  console.error("Failed to add item:", error);
                }
              };

              const handleIncrement = async (e: React.MouseEvent) => {
                e.stopPropagation();
                if (cartItem) {
                  try {
                    await updateQuantity(
                      vendor.itemCombinationId,
                      cartItem.quantity + 1,
                      isAuthenticated()
                    );
                  } catch (error) {
                    console.error("Failed to update quantity:", error);
                  }
                }
              };

              const handleDecrement = async (e: React.MouseEvent) => {
                e.stopPropagation();
                if (cartItem) {
                  try {
                    if (cartItem.quantity === 1) {
                      await removeItem(vendor.itemCombinationId, isAuthenticated());
                    } else {
                      await updateQuantity(
                        vendor.itemCombinationId,
                        cartItem.quantity - 1,
                        isAuthenticated()
                      );
                    }
                  } catch (error) {
                    console.error("Failed to update quantity:", error);
                  }
                }
              };

              return (
                <div
                  key={vendor.vendorItemId}
                  className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                    vendor.isBuyBoxWinner
                      ? "border-primary dark:border-primary ring-1 ring-primary shadow-md"
                      : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                  } bg-white dark:bg-gray-900`}>
                  {/* Buy Box Winner Badge */}
                  {vendor.isBuyBoxWinner && (
                    <div className="bg-primary text-white text-xs font-bold px-3 py-1.5 flex items-center justify-center gap-1">
                      <Star size={12} fill="currentColor" />
                      {locale === "ar" ? "أفضل عرض" : "Best Offer"}
                    </div>
                  )}

                  <div className="p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 flex-shrink-0 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden border border-gray-200 dark:border-gray-700">
                        <img
                          src={fullImageUrl}
                          alt="Product"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.png";
                          }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Vendor Header */}
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-1">
                              <Store size={16} className="text-gray-500 dark:text-gray-400" />
                              <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                                {vendor.vendorFullName}
                              </h3>
                            </div>

                            {/* Attributes */}
                            {vendor.conbinationAttributes &&
                              vendor.conbinationAttributes.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-2">
                                  {vendor.conbinationAttributes.map((attr, idx) => (
                                    <span
                                      key={idx}
                                      className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded">
                                      {locale === "ar" ? attr.valueAr : attr.valueEn}
                                    </span>
                                  ))}
                                </div>
                              )}
                          </div>

                          {/* Price Section */}
                          <div className="text-right">
                            {discountPercentage > 0 && (
                              <span className="block text-xs text-green-600 dark:text-green-400 font-medium mb-0.5">
                                -{discountPercentage}%
                              </span>
                            )}
                            <div className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                              {vendor.salesPrice.toLocaleString()}
                            </div>
                            {discountPercentage > 0 && (
                              <span className="text-xs text-gray-400 line-through block">
                                {vendor.price.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quick Info Grid */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3 text-xs">
                          {/* Stock Status */}
                          <div className="flex items-center gap-1.5">
                            <ShieldCheck size={14} className={statusInfo.iconColor} />
                            <span className={statusInfo.colorClass + " font-medium"}>
                              {statusInfo.text}
                            </span>
                            {vendor.availableQuantity > 0 && vendor.availableQuantity <= 5 && (
                              <span className="text-gray-400">({vendor.availableQuantity})</span>
                            )}
                          </div>

                          {/* Delivery Time */}
                          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                            <Truck size={14} />
                            <span>
                              {locale === "ar" ? "توصيل خلال" : "Delivery"}{" "}
                              {vendor.handlingTimeInDays} {locale === "ar" ? "أيام" : "days"}
                            </span>
                          </div>
                        </div>

                        {/* Cart Actions (محاكاة سلوك ProductCard) */}
                        <div className="mt-auto">
                          {cartItem ? (
                            <QuantityController
                              quantity={cartItem.quantity}
                              onIncrement={handleIncrement}
                              onDecrement={handleDecrement}
                              variant="default"
                              className="w-full"
                            />
                          ) : (
                            <button
                              onClick={handleAddToCart}
                              disabled={!isInStock}
                              className={`w-full flex items-center justify-center gap-2 text-sm font-medium rounded-lg transition-colors py-2.5 px-4 ${
                                isInStock
                                  ? "bg-primary hover:bg-primary/90 text-white shadow-sm hover:shadow-md"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                              }`}
                              title="Add to cart">
                              <ShoppingCart size={16} />
                              {isInStock
                                ? locale === "ar"
                                  ? "إضافة للعربة"
                                  : "Add to Cart"
                                : locale === "ar"
                                ? "غير متوفر"
                                : "Out of Stock"}
                            </button>
                          )}
                        </div>

                        {/* Expandable Details Toggle */}
                        {vendor.warrantyPolicy && (
                          <button
                            onClick={() =>
                              setExpandedVendor(isExpanded ? null : vendor.vendorItemId)
                            }
                            className="w-full flex items-center justify-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-3 hover:text-primary transition-colors py-1">
                            {locale === "ar"
                              ? "تفاصيل الضمان والسياسة"
                              : "Warranty & Policy Details"}
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                        )}

                        {/* Expanded Content */}
                        {isExpanded && (
                          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-top-2 duration-200">
                            {vendor.warrantyPolicy && (
                              <div className="mb-2">
                                <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                  {locale === "ar" ? "الضمان" : "Warranty"}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                                  {vendor.warrantyPolicy}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
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
