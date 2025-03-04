import React from "react";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { FiShoppingCart } from "react-icons/fi";  // Replace Iconify import
// import { Product } from "../types/product";

export interface Product {
  categories: string;
  category: string;
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="w-full">
      <CardBody className="p-0">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </CardBody>
      <CardFooter className="flex flex-col gap-2">
        <div className="flex justify-between items-center w-full">
          <div>
            <h4 className="font-semibold">{product.name}</h4>
            <p className="text-small text-default-500">${product.price}</p>
          </div>
          <Button
            isIconOnly
            color="primary"
            variant="flat"
            onPress={() => onAddToCart(product)}
          >
            <FiShoppingCart size={20} />  {/* Replace Iconify component */}
          </Button>
        </div>
        <p className="text-small text-default-500">{product.description}</p>
      </CardFooter>
    </Card>
  );
}
