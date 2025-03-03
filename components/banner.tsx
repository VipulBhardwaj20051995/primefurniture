import { Button } from "@heroui/button";

export const Banner = () => {
  return (
    <div className="relative flex items-center justify-center bg-black text-white dark:bg-white dark:text-black px-6 py-2.5">
      <div className="flex items-center gap-x-4">
        <p className="text-sm text-center">
          Sale For All <strong>Carpets & Furnitures</strong> Free Express Delivery - OFF 50%!
        </p>
        <Button 
          radius="full" 
          size="sm" 
          className="bg-white text-black dark:bg-black dark:text-white px-4 py-2"
        >
          Shop Now
        </Button>
      </div>
    </div>
  );
};
