import { create } from "zustand"
import type { User } from "../types/types"
import { getUserFromCookie, saveUserToCookie, removeUserFromCookie } from "../auth/auth"
import { customAxios } from "../auth/customAxios"

interface UserState {
  user: User | null
  setUser: (user: User | null) => void
  initUser: () => void
  fetchUserProfile: () => Promise<void>
  logout: () => void
  isAuthenticated: () => boolean
  updateUser: (updates: Partial<User>) => void
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  
  setUser: (user) => {
    set({ user });
    if (user) {
      saveUserToCookie(user);
    } else {
      removeUserFromCookie();
    }
  },
  
  initUser: () => {
    const userData = getUserFromCookie();
    set({ user: userData });
  },
  
  fetchUserProfile: async () => {
    try {
      const response = await customAxios.get("/UserProfile/profile");
      
      if (response?.data?.success && response.data.data) {
        const apiData = response.data.data;
        const currentUser = get().user || getUserFromCookie();
        
        // Map API response to User type, preserving token and refreshToken from cookie
        const updatedUser: User = {
          id: apiData.userId || currentUser?.id || null,
          firstName: apiData.firstName || "",
          lastName: apiData.lastName || "",
          email: apiData.email || "",
          profileImagePath: apiData.profileImagePath || "",
          // Preserve authentication tokens from cookie
          token: currentUser?.token || "",
          refreshToken: currentUser?.refreshToken || "",
          role: currentUser?.role || "",
        };
        
        set({ user: updatedUser });
        saveUserToCookie(updatedUser);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // Don't throw - fallback to cookie data if API fails
    }
  },
  
  logout: () => {
    set({ user: null });
    removeUserFromCookie();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  },
  
  isAuthenticated: () => {
    return !!get().user?.token;
  },
  
  updateUser: (updates) => {
    const currentUser = get().user;
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      set({ user: updatedUser });
      saveUserToCookie(updatedUser);
    }
  },
}))
