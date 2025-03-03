import { useRef, useState, useEffect } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { FaArrowLeft, FaArrowRight, FaEye, FaHeart } from "react-icons/fa";

const products = [
  { name: "HAVIT HV-G92 Sofa", price: "$120", oldPrice: "$160", discount: "-40%", rating: 88, image: "sofa.png" },
  { name: "AK-900 Carpets", price: "$960", oldPrice: "$1160", discount: "-35%", rating: 75, image: "carpet.png" },
  { name: "Premium Chair", price: "$370", oldPrice: "$400", discount: "-30%", rating: 99, image: "chair.png" },
  { name: "S-Series Comfort Chair", price: "$375", oldPrice: "$400", discount: "-25%", rating: 99, image: "sofa1.png" },
];

export const Sale = () => {  
  const scrollRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 23, minutes: 19, seconds: 56 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) { minutes--; seconds = 59; }
        else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
        else if (days > 0) { days--; hours = 23; minutes = 59; seconds = 59; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full p-4">
      <h2 className="text-red-600 text-sm font-semibold">Today's</h2>
      <h1 className="text-2xl font-bold mb-4">Flash Sales</h1>
      <div className="flex space-x-4 mb-4">
        <p>Days: {timeLeft.days}</p>
        <p>Hours: {timeLeft.hours}</p>
        <p>Minutes: {timeLeft.minutes}</p>
        <p>Seconds: {timeLeft.seconds}</p>
      </div>
      <div className="relative flex items-center w-full">
        <button className="absolute left-0 p-2 bg-white shadow-md rounded-full z-10">
          <FaArrowLeft />
        </button>
        <div ref={scrollRef} className="flex space-x-6 overflow-x-auto scrollbar-hide px-8 w-full" style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}>
          {products.map((product, index) => (
            <Card key={index} className="w-64 h-auto flex flex-col shadow-lg rounded-lg overflow-hidden relative">
              <CardHeader className="bg-gray-100 relative flex justify-center items-center">
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">{product.discount}</span>
                <img src={product.image} alt={product.name} className="w-full h-40 object-contain" />
              </CardHeader>
              <CardBody className="p-4 flex flex-col items-center text-center">
                <p className="text-sm font-semibold mb-1">{product.name}</p>
                <p className="text-red-500 text-lg font-bold">{product.price} <span className="text-gray-400 line-through text-sm">{product.oldPrice}</span></p>
                <p className="text-yellow-500 text-sm">⭐ {product.rating}</p>
                <div className="flex justify-between mt-3 w-full px-4">
                  <button className="p-2 bg-gray-200 rounded-full"><FaHeart size={16} /></button>
                  <button className="p-2 bg-gray-200 rounded-full"><FaEye size={16} /></button>
                  <Button radius="full" className="bg-black text-white px-4 py-2 text-sm">Add To Cart</Button>
                </div>
              </CardBody>
              <CardFooter className="flex justify-between p-2 text-xs text-gray-500">
                <p>Hurry Up</p>
                <p>41:00</p>
              </CardFooter>
            </Card>
          ))}
        </div>
        <button className="absolute right-0 p-2 bg-white shadow-md rounded-full z-10">
          <FaArrowRight />
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <Button radius="full" className="bg-red-500 text-white px-4 py-2 text-sm">View All Products</Button>
      </div>
    </div>
  );
};
