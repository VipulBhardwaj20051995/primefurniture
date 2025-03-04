"use client";

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface CartStore {
  cartItems: CartItem[];
  isCartOpen: boolean;
  toggleCart: () => void;
  addToCart: (product: any) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

// Safe localStorage check
const getDefaultStorage = () => {
  if (typeof window !== 'undefined') {
    return createJSONStorage(() => localStorage);
  }
  return createJSONStorage(() => ({
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  }));
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],
      isCartOpen: false,
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      addToCart: (product) => set((state) => {
        const existingItem = state.cartItems.find((item) => item.id === product.id);
        if (existingItem) {
          return {
            cartItems: state.cartItems.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        }
        return {
          cartItems: [...state.cartItems, { ...product, quantity: 1 }],
        };
      }),
      updateQuantity: (id, quantity) => set((state) => ({
        cartItems: state.cartItems
          .map((item) => (item.id === id ? { ...item, quantity } : item))
          .filter((item) => item.quantity > 0),
      })),
      removeItem: (id) => set((state) => ({
        cartItems: state.cartItems.filter((item) => item.id !== id),
      })),
    }),
    {
      name: 'cart-storage',
      storage: getDefaultStorage(),
      skipHydration: true, 
    }
  )
);