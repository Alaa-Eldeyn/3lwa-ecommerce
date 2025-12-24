"use client";

import { Heart, Trash2 } from "lucide-react";
import { useWishlistStore } from "@/src/store/wishlistStore";
import { useUserStore } from "@/src/store/userStore";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import WishlistItem from "./WishlistItem";
import EmptyWishlist from "./EmptyWishlist";
import { useCartStore } from "@/src/store/cartStore";

const WishlistPage = () => {
  const t = useTranslations("wishlist");
  const { items, removeItem, clearAllItems, isLoading, loadWishlistFromServer } = useWishlistStore();
  const { user } = useUserStore();
  const { addItem: addToCart } = useCartStore();

  useEffect(() => {
    if (user) {
      loadWishlistFromServer();
    }
  }, [user, loadWishlistFromServer]);

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
    if (confirm(t("confirmClear"))) {
      try {
        await clearAllItems(!!user);
      } catch (error) {
        console.error("Failed to clear wishlist:", error);
      }
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {t("title")}
            </h1>
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
              className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
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
    </div>
  );
};

export default WishlistPage;
