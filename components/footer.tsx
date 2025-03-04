import { Link } from "@heroui/link";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-[#F5EEDC] mt-6 w-full">
      <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8 lg:px-10">
        
        {/* Horizontal Layout */}
        <div className="flex flex-wrap justify-between items-center gap-6">
          
          {/* Subscribe Section */}
          <div className="flex flex-col items-start">
            <h4 className="text-lg font-semibold">Exclusive</h4>
            <p className="text-base text-gray-700">Get 10% off your first order</p>
            <Form className="flex items-center gap-2">
              <Input type="email" placeholder="Enter your email" className="w-[140px] md:w-[200px] px-3 py-2 border rounded-md" />
              <Button className="bg-black text-white px-4 py-2 rounded-md text-sm">Subscribe</Button>
            </Form>
          </div>

          {/* Support */}
          <div className="flex flex-col items-start">
            <h4 className="text-lg font-semibold">Support</h4>
            <p className="text-base text-gray-700">Bedford, UK</p>
            <p className="text-base text-gray-700">exclusive@gmail.com</p>
            <p className="text-base text-gray-700">+88015-88888-9999</p>
          </div>

          {/* Account */}
          <div className="flex flex-col items-start">
            <h4 className="text-lg font-semibold">Account</h4>
            <nav className="flex flex-col space-y-1">
              {["My Account", "Login / Register", "Cart", "Wishlist", "Shop"].map((item) => (
                <Link key={item} href="#" className="text-sm text-blue-600 hover:underline">
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start">
            <h4 className="text-lg font-semibold">Quick Link</h4>
            <nav className="flex flex-col space-y-1">
              {["Privacy Policy", "Terms Of Use", "FAQ", "Contact"].map((item) => (
                <Link key={item} href="#" className="text-sm text-blue-600 hover:underline">
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Sofa Image - Positioned Correctly */}
          <div className="shrink-0">
            <Image src="/sofa.png" alt="Sofa" width={150} height={120} className="max-w-full h-auto" />
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-6 border-t pt-4 text-center">
          <p className="text-sm text-gray-700">© 2024 Bedford UK. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
