import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { FaCouch, FaChair, FaBed, FaLightbulb, FaTree } from "react-icons/fa";

const categories = [
  { name: "Home Decor", icon: <FaLightbulb />, subcategories: ["Luxury", "Affordable", "Premium", "Handmade", "Vintage", "Boho"] },
  { name: "Carpets & Rugs", icon: <FaCouch />, subcategories: ["Luxury", "Affordable", "Persian", "Woolen", "Silk", "Shaggy"] },
  { name: "Chairs & Seating", icon: <FaChair />, subcategories: ["Office Chairs", "Recliners", "Gaming Chairs", "Bean Bags"] },
  { name: "Sofas & Couches", icon: <FaCouch />, subcategories: ["Leather", "Fabric", "Wooden", "L-Shaped", "Convertible"] },
  { name: "Dining Sets", icon: <FaCouch />, subcategories: ["Luxury", "Wooden", "Glass-Top", "Modern", "Classic"] },
  { name: "Bedroom Furniture", icon: <FaBed />, subcategories: ["Beds", "Wardrobes", "Side Tables", "Dressing Table"] },
];

export const Hero = () => {
  const router = useRouter();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section className="relative w-full h-[70vh] flex flex-col md:flex-row">
      {/* Sidebar Category - Hidden on Mobile */}
      <aside className="hidden md:block md:w-1/5 lg:w-1/5 bg-white dark:bg-gray-900 p-5 shadow-lg rounded-lg">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li
              key={index}
              className="relative flex items-center justify-between text-base font-semibold text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="flex items-center space-x-2">
                {category.icon} <span>{category.name}</span>
              </div>
              <FiChevronRight className="text-gray-500 hidden md:inline-block" />

              {/* Dropdown Menu */}
              {hoveredCategory === category.name && (
                <ul className="absolute md:left-full left-0 top-full md:top-0 w-full md:w-52 min-w-full bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 border border-gray-200 dark:border-gray-700 transition-opacity duration-300 z-50">
                  {category.subcategories.map((sub, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-700 dark:text-gray-300 hover:text-red-500 py-1 px-3 cursor-pointer transition"
                    >
                      {sub}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Hero Section - Full Width on Mobile */}
      <div className="relative w-full flex-1 flex items-center justify-center text-center bg-black">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/hero.png"
            alt="Furniture Display"
            layout="fill"
            objectFit="cover"
            className="opacity-90"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl text-white text-left px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Up to 10% off Voucher
          </h1>
          <p className="text-base md:text-lg mb-5">
            Explore our premium furniture collection and upgrade your home today.
          </p>
        </div>

        {/* Shop Now Button */}
        <Button
          className="absolute bottom-5 left-5 px-5 py-2 bg-white text-black font-medium hover:bg-gray-300 transition rounded-full shadow-lg"
          onClick={() => router.push("/shop")}
        >
          Shop Now
        </Button>
      </div>
    </section>
  );
};
