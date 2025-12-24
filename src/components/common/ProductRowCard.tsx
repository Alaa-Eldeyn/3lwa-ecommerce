"use client";

import { ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";
import { useState, useMemo } from "react";
import { useCartStore } from "@/src/store/cartStore";
import { useUserStore } from "@/src/store/userStore";
import QuantityController from "./QuantityController";
import { Product } from "@/src/types/types";
import { useLocale } from "next-intl";

const ProductRowCard = ({
    thumbnailImage,
  titleAr,
  titleEn,
  itemId,
  itemCombinationId,
  shortDescriptionEn,
  shortDescriptionAr,
  descriptionEn,
  descriptionAr,
  basePrice,
  minimumPrice,
  maximumPrice,
  categoryTitle,
  brandTitle,
}: Product) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { items, addItem, updateQuantity, removeItem } = useCartStore();
  const { isAuthenticated } = useUserStore();
  const locale = useLocale();
  const isArabic = locale === "ar";
  

  const image = thumbnailImage || "";
  const displayTitle = isArabic ? (titleAr || "") : (titleEn || "");
  const displayDescription = isArabic 
    ? (descriptionAr || "")
    : (descriptionEn || "");
  const displayCategory = isArabic
    ? (categoryTitle || "")
    : (categoryTitle || "");
  
  const price = basePrice || minimumPrice || 0;
  const oldPrice = maximumPrice && maximumPrice > price ? maximumPrice : undefined;
  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : undefined;

  // Use itemCombinationId as the product ID, fallback to itemId or generated ID
  const productId = itemCombinationId || itemId || `${displayTitle}-${price}`.toLowerCase().replace(/\s+/g, '-');
  const productItemId = itemId || productId;

  // Find if product exists in cart
  const cartItem = useMemo(() => 
    items.find((item) => item.id === productId),
    [items, productId]
  );

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!productItemId || !itemCombinationId) return;
    try {
      await addItem({
        id: productId,
        itemId: productItemId,
        name: displayTitle,
        price: price,
        image: image,
        offerCombinationPricingId: itemCombinationId,
      }, isAuthenticated());
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const handleIncrement = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItem) {
      try {
        await updateQuantity(productId, cartItem.quantity + 1, isAuthenticated());
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
          await removeItem(productId, isAuthenticated());
        } else {
          await updateQuantity(productId, cartItem.quantity - 1, isAuthenticated());
        }
      } catch (error) {
        console.error("Failed to update quantity:", error);
      }
    }
  };

  return (
    <div className="cursor-pointer group soft rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg p-4 max-w-68 sm:max-w-none w-full mx-auto">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Image */}
        <div className="w-58 h-58 relative bg-[#F0EEED] dark:bg-gray-700 center rounded-2xl overflow-hidden shrink-0 mx-auto">
          <Image
            src={image}
            alt={displayTitle}
            fill
            className="object-fill rounded-2xl overflow-hidden group-hover:scale-105 soft"
          />
          
          {/* Favorite Button - Top Left */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-2 left-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full center shadow-md hover:scale-110 soft z-10"
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              size={16}
              className={`${
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-600 dark:text-gray-300"
              } soft`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-secondary dark:text-white mb-2 line-clamp-1">
              {displayTitle}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-xl line-clamp-2 lg:line-clamp-3">
            {displayDescription}
            </p>

            {/* Rating */}
            {/* <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  size={14}
                  className={`${
                    i < Math.floor(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : i < rating
                      ? "fill-yellow-400 text-yellow-400 opacity-50"
                      : "fill-gray-300 text-gray-300"
                  }`}
                />
              ))}
              <span className="text-gray-900 dark:text-gray-300 ml-1 text-sm font-normal">
                {rating}/5
              </span>
            </div> */}
          </div>

          {/* Bottom Section */}
          <div className="flex items-center justify-between gap-4">
            {/* Prices */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${price}
              </span>

              {oldPrice && (
                <span className="text-base font-bold line-through text-gray-400 dark:text-gray-500">
                  ${oldPrice}
                </span>
              )}

              {discount && (
                <span className="text-xs bg-secondary/20 text-secondary px-3 py-1 rounded-full font-medium">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
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
                className="px-6 py-2 bg-primary dark:bg-white text-white dark:text-primary rounded-full font-medium hover:bg-secondary dark:hover:bg-gray-200 soft center gap-2 shrink-0"
                title="Add to cart"
              >
                <ShoppingCart size={18} />
                <span className="hidden sm:inline">Add to Cart</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRowCard;