import { Button } from "@aws-amplify/ui-react";
import { useState } from "react";
import { FaHeart, FaEye } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const Hero3 = () => {
  const products = [
    { name: "Chair", price: "$100", rating: 2.5, reviews: 35, image: "chair.png" },
    { name: "Carpets", price: "$360", rating: 4, reviews: 95, image: "carpet.png" },
    { name: "Chair", price: "$700", rating: 5, reviews: 325, image: "chair.png" },
    { name: "Sofa", price: "$500", rating: 4, reviews: 145, image: "sofa.png" },
    { name: "Carpets", price: "$960", rating: 5, reviews: 65, image: "sofa1.png", new: true },
    { name: "Carpets", price: "$1160", rating: 4.5, reviews: 35, image: "carpet.png", new: true },
    { name: "Carpets", price: "$660", rating: 4.5, reviews: 55, image: "chair.png" },
    { name: "Table", price: "$250", rating: 4, reviews: 20, image: "chair.png" }
  ];

  return (
    <section className="p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Explore Our Products</h2>
        <div className="flex space-x-2">
          <button className="p-2 border rounded-full hover:bg-gray-200 transition"><IoIosArrowBack /></button>
          <button className="p-2 border rounded-full hover:bg-gray-200 transition"><IoIosArrowForward /></button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {products.map((product, index) => (
          <div key={index} className="border p-4 rounded-lg relative shadow-md">
            {/* New Badge */}
            {product.new && (
              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                NEW
              </span>
            )}

            {/* Product Image */}
            <div className="w-full h-40 flex justify-center items-center overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-w-full max-h-full object-cover"
                onError={(e) => e.currentTarget.src = "default-image.png"} 
              />
            </div>

            {/* Product Info */}
            <div className="flex justify-between items-center mt-2">
              <h3 className="font-semibold">{product.name}</h3>
              <div className="flex space-x-2">
                <button className="hover:text-red-500 transition"><FaHeart /></button>
                <button className="hover:text-blue-500 transition"><FaEye /></button>
              </div>
            </div>

            <p className="text-red-500 font-bold">{product.price}</p>

            {/* Rating & Reviews */}
            <div className="flex items-center space-x-1">
              <span className="text-yellow-500">{"⭐".repeat(Math.floor(product.rating))}</span>
              <span className="text-gray-400">({product.reviews})</span>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-6">
        <Button 
          className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
        >
          View All Products
        </Button>
      </div>
    </section>
  );
};
