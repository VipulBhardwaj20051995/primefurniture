import { useRef } from "react";
import { Card,CardBody } from "@heroui/card";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


const categories = [
  { name: "Beds", icon: "🛏️" },
  { name: "Chair", icon: "🪑" },
  { name: "Sofa", icon: "🛋️" },
  { name: "Table", icon: "📝" },
  { name: "Decor", icon: "🖼️" },
  { name: "Sofa", icon: "🛋️" },
  { name: "Table", icon: "📝" },
  { name: "Decor", icon: "🖼️" },
];

export const Catagories = () => {
    const scrollRef = useRef(null);

//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ left: direction * 200, behavior: "smooth" });
//     }
//   };

return (
  <div className="container mx-auto p-4 mb-12"> {/* Wrapped in a container and added bottom margin */}
    <div className="relative w-full max-w-screen-lg mx-auto p-4 bg-gray-100 rounded-lg shadow-md"> {/* Background and shadow added */}
      <h2 className="text-red-600 text-sm font-semibold">Categories</h2>
      <h1 className="text-2xl font-bold mb-4">Browse By Category</h1>
      <div className="relative flex items-center">
        <button className="absolute left-0 p-2 bg-white shadow-md rounded-full">
          <FaArrowLeft />
        </button>
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide px-8"
          style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
        >
          {categories.map((category, index) => (
            <Card key={index} className="w-32 h-32 flex flex-col items-center justify-center shadow-lg">
              <CardBody className="flex flex-col items-center justify-center p-4">
                <span className="text-3xl mb-2">{category.icon}</span>
                <p className="text-lg font-medium">{category.name}</p>
              </CardBody>
            </Card>
          ))}
        </div>
        <button className="absolute right-0 p-2 bg-white shadow-md rounded-full">
          <FaArrowRight />
        </button>
      </div>
    </div>
  </div>
);
};
