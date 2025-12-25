"use client";

import { StarIcon, ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { useCartStore } from "@/src/store/cartStore";
import QuantityController from "./QuantityController";

interface ProductCardProps {
  image: string;
  title: string;
  rating: number;
  price: number;
  oldPrice?: number;
  discount?: number;
  variant?: "default" | "bordered" | "minimal" | "homz" | "nike" | "clean" | "gradient";
  id?: string; // Optional product ID
  description?: string;
}

const DummyProductCard = ({
  image,
  title,
  rating,
  price,
  oldPrice,
  discount,
  variant = "minimal",
  id,
  description,
}: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  const { items, addItem, updateQuantity, removeItem } = useCartStore();

  // Generate a stable product ID based on title and price
  const productId = id || `${title}-${price}`.toLowerCase().replace(/\s+/g, "-");

  // Find if product exists in cart
  const cartItem = useMemo(() => items.find((item) => item.id === productId), [items, productId]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(productId, cartItem.quantity + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItem) {
      if (cartItem.quantity === 1) {
        removeItem(productId);
      } else {
        updateQuantity(productId, cartItem.quantity - 1);
      }
    }
  };

  if (variant === "minimal") {
    return (
      <div className="cursor-pointer group soft rounded-lg overflow-hidden border border-primary/10 bg-white dark:bg-gray-800 hover:-translate-y-1 hover:border-primary/40">
        {/* IMG */}
        <div
          onClick={() => router.push(`/products/product-details/1`)}
          className="w-full aspect-square relative bg-linear-to-br from-accent/30 to-accent/10 dark:from-primary/10 dark:to-primary/5 center overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain scale-110 group-hover:scale-115 soft"
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
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">موبايلات</div>

          {/* Title */}
          <Link
            href={`/products/product-details/1`}
            className="!block! text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 leading-tight group-hover:text-primary soft">
            {title}
          </Link>

          {/* Description */}
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-1">
            شاشة سوبر ريتنا XDR مقاس 6.1 بوصة
          </p>

          {/* Prices */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl font-bold text-gray-900 dark:text-white">${price}</span>

            {oldPrice && (
              <span className="text-sm line-through text-gray-400 dark:text-gray-500">
                ${oldPrice}
              </span>
            )}
          </div>

          <div className="flex gap-2">
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
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg center soft p-3.5 font-medium shadow-sm hover:shadow-md"
                title="Add to cart">
                <span className="lg:mx-2 text-sm">أضف للسلة</span>
                <ShoppingCart size={18} className="hidden lg:block" />
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFavorite(!isFavorite);
              }}
              className=" w-16 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-500 rounded-lg center group"
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
      <div className="cursor-pointer group soft rounded-2xl">
        {/* IMG */}
        <div
          onClick={() => router.push(`/products/product-details/1`)}
          className="w-full aspect-square relative bg-[#F0EEED] dark:bg-gray-700 center rounded-3xl overflow-hidden">
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
            className="absolute top-3 left-3 w-9 h-9 bg-white dark:bg-gray-800 rounded-full center shadow-md hover:scale-110 soft z-10"
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
        <div className="py-4 ">
          {/* Title */}
          <Link
            href={`/products/product-details/1`}
            className="text-lg font-bold text-gray-900 group-hover:text-secondary dark:text-white mb-2 line-clamp-1">
            {title}
          </Link>

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
            <span className="text-xl font-bold text-gray-900 dark:text-white">${price}</span>

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
        <div
          onClick={() => router.push(`/products/product-details/1`)}
          className="w-full aspect-square relative bg-[#F0EEED] dark:bg-gray-700 center rounded-2xl overflow-hidden">
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
        <div className="pt-4 ">
          {/* Title */}
          <Link
            href={`/products/product-details/1`}
            className="text-lg font-bold text-gray-900 group-hover:text-secondary dark:text-white mb-2 line-clamp-1">
            {title}
          </Link>

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
            <span className="text-base lg:text-lg font-bold text-gray-900 dark:text-white">
              ${price}
            </span>

            {oldPrice && (
              <>
                <span className="text-sm font-bold line-through text-gray-400 dark:text-gray-500">
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
              className="w-full  bg-secondary text-white rounded-2xl center soft p-3 mt-4 hover:bg-primary text-sm lg:text-base"
              title="Add to cart">
              <span className="mx-2">Add to Cart</span>
              <ShoppingCart size={20} className="text-white dark:text-primary" />
            </button>
          )}
        </div>
      </div>
    );
  }

  if (variant === "homz") {
    return (
      <div className="cursor-pointer group rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700">
        {/* IMG */}
        <div
          onClick={() => router.push(`/products/product-details/1`)}
          className="w-full aspect-square relative bg-gray-50 dark:bg-gray-700 overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 soft" />

          {/* Favorite Button - Top Left */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-4 left-4 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full center shadow-md hover:scale-110 soft z-10"
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
        <div className="p-4">
          {/* Title */}
          <Link
            href={`/products/product-details/1`}
            className="block text-base font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-relaxed">
            {title}
          </Link>

          {/* Prices and Discount */}
          <div className="flex items-center justify-start gap-2 mb-3">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {price.toLocaleString()}
              <span className="text-sm font-normal">جنيه</span>
            </span>
            <span className="line-through text-gray-400 dark:text-gray-500">{oldPrice}</span>
            {discount && <span className="font-bold text-green-500">{discount}%-</span>}
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
              className="w-full bg-gray-100 rounded-lg px-4 py-2.5 text-center center soft p-3 mt-4 hover:bg-primary hover:text-white text-sm lg:text-base"
              title="Add to cart">
              <span className="mx-2">Add to Cart</span>
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
          onClick={() => router.push(`/products/product-details/1`)}
          className="relative w-full aspect-square flex items-center justify-center overflow-hidden scale-105">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-500"
          />

          {/* Gradient Overlay on Image */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

          {/* Favorite Button - Top Right */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-4 right-4 w-12 h-12 bg-primary/50 dark:bg-primary/60 backdrop-blur-sm rounded-full center shadow-md hover:scale-110 soft z-10"
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
            href={`/products/product-details/1`}
            className="block text-base font-bold text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </Link>

          {/* Description */}
          {description && (
            <p className="flex-1 text-xs text-gray-600 dark:text-gray-400 mb-5 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}

          {/* Price and Add to Cart Section */}
          <div className="flex items-end justify-between gap-3">
            {/* Price Section - Left */}
            <div className="shrink-0">
              <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-0.5 uppercase tracking-wide">
                Price
              </div>
              {oldPrice && (
                <div className="text-xs line-through text-gray-400 dark:text-gray-500 mb-0.5">
                  ${oldPrice.toFixed(2)}
                </div>
              )}
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                ${price.toFixed(2)}
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
                className="w-fit px-4! bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/80 text-white rounded-2xl center soft py-3 font-semibold text-sm shadow-md hover:shadow-lg"
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
      <div className="cursor-pointer group rounded-3xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
        {/* Image Section */}
        <div
          onClick={() => router.push(`/products/product-details/1`)}
          className="relative w-full aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
          />

          {/* Favorite Button - Top Right */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-4 right-4 w-10 h-10 bg-white dark:bg-gray-800 rounded-full center shadow-md hover:scale-110 soft z-10"
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
        <div className="p-4">
          {/* Title and Discount */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <Link
              href={`/products/product-details/1`}
              className="block text-base font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary transition-colors flex-1">
              {title}
            </Link>
            {discount && (
              <span className="shrink-0 bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 text-xs font-semibold px-2 py-1 rounded">
                -{discount}%
              </span>
            )}
          </div>

          {/* Prices */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ${price.toFixed(2)}
            </span>
            {oldPrice && (
              <span className="text-sm line-through text-gray-400 dark:text-gray-500">
                ${oldPrice.toFixed(2)}
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
              className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-xl center soft py-3 font-medium text-sm shadow-sm hover:shadow-md transition-all"
              title="Add to cart">
              <ShoppingCart size={16} className="me-2" />
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
            src={image}
            alt={title}
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
              onClick={(e) => {
                e.stopPropagation();
                setIsFavorite(!isFavorite);
              }}
              className="w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full center shadow-md hover:scale-110 soft"
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
              <div className="bg-red-500 text-white text-sm font-bold px-3 py-2 rounded-full shadow-lg">
                -{discount}%
              </div>
            )}
          </div>

          {/* Bottom Section - Product Info */}
          <div className="mt-auto">
            {/* Title */}
            <Link
              href={`/products/product-details/1`}
              className="block text-lg font-bold text-white line-clamp-2 leading-tight drop-shadow-lg">
              {title}
            </Link>

            {/* Prices */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-bold text-white drop-shadow-lg">${price}</span>
              {oldPrice && (
                <span className="text-sm line-through text-white/70 drop-shadow-lg">
                  ${oldPrice}
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
                className="w-full bg-primary text-white rounded-xl center soft py-3 font-semibold text-sm transition-all"
                title="Add to cart">
                <ShoppingCart size={16} className="mr-2" />
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default DummyProductCard;