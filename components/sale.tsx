import { Button } from "@aws-amplify/ui-react";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaEye, FaHeart } from "react-icons/fa";

const products = [
  { name: "HAVIT HV-G92 Sofa", price: "$120", oldPrice: "$160", discount: "-40%", rating: 88, image: "sofa.png" },
  { name: "AK-900 Carpets", price: "$960", oldPrice: "$1160", discount: "-35%", rating: 75, image: "carpet.png" },
  { name: "Premium Chair", price: "$370", oldPrice: "$400", discount: "-30%", rating: 99, image: "chair.png" },
  { name: "Comfort Chair", price: "$375", oldPrice: "$400", discount: "-25%", rating: 99, image: "sofa1.png" },
  { name: "Modern Table", price: "$250", oldPrice: "$300", discount: "-20%", rating: 85, image: "table.png" },
  { name: "Luxury Bed", price: "$800", oldPrice: "$1000", discount: "-25%", rating: 92, image: "bed.png" },
  { name: "Office Desk", price: "$450", oldPrice: "$500", discount: "-10%", rating: 78, image: "desk.png" },
  { name: "Gaming Chair", price: "$500", oldPrice: "$600", discount: "-15%", rating: 90, image: "gaming_chair.png" },
];

export const Sale = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
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

  const scroll = (direction: string) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-red-600 text-sm font-semibold">Today's</h2>
      <h1 className="text-2xl font-bold mb-4">Flash Sales</h1>
      
      {/* Timer UI */}
      <div className="flex space-x-4 mb-4 text-lg font-semibold text-red-500">
        <p>{timeLeft.days}d</p>
        <p>{timeLeft.hours}h</p>
        <p>{timeLeft.minutes}m</p>
        <p>{timeLeft.seconds}s</p>
      </div>

      {/* Product Carousel */}
      <div className="relative flex items-center w-full">
        <button onClick={() => scroll("left")} className="absolute left-2 top-1/2 transform -translate-y-1/2 p-3 bg-white shadow-md rounded-full z-10">
          <FaArrowLeft />
        </button>
        
        <div 
          ref={scrollRef} 
          className="flex space-x-6 overflow-x-auto px-8 w-full scrollbar-hide"
          style={{ 
            scrollBehavior: "smooth", 
            whiteSpace: "nowrap", 
            WebkitOverflowScrolling: "touch"
          }}
        >
          {products.map((product, index) => (
            <Card key={index} className="min-w-[200px] sm:min-w-[250px] flex flex-col shadow-md rounded-lg overflow-hidden relative bg-white">
              <CardHeader className="bg-gray-100 relative flex justify-center items-center">
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">{product.discount}</span>
                <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
              </CardHeader>
              <CardBody className="p-3 text-center">
                <p className="text-sm font-semibold">{product.name}</p>
                <p className="text-red-500 font-bold">{product.price} <span className="text-gray-400 line-through text-xs">{product.oldPrice}</span></p>
                <p className="text-yellow-500 text-xs">⭐ {product.rating}</p>
                <div className="flex justify-between mt-3">
                  <button className="p-2 bg-gray-200 rounded-full"><FaHeart size={14} /></button>
                  <button className="p-2 bg-gray-200 rounded-full"><FaEye size={14} /></button>
                  <Button className="bg-black text-white px-3 py-1 text-xs">Add</Button>
                </div>
              </CardBody>
              <CardFooter className="text-xs text-gray-500 p-2 text-center">
                Hurry! Limited Time.
              </CardFooter>
            </Card>
          ))}
        </div>

        <button onClick={() => scroll("right")} className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 bg-white shadow-md rounded-full z-10">
          <FaArrowRight />
        </button>
      </div>

      <div className="flex justify-center mt-4">
        <Button className="bg-red-500 text-white px-4 py-2 text-sm">View All Products</Button>
      </div>
    </div>
  );
};
