import React from "react";
import { Card, CardBody, CardFooter } from "@heroui/card";
import Image from "next/image";
import { Button } from "@heroui/button";
import { FiShoppingCart } from "react-icons/fi";  // Replace Iconify import

// Update the Product interface to match your actual data
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string; // Changed from categories to category
  description?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardBody className="p-0">
        <div className="aspect-square relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </CardBody>
      <CardFooter className="flex flex-col items-start gap-2">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <span className="text-xl font-bold">${product.price}</span>
        <Button 
          color="primary" 
          className="w-full" 
          onPress={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
