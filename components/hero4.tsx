import { Button } from "@aws-amplify/ui-react";
import React from "react";

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
      title: "New",
      description: "Exclusive and stylish new furniture collection.",
      image: "/chair.png",
    },
  ];

  return (
    <div className="w-full p-6 border rounded-lg bg-gray-100">
      <h3 className="text-red-500 font-semibold">Featured</h3>
      <h2 className="text-2xl font-bold">New Arrival</h2>
      <div className="flex space-x-4 mt-4 overflow-hidden overflow-x-auto">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-black text-white rounded-lg relative w-80 flex-shrink-0 p-4"
          >
            <div className="w-full flex justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="w-40 h-40 object-contain rounded-lg"
                onError={(e) => (e.currentTarget.src = "/default-image.png")}
              />
            </div>
            <div className="absolute top-3 left-3 text-sm bg-white text-black px-2 py-1 rounded">
              {product.title}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p className="text-gray-300">{product.description}</p>
              <Button
                className="mt-3 bg-white text-black px-6 py-2 rounded-full font-semibold"
              >
                Shop Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero4;
