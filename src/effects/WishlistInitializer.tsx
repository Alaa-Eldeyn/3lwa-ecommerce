"use client";

import { useEffect } from "react";
import { useWishlistStore } from "@/src/store/wishlistStore";
import { useUserStore } from "@/src/store/userStore";

/**
 * Component لتحميل الـ wishlist مرة واحدة عند تسجيل دخول اليوزر
 */
const WishlistInitializer = () => {
  const { user } = useUserStore();
  const { loadWishlistFromServer } = useWishlistStore();

  useEffect(() => {
    // نحمل الـ wishlist مرة واحدة فقط عند تسجيل دخول اليوزر
    if (user) {
      loadWishlistFromServer();
    }
  }, [user]); // نعتمد على userId فقط لتجنب التحميل المتكرر

  return null;
};

export default WishlistInitializer;
