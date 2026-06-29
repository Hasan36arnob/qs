'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, variant?: string) => void;
  removeItem: (productId: string, variant?: string) => void;
  updateQuantity: (productId: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1, variant) => {
        const items = get().items;
        const existing = items.find(
          (i) => i.productId === product.id && i.variant === variant,
        );

        if (existing) {
          set({
            items: items.map((i) =>
              i.productId === product.id && i.variant === variant
                ? { ...i, quantity: i.quantity + quantity }
                : i,
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity,
                variant,
                image: product.images[0],
              },
            ],
          });
        }
      },

      removeItem: (productId, variant) => {
        set({
          items: get().items.filter(
            (i) => !(i.productId === productId && i.variant === variant),
          ),
        });
      },

      updateQuantity: (productId, quantity, variant) => {
        if (quantity <= 0) {
          get().removeItem(productId, variant);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId && i.variant === variant
              ? { ...i, quantity }
              : i,
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'qasvani-cart' },
  ),
);
