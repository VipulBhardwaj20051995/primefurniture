"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@heroui/badge";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { FiShoppingCart } from "react-icons/fi";
import { Product, ProductCard } from "@/components/product-card";
import { CartDrawer } from "@/components/cart-drawer";
import { useCartStore } from "@/store/cart";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
// Sample product data (move this to a dedicated file later)
const products: Product[] = [
  {
    id: "1",
    name: "Modern Sofa",
    description: "Comfortable modern sofa with premium materials",
    price: 899,
    image: "hero.png",
    category: "sofas",
    categories: "sofas"
  },
  
    {
        id: "2",
        name: "Elegant Chair",
        description: "Elegant chair made with high-quality materials",
        price: 299,
        image: "bed.png",
        category: "chairs",
        categories: "chairs"
    },
    
    {
        id: "3",
        name: "Solid Wood Table",
        description: "Solid wood table with a classic design",
        price: 499,
        image: "table.png",
        category: "tables",
        categories: "tables"
    },
    
    {
        id: "4",
        name: "King-sized Bed",
        description: "King-sized bed with a modern design",
        price: 799,
        image: "bed.png",
        category: "beds",
        categories: "beds"
    }
    
    ,
    {
        id: "5",
        name: "Modern Sofa",
        description: "Comfortable modern sofa with premium materials",
        price: 899,
        image: "sofa1.png",
        category: "sofas",
        categories: "sofas"
    },

    {
        id: "6",
        name: "Elegant Chair",
        description: "Elegant chair made with high-quality materials",
        price: 299,
        image: "chair.png",
        category: "chairs",
        categories: "chairs"
    },

    {
        id: "7",
        name: "Solid Wood Table",
        description: "Solid wood table with a classic design",
        price: 499,
        image: "table.png",
        category: "tables",
        categories: "tables"
    },

    {
        id: "8",
        name: "King-sized Bed",
        description: "King-sized bed with a modern design",
        price: 799,
        image: "bed.png",
        category: "beds",
        categories: "beds"
    }
    ,
    {
        id: "9",
        name: "Wardrobe",
        description: "Comfortable modern sofa with premium materials",
        price: 899,
        image: "wardrobe.png",
        category: "sofas",
        categories: "sofas"
    },

    {
        id: "10",
        name: "Elegant Chair",
        description: "Elegant chair made with high-quality materials",
        price: 299,
        image: "chair.png",
        category: "chairs",
        categories: "chairs"
    },

    {
        id: "11",
        name: "Solid Wood Table",
        description: "Solid wood table with a classic design",
        price: 499,
        image: "table.png",
        category: "tables",
        categories: "tables"
    },

    {
        id: "12",
        name: "King-sized Bed",
        description: "King-sized bed with a modern design",
        price: 799,
        image: "bed.png",
        category: "beds",
        categories: "beds"
    }
    ,
    {
        id: "13",
        name: "Wardrobe",
        description: "Comfortable modern sofa with premium materials",
        price: 899,
        image: "wardrobe.png",
        category: "sofas",
        categories: "sofas"
    },

    {
        id: "14",
        name: "Elegant Chair",
        description: "Elegant chair made with high-quality materials",
        price: 299,
        image: "chair.png",
        category: "chairs",
        categories: "chairs"
    },

    {
        id: "15",
        name: "Solid Wood Table",
        description: "Solid wood table with a classic design",
        price: 499,
        image: "table.png",
        category: "tables",
        categories: "tables"
    },

    {
        id: "16",
        name: "King-sized Bed",
        description: "King-sized bed with a modern design",
        price: 799,
        image: "bed.png",
        category: "beds",
        categories: "beds"
    }
    ,
    {
        id: "17",
        name: "Wardrobe",
        description: "Comfortable modern sofa with premium materials",
        price: 899,
        image: "wardrobe.png",
        category: "sofas",
        categories: "sofas"
    },

    {
        id: "18",
        name: "Elegant Chair",
        description: "Elegant chair made with high-quality materials",
        price: 299,
        image: "chair.png",
        category: "chairs",
        categories: "chairs"
    },

    {
        id: "19",
        name: "Solid Wood Table",
        description: "Solid wood table with a classic design",
        price: 499,
        image: "table.png",
        category: "tables",
        categories: "tables"
    },

    {
        id: "20",
        name: "King-sized Bed",
        description: "King-sized bed with a modern design",
        price: 799,
        image: "bed.png",
        category: "beds",
        categories: "beds"
    }
    ,
    {
        id: "21",
        name: "Wardrobe",
        description: "Comfortable modern sofa with premium materials",
        price: 899,
        image: "wardrobe.png",
        category: "sofas",
        categories: "sofas"
    },

    {
        id: "22",
        name: "Elegant Chair",
        description: "Elegant chair made with high-quality materials",
        price: 299,
        image: "chair.png",
        category: "chairs",
        categories: "chairs"
    },

    {
        id: "23",
        name: "Solid Wood Table",
        description: "Solid wood table with a classic design",
        price: 499,
        image: "table.png",
        category: "tables",
        categories: "tables"
    },

    {
        id: "24",
        name: "King-sized Bed",
        description: "King-sized bed with a modern design",
        price: 799,
        image: "bed.png",
        category: "beds",
        categories: "beds"
    }
    ,
    {
        id: "25",
        name: "Wardrobe",
        description: "Comfortable modern sofa with premium materials",
        price: 899,
        image: "wardrobe.png",
        category: "sofas",
        categories: "sofas"
    },

    {
        id: "26",
        name: "Elegant Chair",
        description: "Elegant chair made with high-quality materials",
        price: 299,
        image: "chair.png",
        category: "chairs",
        categories: "chairs"
    },

    {
        id: "27",
        name: "Solid Wood Table",
        description: "Solid wood table with a classic design",
        price: 499,
        image: "table.png",
        category: "tables",
        categories: "tables"
    },

    {
        id: "28",
        name: "King-sized Bed",
        description: "King-sized bed with a modern design",
        price: 799,
        image: "bed.png",
        category: "beds",
        categories: "beds"
    }
  // Add more products as needed
];

const categories: string[] = ["all", "chairs", "tables", "sofas", "beds"];

export default function ShopPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const { cartItems, isCartOpen, toggleCart, addToCart, updateQuantity, removeItem } = useCartStore();

  const filteredProducts = products.filter(
    (product) => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    }
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-default-50">
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
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

      <CartDrawer
        isOpen={isCartOpen}
        onClose={toggleCart}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </div>
  );
}