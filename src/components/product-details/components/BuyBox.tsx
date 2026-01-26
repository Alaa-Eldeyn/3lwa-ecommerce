"use client";

import { useState } from "react";
import {
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  Tags,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useCartStore } from "@/src/store/cartStore";
import { useUserStore } from "@/src/store/userStore";
import { ProductDetails } from "@/src/types/product-details.types";
import toast from "react-hot-toast";
import { Link } from "@/src/i18n/routing";

interface BuyBoxProps {
  product: ProductDetails;
  selectedAttributes: Record<string, { value: string; combinationValueId: string }>;
  onOpenVendorsSidebar: () => void;
}

const BuyBox = ({ product, selectedAttributes, onOpenVendorsSidebar }: BuyBoxProps) => {
  const t = useTranslations("productDetails");
  const tProduct = useTranslations("product");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const { addItem } = useCartStore();
  const { isAuthenticated } = useUserStore();

  // Check if combination exists
  const isCombinationAvailable = !!product.pricing;

  // Extract dynamic data from product
  const title = isArabic ? product.titleAr : product.titleEn;
  const bestOffer = product.pricing?.bestOffer;
  const price = bestOffer?.salesPrice || bestOffer?.price || product.pricing?.minPrice || 0;
  const productImage = product.thumbnailImage || product.generalImages?.[0]?.path || "";
  const vendorCount = product.pricing?.vendorCount || 0;

  // Stock status
  const availableQuantity = bestOffer?.availableQuantity || 0;
  const stockStatus = isCombinationAvailable ? bestOffer?.stockStatus || 0 : 3;

  const [quantity, setQuantity] = useState(bestOffer?.minOrderQuantity || 1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      const selectedAttrsData: Record<string, string> = {};
      Object.entries(selectedAttributes).forEach(([attributeId, attr]) => {
        selectedAttrsData[attributeId] = attr.value;
      });

      await addItem(
        {
          id: product.currentCombination?.combinationId || product.id,
          itemId: product.id,
          name: title,
          price: price,
          image: productImage,
          quantity: quantity,
          offerCombinationPricingId: bestOffer?.offerPricingId,
        },
        isAuthenticated()
      );

      toast.success(t("addedToCart") || "Product added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add product to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Buy Box Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        {/* Vendor Info */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {tProduct("soldBy")}
          </span>
          {isCombinationAvailable ? (
            <Link
              href={`/vendor/${bestOffer?.vendorId}`}
              className="text-sm font-bold text-secondary dark:text-blue-400 hover:underline flex items-center gap-1">
              {bestOffer?.vendorName || "Store"}
              <ExternalLink size={12} />
            </Link>
          ) : (
            <div className="text-sm font-bold text-gray-500 dark:text-gray-400">
              {tProduct("notAvailable")}
            </div>
          )}
        </div>

        {/* Stock Status / Combination Unavailable */}
        <div className="mb-6">
          <div
            className={`flex items-center text-sm font-medium mb-1 ${
              stockStatus === 1
                ? "text-green-600 dark:text-green-400"
                : stockStatus === 2
                ? "text-orange-600 dark:text-orange-400"
                : "text-red-600 dark:text-red-400"
            }`}>
            <CheckCircle2 size={16} className="ltr:mr-2 rtl:ml-2" />
            {stockStatus === 1
              ? t("inStock")
              : stockStatus === 2
              ? t("limitedStock")
              : t("outOfStock")}
          </div>
          {availableQuantity > 0 && availableQuantity <= 100 && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {tProduct("onlyItemsLeft", { count: availableQuantity })}
            </p>
          )}
        </div>

        {/* Quantity & Add to Cart */}
        <div className="space-y-3">
          {/* Quantity Selector */}
          <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 px-3 py-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {tProduct("qty")}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleQuantityChange("decrement")}
                disabled={quantity === bestOffer?.minOrderQuantity || quantity === 1}
                className="w-6 h-6 rounded bg-white dark:bg-gray-600 shadow-sm flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed">
                <Minus size={12} />
              </button>
              <span className="font-bold text-gray-900 dark:text-white w-4 text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange("increment")}
                disabled={
                  quantity === bestOffer?.maxOrderQuantity ||
                  quantity === availableQuantity ||
                  !isCombinationAvailable
                }
                className="w-6 h-6 rounded bg-white dark:bg-gray-600 shadow-sm flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed">
                <Plus size={12} />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart || stockStatus === 3 || !isCombinationAvailable}
            className="w-full bg-primary hover:bg-teal-700 dark:hover:bg-teal-600 text-white font-bold py-3.5 px-4 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-sm disabled:cursor-not-allowed">
            {isAddingToCart ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {t("adding")}
              </>
            ) : (
              <>
                <ShoppingCart size={20} />
                {t("addToCart")}
              </>
            )}
          </button>

          {/* Buy Now Button */}
          <button
            disabled={stockStatus === 3 || !isCombinationAvailable}
            className="w-full bg-secondary hover:bg-[#1e3a5c] dark:hover:bg-[#1e3a5c]/80 text-white font-bold py-3.5 px-4 rounded-lg shadow-sm hover:shadow-md transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed">
            {tProduct("buyNow")}
          </button>
        </div>

        {/* Delivery Info */}
        <div className="mt-6 space-y-3 pt-6 border-t border-gray-100 dark:border-gray-700">
          {/* Free Shipping */}
          {bestOffer?.isFreeShipping && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
                <Truck size={14} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white">
                  {t("freeShipping")}
                </p>
                {bestOffer?.estimatedDeliveryDays && (
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">
                    {tProduct("deliveryBy")}{" "}
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {bestOffer.estimatedDeliveryDays} {tProduct("days")}
                    </span>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Free Returns */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
              <RotateCcw size={14} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 dark:text-white">
                {tProduct("freeReturns")}
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">
                {tProduct("within30Days")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Other Offers Button */}
      {product.isMultiVendor && vendorCount > 1 && (
        <button
          onClick={onOpenVendorsSidebar}
          className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-between group">
          <span className="flex items-center gap-2">
            <Tags size={18} className="text-primary" />
            {vendorCount} {t("otherOffers")} {tProduct("from")}{" "}
            {product.pricing?.minPrice.toFixed(2)}$
          </span>
          <svg
            className="w-3 h-3 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default BuyBox;
