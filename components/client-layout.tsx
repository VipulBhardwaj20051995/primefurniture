"use client";

import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Input } from "@heroui/input";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { Divider } from "@heroui/divider";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@heroui/dropdown";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import { Link } from "@heroui/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FiLogOut, FiSettings, FiUser, FiShoppingCart, FiSearch } from "react-icons/fi";
import { useCartStore } from "@/store/cart";
import Image from "next/image";
import { CartDrawer } from "./cart-drawer";
import { Banner } from "./banner";

export const Navigation = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Use cart store to get cart items and toggle function
  const { cartItems, toggleCart } = useCartStore();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page with the query
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  return (
    <Navbar maxWidth="xl" position="sticky" isBordered isBlurred={false}>
      <NavbarContent className="basis-1/5 sm:basis-1/4" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <span className="text-2xl font-bold">Prime Furniture</span>  
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Main Navigation Links - Center */}
      <NavbarContent justify="center" className="hidden lg:flex">
        <ul className="flex gap-4 ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* Search Bar and Cart - Right */}
      <NavbarContent justify="end" className="basis-1/3">
        {/* Search Bar */}
        <NavbarItem className="hidden sm:flex flex-1 max-w-xs">
          <form onSubmit={handleSearch} className="w-full">
            <Input
              classNames={{
                base: "max-w-full h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Search products..."
              size="sm"
              startContent={<FiSearch size={18} />}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </NavbarItem>
        
        {/* Shopping Cart */}
        <NavbarItem>
          <Badge color="danger" content={totalItems} shape="circle" isInvisible={totalItems === 0}>
            <Button isIconOnly radius="full" variant="light" onPress={toggleCart}>
              <FiShoppingCart size={24} />
            </Button>
          </Badge>
        </NavbarItem>
        
        {/* User Account */}
        <NavbarItem className="hidden sm:flex">
          {isAuthenticated ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  size="sm"
                  className="transition-transform"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" startContent={<FiUser />}>Profile</DropdownItem>
                <DropdownItem key="settings" startContent={<FiSettings />}>Settings</DropdownItem>
                <DropdownItem 
                  key="logout" 
                  color="danger" 
                  startContent={<FiLogOut />}
                  onPress={() => setIsAuthenticated(false)}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button 
              className="bg-black text-white dark:bg-white dark:text-black"
              radius="full" 
              onPress={() => router.push("/auth")}
            >
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu and search */}
      <NavbarContent className="sm:hidden" justify="end">
        <Badge color="danger" content={totalItems} shape="circle" isInvisible={totalItems === 0}>
          <Button isIconOnly radius="full" variant="light" onPress={toggleCart}>
            <FiShoppingCart size={20} />
          </Button>
        </Badge>
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        {/* Search bar for mobile */}
        <div className="mt-4 mb-6">
          <form onSubmit={handleSearch}>
            <Input
              placeholder="Search products..."
              startContent={<FiSearch size={18} />}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        
        {/* Navigation links for mobile */}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color="foreground"
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          
          <Divider className="my-3" />
          
          {!isAuthenticated ? (
            <NavbarMenuItem>
              <Button radius="sm" color="primary" onPress={() => router.push("/auth")}>
                Login
              </Button>
            </NavbarMenuItem>
          ) : (
            <NavbarMenuItem>
              <Button radius="sm" color="danger" onPress={() => setIsAuthenticated(false)}>
                Logout
              </Button>
            </NavbarMenuItem>
          )}
        </div>
      </NavbarMenu>
    </Navbar>
  );
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Add a mounting state to prevent hydration issues
  const [isClient, setIsClient] = useState(false);
  
  // Get cart store
  const { cartItems, isCartOpen, toggleCart, updateQuantity, removeItem } = useCartStore();
  
  // Initialize store on client-side only
  useEffect(() => {
    setIsClient(true);
    useCartStore.persist.rehydrate();
  }, []);
  
  // Return a simpler version on server-side to avoid hydration mismatches
  if (!isClient) {
    return (
      <>
        <Banner />
        <div className="hidden">Loading...</div>
        <main>{children}</main>
      </>
    );
  }
  
  return (
    <>
      <Banner />
      <Navigation />
      <main>{children}</main>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={toggleCart}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </>
  );
}