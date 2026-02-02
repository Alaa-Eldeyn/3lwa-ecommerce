"use client";

import React, { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import axios from "axios";
import { Category } from "@/src/types/home-blocks.types";
import ProductCard from "../common/ProductCard";
import Image from "next/image";
import { Link } from "@/src/i18n/routing";
import { Loader2 } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 container mx-auto py-8">
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
              <p className="text-gray-600 dark:text-gray-400 text-lg">No products found</p>
            </div>
          )}
        </div>
      )}

      {/* Categories Collection */}
      {isCategories && (
        <div>
          {categoriesData?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categoriesData.map((category: Category) => (
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
  );
};

export default CollectionPage;

// <!-- Collection Header (The "Richer Header" Request) -->
// <section id="collection-header" class="hero-pattern text-white relative overflow-hidden">
//     <div class="absolute inset-0 bg-gradient-to-r from-brand-900/90 to-brand-800/80"></div>

//     <!-- Decorative Elements -->
//     <div class="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
//         <i class="fa-solid fa-star-and-crescent text-9xl text-white transform rotate-12"></i>
//     </div>
//     <div class="absolute bottom-0 left-10 p-4 opacity-10 pointer-events-none">
//         <i class="fa-solid fa-gift text-8xl text-white transform -rotate-12"></i>
//     </div>

//     <div class="relative max-w-[1440px] mx-auto px-6 py-12 md:py-16">
//         <!-- Breadcrumbs -->
//         <nav class="text-brand-200 text-sm mb-6 flex items-center gap-2">
//             <a href="#" class="hover:text-white transition-colors">Home</a>
//             <i class="fa-solid fa-chevron-right text-[10px]"></i>
//             <a href="#" class="hover:text-white transition-colors">Collections</a>
//             <i class="fa-solid fa-chevron-right text-[10px]"></i>
//             <span class="text-white font-semibold">Happy Eid</span>
//         </nav>

//         <div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
//             <div>
//                 <div class="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/30 text-gold-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
//                     <i class="fa-solid fa-moon"></i> Limited Time Collection
//                 </div>
//                 <h1 class="text-4xl md:text-5xl font-bold mb-4 font-sans tracking-tight">Happy Eid Celebration</h1>
//                 <p class="text-brand-100 text-lg max-w-2xl leading-relaxed">
//                     Discover our curated selection of gifts, fashion, and home essentials to make your Eid celebration truly special. Enjoy up to 70% off on selected items.
//                 </p>
//             </div>

//             <!-- Quick Stats or Promo -->
//             <div class="flex gap-8 border-l border-white/20 pl-8 hidden md:flex">
//                 <div>
//                     <span class="block text-3xl font-bold text-gold-400">400+</span>
//                     <span class="text-sm text-brand-200">New Arrivals</span>
//                 </div>
//                 <div>
//                     <span class="block text-3xl font-bold text-gold-400">24h</span>
//                     <span class="text-sm text-brand-200">Fast Delivery</span>
//                 </div>
//             </div>
//         </div>
//     </div>
// </section>

// <!-- Categories Grid -->
// <section id="categories-grid" class="max-w-[1440px] mx-auto px-6 py-12 -mt-8 relative z-10">
//     <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

//         <!-- Card 1: Headphones -->
//         <a href="#" class="group bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-[420px]">
//             <div class="h-64 overflow-hidden relative bg-gray-50 p-6 flex items-center justify-center">
//                 <div class="absolute top-4 right-4 bg-white rounded-full p-2 shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity">
//                     <i class="fa-regular fa-heart text-gray-400 hover:text-red-500"></i>
//                 </div>
//                 <img class="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/cf25a1b53b-8745cf78a7894fb1832b.png" alt="modern pink cat ear wireless headphones gaming style isolated high quality product shot" />
//             </div>
//             <div class="p-6 flex-1 flex flex-col">
//                 <div class="text-xs font-bold text-brand-600 mb-1 uppercase tracking-wide">Audio & Tech</div>
//                 <h3 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-brand-700 transition-colors">Headphones</h3>
//                 <p class="text-gray-500 text-sm line-clamp-2 mb-4">Immersive sound experience with noise cancellation technology.</p>
//                 <div class="mt-auto flex items-center justify-between">
//                     <span class="text-sm font-medium text-gray-400">120+ Items</span>
//                     <span class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
//                         <i class="fa-solid fa-arrow-right text-sm"></i>
//                     </span>
//                 </div>
//             </div>
//         </a>

//         <!-- Card 2: Home Appliances -->
//         <a href="#" class="group bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-[420px]">
//             <div class="h-64 overflow-hidden relative bg-gray-50 p-6 flex items-center justify-center">
//                 <div class="absolute top-4 right-4 bg-white rounded-full p-2 shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity">
//                     <i class="fa-regular fa-heart text-gray-400 hover:text-red-500"></i>
//                 </div>
//                 <img class="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/47e40aa9c1-b78881769a35230c390c.png" alt="modern home appliances set washing machine refrigerator microwave silver metallic finish studio shot" />
//             </div>
//             <div class="p-6 flex-1 flex flex-col">
//                 <div class="text-xs font-bold text-brand-600 mb-1 uppercase tracking-wide">Home & Living</div>
//                 <h3 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-brand-700 transition-colors">Home Appliances</h3>
//                 <p class="text-gray-500 text-sm line-clamp-2 mb-4">Upgrade your home with the latest smart appliances.</p>
//                 <div class="mt-auto flex items-center justify-between">
//                     <span class="text-sm font-medium text-gray-400">85+ Items</span>
//                     <span class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
//                         <i class="fa-solid fa-arrow-right text-sm"></i>
//                     </span>
//                 </div>
//             </div>
//         </a>

//         <!-- Card 3: Men Clothing -->
//         <a href="#" class="group bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-[420px]">
//             <div class="h-64 overflow-hidden relative bg-gray-50 p-6 flex items-center justify-center">
//                 <div class="absolute top-4 right-4 bg-white rounded-full p-2 shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity">
//                     <i class="fa-regular fa-heart text-gray-400 hover:text-red-500"></i>
//                 </div>
//                 <img class="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/95a44a3b02-b5a0a6aed31d387a7d68.png" alt="stylish mens plaid shirt blue and grey check pattern folded neatly fashion photography" />
//             </div>
//             <div class="p-6 flex-1 flex flex-col">
//                 <div class="text-xs font-bold text-brand-600 mb-1 uppercase tracking-wide">Fashion</div>
//                 <h3 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-brand-700 transition-colors">Men Clothing</h3>
//                 <p class="text-gray-500 text-sm line-clamp-2 mb-4">Classic and contemporary styles for the modern man.</p>
//                 <div class="mt-auto flex items-center justify-between">
//                     <span class="text-sm font-medium text-gray-400">300+ Items</span>
//                     <span class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
//                         <i class="fa-solid fa-arrow-right text-sm"></i>
//                     </span>
//                 </div>
//             </div>
//         </a>

//         <!-- Card 4: Women Clothing -->
//         <a href="#" class="group bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-[420px]">
//             <div class="h-64 overflow-hidden relative bg-gray-50 p-6 flex items-center justify-center">
//                 <div class="absolute top-4 right-4 bg-white rounded-full p-2 shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity">
//                     <i class="fa-regular fa-heart text-gray-400 hover:text-red-500"></i>
//                 </div>
//                 <img class="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/bc4b7f46bc-d3cfed13eab171b18080.png" alt="elegant modest fashion women clothing green dress sitting pose minimalist studio" />
//             </div>
//             <div class="p-6 flex-1 flex flex-col">
//                 <div class="text-xs font-bold text-brand-600 mb-1 uppercase tracking-wide">Fashion</div>
//                 <h3 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-brand-700 transition-colors">Women Clothing</h3>
//                 <p class="text-gray-500 text-sm line-clamp-2 mb-4">Elegant designs and modest wear for every occasion.</p>
//                 <div class="mt-auto flex items-center justify-between">
//                     <span class="text-sm font-medium text-gray-400">450+ Items</span>
//                     <span class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
//                         <i class="fa-solid fa-arrow-right text-sm"></i>
//                     </span>
//                 </div>
//             </div>
//         </a>

//     </div>
// </section>
