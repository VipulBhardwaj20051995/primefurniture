import { Link } from "@heroui/link";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Image from "next/image";
import { FaGoogle, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-[#F5EEDC] mt-6 relative">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Subscribe Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Exclusive</h4>
            <p className="text-base text-gray-700">Get 10% off your first order</p>
            <Form className="flex">
              <Input type="email" placeholder="Enter your email" variant="bordered" />
              <Button radius="full" size="sm" className="bg-black text-white px-4 py-2">Subscribe</Button>
            </Form>
          </div>
          
          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support</h4>
            <p className="text-base text-gray-700">BedFord, UK</p>
            <p className="text-base text-gray-700">exclusive@gmail.com</p>
            <p className="text-base text-gray-700">+88015-88888-9999</p>
          </div>
          
          {/* Account */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Account</h4>
            <nav className="flex flex-col space-y-2">
              {['My Account', 'Login / Register', 'Cart', 'Wishlist', 'Shop'].map((item) => (
                <Link key={item} href="#" className="text-base text-blue-600 hover:underline">
                  {item}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Link</h4>
            <nav className="flex flex-col space-y-2">
              {['Privacy Policy', 'Terms Of Use', 'FAQ', 'Contact'].map((item) => (
                <Link key={item} href="#" className="text-base text-blue-600 hover:underline">
                  {item}
                </Link>
              ))}
            </nav>
          </div>
          
      
        </div>

        {/* Sofa Image - Positioned at the Top Right */}
        <Image 
          src="/sofa.png" 
          alt="Sofa" 
          width={280} 
          height={220} 
          className="absolute top-2 right-2 -translate-y-1/2 z-10"
        />
        
        {/* Bottom Bar */}
        <div className="mt-12 border-t pt-8 text-center">
          <p className="text-base text-gray-700">© 2024 Bedford UK. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
