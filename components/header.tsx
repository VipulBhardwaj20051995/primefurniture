"use client";

import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { FiUser, FiMenu, FiX, FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { products } from "@/data/products"; // Import products data
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";

// Define proper types
interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  category: string;
}

export const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isProductsLoaded, setIsProductsLoaded] = useState(false);
  
  // Ensure products are available
  useEffect(() => {
    if (products && Array.isArray(products)) {
      setIsProductsLoaded(true);
    }
  }, []);
  
  // Search products functionality
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length > 1 && isProductsLoaded) {
      try {
        const filtered = products.filter(product => 
          product?.name?.toLowerCase().includes(query.toLowerCase()) ||
          (product?.description && product.description.toLowerCase().includes(query.toLowerCase()))
        ).slice(0, 5); // Show max 5 results
        setSearchResults(filtered);
      } catch (error) {
        console.error("Error filtering products:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };
  
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

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

          {/* Search Bar - Desktop */}
          <div className="hidden md:block relative flex-grow max-w-md mx-4">
            <Popover placement="bottom">
              <form onSubmit={handleSearchSubmit} className="w-full">
                <PopoverTrigger>
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    startContent={<FiSearch />}
                    className="w-full"
                  />
                </PopoverTrigger>
              </form>
              {searchResults.length > 0 && (
                <PopoverContent className="w-full max-w-md p-2">
                  <ul className="divide-y">
                    {searchResults.map(product => (
                      <li key={product.id} className="py-2">
                        <Link 
                          href={`/product/${product.id}`}
                          className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded"
                          onClick={() => setSearchResults([])}
                        >
                          <div className="w-12 h-12 relative">
                            {product.image && (
                              <Image 
                                src={product.image} 
                                alt={product.name}
                                fill
                                sizes="48px"
                                className="object-cover rounded"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "/images/placeholder.jpg"; // Fallback image
                                }}
                              />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500">${product.price}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </PopoverContent>
              )}
            </Popover>
          </div>

          {/* Account & Mobile Menu Toggle */}
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
            {/* Mobile Search */}
            <div className="mb-4">
              <form onSubmit={handleSearchSubmit}>
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  startContent={<FiSearch />}
                  className="w-full"
                />
              </form>
              {searchResults.length > 0 && (
                <div className="mt-2 border rounded-md shadow-sm">
                  <ul className="divide-y">
                    {searchResults.map(product => (
                      <li key={product.id} className="py-2 px-3">
                        <Link 
                          href={`/product/${product.id}`}
                          className="flex items-center gap-3"
                          onClick={() => {
                            setSearchResults([]);
                            setIsMenuOpen(false);
                          }}
                        >
                          <div className="w-10 h-10 relative">
                            {product.image && (
                              <Image 
                                src={product.image} 
                                alt={product.name}
                                fill
                                sizes="40px"
                                className="object-cover rounded"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "/images/placeholder.jpg"; // Fallback image
                                }}
                              />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500">${product.price}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Navigation Links */}
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
