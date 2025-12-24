"use client";

import { X, Heart, Trash2 } from "lucide-react";
import { useHeaderStore } from "@/src/store/headerStore";
import { useWishlistStore } from "@/src/store/wishlistStore";
import { useUserStore } from "@/src/store/userStore";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import WishlistItem from "./WishlistItem";
import EmptyWishlist from "./EmptyWishlist";
import { useCartStore } from "@/src/store/cartStore";

const WishlistSidebar = () => {
  const t = useTranslations("wishlist");
  const { isWishlistOpen, closeWishlist } = useHeaderStore();
  const { items, removeItem, loadWishlistFromServer, clearAllItems, isLoading } =
    useWishlistStore();
  const { user } = useUserStore();
  const { addItem: addToCart } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (user && isWishlistOpen && isMounted) {
      loadWishlistFromServer();
    }
  }, [user, isWishlistOpen, loadWishlistFromServer, isMounted]);

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

      // إضافة للـ cart
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

      // حذف من الـ wishlist
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

  if (!isMounted) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isWishlistOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeWishlist}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 rtl:right-auto rtl:left-0 h-full w-[85vw] sm:w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col transition-transform duration-300 ${
          isWishlistOpen
            ? "translate-x-0"
            : "translate-x-full rtl:-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Heart size={24} className="text-red-500 fill-red-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("title")} ({items.length})
            </h2>
          </div>
          <button
            onClick={closeWishlist}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
          >
            <X size={24} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Heart size={64} className="text-gray-300 dark:text-gray-700 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {t("emptyTitle")}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <WishlistItem
                  key={item.wishlistItemId}
                  {...item}
                  onRemove={handleRemove}
                  onMoveToCart={handleMoveToCart}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t dark:border-gray-700">
            <button
              onClick={handleClearAll}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              <Trash2 size={18} />
              {t("clearAll")}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistSidebar;
