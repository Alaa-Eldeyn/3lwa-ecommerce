import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { addItemToCart, getCartSummary, removeItemFromCart, updateCartItem, clearCartApi, getCartCount } from "../services/cartService";

export interface CartItem {
  id: string;
  itemId: string;
  name: string;
  nameAr?: string;
  nameEn?: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  offerCombinationPricingId?: string;
  isAvailable?: boolean;
}

export interface CartSummary {
  subTotal: number;
  shippingEstimate: number;
  taxEstimate: number;
  totalEstimate: number;
  itemCount: number;
}

interface CartState {
  items: CartItem[];
  summary: CartSummary;
  isLoading: boolean;
  isSyncing: boolean; // للتزامن مع API
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }, isAuthenticated?: boolean) => Promise<void>;
  removeItem: (id: string, isAuthenticated?: boolean) => Promise<void>;
  updateQuantity: (id: string, quantity: number, isAuthenticated?: boolean) => Promise<void>;
  clearCart: (isAuthenticated?: boolean) => Promise<void>;
  syncWithServer: () => Promise<void>; // للمزامنة مع الـ server
  loadCartFromServer: () => Promise<void>; // لتحميل الـ cart من الـ server
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemById: (id: string) => CartItem | undefined;
  setItems: (items: CartItem[]) => void;
  getSummary: () => CartSummary;
}

const defaultSummary: CartSummary = {
  subTotal: 0,
  shippingEstimate: 0,
  taxEstimate: 0,
  totalEstimate: 0,
  itemCount: 0,
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      summary: defaultSummary,
      isLoading: false,
      isSyncing: false,

      // دالة لإضافة item للـ cart
      addItem: async (item, isAuthenticated = false) => {
        if (isAuthenticated) {
          // لو اليوزر مسجل، نستخدم الـ API
          try {
            set({ isLoading: true });
            await addItemToCart({
              itemId: item.itemId,
              offerCombinationPricingId: item.offerCombinationPricingId || item.id,
              quantity: item.quantity || 1,
            });
            
            // نحمل الـ cart من الـ server بعد الإضافة
            await get().loadCartFromServer();
          } catch (error) {
            console.error("Failed to add item to server cart:", error);
            throw error;
          } finally {
            set({ isLoading: false });
          }
        } else {
          // لو اليوزر مش مسجل، نحفظ في localStorage
          const items = get().items;
          const existingItem = items.find((i) => i.id === item.id);

          if (existingItem) {
            set({
              items: items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                  : i
              ),
            });
          } else {
            set({
              items: [...items, { ...item, quantity: item.quantity || 1 }],
            });
          }
        }
      },

      // دالة لحذف item من الـ cart
      removeItem: async (id, isAuthenticated = false) => {
        if (isAuthenticated) {
          try {
            set({ isLoading: true });
            await removeItemFromCart(id);
            await get().loadCartFromServer();
          } catch (error) {
            console.error("Failed to remove item from server cart:", error);
            throw error;
          } finally {
            set({ isLoading: false });
          }
        } else {
          set({
            items: get().items.filter((item) => item.id !== id),
          });
        }
      },

      // دالة لتحديث الكمية
      updateQuantity: async (id, quantity, isAuthenticated = false) => {
        if (quantity <= 0) {
          await get().removeItem(id, isAuthenticated);
          return;
        }

        if (isAuthenticated) {
          try {
            set({ isLoading: true });
            await updateCartItem({
              cartItemId: id,
              quantity,
            });
            await get().loadCartFromServer();
          } catch (error) {
            console.error("Failed to update item quantity:", error);
            throw error;
          } finally {
            set({ isLoading: false });
          }
        } else {
          set({
            items: get().items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          });
        }
      },

      // دالة لمسح الـ cart
      clearCart: async (isAuthenticated = false) => {
        if (isAuthenticated) {
          try {
            set({ isLoading: true });
            await clearCartApi();
            set({ items: [], summary: defaultSummary });
          } catch (error) {
            console.error("Failed to clear server cart:", error);
            throw error;
          } finally {
            set({ isLoading: false });
          }
        } else {
          set({ items: [], summary: defaultSummary });
        }
      },

      // دالة للمزامنة مع الـ server (تستخدم عند تسجيل الدخول)
      syncWithServer: async () => {
        try {
          set({ isSyncing: true });
          const localItems = get().items;

          if (localItems.length > 0) {
            // نضيف كل الـ items اللي في localStorage للـ server
            for (const item of localItems) {
              try {
                await addItemToCart({
                  itemId: item.itemId,
                  offerCombinationPricingId: item.offerCombinationPricingId || item.id,
                  quantity: item.quantity,
                });
              } catch (error) {
                console.error("Failed to sync item:", item, error);
              }
            }
          }

          // نحمل الـ cart من الـ server
          await get().loadCartFromServer();
        } catch (error) {
          console.error("Failed to sync cart with server:", error);
        } finally {
          set({ isSyncing: false });
        }
      },

      // دالة لتحميل الـ cart من الـ server
      loadCartFromServer: async () => {
        try {
          const cartData = await getCartSummary();
          
          // نحول الـ response للـ format بتاعنا
          const serverItems: CartItem[] = cartData.items?.map((item: any) => ({
            id: item.id,
            itemId: item.itemId,
            name: item.itemNameEn || item.itemNameAr,
            nameAr: item.itemNameAr,
            nameEn: item.itemNameEn,
            price: item.unitPrice,
            originalPrice: item.unitOriginalPrice,
            image: item.imageUrl,
            quantity: item.quantity,
            offerCombinationPricingId: item.offerCombinationPricingId,
            isAvailable: item.isAvailable,
          })) || [];

          // Store summary data from API
          const summary: CartSummary = {
            subTotal: cartData.subTotal || 0,
            shippingEstimate: cartData.shippingEstimate || 0,
            taxEstimate: cartData.taxEstimate || 0,
            totalEstimate: cartData.totalEstimate || 0,
            itemCount: cartData.itemCount || 0,
          };

          set({ items: serverItems, summary });
        } catch (error) {
          console.error("Failed to load cart from server:", error);
          throw error;
        }
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getItemById: (id) => {
        return get().items.find((item) => item.id === id);
      },

      setItems: (items) => {
        set({ items });
      },

      getSummary: () => {
        return get().summary;
      },
    }),
    {
      name: "ecommerceCart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
