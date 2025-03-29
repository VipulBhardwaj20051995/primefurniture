"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Product interface
interface Product {
  id: string | number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  category: string;
  description: string;
}

// Cart state management (use context in a real app)
let cartItems: Product[] = [];
const addToCart = (product: Product) => {
  // Check if localStorage is available (client-side only)
  if (typeof window !== 'undefined') {
    // Get existing cart or initialize empty array
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    // Add the new product
    existingCart.push(product);
    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    // Update our local reference
    cartItems = existingCart;
    return true;
  }
  return false;
};

// Products data using actual images from public folder
const dummyProducts: Product[] = [
  {
    id: 1,
    name: "Modern Sofa",
    image: "/sofa.png",
    price: 599.99,
    originalPrice: 799.99,
    discount: 25,
    rating: 4.7,
    category: "Living Room",
    description: "Elegant modern sofa with premium fabric upholstery."
  },
  {
    id: 2,
    name: "Classic Sofa",
    image: "/sofa1.png",
    price: 749.99,
    originalPrice: 899.99,
    discount: 15,
    rating: 4.5,
    category: "Living Room",
    description: "Timeless design with comfortable cushions and durable frame."
  },
  {
    id: 3,
    name: "Premium Bed Frame",
    image: "/bed.png",
    price: 899.99,
    originalPrice: 1199.99,
    discount: 25,
    rating: 4.8,
    category: "Bedroom",
    description: "Luxurious bed frame with solid wood construction."
  },
  {
    id: 4,
    name: "Ergonomic Chair",
    image: "/chair.png",
    price: 249.99,
    originalPrice: 329.99,
    discount: 20,
    rating: 4.6,
    category: "Office",
    description: "Comfortable ergonomic chair for your home office."
  },
  {
    id: 5,
    name: "Coffee Table",
    image: "/table.png",
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    rating: 4.3,
    category: "Living Room",
    description: "Stylish coffee table with modern design."
  },
  {
    id: 6,
    name: "Luxury Wardrobe",
    image: "/wardrobe.png",
    price: 1299.99,
    originalPrice: 1599.99,
    discount: 18,
    rating: 4.9,
    category: "Bedroom",
    description: "Spacious wardrobe with premium finishing."
  },
  {
    id: 7,
    name: "Plush Carpet",
    image: "/carpet.png",
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    rating: 4.4,
    category: "Decor",
    description: "Soft and elegant carpet to enhance your living space."
  },
  {
    id: 8,
    name: "Dining Table",
    image: "/table.png", // Reusing table image
    price: 449.99,
    originalPrice: 599.99,
    discount: 25,
    rating: 4.6,
    category: "Dining",
    description: "Elegant dining table for family gatherings."
  }
];

export default function ClientShop() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  // Load products and cart
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setProducts(dummyProducts);
      setLoading(false);
    }, 500);
    
    // Load cart count from localStorage
    if (typeof window !== 'undefined') {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
    }
  }, []);

  // Handle add to cart
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault(); // Prevent navigation to product page
    e.stopPropagation(); // Prevent event bubbling
    
    if (addToCart(product)) {
      setCartCount(prev => prev + 1);
      
      // Dispatch a custom event to notify header of cart change
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('cartUpdated'));
      }
      
      alert(`${product.name} added to your Maibury cart!`);
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading products...</div>
      </div>
    );
  }

  return (
    <>
      {/* Shopping cart indicator */}
      {cartCount > 0 && (
        <div className="sticky top-20 z-10 bg-white shadow-md p-4 mb-4 rounded-md flex justify-between items-center">
          <div>
            <span className="font-medium">{cartCount} item{cartCount !== 1 ? 's' : ''} in cart</span>
          </div>
          <button 
            onClick={handleCheckout}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      )}

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="relative bg-white rounded overflow-hidden hover:shadow-md transition-shadow duration-300">
            {/* Product Image & Link */}
            <Link href={`/product/${product.id}`} className="block">
              <div className="relative h-48 bg-gray-100">
                <Image 
                  src={product.image} 
                  alt={product.name}
                  fill
                  className="object-contain p-2"
                />
                {product.discount && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
            </Link>
            
            {/* Product Info */}
            <div className="p-3">
              <Link href={`/product/${product.id}`} className="no-underline">
                <h3 className="text-gray-700 font-medium text-sm truncate">{product.name}</h3>
                
                {/* Price */}
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-lg font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>
                
                {/* Rating */}
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                </div>
                
                {/* Free delivery badge */}
                <div className="mt-2 text-xs text-green-600">Free Delivery</div>
              </Link>
              
              {/* Add to cart button */}
              <button
                onClick={(e) => handleAddToCart(e, product)}
                className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

