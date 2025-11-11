"use client";

import { StarIcon, ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductCardProps {
  image: string;
  title: string;
  rating: number;
  price: number;
  oldPrice?: number;
  discount?: number;
}

const ProductCard = ({
  image,
  title,
  rating,
  price,
  oldPrice,
  discount,
}: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="cursor-pointer group soft rounded-2xl">
      
      {/* IMG */}
      <div className="w-full aspect-square relative bg-[#F0EEED] dark:bg-gray-700 center rounded-3xl overflow-hidden">
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
            className={`${
              isFavorite
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
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-secondary dark:text-white mb-2 line-clamp-1">
          {title}
        </h3>

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
};

export default ProductCard;
