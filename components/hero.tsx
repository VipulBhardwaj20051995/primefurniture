import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const categories = [
  "Home Decore",
  "Carpets",
  "Chairs",
  "Sofa",
  "Table",
  "Baby Furniture",
  "Relax Chair",
  "Premium Carpets",
  "Premium Wood",
];

export const Hero = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <section className="relative w-full h-[70vh] flex">
      {/* Sidebar Category */}
      <div className="w-1/4 bg-white p-6 shadow-lg">
        <ul className="space-y-3">
          {categories.map((category, index) => (
            <li
              key={index}
              className={`cursor-pointer text-base font-medium hover:text-red-500 ${
                selectedCategory === category ? "text-red-500" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

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

        {/* Shop Now Button - Positioned Bottom Left */}
        <Button
          className="absolute bottom-5 left-5 px-5 py-2 bg-white text-black font-medium hover:bg-gray-300 transition rounded-full shadow-lg"
          onPress={() => router.push("/shop")}
        >
          Shop Now
        </Button>
      </div>
    </section>
  );
};
