"use client";

import React from "react";
import { CartDrawer } from "./cart-drawer";
import { useCartStore } from "@/store/cart";
import { Navigation } from "./navigation"; // or Header if you prefer

// If the file is at /app/globals.css

// OR if the file is at /styles/globals.css
import "../styles/globals.css";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { cartItems, isCartOpen, toggleCart, updateQuantity, removeItem } = useCartStore();
  
  return (
    <>
      <Navigation /> {/* This ensures navigation appears on all pages */}
      {children}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={toggleCart}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </>
  );
}