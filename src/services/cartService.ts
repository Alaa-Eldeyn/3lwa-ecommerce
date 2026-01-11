import { customAxios } from "../utils/customAxios";

const CART_BASE_URL = "/Cart";

// Types للـ Cart API
export interface AddToCartRequest {
  itemId: string;
  offerCombinationPricingId?: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  cartItemId: string;
  quantity: number;
}

export interface CartItemResponse {
  id: string;
  cartItemId?: string;
  itemId: string;
  itemName?: string;
  itemNameAr?: string;
  itemNameEn?: string;
  unitPrice: number;
  price?: number;
  quantity: number;
  imageUrl?: string;
  imagePath?: string;
  image?: string;
  offerCombinationPricingId?: string;
  subTotal?: number;
  isAvailable?: boolean;
  sellerName?: string;
}

export interface CartSummaryResponse {
  items: CartItemResponse[];
  totalItems: number;
  totalPrice: number;
}

/**
 * إضافة item للـ cart
 * يتطلب authentication
 */
export const addItemToCart = async (data: AddToCartRequest): Promise<unknown> => {
  try {
    const response = await customAxios.post(`${CART_BASE_URL}/add-item`, data);
    return response.data;
  } catch (error: unknown) {
    console.error("Error adding item to cart:", error);
    throw (error as { response?: { data?: unknown } })?.response?.data || error;
  }
};

/**
 * الحصول على ملخص الـ cart
 * يتطلب authentication
 */
export const getCartSummary = async (): Promise<CartSummaryResponse> => {
  try {
    const response = await customAxios.get(`${CART_BASE_URL}/summary`);
    return response.data.data || response.data;
  } catch (error: unknown) {
    console.error("Error getting cart summary:", error);
    throw (error as { response?: { data?: unknown } })?.response?.data || error;
  }
};

/**
 * حذف item من الـ cart
 * يتطلب authentication
 */
export const removeItemFromCart = async (cartItemId: string): Promise<unknown> => {
  try {
    const response = await customAxios.delete(
      `${CART_BASE_URL}/remove-item/${cartItemId}`
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Error removing item from cart:", error);
    throw (error as { response?: { data?: unknown } })?.response?.data || error;
  }
};

/**
 * تحديث item في الـ cart
 * يتطلب authentication
 */
export const updateCartItem = async (
  data: UpdateCartItemRequest
): Promise<unknown> => {
  try {
    const response = await customAxios.put(`${CART_BASE_URL}/update-item`, data);
    return response.data;
  } catch (error: unknown) {
    console.error("Error updating cart item:", error);
    throw (error as { response?: { data?: unknown } })?.response?.data || error;
  }
};

/**
 * مسح الـ cart بالكامل
 * يتطلب authentication
 */
export const clearCartApi = async (): Promise<unknown> => {
  try {
    const response = await customAxios.delete(`${CART_BASE_URL}/clear`);
    return response.data;
  } catch (error: unknown) {
    console.error("Error clearing cart:", error);
    throw (error as { response?: { data?: unknown } })?.response?.data || error;
  }
};

/**
 * عدد الـ items في الـ cart
 * يتطلب authentication
 */
export const getCartCount = async (): Promise<number> => {
  try {
    const response = await customAxios.get(`${CART_BASE_URL}/count`);
    return response.data.data || response.data;
  } catch (error: unknown) {
    console.error("Error getting cart count:", error);
    throw (error as { response?: { data?: unknown } })?.response?.data || error;
  }
};
