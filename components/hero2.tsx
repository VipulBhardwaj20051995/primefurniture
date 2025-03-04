import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import Image from "next/image";

export const Hero2 = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 23,
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
    <section className="relative w-full py-12 min-h-[400px] flex items-center justify-center bg-black text-white">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center text-center md:text-left px-4 md:px-8">
        {/* Left Content */}
        <div className="flex-1 mb-8 md:mb-0">
          <p className="text-green-500 font-semibold text-lg"></p>
          <h1 className="text-xl sm:text-5xl md:text-6xl font-bold my-4">Enhance</h1>
          <h1 className="text-lg sm:text-3xl md:text-4xl font-bold my-4">Your Sitting Experience</h1>


          {/* Countdown Timer */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start text-center my-4">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds }
            ].map((item) => (
              <div key={item.label} className="p-2 border rounded-lg w-[70px]">
                <span className="text-xl md:text-2xl font-bold">
                  {item.value}
                </span>
                <p className="text-xs md:text-sm">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Buy Now Button */}
          <Button radius="full" className="bg-white text-black px-4 py-2 mt-2">
            Buy Now!
          </Button>
        </div>

        {/* Right Side Image */}
        <div className="flex-1 flex justify-center">
          <Image
            src="/hero2.png"
            alt="Sofa"
            width={320}
            height={320}
            className="w-[250px] md:w-[320px] h-auto object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
};
