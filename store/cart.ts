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

// Create a safe storage that works in both server and client environments
const createSafeStorage = () => {
  if (typeof window === 'undefined') {
    // Return dummy storage when on server
    return {
      getItem: () => JSON.stringify({ cartItems: [], isCartOpen: false }),
      setItem: () => {},
      removeItem: () => {},
    };
  }
  // Use local storage on client
  return localStorage;
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
      storage: createJSONStorage(() => createSafeStorage()),
      skipHydration: true,
    }
  )
);