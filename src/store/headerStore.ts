import { create } from "zustand"

interface HeaderState {
  isMobileOpen: boolean
  toggleMobile: () => void
  isAccountOpen: boolean
  toggleAccount: () => void
  isCartOpen: boolean
  toggleCart: () => void
  closeCart: () => void
}


export const useHeaderStore = create<HeaderState>((set) => ({
  isMobileOpen: false,
  toggleMobile: () => set((s) => ({ isMobileOpen: !s.isMobileOpen })),

  isAccountOpen: false,
  toggleAccount: () => set((s) => ({ isAccountOpen: !s.isAccountOpen })),

  isCartOpen: false,
  toggleCart: () => set((s) => ({ isCartOpen: !s.isCartOpen })),
  closeCart: () => set({ isCartOpen: false }),
}))