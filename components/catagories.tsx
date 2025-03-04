import { useRef } from "react";
import { Card, CardBody } from "@heroui/card";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const categories = [
  { name: "Beds", icon: "🛏️" },
  { name: "Chair", icon: "🪑" },
  { name: "Sofa", icon: "🛋️" },
  { name: "Table", icon: "📝" },
  { name: "Decor", icon: "🎮" },
  { name: "Table", icon: "📝" },
  { name: "Decor", icon: "🎮" },
];

export const Catagories = () => {

  interface Category {
    name: string;
    icon: string;
  }

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: number): void => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction * 200, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto p-4 mb-12">
      <div className="relative w-full max-w-screen-lg mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-red-600 text-sm font-semibold">Categories</h2>
        <h1 className="text-2xl font-bold mb-4">Browse By Category</h1>
        <div className="relative flex items-center">
          <button
            onClick={() => scroll(-1)}
            className="absolute left-0 p-3 bg-white shadow-md rounded-full z-10"
          >
            <FaArrowLeft />
          </button>
          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide px-12 py-2 w-full"
            style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
          >
            {categories.map((category, index) => (
              <Card
                key={index}
                className="w-32 h-32 flex flex-col items-center justify-center shadow-lg shrink-0"
              >
                <CardBody className="flex flex-col items-center justify-center p-4">
                  <span className="text-3xl mb-2">{category.icon}</span>
                  <p className="text-lg font-medium">{category.name}</p>
                </CardBody>
              </Card>
            ))}
          </div>
          <button
            onClick={() => scroll(1)}
            className="absolute right-0 p-3 bg-white shadow-md rounded-full z-10"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
