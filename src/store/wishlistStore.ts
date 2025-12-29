import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  addItemToWishlist,
  getWishlist,
  removeItemFromWishlist,
  clearWishlist,
  moveToCart,
  getWishlistCount,
} from "../services/wishlistService";
import { WishlistItem } from "../types/types";

interface WishlistState {
  items: WishlistItem[];
  totalCount: number;
  isLoading: boolean;
  addItem: (itemCombinationId: string, isAuthenticated?: boolean) => Promise<void>;
  removeItem: (itemCombinationId: string, isAuthenticated?: boolean) => Promise<void>;
  clearAllItems: (isAuthenticated?: boolean) => Promise<void>;
  moveItemToCart: (itemCombinationId: string, quantity: number, isAuthenticated?: boolean) => Promise<void>;
  loadWishlistFromServer: () => Promise<void>;
  getTotalItems: () => number;
  isInWishlist: (itemCombinationId: string) => boolean;
  setItems: (items: WishlistItem[]) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      totalCount: 0,
      isLoading: false,

      // دالة لإضافة item للـ wishlist
      addItem: async (itemCombinationId, isAuthenticated = false) => {
        if (isAuthenticated) {
          try {
            set({ isLoading: true });
            await addItemToWishlist({ itemCombinationId });
            
            // نحمل الـ wishlist من الـ server بعد الإضافة
            await get().loadWishlistFromServer();
          } catch (error) {
            console.error("Failed to add item to wishlist:", error);
            throw error;
          } finally {
            set({ isLoading: false });
          }
        } else {
          // لو اليوزر مش مسجل، يمكن حفظ في localStorage (اختياري)
          // أو طلب تسجيل الدخول
          console.warn("User must be authenticated to add to wishlist");
        }
      },

      // دالة لحذف item من الـ wishlist
      removeItem: async (itemCombinationId, isAuthenticated = false) => {
        if (isAuthenticated) {
          try {
            set({ isLoading: true });
            await removeItemFromWishlist(itemCombinationId);
            await get().loadWishlistFromServer();
          } catch (error) {
            console.error("Failed to remove item from wishlist:", error);
            throw error;
          } finally {
            set({ isLoading: false });
          }
        } else {
          // حذف من localStorage إذا كان موجود
          set({
            items: get().items.filter(
              (item) => item.itemCombinationId !== itemCombinationId
            ),
          });
        }
      },

      // دالة لمسح الـ wishlist بالكامل
      clearAllItems: async (isAuthenticated = false) => {
        if (isAuthenticated) {
          try {
            set({ isLoading: true });
            await clearWishlist();
            set({ items: [], totalCount: 0 });
          } catch (error) {
            console.error("Failed to clear wishlist:", error);
            throw error;
          } finally {
            set({ isLoading: false });
          }
        } else {
          set({ items: [], totalCount: 0 });
        }
      },

      // دالة لنقل item من الـ wishlist للـ cart
      moveItemToCart: async (itemCombinationId, quantity, isAuthenticated = false) => {
        if (isAuthenticated) {
          try {
            set({ isLoading: true });
            await moveToCart({ itemCombinationId, quantity });
            await get().loadWishlistFromServer();
          } catch (error) {
            console.error("Failed to move item to cart:", error);
            throw error;
          } finally {
            set({ isLoading: false });
          }
        }
      },

      // دالة لتحميل الـ wishlist من الـ server
      loadWishlistFromServer: async () => {
        try {
          set({ isLoading: true });
          const response = await getWishlist(1, 100); // نجيب كل الـ items
          set({
            items: response.items,
            totalCount: response.totalRecords,
          });
        } catch (error) {
          console.error("Failed to load wishlist from server:", error);
          // في حالة الخطأ، نستخدم البيانات المحلية
        } finally {
          set({ isLoading: false });
        }
      },

      // دالة للحصول على العدد الكلي للـ items
      getTotalItems: () => {
        return get().items.length;
      },

      // دالة للتحقق من وجود item في الـ wishlist
      isInWishlist: (itemCombinationId) => {
        return get().items.some(
          (item) => item.itemCombinationId === itemCombinationId
        );
      },

      // دالة لتعيين الـ items
      setItems: (items) => {
        set({ items });
      },
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
