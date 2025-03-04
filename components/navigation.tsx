"use client";

import {
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";

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
import { FiLogOut, FiSettings, FiShoppingBag, FiUser, FiShoppingCart } from "react-icons/fi";
import { useCartStore } from "@/store/cart";
import Image from "next/image";
import { useState, useEffect } from "react";

export const Navigation = () => {
  const router = useRouter();
  // Replace AWS Amplify authentication with a simple state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Use cart store to get cart items and toggle function
  const { cartItems, toggleCart } = useCartStore();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <Navbar maxWidth="xl" position="sticky" isBordered isBlurred={false}>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <span className="text-2xl font-bold">Prime Furniture</span>  
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="start">
        <ul className="hidden lg:flex gap-4 ml-2">
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
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {/* Shopping Cart */}
        <NavbarItem className="hidden sm:flex gap-2">
          <Badge color="danger" content={totalItems} shape="circle" isInvisible={totalItems === 0}>
            <Button isIconOnly radius="full" variant="light" onPress={toggleCart}>
              <FiShoppingCart size={24} />
            </Button>
          </Badge>
        </NavbarItem>
        
        <NavbarItem className="hidden sm:flex gap-2">
          {isAuthenticated ? <Dropdown placement="bottom-start">
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
          </Dropdown> : 
          <Button className="bg-black text-white dark:bg-white dark:text-black"
           radius="full" onPress={() => router.push("/auth")}>Login</Button>
          }
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {/* Mobile cart icon */}
        <Badge color="danger" content={totalItems} shape="circle" isInvisible={totalItems === 0}>
          <Button isIconOnly radius="full" variant="light" onPress={toggleCart}>
            <FiShoppingCart size={20} />
          </Button>
        </Badge>
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarMenu>
        {/* Add cart here as well for mobile */}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
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
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          <Divider className="m-3"></Divider>
          {!isAuthenticated ?
            <NavbarMenuItem key={`signin`}>
              <Button radius="sm" color="primary" onPress={() => router.push("/auth")}>Login</Button>
            </NavbarMenuItem> :
            <NavbarMenuItem key={`signout`}>
              <Button 
                radius="sm" 
                color="danger" 
                onPress={() => setIsAuthenticated(false)}
              >
                Logout
              </Button>
            </NavbarMenuItem>
          }
        </div>
      </NavbarMenu>
    </Navbar>
  );
};