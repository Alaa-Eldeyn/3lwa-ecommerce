"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Block } from "@/src/types/home-blocks.types";

type BlockItemUI = {
  id: string;
  nameAr: string;
  nameEn: string;
  image: string;
  campaignBadgeAr?: string;
  campaignBadgeEn?: string;
};
const SingleBlock = ({ block, locale }: { block: Block; locale: string }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  // Check if content overflows the container
  useEffect(() => {
    const checkOverflow = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        setHasOverflow(scrollWidth > clientWidth);
      }
    };

    checkOverflow();

    // Re-check on window resize
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [block.products, block.categories]);
  // Normalize items to have the same structure
  const items: BlockItemUI[] =
    block.products.length > 0
      ? block.products.map((p) => ({
          id: p.itemId,
          nameAr: p.nameAr,
          nameEn: p.nameEn,
          image: p.mainImageUrl,
          campaignBadgeAr: p.campaignBadgeAr,
          campaignBadgeEn: p.campaignBadgeEn,
        }))
      : block.categories.map((c) => ({
          id: c.categoryId,
          nameAr: c.nameAr,
          nameEn: c.nameEn,
          image: c.imageUrl,
        }));

  // Scroll left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  // Scroll right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Render stars for product rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5 text-yellow-500">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={i} className="w-3 h-3 fill-current" />
        ))}
        {hasHalfStar && <Star className="w-3 h-3 fill-current opacity-50" />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className="w-3 h-3 fill-none stroke-current" />
        ))}
      </div>
    );
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 p-5 flex flex-col shadow-sm relative group ${
        block.layout === "Carousel" || block.layout === "FullWidth" ? "h-auto" : "h-[420px]"
      }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          {/* Title */}
          <h2 className="text-xl font-bold text-secondary dark:text-gray-200">
            {locale === "ar" ? block.titleAr : block.titleEn}
          </h2>

          {/* Subtitle */}
          {block.subtitleAr && block.subtitleEn && (
            <h3 className="text-sm text-gray-700 dark:text-gray-300">
              {locale === "ar" ? block.subtitleAr : block.subtitleEn}
            </h3>
          )}
        </div>

        {/* View all link */}
        {block.layout === "Carousel" && block.showViewAllLink && (
          <Link
            href={locale === "ar" ? block.viewAllLinkTitleAr : block.viewAllLinkTitleEn}
            className="text-primary dark:text-primary text-sm hover:underline hover:text-red-700 dark:hover:text-red-400 font-medium">
            {locale === "ar" ? block.viewAllLinkTitleAr : block.viewAllLinkTitleEn}
          </Link>
        )}
      </div>

      {/* Featured layout */}
      {block.layout === "Featured" &&
        items.slice(0, 1).map((item) => (
          <div key={item.id} className="flex-1 overflow-hidden relative mb-3 cursor-pointer">
            <Image
              src={`${process.env.NEXT_PUBLIC_DOMAIN}/${item.image}`}
              alt={locale === "ar" ? item.nameAr : item.nameEn}
              fill
              className="object-cover hover:scale-105 transition-transform"
            />
            {item.campaignBadgeAr && (
              <div
                className={`absolute top-3 left-3 ${block.campaign?.BadgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                {locale === "ar" ? item.campaignBadgeAr : item.campaignBadgeEn}
              </div>
            )}
          </div>
        ))}

      {/* Compact layout */}
      {block.layout === "Compact" && (
        <div className="flex-1 grid grid-cols-2 gap-4 mb-3">
          {items.slice(0, 4).map((item, index) => (
            <div key={item.id || index} className="flex flex-col gap-1 cursor-pointer">
              <div className="flex-1 overflow-hidden bg-gray-50 dark:bg-gray-700 relative">
                <Image
                  src={`${process.env.NEXT_PUBLIC_DOMAIN}/${item.image}`}
                  alt={locale === "ar" ? item.nameAr : item.nameEn}
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
                {item.campaignBadgeAr && (
                  <div
                    className={`absolute top-2 right-2 ${block.campaign?.BadgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded`}>
                    {locale === "ar" ? item.campaignBadgeAr : item.campaignBadgeEn}
                  </div>
                )}
              </div>
              {/* <span className="text-xs text-gray-700 dark:text-gray-300">
                {locale === "ar" ? item.nameAr : item.nameEn}
              </span> */}
            </div>
          ))}
        </div>
      )}

      {/* TwoColumn layout */}
      {block.layout === "TwoColumn" && (
        <div className="flex-1 flex flex-col gap-4 mb-3">
          {items.slice(0, 2).map((item, index) => (
            <div
              key={item.id || index}
              className="flex-1 relative overflow-hidden bg-gray-50 dark:bg-gray-700 flex items-center justify-center cursor-pointer">
              <Image
                src={`${process.env.NEXT_PUBLIC_DOMAIN}/${item.image}`}
                alt={locale === "ar" ? item.nameAr : item.nameEn}
                fill
                className="object-cover hover:scale-105 transition-transform"
              />
              {item.campaignBadgeAr && (
                <span className="absolute bottom-2 left-2 text-xs font-semibold bg-white/80 dark:bg-gray-800/80 dark:text-gray-200 px-2 py-1 rounded">
                  {locale === "ar" ? item.campaignBadgeAr : item.campaignBadgeEn}
                </span>
              )}
              {item.campaignBadgeAr && (
                <div
                  className={`absolute top-2 right-2 ${block.campaign?.BadgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded`}>
                  {locale === "ar" ? item.campaignBadgeAr : item.campaignBadgeEn}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Carousel layout */}
      {block.layout === "Carousel" && items.length > 0 && (
        <>
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {items.map((item, index) => (
              <div key={item.id || index} className="flex-none w-[180px] snap-start cursor-pointer">
                <div className="bg-gray-50 dark:bg-gray-700 h-[220px] mb-2 flex items-center justify-center p-4 relative">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DOMAIN}/${item.image}`}
                    alt={locale === "ar" ? item.nameAr : item.nameEn}
                    fill
                    className="object-cover shadow-md hover:scale-105 transition-transform"
                  />
                  {item.campaignBadgeAr && (
                    <div
                      className={`absolute top-2 right-2 ${block.campaign?.BadgeColor} text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md`}>
                      {locale === "ar" ? item.campaignBadgeAr : item.campaignBadgeEn}
                    </div>
                  )}
                </div>
                {item.nameAr && (
                  <div className="text-sm line-clamp-2 hover:text-primary dark:hover:text-primary hover:underline mb-1 text-gray-900 dark:text-gray-200">
                    {locale === "ar" ? item.nameAr : item.nameEn}
                  </div>
                )}
              </div>
            ))}
          </div>

          {hasOverflow && (
            <>
              <button
                onClick={scrollLeft}
                className="absolute top-1/2 left-0 -translate-y-1/2 h-24 w-12 bg-white/70 dark:bg-gray-800/90 shadow-md border-y border-r border-gray-200 dark:border-gray-700 flex items-center justify-center rounded-r hover:bg-white dark:hover:bg-gray-800 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <ChevronLeft className="w-8 h-8 text-gray-700 dark:text-gray-300" />
              </button>
              <button
                onClick={scrollRight}
                className="absolute top-1/2 right-0 -translate-y-1/2 h-24 w-12 bg-white/70 dark:bg-gray-800/90 shadow-md border-y border-l border-gray-200 dark:border-gray-700 flex items-center justify-center rounded-l hover:bg-white dark:hover:bg-gray-800 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <ChevronRight className="w-8 h-8 text-gray-700 dark:text-gray-300" />
              </button>
            </>
          )}
        </>
      )}

      {/* FullWidth layout */}
      {block.layout === "FullWidth" &&
        items.slice(0, 1).map((item) => (
          <div className="py-10 bg-white dark:bg-gray-800 max-h-96 aspect-9/2 w-full center relative overflow-hidden mb-6">
            <Image
              fill
              src={`${process.env.NEXT_PUBLIC_DOMAIN}/${item.image}`}
              alt={locale === "ar" ? item.nameAr : item.nameEn}
              className="object-cover w-full h-full"
            />
          </div>
        ))}

      {/* View all link */}
      {block.layout !== "Carousel" && block.showViewAllLink && (
        <Link
          href={locale === "ar" ? block.viewAllLinkTitleAr : block.viewAllLinkTitleEn}
          className="text-primary dark:text-primary text-sm hover:underline hover:text-red-700 dark:hover:text-red-400 font-medium">
          {locale === "ar" ? block.viewAllLinkTitleAr : block.viewAllLinkTitleEn}
        </Link>
      )}
    </div>
  );
};

export default SingleBlock;
