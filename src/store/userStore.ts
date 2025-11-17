import { create } from "zustand"
import type { User } from "../types/types"
import { getUserFromCookie, saveUserToCookie, removeUserFromCookie } from "../utils/auth"

interface UserState {
  user: User | null
  setUser: (user: User | null) => void
  initUser: () => void
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
