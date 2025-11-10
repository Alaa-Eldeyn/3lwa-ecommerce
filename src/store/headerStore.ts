import { create } from "zustand"

interface HeaderState {
  isMobileOpen: boolean
  toggleMobile: () => void
  isAccountOpen: boolean
  toggleAccount: () => void
}


export const useHeaderStore = create<HeaderState>((set) => ({
  isMobileOpen: false,
  toggleMobile: () => set((s) => ({ isMobileOpen: !s.isMobileOpen })),

  isAccountOpen: false,
  toggleAccount: () => set((s) => ({ isAccountOpen: !s.isAccountOpen })),
}))