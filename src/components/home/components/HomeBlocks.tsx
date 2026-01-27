"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import axios from "axios";
import { Block } from "@/src/types/home-blocks.types";
import SingleBlock from "./SingleBlock";
import { Link } from "@/src/i18n/routing";
import { useUserStore } from "@/src/store/userStore";

const HomeBlocks = () => {
  const locale = useLocale();
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const t = useTranslations("home.signInPrompt");
  const [loading, setLoading] = useState(true);
  const [blocks, setBlocks] = useState<Block[]>([]);

  // Fetch blocks from API
  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Homepage`);

        if (response?.data?.success && response.data.data?.blocks) {
          setBlocks(response.data.data.blocks);
        }
      } catch (error) {
        console.error("Error fetching homepage blocks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlocks();
  }, []);

  // Sort blocks by display order
  const sortedBlocks = useMemo(() => {
    return [...blocks].sort((a, b) => a.displayOrder - b.displayOrder);
  }, [blocks]);

  // Calculate which block occupies the 4th slot in the first row
  const fourthSlotBlockIndex = useMemo(() => {
    let slotCount = 0;
    for (let i = 0; i < sortedBlocks.length; i++) {
      const isFullWidth =
        sortedBlocks[i].layout === "FullWidth" || sortedBlocks[i].layout === "Carousel";
      if (isFullWidth) {
        slotCount += 4; // Full-width blocks take entire row
      } else {
        slotCount += 1;
        if (slotCount === 4) return i; // This block fills the 4th slot
      }
      if (slotCount >= 4) return -1; // 4th slot was passed or filled by full-width
    }
    return -1;
  }, [sortedBlocks]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-500">{t("loading")}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {sortedBlocks.map((block, index) => {
        const isFullWidth = block.layout === "FullWidth" || block.layout === "Carousel";
        const isFirstRowFourthBlock = index === fourthSlotBlockIndex;

        // Special case: 4th block in first row with sign-in prompt (only show if not logged in)
        if (isFirstRowFourthBlock && !isFullWidth && !isAuthenticated()) {
          return (
            <div key={block.id} className="flex flex-col gap-6 h-[420px]">
              <div className="bg-white dark:bg-gray-800 p-6 shadow-sm flex flex-col justify-center items-start gap-3 h-[140px]">
                <h3 className="text-xl font-bold text-foreground dark:text-gray-200">
                  {t("bestExperience")}
                </h3>
                <Link
                  className="bg-accent dark:bg-accent/80 hover:bg-[#ffe0b3] dark:hover:bg-accent text-secondary dark:text-gray-900 font-bold py-2 px-8 rounded text-sm w-full shadow-sm border border-yellow-400 dark:border-yellow-500 flex items-center justify-center"
                  href="/login">
                  {t("signInSecurely")}
                </Link>
              </div>
              <SingleBlock block={block} locale={locale} />
            </div>
          );
        }

        // FullWidth or Carousel blocks span all 4 columns
        if (isFullWidth) {
          return (
            <div key={block.id} className="lg:col-span-4">
              <SingleBlock block={block} locale={locale} />
            </div>
          );
        }

        // Regular grid blocks span 1 column
        return <SingleBlock key={block.id} block={block} locale={locale} />;
      })}
    </div>
  );
};

export default HomeBlocks;
