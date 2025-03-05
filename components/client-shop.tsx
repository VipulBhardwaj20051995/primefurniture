"use client";

import { useState, useEffect } from "react";
import { Select, SelectItem } from "@heroui/select";
import { ProductCard } from "@/components/product-card";
import { useCartStore } from "@/store/cart";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products"; // Make sure this exists

// Define the Product interface here instead of importing from a non-existent file
interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  category: string;
  categories?: string | string[]; // Make categories optional or accept strings
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

interface ProductWithCategories extends Product {
  categories: string[];
}

// Your component should be the default export
export default function ClientShop() {
  // Component state
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [mounted, setMounted] = useState(false);
  
  // Get search params for filtering
  const searchParams = useSearchParams();
  const searchQuery = searchParams ? searchParams.get("search") || "" : "";
  
  // Get addToCart function from your cart store
  const { addToCart } = useCartStore();
  
  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter products based on category and search
  const filteredProducts = products ? products.filter(
    (product) => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    }
  ) : [];

  // In your ClientShop component
  const transformedProducts = products.map(product => ({
    ...product,
    categories: product.categories ? 
      (typeof product.categories === 'string' ? [product.categories] : product.categories) : 
      [product.category]
  }));

  // Then in your JSX:
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {transformedProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={addToCart}
        />
      ))}
    </div>
  );
}

