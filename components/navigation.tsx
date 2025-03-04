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

import { useAuthenticator } from '@aws-amplify/ui-react'
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import { Link } from "@heroui/link";
import { useRouter } from "next/navigation";
import { FiLogOut, FiSettings, FiShoppingBag, FiUser } from "react-icons/fi";

import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";

export const Navigation = () => {
  const router = useRouter();
  const { authStatus, user, signOut } = useAuthenticator((context) => [context.authStatus, context.user]);
  return (
    <Navbar maxWidth="xl" position="sticky" isBordered isBlurred={false}>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            {/* <Image src="/brand.svg" alt="logo" width={150} height={50} /> */}
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
        <NavbarItem className="hidden sm:flex gap-2">
          <Badge color="danger" content="1" shape="circle">
            <Button isIconOnly  radius="full" variant="light">
              <FiShoppingBag size={24} />
            </Button>
          </Badge>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2">
          {authStatus === "authenticated" ? <Dropdown placement="bottom-start">
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
                <p className="font-bold">Yashdeep Sharma</p>
              </DropdownItem>
              <DropdownItem key="profile" startContent={<FiUser />}>
                Profile
              </DropdownItem>
              <DropdownItem key="settings" startContent={<FiSettings />}>
                Settings
              </DropdownItem>
              <DropdownItem key="logout" color="danger" startContent={<FiLogOut />} onPress={signOut}>
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
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarMenu>
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
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          <Divider className="m-3"></Divider>
          {authStatus !== "authenticated" ?
            <NavbarMenuItem key={`signin`}>
              <Button radius="sm" color="primary" onPress={() => router.push("/auth")}>Login</Button>
            </NavbarMenuItem> :
            <NavbarMenuItem key={`signout`}>
              <Button radius="sm" color="danger" onPress={signOut}>Logout</Button>
            </NavbarMenuItem>
          }
        </div>
      </NavbarMenu>
    </Navbar>
  )
}