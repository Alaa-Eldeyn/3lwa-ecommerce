"use client";

import { StarIcon, ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductCardProps {
  image: string;
  title: string;
  rating: number;
  price: number;
  oldPrice?: number;
  discount?: number;
  variant?: "default" | "bordered" | "minimal";
}

const ProductCard = ({
  image,
  title,
  rating,
  price,
  oldPrice,
  discount,
  variant = "minimal",
}: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  // Card variant - similar to the image design
  if (variant === "minimal") {
    return (
      <div className="cursor-pointer group soft rounded-md overflow-hidden border border-primary/20 bg-white dark:bg-gray-800 hover:-translate-y-1 hover:border-primary/40">
        {/* IMG */}
        <div onClick={() => router.push(`/products/product-details/1`)} className="w-full aspect-square relative bg-linear-to-br from-accent/30 to-accent/10 dark:from-primary/10 dark:to-primary/5 center overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain group-hover:scale-110 soft"
          />

          {/* Discount Badge */}
          {discount && (
            <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-md">
              جديد
            </div>
          )}

        </div>

        {/* Content */}
        <div className="p-4 bg-white dark:bg-gray-800">
          {/* Category */}
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">
            موبايلات
          </div>

          {/* Title */}
          <Link href={`/products/product-details/1`} className="block text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight group-hover:text-primary soft">
            {title}
          </Link>

          {/* Description */}
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-1">
            شاشة سوبر ريتنا XDR مقاس 6.1 بوصة
          </p>

          {/* Prices */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {price}.00 ريس
            </span>

            {oldPrice && (
              <span className="text-sm line-through text-gray-400 dark:text-gray-500">
                {oldPrice}.00 ريس
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log("Added to cart:", title);
              }}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-md center soft p-2.5 font-medium shadow-sm hover:shadow-md"
              title="Add to cart"
            >
              <span className="mx-2">أضف للسلة</span>
              <ShoppingCart size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFavorite(!isFavorite);
              }}
              className=" w-16 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-500 rounded-md center group"
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                size={18}
                className={`${isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-600 dark:text-gray-300"
                  } soft group-hover:scale-115 group-active:scale-75`}
              />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "default") {
    return (
      <div className="cursor-pointer group soft rounded-2xl">
        {/* IMG */}
        <div onClick={() => router.push(`/products/product-details/1`)} className="w-full aspect-square relative bg-[#F0EEED] dark:bg-gray-700 center rounded-3xl overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill

            className="object-fill rounded-2xl overflow-hidden group-hover:scale-105 soft"
          />

          {/* Favorite Button - Top Left */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-3 left-3 w-10 h-10 bg-white dark:bg-gray-800 rounded-full center shadow-md hover:scale-110 soft z-10"
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              size={20}
              className={`${isFavorite
                ? "fill-red-500 text-red-500"
                : "text-gray-600 dark:text-gray-300"
                } soft`}
            />
          </button>

          {/* Add to Cart Button - Bottom Left */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Add to cart logic here
              console.log("Added to cart:", title);
            }}
            className="absolute bottom-3 left-3 w-10 h-10 bg-primary dark:bg-white rounded-2xl hover:bg-secondary center shadow-lg hover:scale-110 soft z-10"
            title="Add to cart"
          >
            <ShoppingCart
              size={18}
              className="text-white dark:text-primary"
            />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 ">
          {/* Title */}
          <Link href={`/products/product-details/1`} className="text-lg font-bold text-gray-900 group-hover:text-secondary dark:text-white mb-2 line-clamp-1">
            {title}
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                size={14}
                className={`${i < Math.floor(rating)
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
          </div>

          {/* Prices */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ${price}
            </span>

            {oldPrice && (
              <>
                <span className="text-base font-bold line-through text-gray-400 dark:text-gray-500">
                  ${oldPrice}
                </span>
              </>
            )}

            {discount && (
              <span className="text-xs bg-secondary/20  text-secondary px-3 py-1 rounded-full font-medium">
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
      <div className="cursor-pointer group soft rounded-3xl p-4 border border-gray-200 dark:border-gray-700">
        {/* IMG */}
        <div onClick={() => router.push(`/products/product-details/1`)} className="w-full aspect-square relative bg-[#F0EEED] dark:bg-gray-700 center rounded-2xl overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-fill rounded-2xl overflow-hidden group-hover:scale-105 soft"
          />

          {/* Favorite Button - Top Left */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-3 left-3 size-8 lg:size-10 p-2 bg-white dark:bg-gray-800 rounded-full center shadow-md hover:scale-110 soft z-10"
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              size={20}
              className={`${isFavorite
                ? "fill-red-500 text-red-500"
                : "text-gray-600 dark:text-gray-300"
                } soft`}
            />
          </button>


        </div>

        {/* Content */}
        <div className="pt-4 ">
          {/* Title */}
          <Link href={`/products/product-details/1`} className="text-lg font-bold text-gray-900 group-hover:text-secondary dark:text-white mb-2 line-clamp-1">
            {title}
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                size={14}
                className={`${i < Math.floor(rating)
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
          </div>

          {/* Prices */}
          <div className="flex items-center gap-2">
            <span className="text-base lg:text-xl font-bold text-gray-900 dark:text-white">
              ${price}
            </span>

            {oldPrice && (
              <>
                <span className="text-sm lg:text-base font-bold line-through text-gray-400 dark:text-gray-500">
                  ${oldPrice}
                </span>
              </>
            )}

            {discount && (
              <span className="text-xs bg-secondary/20  text-secondary lg:px-3 px-2 py-0.5 lg:py-1 rounded-full font-medium">
                -{discount}%
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              // Add to cart logic here
              console.log("Added to cart:", title);
            }}
            className="w-full  bg-secondary rounded-2xl center soft p-3 mt-4 hover:bg-primary text-sm lg:text-base"
            title="Add to cart"
          >
            <span className="mx-2">Add to Cart</span>
            <ShoppingCart
              size={20}
              className="text-white dark:text-primary"
            />
          </button>
        </div>
      </div>
    );

  }
};

export default ProductCard;
