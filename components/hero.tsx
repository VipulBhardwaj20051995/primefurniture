import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const categories = [
  {
    name: "Home Decor",
    subcategories: ["Luxury", "Affordable", "Premium", "Chinese", "Japani", "American", "Indian"],
  },
  {
    name: "Carpets",
    subcategories: ["Luxury", "Affordable", "Premium", "Handmade", "Machine-made"],
  },
  {
    name: "Chairs",
    subcategories: ["Luxury", "Affordable", "Premium", "Wooden", "Plastic", "Office Chairs"],
  },
  {
    name: "Sofa",
    subcategories: ["Luxury", "Affordable", "Premium", "Leather", "Fabric", "Wooden"],
  },
  {
    name: "Carpets Set",
    subcategories: ["Luxury", "Affordable", "Premium", "Handmade", "Machine-made"],
  },
  {
    name: "Chairs Set",
    subcategories: ["Luxury", "Affordable", "Premium", "Wooden", "Plastic", "Office Chairs"],
  },
  {
    name: "Sofa Set",
    subcategories: ["Luxury", "Affordable", "Premium", "Leather", "Fabric", "Wooden"],
  },
  {
    name: "Wooden Furniture",
    subcategories: ["Luxury", "Affordable", "Premium", "Wooden", "Plastic", "Office Chairs"],
  },
  {
    name: "Tabels",
    subcategories: ["Luxury", "Affordable", "Premium", "Leather", "Fabric", "Wooden"],
  },
];

export const Hero = () => {
  const router = useRouter();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section className="relative w-full h-[70vh] flex">
      {/* Sidebar Category */}
      <aside className="w-1/4 bg-white dark:bg-gray-900 p-6 shadow-lg relative">
        <ul className="space-y-3">
          {categories.map((category, index) => (
            <li
              key={index}
              className="relative cursor-pointer text-base font-medium transition-colors duration-300 hover:text-red-500 text-gray-700 dark:text-gray-300"
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {category.name}

              {/* Dropdown Menu */}
              {hoveredCategory === category.name && (
                <ul className="absolute left-full top-0 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 
                  transition-opacity duration-200 z-50 border border-gray-200 dark:border-gray-700">
                  {category.subcategories.map((sub, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-700 dark:text-gray-300 hover:text-red-500 py-1 cursor-pointer transition-colors"
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

      {/* Hero Section */}
      <div className="relative w-3/4 flex items-center justify-center text-center bg-black">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/hero.png" // Replace with actual image path
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
