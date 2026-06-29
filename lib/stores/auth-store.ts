'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Address } from '@/types';

const mockUser: User = {
  id: 'u1',
  fullName: 'Arif Rahman',
  email: 'arif.rahman@gmail.com',
  phone: '+880 1711 222333',
  avatar: 'https://picsum.photos/seed/avatar-u1/200/200',
  addresses: [
    {
      id: 'addr-1',
      label: 'Home',
      fullName: 'Arif Rahman',
      phone: '+880 1711 222333',
      division: 'Dhaka',
      district: 'Dhaka',
      area: 'Gulshan',
      detail: 'House 12, Road 5, Gulshan 1',
      isDefault: true,
    },
  ],
  createdAt: '2025-01-15T10:00:00Z',
};

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email, _password) => {
        await new Promise((r) => setTimeout(r, 500));
        set({
          user: { ...mockUser, email },
          isAuthenticated: true,
        });
      },

      register: async (fullName, email, _password) => {
        await new Promise((r) => setTimeout(r, 500));
        set({
          user: {
            ...mockUser,
            fullName,
            email,
            id: 'u' + Date.now(),
            createdAt: new Date().toISOString(),
            addresses: [],
          },
          isAuthenticated: true,
        });
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      updateProfile: (data) =>
        set((s) => ({ user: s.user ? { ...s.user, ...data } : null })),

      addAddress: (address) =>
        set((s) => ({
          user: s.user
            ? {
                ...s.user,
                addresses: address.isDefault
                  ? [
                      ...s.user.addresses.map((a) => ({
                        ...a,
                        isDefault: false,
                      })),
                      address,
                    ]
                  : [...s.user.addresses, address],
              }
            : null,
        })),

      removeAddress: (id) =>
        set((s) => ({
          user: s.user
            ? {
                ...s.user,
                addresses: s.user.addresses.filter((a) => a.id !== id),
              }
            : null,
        })),
    }),
    { name: 'qasvani-auth' },
  ),
);
