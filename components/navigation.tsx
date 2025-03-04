"use client";

import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Input } from "@heroui/input"; // Add this for search
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
import { useRouter } from "next/navigation";
import { FiLogOut, FiSettings, FiUser, FiShoppingCart, FiSearch } from "react-icons/fi";
import { CartItem, useCartStore } from "@/store/cart";

export const Navigation = () => {
  const router = useRouter();
  // Client-side state initialization
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [clientCartItems, setClientCartItems] = useState<CartItem[]>([]);
  const [clientTotalItems, setClientTotalItems] = useState(0);
  
  // Get cart store
  const { cartItems, toggleCart } = useCartStore();
  
  // Use useEffect to handle client-side operations to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    // Update cart items after component mounts to prevent hydration mismatch
    setClientCartItems(cartItems);
    setClientTotalItems(cartItems.reduce((sum, item) => sum + item.quantity, 0));
  }, [cartItems]);

  // Handle search form submission
  const handleSearch = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };
  
  // Only render meaningful content after mounting on client
  if (!mounted) {
    // Return a skeleton with similar structure to prevent layout shifts
    return (
      <Navbar maxWidth="xl" position="sticky" isBordered>
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="div" className="gap-3 max-w-fit">
            <span className="text-2xl font-bold">Prime Furniture</span>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <div style={{ width: '24px', height: '24px' }}></div>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    );
  }
  
  return (
    <Navbar 
      maxWidth="xl" 
      position="sticky" 
      isBordered 
      isBlurred={false}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <span className="text-2xl font-bold">Prime Furniture</span>  
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      
      {/* Navigation Links - Desktop */}
      <NavbarContent justify="start" className="hidden lg:flex">
        <ul className="flex gap-4 ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
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
      
      {/* Search Bar - Desktop */}
      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="center">
        <form onSubmit={handleSearch} className="max-w-xs w-full">
          <Input
            classNames={{
              base: "max-w-full h-10",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20",
            }}
            placeholder="Search products..."
            size="sm"
            startContent={<FiSearch size={18} />}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </NavbarContent>
      
      {/* Cart and User - Desktop */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {/* Shopping Cart */}
        <NavbarItem className="hidden sm:flex gap-2">
          <Badge color="danger" content={clientTotalItems} shape="circle" isInvisible={clientTotalItems === 0}>
            <Button isIconOnly radius="full" variant="light" onPress={toggleCart}>
              <FiShoppingCart size={24} />
            </Button>
          </Badge>
        </NavbarItem>
        
        {/* User Account */}
        <NavbarItem className="hidden sm:flex gap-2">
          {isAuthenticated ? (
            <Dropdown placement="bottom-start">
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
                <DropdownItem key="user" className="h-14 gap-2">
                  <p className="font-bold">Signed in as</p>
                  <p className="font-bold">User</p>
                </DropdownItem>
                <DropdownItem key="profile" startContent={<FiUser />}>
                  Profile
                </DropdownItem>
                <DropdownItem key="settings" startContent={<FiSettings />}>
                  Settings
                </DropdownItem>
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
              onPress={() => router.push("/auth")}>
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
      
      {/* Mobile Cart and Toggle */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {/* Mobile cart icon */}
        <Badge color="danger" content={clientTotalItems} shape="circle" isInvisible={clientTotalItems === 0}>
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
        
        {/* Mobile navigation links */}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item.href}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={item.href}
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          <Divider className="m-3"></Divider>
          {!isAuthenticated ? (
            <NavbarMenuItem key={`signin`}>
              <Button 
                radius="sm" 
                color="primary" 
                onPress={() => {
                  router.push("/auth");
                  setIsMenuOpen(false);
                }}
              >
                Login
              </Button>
            </NavbarMenuItem>
          ) : (
            <NavbarMenuItem key={`signout`}>
              <Button 
                radius="sm" 
                color="danger" 
                onPress={() => {
                  setIsAuthenticated(false);
                  setIsMenuOpen(false);
                }}
              >
                Logout
              </Button>
            </NavbarMenuItem>
          )}
        </div>
      </NavbarMenu>
    </Navbar>
  );
};