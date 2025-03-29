"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string | number;
  name: string;
  image: string;
  price: number;
  quantity?: number;
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    // Load cart from localStorage
    if (typeof window !== 'undefined') {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');

      // Add quantity to each item
      const itemsWithQuantity = cart.map((item: Product) => ({
        ...item,
        quantity: 1 // Default quantity
      }));

      setCartItems(itemsWithQuantity);

      // Calculate subtotal
      const total = itemsWithQuantity.reduce(
        (sum: number, item: Product) => sum + (item.price * (item.quantity || 1)),
        0
      );
      setSubtotal(total);

      setLoading(false);
    }
  }, []);

  const handleQuantityChange = (id: string | number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCart);

    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Recalculate subtotal
    const total = updatedCart.reduce(
      (sum, item) => sum + (item.price * (item.quantity || 1)),
      0
    );
    setSubtotal(total);

    // Dispatch a custom event to notify header of cart change
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  const handleRemoveItem = (id: string | number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);

    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Recalculate subtotal
    const total = updatedCart.reduce(
      (sum, item) => sum + (item.price * (item.quantity || 1)),
      0
    );
    setSubtotal(total);

    // Dispatch a custom event to notify header of cart change
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  const handleCheckout = () => {
    alert("Order placed successfully! This is a demo, so no actual payment will be processed.");
    // Clear cart
    localStorage.removeItem('cart');
    setCartItems([]);
    setSubtotal(0);

    // Notify header that cart is empty
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  const addToCart = (product: Product) => {
    // Check if localStorage is available (client-side only)
    if (typeof window !== 'undefined') {
      // Get existing cart or initialize empty array
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

      // Check if product already exists in cart
      const existingProductIndex = existingCart.findIndex((item: Product) => item.id === product.id);

      if (existingProductIndex !== -1) {
        // Product exists, increment quantity
        existingCart[existingProductIndex].quantity =
          (existingCart[existingProductIndex].quantity || 1) + 1;
      } else {
        // Product doesn't exist in cart, add it with quantity 1
        existingCart.push({
          ...product,
          quantity: 1
        });
      }

      // Save back to localStorage
      localStorage.setItem('cart', JSON.stringify(existingCart));
      // Update our local reference
      setCartItems(existingCart);
      return true;
    }
    return false;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse">Loading cart...</div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h2 className="text-xl mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
              <Link
                href="/shop"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="lg:flex lg:gap-6">
              {/* Cart items */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {cartItems.map((item, index) => (
                        <tr key={`${item.id}-${index}`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-16 w-16 relative bg-gray-100 rounded">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-contain p-2"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <button
                                onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                                className="w-8 h-8 bg-gray-200 rounded-l flex items-center justify-center"
                              >
                                -
                              </button>
                              <div className="w-10 h-8 border-t border-b flex items-center justify-center">
                                {item.quantity || 1}
                              </div>
                              <button
                                onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                                className="w-8 h-8 bg-gray-200 rounded-r flex items-center justify-center"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order summary */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">${(subtotal * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-bold text-xl">${(subtotal + subtotal * 0.1).toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
                  >
                    Complete Order
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}