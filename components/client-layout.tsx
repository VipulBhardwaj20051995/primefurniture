"use client";

import React from "react";
import { CartDrawer } from "./cart-drawer";
import { useCartStore } from "@/store/cart";
import { Navigation } from "./navigation";
import { Banner } from "./banner";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { cartItems, isCartOpen, toggleCart, updateQuantity, removeItem } = useCartStore();
  
  return (
    <>
      <Banner />
      <Navigation />
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