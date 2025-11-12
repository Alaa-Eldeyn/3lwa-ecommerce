"use client";

import { StarIcon, ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductRowCardProps {
  image: string;
  title: string;
  rating: number;
  price: number;
  oldPrice?: number;
  discount?: number;
}

const ProductRowCard = ({
  image,
  title,
  rating,
  price,
  oldPrice,
  discount,
}: ProductRowCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="cursor-pointer group soft rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg p-4">
      <div className="flex gap-4">
        {/* Image */}
        <div className="w-58 h-58 relative bg-[#F0EEED] dark:bg-gray-700 center rounded-2xl overflow-hidden shrink-0">
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
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-xl line-clamp-2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam blanditiis eius ipsum aperiam iusto qui deserunt dignissimos a accusantium tenetur repudiandae illum facere, fugit corrupti voluptatum rem nulla quasi obcaecati.
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
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
            </div>
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log("Added to cart:", title);
              }}
              className="px-6 py-2 bg-primary dark:bg-white text-white dark:text-primary rounded-full font-medium hover:bg-secondary dark:hover:bg-gray-200 soft center gap-2 shrink-0"
              title="Add to cart"
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRowCard;