'use client';

import { create } from 'zustand';

interface UIState {
  cartDrawerOpen: boolean;
  searchOpen: boolean;
  mobileMenuOpen: boolean;
  toggleCartDrawer: () => void;
  setCartDrawer: (open: boolean) => void;
  toggleSearch: () => void;
  setSearch: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenu: (open: boolean) => void;
  closeAll: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  cartDrawerOpen: false,
  searchOpen: false,
  mobileMenuOpen: false,

  toggleCartDrawer: () =>
    set((s) => ({ cartDrawerOpen: !s.cartDrawerOpen })),
  setCartDrawer: (open) => set({ cartDrawerOpen: open }),
  toggleSearch: () => set((s) => ({ searchOpen: !s.searchOpen })),
  setSearch: (open) => set({ searchOpen: open }),
  toggleMobileMenu: () =>
    set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  setMobileMenu: (open) => set({ mobileMenuOpen: open }),
  closeAll: () =>
    set({ cartDrawerOpen: false, searchOpen: false, mobileMenuOpen: false }),
}));
