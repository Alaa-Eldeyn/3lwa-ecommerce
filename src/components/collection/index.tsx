"use client";

import React, { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import axios from "axios";
import { Category } from "@/src/types/home-blocks.types";
import { Product } from "@/src/types/types";
import ProductCard from "../common/ProductCard";
import Breadcrumb from "../common/Breadcrumb";
import Image from "next/image";
import { Link } from "@/src/i18n/routing";
import { Loader2 } from "lucide-react";

type BlockResponse = {
  blockId: string;
  blockTitleAr: string;
  blockTitleEn: string;
  blockType: string;
  items?: Product[];
  categories?: Category[];
};

const CollectionPage = () => {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const isArabic = locale === "ar";

  // Get block ID from query params
  const productBlockId = searchParams.get("p");
  const categoryBlockId = searchParams.get("c");

  // Fetch Items
  const { data: itemsData, isLoading: isLoadingItems } = useQuery<BlockResponse | null>({
    queryKey: ["collection-items", productBlockId],
    queryFn: async (): Promise<BlockResponse | null> => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/Homepage/blocks/${productBlockId}/items`
      );
      const data = response.data?.data || response.data;
      return data as BlockResponse;
    },
    enabled: !!productBlockId && !categoryBlockId,
    refetchOnWindowFocus: false,
  });

  // Fetch Categories
  const { data: categoriesResponseData, isLoading: isLoadingCategories } =
    useQuery<BlockResponse | null>({
      queryKey: ["collection-categories", categoryBlockId],
      queryFn: async (): Promise<BlockResponse | null> => {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/Homepage/blocks/${categoryBlockId}/categories`
        );
        const data = response.data?.data || response.data;
        return data as BlockResponse;
      },
      enabled: !!categoryBlockId,
      refetchOnWindowFocus: false,
    });

  const itemsResponse = itemsData;
  const categoriesResponse = categoriesResponseData;

  //
  const isProducts = !!productBlockId;
  const isCategories = !!categoryBlockId;

  // Extract block metadata from responses
  const blockTitle = isArabic
    ? itemsResponse?.blockTitleAr || categoriesResponse?.blockTitleAr
    : itemsResponse?.blockTitleEn || categoriesResponse?.blockTitleEn;

  // Extract products and categories from responses
  const productsData = useMemo(() => {
    if (!itemsResponse?.items) return [];
    return itemsResponse.items.map((item: any) => ({
      itemId: item.itemId,
      itemCombinationId: item.itemCombinationId,
      titleAr: item.nameAr,
      titleEn: item.nameEn,
      thumbnailImage: item.mainImageUrl,
      itemRating: item.rating,
      price: item.price,
      salesPrice: item.price,
      basePrice: item.originalPrice,
      minimumPrice: item.price,
      maximumPrice: item.originalPrice,
    }));
  }, [itemsResponse]);

  const categoriesData: Category[] = useMemo(() => {
    return categoriesResponse?.categories || [];
  }, [categoriesResponse]);

  // Simple loading state - only show loading if we're actively fetching
  const isLoading = (isProducts && isLoadingItems) || (isCategories && isLoadingCategories);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading collection...</p>
        </div>
      </div>
    );
  }

  // Check if collection exists
  if (!blockTitle && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Collection not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The collection you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Breadcrumb />

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        {blockTitle && (
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {blockTitle}
            </h1>
          </div>
        )}

        {/* Products Collection */}
        {isProducts && (
          <div>
            {isLoadingItems ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-primary animate-spin mr-3" />
                <p className="text-gray-600 dark:text-gray-400">Loading products...</p>
              </div>
            ) : productsData && productsData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {productsData.map((product: Partial<Product>) => (
                  <ProductCard key={product.itemCombinationId} variant="minimal" {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">No products found</p>
              </div>
            )}
          </div>
        )}

        {/* Categories Collection */}
        {isCategories && (
          <div>
            {isLoadingCategories ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-primary animate-spin mr-3" />
                <p className="text-gray-600 dark:text-gray-400">Loading categories...</p>
              </div>
            ) : categoriesData && categoriesData.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categoriesData.map((category: any) => (
                  <Link
                    key={category.categoryId}
                    href={`/products?c=${category.categoryId}`}
                    className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden">
                      {category.imageUrl ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_DOMAIN}/${category.imageUrl}`}
                          alt={isArabic ? category.nameAr : category.nameEn}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-400 dark:text-gray-500 text-4xl">📦</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors line-clamp-2">
                        {isArabic ? category.nameAr : category.nameEn}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">No categories found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
