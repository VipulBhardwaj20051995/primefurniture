import { create } from 'zustand';
import { Product } from '@/components/product-card';

export interface CartItem extends Omit<Product, 'description' | 'categories'> {
  quantity: number;
}

interface CartStore {
  cartItems: CartItem[];
  isCartOpen: boolean;
  toggleCart: () => void;
  addToCart: (product: Product) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

export const useCartStore = create<CartStore>((set) => ({
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
}));