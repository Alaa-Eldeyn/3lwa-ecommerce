"use client";

import Image from "next/image";
import { Trash2, ShoppingCart } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

interface WishlistItemProps {
  wishlistItemId: string;
  itemCombinationId: string;
  itemTitleAr: string;
  itemTitleEn: string;
  itemShortDescriptionAr: string;
  itemShortDescriptionEn: string;
  thumbnailImage: string;
  price: number;
  salesPrice: number;
  offerPricingId: string | null;
  onRemove: (itemCombinationId: string) => void;
  onMoveToCart: (itemCombinationId: string) => void;
}

const WishlistItem = ({
  itemCombinationId,
  itemTitleAr,
  itemTitleEn,
  itemShortDescriptionAr,
  itemShortDescriptionEn,
  thumbnailImage,
  price,
  salesPrice,
  offerPricingId,
  onRemove,
  onMoveToCart,
}: WishlistItemProps) => {
  const t = useTranslations("wishlist");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const title = isArabic ? itemTitleAr : itemTitleEn;
  const finalPrice = salesPrice > 0 ? salesPrice : price;
  const hasDiscount = salesPrice > 0 && salesPrice < price;
  const isAvailable = offerPricingId !== null;

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Image */}
      <div className="relative h-64 bg-gray-100 dark:bg-gray-700 overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_DOMAIN}/${thumbnailImage}`}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isAvailable && hasDiscount && (
          <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {Math.round(((price - salesPrice) / price) * 100)}% {t("off")}
          </div>
        )}
        <button
          onClick={() => onRemove(itemCombinationId)}
          className="absolute top-3 right-3 rtl:right-auto rtl:left-3 p-2 bg-white dark:bg-gray-800 text-red-500 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors shadow-md"
          aria-label={t("remove")}>
          <Trash2 size={20} />
        </button>
      </div>

      {/* Details */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2">
          {title}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 line-clamp-1">
          {isArabic ? itemShortDescriptionAr : itemShortDescriptionEn}
        </p>

        {/* Price or Unavailable Status */}
        {isAvailable ? (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-primary">
              {finalPrice.toFixed(2)} {t("currency")}
            </span>
            {hasDiscount && (
              <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                {price.toFixed(2)} {t("currency")}
              </span>
            )}
          </div>
        ) : (
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium">
              {t("unavailable")}
            </span>
          </div>
        )}

        {/* Action Button */}
        {isAvailable && (
          <button
            onClick={() => onMoveToCart(itemCombinationId)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-medium">
            <ShoppingCart size={20} />
            {t("moveToCart")}
          </button>
        )}
      </div>
    </div>
  );
};

export default WishlistItem;
