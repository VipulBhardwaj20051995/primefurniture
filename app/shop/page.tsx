"use client";

import { Suspense } from "react";
import ClientShop from "@/components/client-shop";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function ShopPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      {/* Main content */}
      <main className="flex-grow py-4">
        <div className="container mx-auto px-4">
          {/* Add breadcrumbs */}
          <div className="text-sm text-gray-500 mb-4">
            Home &gt; Shop
          </div>
          
          {/* Shop content with sidebar layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters sidebar */}
            <div className="w-full lg:w-1/5 bg-white p-4 rounded shadow-sm mb-4 lg:mb-0">
              <h3 className="font-medium text-lg border-b pb-2 mb-3">Filters</h3>
              
              {/* Price Range */}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="space-y-1">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Under $100
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> $100 - $500
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> $500 - $1000
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Over $1000
                  </label>
                </div>
              </div>
              
              {/* Categories */}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Categories</h4>
                <div className="space-y-1">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Sofas
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Chairs
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Tables
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Beds
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Storage
                  </label>
                </div>
              </div>
            </div>
            
            {/* Product grid */}
            <div className="w-full lg:w-4/5">
              {/* Sort and view options */}
              <div className="bg-white p-3 mb-4 flex justify-between items-center shadow-sm rounded">
                <div className="font-medium">
                  <span className="text-gray-600">Sort By: </span>
                  <select className="ml-2 bg-transparent">
                    <option>Popularity</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 hidden sm:inline">View: </span>
                  <button className="p-1 mx-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" />
                  </button>
                </div>
              </div>
              <Suspense fallback={<div className="min-h-screen p-8">Loading...</div>}>
                <ClientShop />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}