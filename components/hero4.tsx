import { Button } from "@aws-amplify/ui-react";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Hero4 = () => {
  const products = [
    {
      title: "Sofa",
      description: "Grey and White version of the Sofa coming out on sale.",
      image: "/sofa.png",
    },
    {
      title: "Carpet",
      description: "Modern wooden dining table set available soon.",
      image: "/carpet.png",
    },
    {
      title: "Chair",
      description: "Stylish and comfortable armchair launching soon.",
      image: "/chair.png",
    },
    {
      title: "Table",
      description: "Elegant and sturdy dining table, perfect for your home.",
      image: "/table.png",
    },
    {
      title: "Bed",
      description: "Premium quality bed with a modern aesthetic.",
      image: "/bed.png",
    },
    {
      title: "Wardrobe",
      description: "Spacious wardrobe with stylish design and durability.",
      image: "/wardrobe.png",
    },
  ];

  return (
    <div className="w-full p-6 border rounded-lg bg-darkgray-50 shadow-lg">
      <h3 className="text-red-500 font-semibold">Featured Collection</h3>
      <h2 className="text-3xl font-bold text-gray-800">New Arrivals</h2>
      <div className="flex space-x-6 mt-6 overflow-hidden overflow-x-auto scrollbar-hide p-2">
        {products.map((product, index) => (
          <div
            key={index}
            style={{ backgroundColor: "#f0f0f0" }} // Change to any color you want

            className="bg-white text-black rounded-lg w-72 flex-shrink-0 p-4 shadow-md hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="w-full flex justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="w-40 h-40 object-contain rounded-lg"
                onError={(e) => (e.currentTarget.src = "/default-image.png")}
              />
            </div>
            <div className="absolute top-3 left-3 text-xs bg-red-500 text-white px-2 py-1 rounded">
              {product.title}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <Button className="mt-3 bg-red-500 text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-red-600 transition">
                Shop Now <FaArrowRight />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero4;
