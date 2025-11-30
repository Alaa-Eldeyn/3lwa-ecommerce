"use client";

import { useState } from "react";
import { StarIcon, Heart, ShoppingCart, Minus, Plus, Check } from "lucide-react";
import { useTranslations } from "next-intl";

interface Color {
  id: string;
  name: string;
  hex: string;
}

interface ProductInfoProps {
  title: string;
  rating: number;
  price: number;
  oldPrice?: number;
  discount?: number;
  description: string;
  colors: Color[];
  sizes: string[];
}

const ProductInfo = ({
  title,
  rating,
  price,
  oldPrice,
  discount,
  description,
  colors,
  sizes,
}: ProductInfoProps) => {
  const t = useTranslations("productDetails");
  const [selectedColor, setSelectedColor] = useState(colors[0]?.id || "");
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    console.log({
      title,
      selectedColor,
      selectedSize,
      quantity,
      price: price * quantity,
    });
  };

  return (
    <div>
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        {title}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              size={20}
              className={`${
                i < Math.floor(rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : i < rating
                  ? "fill-yellow-400 text-yellow-400 opacity-50"
                  : "fill-gray-300 text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-gray-900 dark:text-white font-medium">
          {rating}/5
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          ${price}
        </span>
        {oldPrice && (
          <>
            <span className="text-2xl font-bold line-through text-gray-400 dark:text-gray-500">
              ${oldPrice}
            </span>
            {discount && (
              <span className="text-sm bg-secondary/20 text-secondary px-3 py-1 rounded-full font-medium">
                -{discount}%
              </span>
            )}
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
        {description}
      </p>

      <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />

      {/* Color Selection */}
      <div className="mb-6">
        <h3 className="text-gray-900 dark:text-white font-bold mb-3 text-lg">
          {t("selectColor")}
        </h3>
        <div className="flex items-center gap-3">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => setSelectedColor(color.id)}
              className={`w-10 h-10 rounded-full border-2 soft relative ${
                selectedColor === color.id
                  ? "border-primary dark:border-white scale-110"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            >
              {selectedColor === color.id && (
                <Check
                  size={16}
                  className="absolute inset-0 m-auto text-white drop-shadow-lg"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />

      {/* Size Selection */}
      <div className="mb-6">
        <h3 className="text-gray-900 dark:text-white font-bold mb-3 text-lg">
          {t("chooseSize")}
        </h3>
        <div className="flex items-center gap-3 flex-wrap">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-6 py-2 rounded-full font-medium soft ${
                selectedSize === size
                  ? "bg-primary dark:bg-white text-white dark:text-primary"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />

      {/* Quantity and Actions */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Quantity */}
        <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-full">
          <button
            onClick={() => handleQuantityChange("decrement")}
            className="text-gray-900 dark:text-white hover:text-secondary soft bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 p-3 rounded-s-full disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={quantity === 1}
          >
            <Minus size={20} />
          </button>
          <span className="text-gray-900 dark:text-white font-medium w-6 text-center">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange("increment")}
            className="text-gray-900 dark:text-white hover:text-secondary soft bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 p-3 rounded-e-full"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="flex-1 min-w-[200px] px-8 py-3 bg-primary dark:bg-white text-white dark:text-primary rounded-full font-medium hover:bg-secondary dark:hover:bg-gray-200 soft center gap-2"
        >
          <ShoppingCart size={20} />
          {t("addToCart")}
        </button>

        {/* Favorite */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full center hover:bg-gray-200 dark:hover:bg-gray-700 soft"
        >
          <Heart
            size={20}
            className={`${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-gray-900 dark:text-white"
            } soft`}
          />
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
