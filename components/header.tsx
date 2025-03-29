"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "@aws-amplify/auth";
import { initializeAmplify } from "@/lib/amplify-config";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  
  // Function to update cart count
  const updateCartCount = () => {
    if (typeof window !== 'undefined') {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
    }
  };
  
  useEffect(() => {
    // Check if user is logged in by looking for stored name/email
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    
    if (storedName || storedEmail) {
      setUserName(storedName || storedEmail?.split('@')[0] || "User");
      setIsLoggedIn(true);
    }
    
    // Get initial cart count
    updateCartCount();
    
    // Set up event listener for cart updates
    window.addEventListener('storage', updateCartCount);
    
    // Custom event for cart updates from other components
    window.addEventListener('cartUpdated', updateCartCount);
    
    // Cleanup listener
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);
  
  // Special effect for paths that might change the cart
  useEffect(() => {
    // Update cart count when pathname changes (e.g., after checkout)
    updateCartCount();
  }, [pathname]);
  
  const handleSignOut = async () => {
    try {
      // Initialize Amplify if not already done
      initializeAmplify();
      
      // Sign out the user
      await signOut();
      
      // Clear stored user data
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      
      // Update state
      setIsLoggedIn(false);
      setUserName("");
      
      // Redirect to home page
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-primary">
          Maibury
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-primary">Home</Link>
          <Link href="/shop" className="text-gray-700 hover:text-primary">Shop</Link>
          <Link href="/categories" className="text-gray-700 hover:text-primary">Categories</Link>
          <Link href="/about" className="text-gray-700 hover:text-primary">About</Link>
          <Link href="/contact" className="text-gray-700 hover:text-primary">Contact</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center">
              <span className="text-gray-700 mr-3">Hello, {userName}</span>
              <button 
                onClick={handleSignOut}
                className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link 
              href="/auth" 
              className="text-sm px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark"
            >
              Sign In
            </Link>
          )}
          <Link href="/checkout" className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
