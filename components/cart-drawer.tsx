import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter
} from "@heroui/drawer";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { FiX, FiShoppingCart, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

// Define CartItem interface directly in this file
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem
}: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerContent>
        <DrawerHeader className="flex justify-between">
          Shopping Cart
          <Button isIconOnly variant="light" onPress={onClose}>
            <FiX />
          </Button>
        </DrawerHeader>
        <DrawerBody>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <FiShoppingCart width={48} />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 items-center border-b pb-4"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-small text-default-500">
                      ${item.price * item.quantity}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="sm"
                        isIconOnly
                        variant="flat"
                        onPress={() =>
                          onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))
                        }
                      >
                        <FiMinus />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        size="sm"
                        isIconOnly
                        variant="flat"
                        onPress={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <FiPlus />
                      </Button>
                      <Button
                        size="sm"
                        isIconOnly
                        variant="light"
                        color="danger"
                        onPress={() => onRemoveItem(item.id)}
                      >
                        <FiTrash2 />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DrawerBody>
        <DrawerFooter>
          <div className="flex justify-between items-center w-full mb-4">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          <Button
            color="primary"
            className="w-full"
            isDisabled={items.length === 0}
          >
            Checkout
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
