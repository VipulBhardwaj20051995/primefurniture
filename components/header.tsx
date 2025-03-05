"use client";

import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@heroui/button";
import { FiUser, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { siteConfig } from "@/config/site";

export const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">Prime Furniture</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {siteConfig.navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className="text-gray-600 hover:text-black transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Account & Mobile Menu Toggle only (removed cart) */}
          <div className="flex items-center space-x-4">
            {/* Account */}
            <Button isIconOnly radius="full" variant="light" onPress={() => router.push("/auth")}>
              <FiUser size={24} />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button 
              isIconOnly 
              radius="full" 
              variant="light" 
              className="md:hidden"
              onPress={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t">
            <ul className="flex flex-col space-y-4">
              {siteConfig.navItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    className="text-gray-600 hover:text-black transition-colors block py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};
