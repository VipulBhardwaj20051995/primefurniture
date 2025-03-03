import { Button } from "@heroui/button";
import { useEffect, useState } from "react";




export const Hero2 = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    days: 5,
    minutes: 59,
    seconds: 35,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[70vh] flex items-center justify-center bg-black text-white">
      <div className="max-w-5xl flex items-center">
        {/* Left Content */}
        <div className="flex-1 px-8">
          <p className="text-green-500 font-semibold text-lg">Categories</p>
          <h1 className="text-5xl font-bold my-4">Enhance Your Sitting Experience</h1>

          {/* Countdown Timer */}
          <div className="flex space-x-4 text-center my-4">
            <div className="p-2 border rounded-lg">
              <span className="text-2xl font-bold">{timeLeft.hours}</span>
              <p className="text-sm">Hours</p>
            </div>
            <div className="p-2 border rounded-lg">
              <span className="text-2xl font-bold">{timeLeft.days}</span>
              <p className="text-sm">Days</p>
            </div>
            <div className="p-2 border rounded-lg">
              <span className="text-2xl font-bold">{timeLeft.minutes}</span>
              <p className="text-sm">Minutes</p>
            </div>
            <div className="p-2 border rounded-lg">
              <span className="text-2xl font-bold">{timeLeft.seconds}</span>
              <p className="text-sm">Seconds</p>
            </div>
          </div>

          {/* Buy Now Button */}
          <Button radius="full" className="bg-white text-black dark:bg-black dark:text-white px-4 py-2">
            Buy Now!
          </Button>
        </div>

        {/* Right Side Image */}
        <div className="flex-1">
          <img
            src="\hero2.png"
            alt="Sofa"
            width={420} // Adjust the width as needed
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};
