import { customAxios } from "../auth/customAxios";
import { WishlistResponse } from "../types/types";

const WISHLIST_BASE_URL = "/wishlist";

// Types للـ Wishlist API
export interface AddToWishlistRequest {
  itemCombinationId: string;
}

export interface MoveToCartRequest {
  itemCombinationId: string;
  quantity: number;
}

export interface WishlistCountResponse {
  count: number;
}

/**
 * إضافة item للـ wishlist
 * يتطلب authentication
 */
export const addItemToWishlist = async (
  data: AddToWishlistRequest
): Promise<unknown> => {
  try {
    const response = await customAxios.post(`${WISHLIST_BASE_URL}/add`, data);
    return response.data;
  } catch (error: unknown) {
    console.error("Error adding item to wishlist:", error);
    throw (error as { response?: { data?: unknown } })?.response?.data || error;
  }
};

/**
 * الحصول على قائمة الـ wishlist
 * يتطلب authentication
 */
export const getWishlist = async (
  page: number = 1,
  pageSize: number = 10
): Promise<WishlistResponse> => {
  try {
    const response = await customAxios.get(`${WISHLIST_BASE_URL}`, {
      params: { page, pageSize },
    });
    return response.data.data || response.data;
  } catch (error: unknown) {
    console.error("Error getting wishlist:", error);
    throw (error as { response?: { data?: unknown } })?.response?.data || error;
  }
};

/**
 * حذف item من الـ wishlist
 * يتطلب authentication
 */
export const removeItemFromWishlist = async (
  itemCombinationId: string
): Promise<unknown> => {
  try {
    const response = await customAxios.delete(
      `${WISHLIST_BASE_URL}/remove/${itemCombinationId}`
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Error removing item from wishlist:", error);
    throw (error as { response?: { data?: unknown } })?.response?.data || error;
  }
};

/**
 * مسح الـ wishlist بالكامل
 * يتطلب authentication
 */
export const clearWishlist = async (): Promise<unknown> => {
  try {
    const response = await customAxios.delete(`${WISHLIST_BASE_URL}/clear`);
    return response.data;
  } catch (error: unknown) {
    console.error("Error clearing wishlist:", error);
    throw (error as { response?: { data?: unknown } })?.response?.data || error;
  }
};

/**
 * نقل item من الـ wishlist للـ cart
 * يتطلب authentication
 */
export const moveToCart = async (data: MoveToCartRequest): Promise<unknown> => {
  try {
    const response = await customAxios.post(
      `${WISHLIST_BASE_URL}/move-to-cart`,
      data
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Error moving item to cart:", error);
    throw (error as { response?: { data?: unknown } })?.response?.data || error;
  }
};

/**
 * الحصول على عدد items في الـ wishlist
 * يتطلب authentication
 */
export const getWishlistCount = async (): Promise<WishlistCountResponse> => {
  try {
    const response = await customAxios.get(`${WISHLIST_BASE_URL}/count`);
    return response.data.data || response.data;
  } catch (error: unknown) {
    console.error("Error getting wishlist count:", error);
    throw (error as { response?: { data?: unknown } })?.response?.data || error;
  }
};
