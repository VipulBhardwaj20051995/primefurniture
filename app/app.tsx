import React from "react";
import { Navbar } from "@heroui/navbar";
import { NavbarBrand, NavbarContent } from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { Select, SelectItem } from "@heroui/select";
import { FiShoppingCart } from "react-icons/fi";
import { ProductCard, Product } from "../components/product-card";
import { CartDrawer } from "../components/cart-drawer";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
}

// Removed duplicate Product interface

export const products: Product[] = [
  // Add your product objects here
];

export const categories: string[] = [
  // Add your category strings here
];

export default function App() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  const filteredProducts = products.filter(
    (product) => selectedCategory === "all" || product.categories === selectedCategory
  );

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, category: product.category }];
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-default-50">
      <Navbar>
        <NavbarBrand>
          <h1 className="font-bold text-inherit">Shop</h1>
        </NavbarBrand>
        <NavbarContent justify="end">
          <Badge
            content={totalItems}
            color="primary"
            shape="circle"
            size="sm"
            isInvisible={totalItems === 0}
          >
            <Button
              variant="light"
              isIconOnly
              onPress={() => setIsCartOpen(true)}
            >
              <FiShoppingCart size={24} />
            </Button>
          </Badge>
        </NavbarContent>
      </Navbar>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Select
            label="Category"
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
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}
