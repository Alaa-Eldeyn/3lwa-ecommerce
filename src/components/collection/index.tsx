"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import axios from "axios";
import { Category } from "@/src/types/home-blocks.types";
import ProductCard from "../common/ProductCard";
import { Loader2 } from "lucide-react";
import CategoryCard from "./CategoryCard";
import CollectionHeader from "./CollectionHeader";

type BlockItem = {
  itemId: string;
  itemCombinationId: string;
  nameAr: string;
  nameEn: string;
  mainImageUrl: string;
  rating: number | null;
  isAvailable: boolean;
  inStock: boolean;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  offerCombinationPricingId: string | null;
  isDefault: boolean;
  isBuyBoxWinner: boolean;
  campaignBadgeAr: string | null;
  campaignBadgeEn: string | null;
};

type BlockResponse = {
  blockId: string;
  blockTitleAr: string;
  blockTitleEn: string;
  blockType: string;
  items?: BlockItem[];
  categories?: Category[];
};

/** Map block item from API to props expected by ProductCard */
function mapBlockItemToProductCardProps(item: BlockItem) {
  const hasCampaignBadge = item.campaignBadgeAr || item.campaignBadgeEn;
  return {
    itemId: item.itemId,
    itemCombinationId: item.itemCombinationId,
    offerCombinationPricingId: item.offerCombinationPricingId ?? undefined,
    titleAr: item.nameAr,
    titleEn: item.nameEn,
    thumbnailImage: item.mainImageUrl,
    itemRating: item.rating ?? undefined,
    price: item.originalPrice,
    salesPrice: item.price,
    basePrice: item.price,
    maximumPrice: item.originalPrice,
    badges: hasCampaignBadge
      ? [
          {
            textAr: item.campaignBadgeAr ?? "",
            textEn: item.campaignBadgeEn ?? "",
            type: "campaign",
            variant: "default",
          },
        ]
      : undefined,
  };
}

const CollectionPage = () => {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations("collection");
  const isArabic = locale === "ar";

  // Get block ID from query params
  const productBlockId = searchParams.get("p");
  const categoryBlockId = searchParams.get("c");
  const isProducts = !!productBlockId;
  const isCategories = !!categoryBlockId;

  // Fetch Items
  const itemsQuery = useQuery<BlockResponse | null>({
    queryKey: ["collection-items", productBlockId],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/Homepage/blocks/${productBlockId}/items`
      );
      return res.data?.data || res.data;
    },
    enabled: isProducts,
    refetchOnWindowFocus: false,
  });

  // Fetch Categories
  const categoriesQuery = useQuery<BlockResponse | null>({
    queryKey: ["collection-categories", categoryBlockId],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/Homepage/blocks/${categoryBlockId}/categories`
      );
      return res.data?.data || res.data;
    },
    enabled: isCategories,
    refetchOnWindowFocus: false,
  });

  const data = isProducts ? itemsQuery.data : categoriesQuery.data;
  const isLoading = isProducts ? itemsQuery.isLoading : categoriesQuery.isLoading;

  // Extract block metadata from responses
  const blockTitle = isArabic
    ? data?.blockTitleAr || data?.blockTitleEn
    : data?.blockTitleEn || data?.blockTitleAr;

  // Extract products from block items API
  const itemsData: BlockItem[] = useMemo(() => {
    if (!data?.items) return [];
    return data.items;
  }, [data]);

  const categoriesData: Category[] = useMemo(() => {
    return data?.categories || [];
  }, [data]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">{t("loading")}</p>
        </div>
      </div>
    );
  }

  // Check if collection exists
  if (!blockTitle && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t("notFound")}</h2>
          <p className="text-gray-600 dark:text-gray-400">{t("notFoundDescription")}</p>
        </div>
      </div>
    );
  }

  const domain = process.env.NEXT_PUBLIC_DOMAIN ?? "";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      {blockTitle && (
        <CollectionHeader
          title={blockTitle}
          badgeLabel={isCategories ? t("header.badgeLabel") : undefined}
          // description={isCategories ? t("header.description") : undefined}
        />
      )}

      {/* Products Collection */}
      {isProducts && (
        <section className="max-w-[1440px] mx-auto px-6 py-12 -mt-4 relative z-10">
          {itemsData?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {itemsData.map((item) => (
                <ProductCard
                  key={item.itemCombinationId}
                  variant="minimal"
                  {...mapBlockItemToProductCardProps(item)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">{t("noProductsFound")}</p>
            </div>
          )}
        </section>
      )}

      {/* Categories Collection */}
      {isCategories && (
        <section
          id="categories-grid"
          className="max-w-[1440px] mx-auto px-6 py-12 -mt-4 relative z-10">
          {categoriesData?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoriesData.map((category) => (
                <CategoryCard
                  key={category.categoryId}
                  category={category}
                  name={isArabic ? category.nameAr : category.nameEn}
                  imageBaseUrl={domain}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">{t("noCategoriesFound")}</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default CollectionPage;
