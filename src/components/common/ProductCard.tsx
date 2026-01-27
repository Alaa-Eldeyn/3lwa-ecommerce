"use client";

import { ShoppingCart, Heart, Star, Truck } from "lucide-react";
import Image from "next/image";
import { Link } from "@/src/i18n/routing";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { useCartStore } from "@/src/store/cartStore";
import { useWishlistStore } from "@/src/store/wishlistStore";
import { useUserStore } from "@/src/store/userStore";
import QuantityController from "./QuantityController";
import { Product } from "@/src/types/types";

interface ProductCardProps extends Partial<Product> {
  variant?: "default" | "bordered" | "minimal" | "homz" | "nike" | "clean" | "gradient";
}

const ProductCard = ({
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
  variant = "minimal",
}: ProductCardProps) => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("product");
  const { items, addItem, updateQuantity, removeItem } = useCartStore();
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const { isAuthenticated, user } = useUserStore();
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  const isArabic = locale === "ar";
  
  // التحقق من وجود المنتج في الـ wishlist
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
  
  // TODO: Review
  const currentPrice = salesPrice || price || basePrice || minimumPrice || 0;
  // السعر الأصلي (قبل الخصم)
  const originalPrice = price && salesPrice && price > salesPrice ? price : (maximumPrice && maximumPrice > currentPrice ? maximumPrice : undefined);
  // نسبة الخصم
  const discount = originalPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : undefined;

  // Find if product exists in cart
  const cartItem = useMemo(() => items.find((item) => item.id === itemCombinationId), [items, itemCombinationId]);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!itemId || !itemCombinationId) return;
    if (!offerCombinationPricingId) {
      console.error("offerCombinationPricingId is required");
      return;
    }
    console.log("Adding to cart:", itemCombinationId);
    console.log("Adding to cart:", itemId);
    console.log("Using offerCombinationPricingId:", offerCombinationPricingId);
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
      // يمكن إضافة redirect للـ login page
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

  if (variant === "minimal") {
    return (
      <div className="h-full cursor-pointer group soft rounded-lg overflow-hidden border border-primary/10 bg-white dark:bg-gray-800 hover:-translate-y-1 hover:border-primary/40 flex flex-col">
        {/* IMG */}
        <div
          onClick={() => router.push(`/${locale}/products/product-details/${itemCombinationId}`)}
          className="w-full aspect-[3/2] relative bg-linear-to-br from-accent/30 to-accent/10 dark:from-primary/10 dark:to-primary/5 center overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_DOMAIN}/${image}`}
            alt={displayTitle}
            fill
            className="object-cover scale-110 group-hover:scale-115 soft"
          />

          {/* Discount Badge */}
          {discount && (
            <div dir="rtl" className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-md shadow-md">
              {discount}%-
            </div>
          )}

          {/* Stock Status Badge */}
          {stockStatus === "OutOfStock" && (
            <div className="absolute top-3 left-3 bg-red-400 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md">
              {t("outOfStock")}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 bg-white dark:bg-gray-800 flex flex-col flex-1">
          {/* Category and Brand */}
          <div className="flex items-center justify-between mb-1">
            {displayCategory && (
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {displayCategory}
              </div>
            )}
            {displayBrand && (
              <div className="text-xs text-primary dark:text-primary font-bold">
                {displayBrand}
              </div>
            )}
          </div>

          {/* Title */}
          <Link
            href={`/products/product-details/${itemCombinationId}`}
            className="!block! text-sm md:text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 leading-tight group-hover:text-primary soft">
            {displayTitle}
          </Link>

          {/* Description */}
          {displayDescription && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 line-clamp-1">
              {displayDescription}
            </p>
          )}

          {/* Rating and Free Shipping */}
          <div className="flex items-center gap-2 mb-1">
            {itemRating && (
              <div className="flex items-center gap-1 text-xs text-yellow-500">
                <Star size={14} className="fill-yellow-500" />
                <span className="font-semibold">{itemRating.toFixed(1)}</span>
              </div>
            )}
            {isFreeShipping && (
              <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                <Truck size={14} />
                <span className="font-medium">{t("freeShipping")}</span>
              </div>
            )}
          </div>

          {/* Prices */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base md:text-xl font-bold text-gray-900 dark:text-white">${currentPrice.toFixed(2)}</span>

            {originalPrice && (
              <span className="text-xs md:text-sm line-through text-gray-400 dark:text-gray-500">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Badges */}
          {badges && badges.length > 0 && (
            <div className="flex gap-2 mb-3 flex-wrap flex-1 h-fit">
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className={`text-xs px-2 py-1 rounded-md font-medium h-fit ${
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

          <div className="flex gap-2 mt-auto">
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
                disabled={stockStatus === "OutOfStock"}
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg center soft p-2.5 md:p-3.5 font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                title="Add to cart">
                <span className="lg:mx-2 text-xs md:text-sm">{t("addToCart")}</span>
                <ShoppingCart size={18} className="hidden lg:block" />
              </button>
            )}
            <button
              onClick={toggleWishlist}
              disabled={isWishlistLoading}
              className="w-16 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-500 rounded-lg center group disabled:opacity-50 disabled:cursor-not-allowed"
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
              <Heart
                size={18}
                className={`${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300"
                } soft group-hover:scale-115 active:scale-75`}
              />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "default") {
    return (
      <div className="h-full cursor-pointer group soft rounded-2xl flex flex-col">
        {/* IMG */}
        <div
          onClick={() => router.push(`/products/product-details/${itemCombinationId}`)}
          className="w-full aspect-square relative bg-[#F0EEED] dark:bg-gray-700 center rounded-3xl overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_DOMAIN}/${image}`}
            alt={displayTitle}
            fill
            className="object-fill rounded-2xl overflow-hidden group-hover:scale-105 soft"
          />

          {/* Favorite Button - Top Left */}
          <button
            onClick={toggleWishlist}
            disabled={isWishlistLoading}
            className="absolute top-3 left-3 w-9 h-9 bg-white dark:bg-gray-800 rounded-full center shadow-md hover:scale-110 soft z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
            <Heart
              size={20}
              className={`${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300"
              } soft`}
            />
          </button>

          {/* Add to Cart Button - Bottom Left */}
          {cartItem ? (
            <QuantityController
              quantity={cartItem.quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              variant="compact"
              className="absolute bottom-3 left-3 shadow-lg"
            />
          ) : (
            <button
              onClick={handleAddToCart}
              className="absolute bottom-3 left-3 w-9 h-9 bg-primary dark:bg-white rounded-2xl hover:bg-secondary center shadow-lg hover:scale-110 soft z-10"
              title="Add to cart">
              <ShoppingCart size={18} className="text-white dark:text-primary" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="py-4 flex flex-col flex-1">
          {/* Title */}
          <Link
            href={`/products/product-details/${itemCombinationId}`}
            className="text-lg font-bold text-gray-900 group-hover:text-secondary dark:text-white mb-2 line-clamp-1">
            {displayTitle}
          </Link>

          {/* Description */}
          {displayDescription && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
              {displayDescription}
            </p>
          )}

          {/* Prices */}
          <div className="flex items-center gap-2">
            <span className="text-base md:text-xl font-bold text-gray-900 dark:text-white">${currentPrice.toFixed(2)}</span>

            {originalPrice && (
              <>
                <span className="text-sm md:text-base font-bold line-through text-gray-400 dark:text-gray-500">
                  ${originalPrice.toFixed(2)}
                </span>
              </>
            )}

            {discount && (
              <span className="text-[10px] md:text-xs bg-secondary/20  text-secondary px-2 md:px-3 py-0.5 md:py-1 rounded-full font-medium">
                -{discount}%
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "bordered") {
    return (
      <div className="h-full cursor-pointer group soft rounded-3xl p-4 border border-gray-200 dark:border-gray-700 flex flex-col">
        {/* IMG */}
        <div
          onClick={() => router.push(`/products/product-details/${itemCombinationId}`)}
          className="w-full aspect-square relative bg-[#F0EEED] dark:bg-gray-700 center rounded-2xl overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_DOMAIN}/${image}`}
            alt={displayTitle}
            fill
            className="object-fill rounded-2xl overflow-hidden group-hover:scale-105 soft"
          />

          {/* Favorite Button - Top Left */}
          <button
            onClick={toggleWishlist}
            disabled={isWishlistLoading}
            className="absolute top-3 left-3 size-8 lg:size-10 p-2 bg-white dark:bg-gray-800 rounded-full center shadow-md hover:scale-110 soft z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
            <Heart
              size={20}
              className={`${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300"
              } soft`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="pt-4 flex flex-col flex-1">
          {/* Title */}
          <Link
            href={`/products/product-details/${itemCombinationId}`}
            className="text-lg font-bold text-gray-900 group-hover:text-secondary dark:text-white mb-2 line-clamp-1">
            {displayTitle}
          </Link>

          {/* Description */}
          {displayDescription && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
              {displayDescription}
            </p>
          )}

          {/* Prices */}
          <div className="flex items-center gap-2">
            <span className="text-base lg:text-lg font-bold text-gray-900 dark:text-white">
              ${currentPrice.toFixed(2)}
            </span>

            {originalPrice && (
              <>
                <span className="text-sm font-bold line-through text-gray-400 dark:text-gray-500">
                  ${originalPrice.toFixed(2)}
                </span>
              </>
            )}

            {discount && (
              <span className="text-[10px] md:text-xs bg-secondary/20  text-secondary lg:px-3 px-2 py-0.5 lg:py-1 rounded-full font-medium">
                -{discount}%
              </span>
            )}
          </div>

          {cartItem ? (
            <QuantityController
              quantity={cartItem.quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              variant="default"
              className="w-full mt-4"
            />
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full  bg-secondary text-white rounded-2xl center soft p-2.5 md:p-3 mt-4 hover:bg-primary text-xs md:text-sm lg:text-base"
              title="Add to cart">
              <span className="mx-1 md:mx-2">Add to Cart</span>
              <ShoppingCart size={20} className="text-white dark:text-primary" />
            </button>
          )}
        </div>
      </div>
    );
  }

  if (variant === "homz") {
    return (
      <div className="h-full cursor-pointer group rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col">
        {/* IMG */}
        <div
          onClick={() => router.push(`/products/product-details/${itemCombinationId}`)}
          className="w-full aspect-square relative bg-gray-50 dark:bg-gray-700 overflow-hidden">
          <Image src={`${process.env.NEXT_PUBLIC_DOMAIN}/${image}`} alt={displayTitle} fill className="object-cover group-hover:scale-105 soft" />

          {/* Favorite Button - Top Left */}
          <button
            onClick={toggleWishlist}
            disabled={isWishlistLoading}
            className="absolute top-4 left-4 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full center shadow-md hover:scale-110 soft z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
            <Heart
              size={20}
              className={`${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300"
              } soft`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          {/* Title */}
          <Link
            href={`/products/product-details/${itemCombinationId}`}
            className="block text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-relaxed">
            {displayTitle}
          </Link>

          {/* Prices and Discount */}
          <div className="flex items-center justify-start gap-2 mb-3">
            <span className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
              {currentPrice.toLocaleString()}
              <span className="text-xs md:text-sm font-normal">جنيه</span>
            </span>
            {originalPrice && <span className="line-through text-xs md:text-sm text-gray-400 dark:text-gray-500">${originalPrice.toFixed(2)}</span>}
            {discount && <span className="font-bold text-sm md:text-base text-green-500">{discount}%-</span>}
          </div>

          {cartItem ? (
            <QuantityController
              quantity={cartItem.quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              variant="homz"
              className="w-full mt-4"
            />
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full bg-gray-100 rounded-lg px-3 md:px-4 py-2 md:py-2.5 text-center center soft mt-4 hover:bg-primary hover:text-white text-xs md:text-sm lg:text-base"
              title="Add to cart">
              <span className="mx-1 md:mx-2">Add to Cart</span>
              <ShoppingCart size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }

  if (variant === "nike") {
    return (
      <div className="flex flex-col cursor-pointer group rounded-3xl overflow-hidden bg-white border border-gray-200 dark:border-gray-700 transition-all duration-300">
        {/* Image Section with Gradient Background */}
        <div
          onClick={() => router.push(`/products/product-details/${itemCombinationId}`)}
          className="relative w-full aspect-square flex items-center justify-center overflow-hidden scale-105">
          <Image
            src={`${process.env.NEXT_PUBLIC_DOMAIN}/${image}`}
            alt={displayTitle}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-500"
          />

          {/* Gradient Overlay on Image */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

          {/* Favorite Button - Top Right */}
          <button
            onClick={toggleWishlist}
            disabled={isWishlistLoading}
            className="absolute top-4 right-4 w-12 h-12 bg-primary/50 dark:bg-primary/60 backdrop-blur-sm rounded-full center shadow-md hover:scale-110 soft z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
            <Heart
              size={22}
              className={`${isFavorite ? "fill-white text-white" : "text-white"} soft`}
            />
          </button>
        </div>

        {/* Content Section - White Card */}
        <div className="bg-white dark:bg-gray-800 rounded-t-2xl p-4 -mt-4 relative flex flex-col flex-1">
          {/* Title */}
          <Link
            href={`/products/product-details/${itemCombinationId}`}
            className="block text-sm md:text-base font-bold text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {displayTitle}
          </Link>

          {/* Description */}
          {displayDescription && (
            <p className="flex-1 text-[10px] md:text-xs text-gray-600 dark:text-gray-400 mb-5 line-clamp-2 leading-relaxed">
              {displayDescription}
            </p>
          )}

          {/* Price and Add to Cart Section */}
          <div className="flex items-end justify-between gap-3">
            {/* Price Section - Left */}
            <div className="shrink-0">
              <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-0.5 uppercase tracking-wide">
                Price
              </div>
              {originalPrice && (
                <div className="text-[10px] md:text-xs line-through text-gray-400 dark:text-gray-500 mb-0.5">
                  ${originalPrice.toFixed(2)}
                </div>
              )}
              <div className="text-base md:text-xl font-bold text-gray-900 dark:text-white">
                ${currentPrice.toFixed(2)}
              </div>
            </div>

            {/* Add to Cart Button - Right */}
            {cartItem ? (
              <QuantityController
                quantity={cartItem.quantity}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                variant="nike"
                className="w-fit"
              />
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-fit px-3 md:px-4 bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/80 text-white rounded-2xl center soft py-2 md:py-3 font-semibold text-xs md:text-sm shadow-md hover:shadow-lg"
                title="Add to cart">
                Add to cart
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "clean") {
    return (
      <div className="h-full cursor-pointer group rounded-3xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col">
        {/* Image Section */}
        <div
          onClick={() => router.push(`/products/product-details/${itemCombinationId}`)}
          className="relative w-full aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <Image
            src={`${process.env.NEXT_PUBLIC_DOMAIN}/${image}`}
            alt={displayTitle}
            fill
            className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
          />

          {/* Favorite Button - Top Right */}
          <button
            onClick={toggleWishlist}
            disabled={isWishlistLoading}
            className="absolute top-4 right-4 w-10 h-10 bg-white dark:bg-gray-800 rounded-full center shadow-md hover:scale-110 soft z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
            <Heart
              size={18}
              className={`${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-400 dark:text-gray-500"
              } soft`}
            />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-1">
          {/* Title and Discount */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <Link
              href={`/products/product-details/${itemCombinationId}`}
              className="block text-sm md:text-base font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary transition-colors flex-1">
              {displayTitle}
            </Link>
            {discount && (
              <span className="shrink-0 bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 text-[10px] md:text-xs font-semibold px-1.5 md:px-2 py-0.5 md:py-1 rounded">
                -{discount}%
              </span>
            )}
          </div>

          {/* Prices */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-base md:text-xl font-bold text-gray-900 dark:text-white">
              ${currentPrice.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-xs md:text-sm line-through text-gray-400 dark:text-gray-500">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          {cartItem ? (
            <QuantityController
              quantity={cartItem.quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              variant="clean"
              className="w-full"
            />
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-xl center soft py-2 md:py-3 font-medium text-xs md:text-sm shadow-sm hover:shadow-md transition-all"
              title="Add to cart">
              <ShoppingCart size={14} className="me-1 md:me-2 md:w-4 md:h-4" />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div className="aspect-4/5 cursor-pointer group rounded-3xl overflow-hidden relative h-full shadow-lg hover:shadow-2xl transition-all duration-300">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={`${process.env.NEXT_PUBLIC_DOMAIN}/${image}`}
            alt={displayTitle}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/60" />
        </div>

        {/* Content Overlay */}
        <div className="relative h-full flex flex-col p-6">
          {/* Top Section - Badges */}
          <div className="flex items-start justify-between mb-auto">
            {/* Favorite Button - Top Right */}
            <button
              onClick={toggleWishlist}
              disabled={isWishlistLoading}
              className="w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full center shadow-md hover:scale-110 soft disabled:opacity-50 disabled:cursor-not-allowed"
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
              <Heart
                size={20}
                className={`${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300"
                } soft`}
              />
            </button>

            {/* Discount Badge - Top Left */}
            {discount && (
              <div className="bg-red-500 text-white text-xs md:text-sm font-bold px-2 md:px-3 py-1 md:py-2 rounded-full shadow-lg">
                -{discount}%
              </div>
            )}
          </div>

          {/* Bottom Section - Product Info */}
          <div className="mt-auto">
            {/* Title */}
            <Link
              href={`/products/product-details/${itemCombinationId}`}
              className="block text-sm md:text-lg font-bold text-white line-clamp-2 leading-tight drop-shadow-lg">
              {displayTitle}
            </Link>

            {/* Prices */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base md:text-xl font-bold text-white drop-shadow-lg">${currentPrice.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-xs md:text-sm line-through text-white/70 drop-shadow-lg">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            {cartItem ? (
              <QuantityController
                quantity={cartItem.quantity}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                variant="gradient"
                className="w-full"
              />
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full bg-primary text-white rounded-xl center soft py-2 md:py-3 font-semibold text-xs md:text-sm transition-all"
                title="Add to cart">
                <ShoppingCart size={14} className="mr-1 md:mr-2 md:w-4 md:h-4" />
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default ProductCard;