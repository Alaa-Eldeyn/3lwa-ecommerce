"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { Heart, Trash2 } from "lucide-react";
import { useWishlistStore } from "@/src/store/wishlistStore";
import { useUserStore } from "@/src/store/userStore";
import { useTranslations, useLocale } from "next-intl";
import { useEffect } from "react";
import WishlistItem from "./components/WishlistItem";
import EmptyWishlist from "./components/EmptyWishlist";
import { useCartStore } from "@/src/store/cartStore";

const WishlistPage = () => {
  const t = useTranslations("wishlist");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [showClearModal, setShowClearModal] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const { items, removeItem, clearAllItems, isLoading } = useWishlistStore();
  // console.log(items);
  const { user } = useUserStore();
  const { addItem: addToCart } = useCartStore();

  const handleRemove = async (itemCombinationId: string) => {
    try {
      await removeItem(itemCombinationId, !!user);
    } catch (error) {
      console.error("Failed to remove item from wishlist:", error);
    }
  };

  const handleMoveToCart = async (itemCombinationId: string) => {
    try {
      const item = items.find((i) => i.itemCombinationId === itemCombinationId);
      if (!item) return;

      await addToCart(
        {
          id: item.itemCombinationId,
          itemId: item.itemId,
          name: item.itemTitleAr || item.itemTitleEn,
          price: item.salesPrice > 0 ? item.salesPrice : item.price,
          image: item.thumbnailImage,
          offerCombinationPricingId: item.offerPricingId,
          quantity: 1,
        },
        !!user
      );

      await removeItem(itemCombinationId, !!user);
    } catch (error) {
      console.error("Failed to move item to cart:", error);
    }
  };

  const handleClearAll = async () => {
    setShowClearModal(true);
  };

  const confirmClearAll = async () => {
    setIsClearing(true);
    try {
      await clearAllItems(!!user);
      setShowClearModal(false);
    } catch (error) {
      console.error("Failed to clear wishlist:", error);
    } finally {
      setIsClearing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
        <div className="container">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
        <div className="container">
          <EmptyWishlist />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Heart size={40} className="text-red-500 fill-red-500" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{t("title")}</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {t("itemsCount", { count: items.length })}
          </p>
        </div>

        {/* Clear All Button */}
        {items.length > 0 && (
          <div className="flex justify-end mb-6">
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 px-6 py-3 bg-error text-white rounded-lg hover:bg-error-hover transition-colors font-medium">
              <Trash2 size={18} />
              {t("clearAll")}
            </button>
          </div>
        )}

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
          {items.map((item) => (
            <WishlistItem
              key={item.wishlistItemId}
              {...item}
              onRemove={handleRemove}
              onMoveToCart={handleMoveToCart}
            />
          ))}
        </div>
      </div>

      {/* Clear Wishlist Confirmation Modal */}
      {showClearModal &&
        typeof window !== "undefined" &&
        createPortal(
          <ClearWishlistModal
            isOpen={showClearModal}
            onClose={() => setShowClearModal(false)}
            onConfirm={confirmClearAll}
            isLoading={isClearing}
            t={t}
            isRTL={isRTL}
          />,
          document.body
        )}
    </div>
  );
};

// Clear Wishlist Confirmation Modal Component
interface ClearWishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  t: (key: string) => string;
  isRTL: boolean;
}

const ClearWishlistModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  t,
  isRTL,
}: ClearWishlistModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      dir={isRTL ? "rtl" : "ltr"}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="mb-6">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4 mx-auto">
            <Trash2 className="text-red-600 dark:text-red-400" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            {t("clearAll")}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            {t("confirmClear")}
          </p>
        </div>

        <div className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-3 bg-error hover:bg-error-hover text-white rounded-xl transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? t("clearing") : t("clearAll")}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
            {t("cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
