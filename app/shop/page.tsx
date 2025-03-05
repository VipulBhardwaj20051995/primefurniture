"use client";

import { useState, useEffect } from "react";
import { Badge } from "@heroui/badge";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { ProductCard } from "@/components/product-card";
import { useCartStore } from "@/store/cart";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products"; // Make sure you have this import

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const searchQuery = searchParams ? searchParams.get("search") || "" : "";
  
  // Use cart store for adding to cart only - NOT for displaying cart UI
  const { addToCart } = useCartStore();
  
  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter products by category and search query
  const filteredProducts = products.filter(
    (product) => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    }
  );

  const categories = ["all", "chairs", "tables", "sofas", "beds"];

  // Return a simple loading state before client-side hydration
  if (!mounted) {
    return <div className="min-h-screen p-8">Loading products...</div>;
  }

  return (
    <div className="min-h-screen bg-default-50">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">Shop Our Products</h1>
          
        
        </div>
        
        <div className="mb-6 max-w-xs">
          <Select
            label="Filter by Category"
            selectedKeys={[selectedCategory]}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <SelectItem key={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>
    </div>
  );
}