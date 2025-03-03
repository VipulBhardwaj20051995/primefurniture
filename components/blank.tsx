"use client";

import { useState } from "react";
import { Button } from "@heroui/button";

export const Blank = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Counter Button */}
     

      {/* Blank Section */}
      <div className="w-full h-32 bg-white rounded-lg"></div>
    </div>
  );
};
