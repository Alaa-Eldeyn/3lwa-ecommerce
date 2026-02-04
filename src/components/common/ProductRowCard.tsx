"use client";

import { ShoppingCart, Heart, Star, Truck } from "lucide-react";
import Image from "next/image";
import { Link } from "@/src/i18n/routing";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { useCartStore } from "@/src/store/cartStore";
import { useWishlistStore } from "@/src/store/wishlistStore";
import { useUserStore } from "@/src/store/userStore";
import QuantityController from "./QuantityController";
import { Product } from "@/src/types/types";

interface ProductRowCardProps extends Partial<Product> {
  variant?: "default" | "bordered";
}

const ProductRowCard = ({
  thumbnailImage,
  titleAr,
  titleEn,
  itemId,
  itemCombinationId,
  offerCombinationPricingId,
  shortDescriptionEn,
  shortDescriptionAr,
  descriptionEn,
  descriptionAr,
  price,
  salesPrice,
  basePrice,
  minimumPrice,
  maximumPrice,
  categoryTitle,
  brandTitle,
  brandNameAr,
  brandNameEn,
  itemRating,
  badges,
  stockStatus,
  availableQuantity,
  isFreeShipping,
  variant = "default",
}: ProductRowCardProps) => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("product");
  const { items, addItem, updateQuantity, removeItem } = useCartStore();
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const { isAuthenticated, user } = useUserStore();
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  const isArabic = locale === "ar";
  
  // Check if product is in wishlist
  const isFavorite = useMemo(() => {
    if (!itemCombinationId) return false;
    return isInWishlist(itemCombinationId);
  }, [wishlistItems, itemCombinationId, isInWishlist]);

  const image = thumbnailImage || "";
  const displayTitle = isArabic ? (titleAr || "") : (titleEn || "");
  const displayDescription = isArabic 
    ? (shortDescriptionAr || descriptionAr || "")
    : (shortDescriptionEn || descriptionEn || "");
  const displayCategory = isArabic
    ? (categoryTitle || "")
    : (categoryTitle || "");
  const displayBrand = isArabic ? (brandNameAr || brandTitle || "") : (brandNameEn || brandTitle || "");
  
  // Price Logic (Copied from ProductCard)
  const currentPrice = salesPrice || price || basePrice || minimumPrice || 0;
  const originalPrice = price && salesPrice && price > salesPrice ? price : (maximumPrice && maximumPrice > currentPrice ? maximumPrice : undefined);
  const discount = originalPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : undefined;

  // Find if product exists in cart
  const cartItem = useMemo(() => items.find((item) => item.id === itemCombinationId), [items, itemCombinationId]);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!itemId || !itemCombinationId) return;
    try {
      await addItem({
        id: itemCombinationId,
        itemId: itemId,
        name: displayTitle,
        price: currentPrice,
        image: image,
        offerCombinationPricingId: offerCombinationPricingId,
      }, isAuthenticated());
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const handleIncrement = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!itemId || !itemCombinationId) return;
    if (cartItem) {
      try {
        await updateQuantity(itemCombinationId, cartItem.quantity + 1, isAuthenticated());
      } catch (error) {
        console.error("Failed to update quantity:", error);
      }
    }
  };

  const handleDecrement = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!itemId || !itemCombinationId) return;
    if (cartItem) {
      try {
        if (cartItem.quantity === 1) {
          await removeItem(itemCombinationId, isAuthenticated());
        } else {
          await updateQuantity(itemCombinationId, cartItem.quantity - 1, isAuthenticated());
        }
      } catch (error) {
        console.error("Failed to update quantity:", error);
      }
    }
  };

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!itemCombinationId) {
      console.error("itemCombinationId is required");
      return;
    }

    if (!user) {
      toast.error(t("pleaseLogin"));
      return;
    }

    setIsWishlistLoading(true);
    try {
      if (isFavorite) {
        await removeFromWishlist(itemCombinationId, true);
      } else {
        await addToWishlist(itemCombinationId, true);
      }
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    } finally {
      setIsWishlistLoading(false);
    }
  }

  // Render Layout
  return (
    <div 
      className={`cursor-pointer group soft rounded-2xl flex flex-col sm:flex-row overflow-hidden transition-all duration-300 ${
        variant === "bordered" 
          ? "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 gap-4" 
          : "bg-white dark:bg-gray-800 shadow-sm hover:shadow-md"
      }`}
    >
      {/* Image Section */}
      <div
        onClick={() => router.push(`/${locale}/products/product-details/${itemCombinationId}`)}
        className="relative w-full sm:w-40 sm:h-40 lg:w-52 lg:h-52 flex-shrink-0 bg-[#F0EEED] dark:bg-gray-700 center overflow-hidden"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_DOMAIN}/${image}`}
          alt={displayTitle}
          fill
          className="object-cover group-hover:scale-105 soft"
        />

        {/* Discount Badge (Absolute on Image) */}
        {discount && (
          <div className="absolute top-2 right-2 bg-primary text-white text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-md shadow-md z-10">
            {discount}%-
          </div>
        )}

        {/* Out of Stock Badge */}
        {stockStatus === "OutOfStock" && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-md shadow-md z-10">
            {t("outOfStock")}
          </div>
        )}

        {/* Wishlist Button - Overlaid on Image */}
        <button
          onClick={toggleWishlist}
          disabled={isWishlistLoading}
          className={`absolute top-2 left-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full center shadow-md hover:scale-110 soft z-10 disabled:opacity-50 disabled:cursor-not-allowed`}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
          <Heart
            size={16}
            className={`${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300"
            } soft`}
          />
        </button>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between p-0 pb-4 pt-4 sm:py-2 sm:px-4 min-w-0">
        
        {/* Top Section: Title, Meta, Description */}
        <div className="min-w-0">
          {/* Category & Brand */}
          <div className="flex items-center gap-2 mb-1">
            {displayCategory && (
              <div className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                {displayCategory}
              </div>
            )}
            {displayBrand && (
              <div className="text-[10px] md:text-xs text-primary dark:text-primary font-bold">
                {displayBrand}
              </div>
            )}
          </div>

          {/* Title */}
          <Link
            href={`/products/product-details/${itemCombinationId}`}
            className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1 leading-tight group-hover:text-primary soft"
          >
            {displayTitle}
          </Link>

          {/* Description */}
          {displayDescription && (
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
              {displayDescription}
            </p>
          )}

          {/* Rating & Shipping */}
          <div className="flex items-center gap-3 mb-2">
            {itemRating && (
              <div className="flex items-center gap-1 text-xs text-yellow-500">
                <Star size={12} className="fill-yellow-500" />
                <span className="font-semibold">{itemRating.toFixed(1)}</span>
              </div>
            )}
            {isFreeShipping && (
              <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                <Truck size={12} />
                <span className="font-medium">{t("freeShip")}</span>
              </div>
            )}
            {badges && badges.length > 0 && (
               <div className="flex gap-1 flex-wrap">
                {badges.slice(0, 2).map((badge, index) => (
                  <span
                    key={index}
                    className={`text-[10px] px-1.5 py-0.5 rounded font-medium h-fit ${
                      badge.variant === "success"
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : badge.variant === "warning"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    }`}>
                    {isArabic ? badge.textAr : badge.textEn}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section: Price & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
              ${currentPrice.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-xs md:text-sm line-through text-gray-400 dark:text-gray-500">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 ms-auto">
            {cartItem ? (
              <QuantityController
                quantity={cartItem.quantity}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                variant="compact"
                className="shrink-0"
              />
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={stockStatus === "OutOfStock"}
                className="bg-primary hover:bg-primary/90 text-white dark:bg-white dark:text-primary dark:hover:bg-gray-200 rounded-full px-4 py-2 center soft font-medium text-xs md:text-sm shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap"
                title="Add to cart">
                <ShoppingCart size={16} className="me-2"/>
                <span>{t("addToCart")}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRowCard;