"use client";

import { StarIcon } from "lucide-react";
import Image from "next/image";

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
