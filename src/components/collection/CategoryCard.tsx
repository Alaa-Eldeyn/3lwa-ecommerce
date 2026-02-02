"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import type { Category } from "@/src/types/home-blocks.types";

export type CategoryCardProps = {
  category: Category;
  name: string;
  tag?: string;
  description?: string;
  itemCountLabel?: string;
  imageBaseUrl?: string;
  isRtl?: boolean;
};

export default function CategoryCard({
  category,
  name,
  tag,
  description,
  itemCountLabel,
  imageBaseUrl = "",
  isRtl = false,
}: CategoryCardProps) {
  const t = useTranslations("collection.categoryCard");
  const imageSrc = category.imageUrl
    ? category.imageUrl.startsWith("http")
      ? category.imageUrl
      : `${imageBaseUrl}/${category.imageUrl}`.replace(/\/+/g, "/")
    : null;

  return (
    <Link
      href={`/products?c=${category.categoryId}`}
      className="h-full cursor-pointer group soft rounded-lg overflow-hidden border border-primary/10 bg-white dark:bg-gray-800 hover:-translate-y-1 hover:border-primary/40 flex flex-col">
      <div className="w-full aspect-3/2 relative bg-linear-to-br from-accent/30 to-accent/10 dark:from-primary/10 dark:to-primary/5 center overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover scale-110 group-hover:scale-115 soft"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div
            className="w-full h-full center text-gray-400 dark:text-gray-500 text-5xl"
            aria-hidden>
            📦
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 bg-white dark:bg-gray-800 flex flex-col flex-1">
        {tag && (
          <div className="text-xs text-primary dark:text-primary font-bold uppercase tracking-wide mb-1">
            {tag}
          </div>
        )}

        <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 leading-tight group-hover:text-primary soft">
          {name}
        </h3>

        {description && (
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
            {description}
          </p>
        )}

        {/* CTA */}
        <div className="flex items-center justify-between gap-2 mt-auto min-h-10">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {itemCountLabel ?? t("browse")}
          </span>
          <span
            className={`w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 center soft group-hover:bg-primary group-hover:scale-105 shrink-0 ${
              isRtl ? "rotate-180" : ""
            }`}
            aria-hidden>
            <ArrowLeft
              size={18}
              className="text-gray-600 dark:text-gray-300 group-hover:text-white soft"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
